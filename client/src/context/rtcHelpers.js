import { peerActions } from "../store/peerSlice"

export const createPeerConnection = (type, userId) => {
  const stunServers = {
    iceServers: [
      {
        urls: [
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
        ],
      },
    ],
    iceCandidatePoolSize: 10,
  }

  let pc = new RTCPeerConnection(stunServers)

  return { pc: pc }
}

export const createOffer = async (pc, dispatch, user, userId) => {
  pc.onicecandidate = (e) => {
    if (e.candidate) {
      dispatch(
        peerActions.trickleIce({
          receiverId: user,
          senderId: userId,
          iceCand: e.candidate.toJSON(),
        })
      )
    }
  }
  const offerDescription = await pc.createOffer()
  await pc.setLocalDescription(offerDescription)
  const offer = {
    sdp: offerDescription.sdp,
    type: offerDescription.type,
  }
  await dispatch(
    peerActions.createOffer({
      senderId: userId,
      receiverId: user,
      offer: offer,
    })
  )
}

export const createAnswer = async (pc, dispatch, user, userId, offer) => {
  pc.onicecandidate = (e) => {
    if (e.candidate) {
      dispatch(
        peerActions.trickleIce({
          receiverId: user,
          senderId: userId,
          iceCand: e.candidate.toJSON(),
        })
      )
    }
  }

  const offerDescription = offer
  await pc.setRemoteDescription(new RTCSessionDescription(offerDescription))
  const answerDescription = await pc.createAnswer()
  await pc.setLocalDescription(answerDescription)

  const answer = {
    type: answerDescription.type,
    sdp: answerDescription.sdp,
  }

  await dispatch(
    peerActions.createAnswer({
      senderId: userId,
      receiverId: user,
      answer: answer,
    })
  )
}
