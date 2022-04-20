import { configureStore, combineReducers } from "@reduxjs/toolkit"
import authMiddleware from "./middleware/auth"
import authReducer from "./authSlice"
import entitiesReducer from "./entitiesSlice"
import uiReducer from "./uiSlice"
import peerReducer from "./peerSlice"

const rootReducer = combineReducers({
  auth: authReducer,
  entities: entitiesReducer,
  ui: uiReducer,
  peers: peerReducer,
})

const configStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (defaultMiddleware) =>
      defaultMiddleware({
        serializableCheck: { ignoreActions: ["entities/setupPeer"] },
      }).concat(authMiddleware),
  })
export default configStore

// const store = {
//   auth: "in authSlice",
//   entities: "in entitiesSlice",
//   ui: {
//     audio: false,
//     video: false,
//     muted: false,
//     deafen: false,
//     intercom: false,
//     view: {
//       type: "team",
//       vidStreamIDs: [],
//       audioStreamIDs: [],
//     },
//     viewLoaded: false,
//   },
// }
