import React, { useRef } from "react"
import { createContext, useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { uiActions } from "../store/uiSlice"
import AudioStream from "./AudioStream"
import { createAnswer, createOffer, createPeerConnection } from "./rtcHelpers"

const MAX_BITRATE = 4000000
const MAX_FRAMERATE = 60.0

export const StreamContext = createContext()

export const StreamProvider = ({ children }) => {
  const [connections, setConnections] = useState({})
  const [audTransceivers, setAudTransceivers] = useState({})
  const [vidTransceivers, setVidTransceivers] = useState({})
  const [myAudio, setMyAudio] = useState(null)
  const [myVideo, setMyVideo] = useState(null)
  const { users, hostUnmute, remoteMute, eventMute, myMute, deafen, teams } =
    useSelector((store) => store.entities)
  const { offers, answers, iceCandidates } = useSelector((store) => store.peers)
  const { isConnected, userId, type } = useSelector((store) => store.auth)
  const { listening, sendVideo } = useSelector((store) => store.ui)
  const dispatch = useDispatch()

  useEffect(() => {
    window.addEventListener("beforeunload", () => {
      Object.keys(connections).forEach((user) => {
        connections[user].pc.getLocalStreams().forEach((stream) => {
          stream.getTracks().forEach((t) => {
            t.stop()
            stream.removeTrack(t)
          })
        })
        connections[user].pc.close()
        setConnections((cons) => {
          delete cons[user]
          return cons
        })
      })
    })
  }, [connections])

  //////////////////////////////////////////////////////////////////////////////
  //  Mute Options
  //    - self mute      -> switch myAudio.enabled to false
  //    - deafen         -> switch myAudio.enabled to false & mute all audio elements
  //    - remoteMic-on   -> use replaceTrack to send audio to everyone
  //    - remoteMic-off  -> use replaceTrack to stop sending to everyone except team and host
  //    - event-mute     -> mute all audio elements & play 'comms down' audio
  //////////////////////////////////////////////////////////////////////////////

  // self-mute
  useEffect(() => {
    if (!myAudio) return
    myAudio.getAudioTracks()[0].enabled = !(myMute || deafen)
  }, [myMute, deafen])

  // get mute of audio
  const getMute = (otherUserId) => {
    if (eventMute || deafen) {
      return true
    }
    if (listening) {
      // for host
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
    Object.keys(audTransceivers).forEach((key) => {
      setAudTransceivers((state) => ({
        ...state,
        [key]: { trans: state[key].trans, muted: getMute(key) },
      }))
    })
  }, [deafen, eventMute, remoteMute, hostUnmute, teams, listening])

  useEffect(() => {
    if (!myAudio) return
    Object.keys(audTransceivers).forEach((key1) => {
      Object.entries(teams).forEach(([key, val]) => {
        if (!val.players.includes(userId) && val.players.includes(key1)) {
          audTransceivers[key1].trans.sender.replaceTrack(
            remoteMute ? null : myAudio.getTracks()[0]
          )
        }
      })
    })
  }, [remoteMute, teams, users, audTransceivers, myAudio, userId])

  ////////////////////////////////////////////////////////////////////////////////
  // END Mic Stuff
  ////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //  Video Options
  //    - listen for 'sendVideo' in ui store
  //        - if it is present, send video using replaceTrack on the associated userId
  //              - also dispatch an action 'video-sent' to store with the userId
  //        - if it is not present, make sure that replaceTrack is null
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    console.log("sending vid", sendVideo)
    if (sendVideo && vidTransceivers.hasOwnProperty(sendVideo)) {
      vidTransceivers[sendVideo].sender.replaceTrack(myVideo.getTracks()[0])
      console.log(vidTransceivers[sendVideo].sender)
      dispatch(
        uiActions.iSentVideo({ senderId: userId, receiverId: sendVideo })
      )
      console.log("i sent video")
    } else {
      // replace track all
      Object.entries(vidTransceivers).forEach(([key, val]) => {
        console.log("removeing track", key, val)
        val.sender.replaceTrack(null)
      })
    }
  }, [sendVideo])

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // END Video Stuff
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // WebRTC stuff
  ////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    // connect to all the users when first joining
    Object.keys(users).forEach((user) => {
      const { pc } = createPeerConnection(type, user)
      pc.ontrack = (track) => {}
      const transceiver = pc.addTransceiver("audio")
      const sender = transceiver.sender
      if (myAudio) {
        sender.replaceTrack(myAudio.getTracks()[0])
      }

      pc.addTransceiver("video")

      setAudTransceivers((trans) => ({
        ...trans,
        [user]: { trans: pc.getTransceivers()[0], muted: getMute(user) },
      }))
      setVidTransceivers((trans) => ({
        ...trans,
        [user]: pc.getTransceivers()[1],
      }))
      createOffer(pc, dispatch, user, userId)
      setConnections((conns) => ({
        ...conns,
        [user]: {
          pc: pc,
          ice: [],
        },
      }))
    })
  }, [isConnected])

  useEffect(() => {
    if (!offers) return
    // for offers.keys
    Object.keys(offers)
      .filter((x) => !connections.hasOwnProperty(x))
      .forEach((user) => {
        // when new offer is added, create a new peer connection and answer
        const { pc } = createPeerConnection(type, user)
        pc.ontrack = ({ transceiver }) => {
          if (transceiver.receiver.track.kind === "audio") {
            transceiver.sender.replaceTrack(myAudio.getTracks()[0])
            setAudTransceivers((trans) => ({
              ...trans,
              [user]: { trans: transceiver, muted: getMute(user) },
            }))
          } else {
            setVidTransceivers((trans) => ({ ...trans, [user]: transceiver }))
          }
        }

        createAnswer(pc, dispatch, user, userId, offers[user])
        setConnections((conns) => ({
          ...conns,
          [user]: {
            pc: pc,
            ice: [],
          },
        }))
      })
  }, [dispatch, offers, type, userId])

  useEffect(() => {
    // when new answer is received, setRemoteDescription on pc with cooresponding id
    Object.keys(answers)
      .filter(
        (x) => connections.hasOwnProperty(x) && !connections[x].isConnected
      )
      .forEach((user) => {
        connections[user].pc
          .setRemoteDescription(new RTCSessionDescription(answers[user]))
          .then(() => {
            let sender = connections[user].pc.getSenders()[1]
            let params = sender.getParameters()
            if ("degradationPreference" in params) {
              params.degredationPreference = "maintain-framerate"
            }
            params.encodings.forEach((e) => {
              e.maxBitrate = MAX_BITRATE
              e.maxFramerate = MAX_FRAMERATE
            })
            sender.setParameters(params)
          })
      })
  }, [answers])

  useEffect(() => {
    Object.entries(iceCandidates).forEach(([key, val]) => {
      if (connections.hasOwnProperty(key)) {
        if (!connections[key].ice.includes(val)) {
          connections[key].pc.addIceCandidate(new RTCIceCandidate(val))
          setConnections((con) => ({
            ...con,
            [key]: { pc: con[key].pc, ice: [...con[key].ice, val] },
          }))
        }
      }
    })
  }, [iceCandidates, connections])

  useEffect(() => {
    Object.keys(connections).forEach((user) => {
      if (!users.hasOwnProperty(user)) {
        connections[user].pc.getLocalStreams().forEach((stream) => {
          stream.getTracks().forEach((t) => {
            t.stop()
            stream.removeTrack(t)
          })
        })
        connections[user].pc.close()
        setConnections((cons) => {
          delete cons[user]
          return cons
        })
      }
    })
  }, [connections, users])
  ////////////////////////////////////////////////////////////////////////////////
  // END WebRTC Stuff
  ////////////////////////////////////////////////////////////////////////////////

  return (
    <StreamContext.Provider
      value={{ connections, myVideo, setMyVideo, setMyAudio, vidTransceivers }}
    >
      {Object.entries(audTransceivers).map(([key, value]) => {
        return (
          <AudioStream
            key={key}
            track={value.trans.receiver}
            muted={value.muted}
          />
        )
      })}
      {children}
    </StreamContext.Provider>
  )
}
