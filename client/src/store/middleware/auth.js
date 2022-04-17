import socketIOClient from "socket.io-client"
import { authActions } from "../authSlice"
import { entitiesActions } from "../entitiesSlice"
import { uiActions } from "../uiSlice"
import axios from "axios"

const handleError = (func, err) => {
  try {
    func()
  } catch (error) {
    err = error
  }
}

let AUTH_API_URL = "http://localhost:5000/api/auth"
if (process.env.NODE_ENV === "production") {
  AUTH_API_URL = "https://ludwigmonday.gg/api/spermbank"
}

const authMiddleware = (store) => {
  let socket

  return (next) => (action) => {
    const isConnectionEstablished = socket && store.getState().auth.isConnected
    const isAuth = store.getState().auth.isAuthenticated
    let err

    ////////////////////////////////////////////////////////////////////////////////////
    // AUTHENTICATION
    ////////////////////////////////////////////////////////////////////////////////////
    if (action.type === "auth/callBegin") {
      // check if timestamp is older than 2hrs
      if (action.payload.timestamp + 7000000 > Date.now()) {
        // make auth api call
        axios
          .get(AUTH_API_URL, {
            params: { ...action.payload }, // data should be {roomname: 'user entered roomname'}
          })
          .then((res) => {
            store.dispatch(
              authActions.authReceived({
                ...res.data,
                password: action.payload.roomcode,
              })
            ) // res should be userId, roomcode, type, socketURL, peerHost, peerPort, peerPath
            localStorage.setItem("mondays-roomcode", action.payload.roomcode)
            localStorage.setItem("mondays-userId", action.payload.userId)
            localStorage.setItem("mondays-timestamp", Date.now())
          })
          .catch((err) => console.log("error authenticating", err))
        // store to local
      }
    }

    ////////////////////////////////////////////////////////////////////////////////////
    // CONNECT TO WEBSOCKETS
    ////////////////////////////////////////////////////////////////////////////////////
    if (authActions.startConnecting.match(action) && isAuth) {
      // CONNECTIONS
      const auth = store.getState().auth

      socket = socketIOClient(auth.socketURL, {
        auth: {
          roomcode: auth.roomcode,
          userId: auth.userId,
          type: auth.type,
        },
      })

      // ON CONNECT TO SOCKET SERVER
      socket.on("connected-init", ({ users, teams, eventSettings }) => {
        if (users) {
          users.forEach((user) => {
            store.dispatch(
              entitiesActions.addUser({
                id: user._id,
                streamerName: user.streamerName,
                type: user.type,
                gameName: user.gameName,
                attributes: user.attributes,
              })
            )
          })
        }
        // add all teams
        if (teams) {
          teams.forEach((team) => {
            store.dispatch(
              entitiesActions.addTeam({
                name: team.name,
                createdBy: team.createdBy,
                players: team.players,
              })
            )
          })
        }
        store.dispatch(authActions.isConnectionEstablished())
        store.dispatch(entitiesActions.changeEventSettings({ eventSettings }))
      })

      ////////////////////////////////////////////////////////////////////////////////
      // Socket Setup
      //   add-user (no need for peer stuff here)
      //   delete-user
      //   change-remote-mute
      //   team-only
      //   add-team
      //   update-team
      //   delete-team
      //   viewer-event-mute
      ////////////////////////////////////////////////////////////////////////////////
      socket.on("update-self", (me) => {
        store.dispatch(
          authActions.updateSelf({
            attributes: me.attributes,
          })
        )
      })
      socket.on("add-user", (user) => {
        // handles user updates too
        store.dispatch(
          entitiesActions.addUser({
            id: user.id,
            type: user.type,
            streamerName: user.streamerName,
            gameName: user.gameName,
            attributes: user.attributes,
          })
        )
      })
      socket.on("delete-user", (user) => {
        // go through teams and remove user from players
        store.dispatch(entitiesActions.deleteUser({ id: user.id }))
      })
      if (auth.type !== "host") {
        socket.on("change-remote-mute", (data) => {
          store.dispatch(
            entitiesActions.changeRemoteMute({
              remoteMute: data.remoteMute,
            })
          )
        })
      }
      socket.on("add-team", (team) => {
        store.dispatch(
          entitiesActions.addTeam({
            name: team.name,
            createdBy: team.createdBy,
            players: team.players,
          })
        )
      })
      socket.on("delete-team", (team) => {
        let plrs = store.getState().entities.teams[team.name].players
        if (plrs && plrs.includes(auth.userId)) {
          store.dispatch(uiActions.setTeamname({ teamname: null }))
        }
        store.dispatch(
          entitiesActions.deleteTeam({
            name: team.name,
          })
        )
      })
      socket.on("update-team", (team) => {
        store.dispatch(
          entitiesActions.addTeam({
            name: team.name,
            createdBy: team.createdBy,
            players: team.players,
          })
        )
      })
      socket.on("viewer-event-mute", (eventMute) => {
        store.dispatch(entitiesActions.changeMute({ eventMute }))
        setTimeout(
          () =>
            store.dispatch(entitiesActions.changeMute({ eventMute: false })),
          store.getState().entities.eventSettings.timeout
        )
      })
      socket.on("host-unmute", (host) => {
        store.dispatch(
          entitiesActions.changeHostUnmute({
            hostUnmute: host.hostUnmute,
          })
        )
      })
      ////////////////////////////////////////////////////////////////////////////////
      // End Socket Setup
      ////////////////////////////////////////////////////////////////////////////////
    }

    ////////////////////////////////////////////////////////////////////////////////
    // Action Definitions with sockets attached
    //   All Users
    //     submit-add-team
    //     submit-update-team
    //     submit-delete-team
    //     logout -> disconnect
    //   Player only
    //     set-name
    //   Host only
    //     change-remote-mute (should only be able to unmute and team-only mute on socket)
    ////////////////////////////////////////////////////////////////////////////////

    // All Users
    if (
      entitiesActions.submitAddTeam.match(action) &&
      isConnectionEstablished
    ) {
      handleError(() => {
        socket.emit("submit-add-team", {
          name: action.payload.name,
          createdBy: action.payload.createdBy,
          players: action.payload.players,
        })
      }, err)
    }
    if (
      entitiesActions.submitUpdateTeam.match(action) &&
      isConnectionEstablished
    ) {
      handleError(() => {
        socket.emit("submit-update-team", {
          name: action.payload.name,
          createdBy: action.payload.createdBy,
          players: action.payload.players,
        })
      })
    }
    if (
      entitiesActions.submitDeleteTeam.match(action) &&
      isConnectionEstablished
    ) {
      handleError(() => {
        socket.emit("submit-del-team", {
          name: action.payload.name,
        })
      }, err)
    }
    if (authActions.logout.match(action) && isConnectionEstablished) {
      socket.disconnect()
    }
    if (authActions.setName.match(action) && isConnectionEstablished) {
      // Player only
      handleError(
        () =>
          socket.emit("update-user", {
            streamerName: action.payload.streamerName,
            gameName: action.payload.gameName,
            playerId: action.payload.playerId,
          }),
        err
      )
    }
    if (entitiesActions.submitFile.match(action) && isConnectionEstablished) {
      // send to socketio
      handleError(() =>
        socket.emit("upload-file", {
          file: action.payload.file,
        })
      )
    }
    // Host only
    if (
      entitiesActions.changeRemoteMute.match(action) &&
      isConnectionEstablished &&
      store.getState().auth.type === "host"
    ) {
      handleError(
        () =>
          socket.emit("change-remote-mute", {
            remoteMute: !store.getState().entities.remoteMute,
          }),
        err
      )
    }
    if (
      uiActions.setSpeaking.match(action) &&
      isConnectionEstablished &&
      store.getState().auth.type === "host"
    ) {
      handleError(() => {
        socket.emit("host-unmute", {
          id: action.payload.speaking,
          hostId: store.getState().auth.userId,
        })
      }, err)
    }
    if (err) {
      console.log(err)
    } else {
      next(action)
    }
  }
}

export default authMiddleware
