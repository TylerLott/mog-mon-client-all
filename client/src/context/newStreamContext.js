import React, { useRef } from "react"
import { createContext, useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import AudioStream from "./AudioStream"
import {
  createAnswer,
  createOffer,
  createPeerConnection,
  receiveAnswer,
} from "./rtcHelpers"

// let peer_ws

export const StreamContext = createContext()

export const StreamProvider = ({ children }) => {
  const [connections, setConnections] = useState({})
  const [audTransceivers, setAudTransceivers] = useState({})
  const [vidTransceivers, setVidTransceivers] = useState({})
  const [myAudio, setMyAudio] = useState(null)
  const [myVideo, setMyVideo] = useState(null)
  const { users, hostUnmute, remoteMute, eventMute, myMute, deafen, teams } =
    useSelector((store) => store.entities)
  const { offers, answers, sendScreen, iceCandidates } = useSelector(
    (store) => store.peers
  )
  const { isConnected, userId, type } = useSelector((store) => store.auth)
  const { listening } = useSelector((store) => store.ui)
  const dispatch = useDispatch()
  const testRef = useRef()

  useEffect(() => {
    // connect to all the users when first joining
    Object.keys(users).forEach((user) => {
      const { pc } = createPeerConnection(type, user)
      pc.ontrack = (track) => {
        console.log("received track", track)
      }
      const transceiver = pc.addTransceiver("audio")
      const sender = transceiver.sender
      sender.replaceTrack(myAudio.getTracks()[0])

      if (type === "host") {
        pc.addTransceiver("video")
      } else {
        pc.addTransceiver("video")
      }
      setAudTransceivers((trans) => ({
        ...trans,
        [user]: pc.getTransceivers()[0],
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
        console.log("got offer", user, offers[user])
        // when new offer is added, create a new peer connection and answer
        const { pc } = createPeerConnection(type, user)

        createAnswer(pc, dispatch, user, userId, offers[user])
        pc.ontrack = ({ transceiver }) => {
          console.log("i received a track")
          if (transceiver.receiver.track.kind === "audio") {
            transceiver.sender.replaceTrack(myAudio.getTracks()[0])
            setAudTransceivers((trans) => ({ ...trans, [user]: transceiver }))
          } else {
            setVidTransceivers((trans) => ({ ...trans, [user]: transceiver }))
          }
        }
        setConnections((conns) => ({
          ...conns,
          [user]: {
            pc: pc,
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
        connections[user].pc.setRemoteDescription(
          new RTCSessionDescription(answers[user])
        )
      })
  }, [answers])

  useEffect(() => {
    console.log("audiotrans", audTransceivers)
  }, [audTransceivers])

  return (
    <StreamContext.Provider
      value={{ connections, myVideo, setMyVideo, setMyAudio }}
    >
      {Object.entries(audTransceivers).map(([key, value]) => {
        return (
          <AudioStream
            key={key}
            track={value.receiver.track}
            muted={value.muted}
          />
        )
      })}
      {children}
    </StreamContext.Provider>
  )
}
