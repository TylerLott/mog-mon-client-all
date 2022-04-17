import { createSlice } from "@reduxjs/toolkit"

// Initial State
const initialState = {
  type: "",
  userId: "",
  roomcode: "",
  password: "",
  streamerName: "",
  gameName: "",
  attributes: {
    kills: 0,
    placement: 0,
  },
  isConnected: false,
  isAuthenticated: false,
  isEstabilshingConnection: false,
  myAudio: null,
  myVideo: null,
  socketURL: null,
  peerHost: null,
  peerPort: null,
  peerPath: null,
}

// Slice
const slice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logout: (auth, action) => {
      auth.type = ""
      auth.userId = ""
      auth.roomcode = ""
      auth.streamerName = ""
      auth.gameName = ""
      auth.isConnected = false
      auth.isAuthenticated = false
      auth.isEstabilshingConnection = false
      auth.myAudio = null
      auth.myVideo = null
      auth.socketURL = null
      auth.peerHost = null
      auth.peerPort = null
      auth.peerPath = null
    },
    authReceived: (auth, action) => {
      auth.isAuthenticated = true
      auth.userId = action.payload.userId
      auth.roomcode = action.payload.roomcode
      auth.type = action.payload.type
      auth.socketURL = action.payload.socketURL
      auth.peerHost = action.payload.peerHost
      auth.peerPort = parseInt(action.payload.peerPort)
      auth.peerPath = action.payload.peerPath
      auth.password = action.payload.password
    },
    startConnecting: (auth, action) => {
      auth.isEstabilshingConnection = true
    },
    isConnectionEstablished: (auth, action) => {
      auth.isConnected = true
      auth.isEstabilshingConnection = true
    },
    setName: (auth, action) => {
      auth.streamerName = action.payload.streamerName
      auth.gameName = action.payload.gameName
    },
    setAudio: (auth, action) => {
      auth.myAudio = action.payload.myAudio
    },
    setVideo: (auth, action) => {
      auth.myVideo = action.payload.myVideo
    },
    updateSelf: (auth, action) => {
      auth.attributes = action.payload.attributes
    },
  },
})

export const authActions = slice.actions
export default slice.reducer

// Action Creators
