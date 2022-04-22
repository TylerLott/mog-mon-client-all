import Peer from "peerjs"
import { createContext, useState, useEffect } from "react"
import { useSelector } from "react-redux"
import AudioStream from "./AudioStream"

let PEER_SEC = true
if (process.env.NODE_ENV !== "production") {
  PEER_SEC = false
}
let peer

export const StreamContext = createContext()

export const StreamProvider = ({ children }) => {
  const [audioStreams, setAudioStreams] = useState({})
  const [videoStreams, setVideoStreams] = useState({})
  const [myAudio, setMyAudio] = useState(null)
  const [myVideo, setMyVideo] = useState(null)
  const [othersType, setOthersType] = useState(null)
  const [peerConnected, setPeerConnected] = useState(false)
  const { users, hostUnmute, remoteMute, eventMute, myMute, deafen, teams } =
    useSelector((store) => store.entities)
  const { isConnected, roomcode, peerHost, peerPort, peerPath, userId, type } =
    useSelector((store) => store.auth)
  const { listening } = useSelector((store) => store.ui)

  const getMute = (otherUserId) => {
    if (eventMute || deafen) {
      return true
    }
    if (listening) {
      let arr = Object.entries(teams)
      for (let i = 0; i < arr.length; i++) {
        if (
          arr[i][0] === listening &&
          arr[i][1].players.includes(otherUserId)
        ) {
          return false
        }
      }

      if (otherUserId === listening) {
        return false
      }
    }
    if (hostUnmute) {
      let keys = Object.keys(users)
      for (let i = 0; i < keys.length; i++) {
        if (keys[i] === hostUnmute) {
          return false
        }
      }
    }
    if (remoteMute) {
      let arr = Object.entries(teams)
      for (let i = 0; i < arr.length; i++) {
        if (
          arr[i][1].players.includes(otherUserId) &&
          arr[i][1].players.includes(userId)
        ) {
          return false
        }
      }
    }
    if (!remoteMute) {
      return false
    }
    return true
  }

  useEffect(() => {
    let muteAud = {}
    Object.entries(audioStreams).forEach(([key, value]) => {
      let mute = getMute(key)
      muteAud[key] = { stream: audioStreams[key].stream, muted: mute }
    })
    setAudioStreams(muteAud)
  }, [deafen, eventMute, remoteMute, hostUnmute, teams, listening])

  useEffect(() => {
    let myAud = myAudio
    if (myAud) {
      myAud.getAudioTracks()[0].enabled = !(myMute || deafen)
      setMyAudio(myAud)
    }
  }, [myMute, deafen])

  useEffect(() => {
    if (!isConnected) return
    // define peer stuff here
    peer = new Peer(userId, {
      debug: 3,
      host: peerHost,
      path: peerPath,
      token: roomcode,
      secure: PEER_SEC,
      config: {
        iceServers: [{ url: "stun:stun.l.google.com:19302" }],
      },
    })
    setTimeout(() => {
      // setup call - should run when first connected on all users they received
      let initStreamsAud = {}
      let initStreamsVid = {}
      setPeerConnected(true)
      if (users) {
        Object.keys(users).forEach((user) => {
          let conn = peer.connect(user)
          conn.on("open", () => {
            conn.send(type)
            conn.on("data", (othersType) => {
              let outTracks = []
              outTracks = outTracks.concat(myAudio.getAudioTracks())
              outTracks = outTracks.concat(myVideo.getVideoTracks())

              let call = peer.call(conn.peer, new MediaStream(outTracks))
              const vid_sender = call.peerConnection
                .getSenders()
                .filter((s) => s.track?.kind == "video")[0]
              const vid_params = vid_sender.getParameters()
              if ("degradationPreference" in vid_params) {
                vid_params.degredationPreference = "maintain-framerate"
              }
              vid_params.encodings[0].maxBitrate = 4000000
              vid_sender.setParameters(vid_params).then(() => {
                call.on("stream", (remoteStream) => {
                  if (type === "host") {
                    initStreamsVid[call.peer] = {
                      stream: new MediaStream(remoteStream.getVideoTracks()),
                      muted: getMute(call.peer),
                    }
                  }
                  initStreamsAud[call.peer] = {
                    stream: new MediaStream(remoteStream.getAudioTracks()),
                    muted: getMute(call.peer),
                  }
                })
              })
            })
          })
        })
      }
      setAudioStreams(initStreamsAud)
      setVideoStreams(initStreamsVid)
    }, 1500)
  }, [isConnected])

  useEffect(() => {
    if (!peer) return
    if (!myAudio) return
    if (!myVideo) return
    // setup connection
    peer.on("connection", (conn) => {
      conn.on("data", (othersType) => {
        setOthersType(othersType)
        conn.send(type)
      })
    })
  }, [myAudio, myVideo, peerConnected])

  useEffect(() => {
    if (!othersType) return
    if (!peer) return

    let audStreams = { ...audioStreams }
    let vidStreams = { ...videoStreams }
    peer.on("call", (call) => {
      let outTracks = []
      outTracks = outTracks.concat(myAudio.getAudioTracks())
      outTracks = outTracks.concat(myVideo.getVideoTracks())
      let test = new MediaStream(outTracks)
      call.answer(test)
      call.on("stream", (remoteStream) => {
        if (type === "host") {
          vidStreams[call.peer] = {
            muted: getMute(call.peer),
            stream: new MediaStream(remoteStream.getVideoTracks()),
          }
          setVideoStreams(vidStreams)
        }
        audStreams[call.peer] = {
          stream: new MediaStream(remoteStream.getAudioTracks()),
          muted: getMute(call.peer),
        }
        setAudioStreams(audStreams)
      })
    })
  }, [othersType])

  useEffect(() => {
    // check to see if any of the streams have old users, delete if so
    let audStreams = {}
    let vidStreams = {}
    Object.keys(audioStreams).forEach((streamId) => {
      if (Object.keys(users).includes(streamId)) {
        audStreams[streamId] = audioStreams[streamId]
      }
    })
    Object.keys(videoStreams).forEach((streamId) => {
      if (Object.keys(users).includes(streamId)) {
        vidStreams[streamId] = videoStreams[streamId]
      }
    })
    setAudioStreams(audStreams)
    setVideoStreams(vidStreams)
  }, [users])

  useEffect(() => {}, [videoStreams, users])

  return (
    <StreamContext.Provider
      value={{ audioStreams, videoStreams, myVideo, setMyVideo, setMyAudio }}
    >
      {Object.entries(audioStreams).map(([key, value]) => {
        return (
          <AudioStream key={key} stream={value.stream} muted={value.muted} />
        )
      })}
      {children}
    </StreamContext.Provider>
  )
}
