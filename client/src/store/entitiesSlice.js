import { createSlice } from "@reduxjs/toolkit"

// Initial State
const initialState = {
  users: {
    // userId: {
    //   team
    //   type
    //   streamerName
    //   gameName
    //   attributes: {
    //     kills
    //     placement
    //   }
    // }
  },
  teams: {
    // name: {
    //   createdBy
    //   players: [order is important]
    // }
  },
  eventSettings: {
    // timeout
  },
  myTeam: "",
  storeAudioStreams: {},
  deafen: false,
  myMute: false, // change .enabled on stream
  eventMute: false,
  remoteMute: false, // true is team only
  hostUnmute: null, // host id if unmuted
}

const slice = createSlice({
  name: "entities",
  initialState: initialState,
  reducers: {
    addUser: (entities, action) => {
      entities.users[action.payload.id] = {
        type: action.payload.type,
        streamerName: action.payload.streamerName,
        gameName: action.payload.gameName,
        attributes: action.payload.attributes,
      }
    },
    deleteUser: (entities, action) => {
      // delete user from state
      delete entities.users[action.payload.id]
    },
    addTeam: (entities, action) => {
      entities.teams[action.payload.name] = {
        createdBy: action.payload.createdBy,
        players: action.payload.players,
      }
    },
    deleteTeam: (entities, action) => {
      // delete team
      delete entities.teams[action.payload.name]
    },
    submitAddTeam: (entities, action) => {
      entities.teams[action.payload.name] = {
        createdBy: action.payload.createdBy,
        players: action.payload.players,
      }
    },
    submitUpdateTeam: (entities, action) => {
      entities.teams[action.payload.name] = {
        createdBy: action.payload.createdBy,
        players: action.payload.players,
      }
    },
    submitDeleteTeam: (entities, action) => {
      // dispatch delete team
      delete entities.teams[action.payload.name]
    },
    addAudioStream: (entities, action) => {
      entities.users[action.payload.userId].isMuted = action.payload.isMuted
      entities.storeAudioStreams[action.payload.userId] = ""
    },
    deleteAudioStream: (entities, action) => {
      //
    },
    muteAudioStream: (entities, actions) => {
      //
    },
    addVideoStream: (entities, action) => {
      //
    },
    deleteVideoStream: (entities, action) => {
      //
    },
    changeDeafen: (entities, action) => {
      //
      entities.deafen = !entities.deafen
    },
    changeEventSettings: (entities, action) => {
      entities.eventSettings = action.payload.eventSettings
    },
    changeMyMute: (entities, action) => {
      entities.myMute = !entities.myMute
    },
    changeEventMute: (entities, action) => {
      entities.eventMute = action.payload.eventMute
    },
    changeRemoteMute: (entities, action) => {
      entities.remoteMute = action.payload.remoteMute
    },
    changeHostUnmute: (entities, action) => {
      entities.hostUnmute = action.payload.hostUnmute
    },
    submitFile: () => {},
  },
})

export const entitiesActions = slice.actions
export default slice.reducer
