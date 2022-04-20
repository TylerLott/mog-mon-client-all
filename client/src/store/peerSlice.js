import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  offers: {
    // userid : offer
  },
  answers: {
    // userid : answer
  },
  sendScreen: {
    // userid
  },
  iceCandidates: {
    // ice
  },
}

const slice = createSlice({
  name: "peers",
  initialState: initialState,
  reducers: {
    newOffer: (peers, action) => {
      peers.offers[action.payload.peerId] = action.payload.offer
    },
    newAnswer: (peers, action) => {
      peers.answers[action.payload.peerId] = action.payload.answer
    },
    addSendScreen: (peers, action) => {
      peers.sendScreen[action.payload.peerId] = true
    },
    stopSendScreen: (peers, action) => {
      peers.sendScreen[action.payload.peerId] = false
    },
    createIceCandidates: (peers, action) => {
      peers.iceCandidates[action.payload.peerId] = action.payload.iceCand
    },
    trickleIce: () => {},
    createOffer: () => {},
    createAnswer: () => {},
  },
})

export const peerActions = slice.actions
export default slice.reducer
