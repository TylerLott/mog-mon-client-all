import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  streamOpen: false,
  cam: false,
  logo: "top", // top, bottom, right, none
  players: "name", // name, stats
  teams: "name", // name, stats
  viewIds: [], // array of user id's to get streams
  teamname: null, // should only be part of one team only
  listening: null, // should be a userId or teamname
  viewing: null, // should be a userId or teamname or 'leaderboard'
  speaking: null, // should be a userId or teamname
  leaderboardType: false, // false = players, true = teams
}

const slice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    showStream: (ui, action) => {
      ui.streamOpen = !ui.streamOpen
    },
    showCam: (ui, action) => {
      ui.cam = !ui.cam
    },
    setLogo: (ui, action) => {
      ui.logo = action.payload.logo
    },
    setPlayers: (ui, action) => {
      ui.players = action.payload.players
    },
    setTeams: (ui, action) => {
      ui.teams = action.payload.teams
    },
    setTeamname: (ui, action) => {
      ui.teamname = action.payload.teamname
    },
    setListening: (ui, action) => {
      ui.listening = action.payload.listening
    },
    setViewing: (ui, action) => {
      ui.viewing = action.payload.viewing
    },
    setSpeaking: (ui, action) => {
      ui.speaking = action.payload.speaking
    },
    toggleLeaderboardType: (ui) => {
      ui.leaderboardType = !ui.leaderboardType
    },
  },
})

export const uiActions = slice.actions
export default slice.reducer
