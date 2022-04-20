import { useState, useEffect } from "react"
import Host from "./pages/Host/Host"
import Login from "./pages/Login/Login"
import Player from "./pages/Player/Player"
import { Routes, Route, useNavigate } from "react-router-dom"
import "./App.css"
import PrivateRoute from "./components/PrivateRoute/PrivateRoute"
import { useDispatch, useSelector } from "react-redux"
import { v4 as uuidV4 } from "uuid"
import { StreamProvider } from "./context/newStreamContext"

let HOME_PATH = "/daddyscummies"
let HOST_PATH = "/daddyscummies/host"
let PLAYER_PATH = "/daddyscummies/player"
if (process.env.NODE_ENV !== "production") {
  HOME_PATH = ""
  HOST_PATH = "/host"
  PLAYER_PATH = "/player"
}

const App = () => {
  const [roomcode, setRoomcode] = useState(null)
  const isAuth = useSelector((store) => store.auth.isAuthenticated)
  const type = useSelector((store) => store.auth.type)
  const dispatch = useDispatch()
  let navigate = useNavigate()

  // connect to room
  const handleLogin = (e) => {
    e.preventDefault()
    const userId = uuidV4()
    dispatch({
      type: "auth/callBegin",
      payload: { roomcode: roomcode, userId: userId, timestamp: Date.now() },
    })
  }

  // Handle Relogin
  useEffect(() => {
    const storedRoomcode = window.localStorage.getItem("mondays-roomcode")
    const storedUserId = window.localStorage.getItem("mondays-userId")
    const storedTime = window.localStorage.getItem("mondays-timestamp")
    if (storedRoomcode && storedUserId && storedTime) {
      dispatch({
        type: "auth/callBegin",
        payload: {
          roomcode: storedRoomcode,
          userId: storedUserId,
          timestamp: storedTime,
        },
      })
    }
  }, [])

  // Navigate on Login
  useEffect(() => {
    if (isAuth) {
      navigate(`${HOME_PATH}/${type}`)
    }
  }, [isAuth])

  return (
    <div className="App">
      <Routes>
        <Route
          path={HOME_PATH}
          element={
            <Login handleLogin={handleLogin} handleRoomcode={setRoomcode} />
          }
        />
        <Route element={<PrivateRoute isAuthenticated={isAuth} />}>
          <Route
            path={HOST_PATH}
            element={
              <StreamProvider>
                <Host />
              </StreamProvider>
            }
          />
        </Route>
        <Route element={<PrivateRoute isAuthenticated={isAuth} />}>
          <Route
            path={PLAYER_PATH}
            element={
              <StreamProvider>
                <Player />
              </StreamProvider>
            }
          />
        </Route>
      </Routes>
    </div>
  )
}

export default App
