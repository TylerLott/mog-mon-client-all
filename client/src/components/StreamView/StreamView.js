import React, { useRef, useEffect, useContext, useState, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import StreamerScreen from "../StreamerScreen/StreamerScreen"
import { StreamContext } from "../../context/newStreamContext"
import {
  HostMain,
  HostSmall,
  Leaderboard,
  LogoBottom,
  LogoTop,
  Name,
  PlayerVidMain,
  PlayerViewSmall,
  TeamName,
  TransitionScreenLeft,
} from "./StreamViewMemos"
import {
  mainContainer,
  topLeftPlayer,
  topRightPlayer,
  bottomLeftPlayer,
  bottomRightPlayer,
  topLeftName,
  topRightName,
  bottomLeftName,
  bottomRightName,
} from "./StreamViewStyles"

const StreamView = () => {
  // redux
  const { streamOpen, logo, players, teams, viewing, leaderboardType, cam } =
    useSelector((store) => store.ui)
  const allTeams = useSelector((store) => store.entities.teams)
  const allUsers = useSelector((store) => store.entities.users)
  const { userId, streamerName, attributes, type } = useSelector(
    (store) => store.auth
  )
  const { connections, myVideo, vidTransceivers } = useContext(StreamContext)
  // state
  const [currentTeam, setCurrentTeam] = useState(null) // list of players
  const [currentPlayer, setCurrentPlayer] = useState(null) // one player
  const [toggle, setToggle] = useState(false)
  const [loading, setLoading] = useState("slide-in-out-left")
  const [leaderboardDelay, setLeaderboardDelay] = useState(leaderboardType)
  const [currentTeamName, setCurrentTeamName] = useState(null)
  // player cams
  const topLeft = useRef()
  const topRight = useRef()
  const bottomLeft = useRef()
  const bottomRight = useRef()
  const playerMain = useRef()
  // host cams
  const hostMain = useRef()
  const hostSmall = useRef()

  // set host cam
  useEffect(() => {
    if (!hostMain.current) return
    hostMain.current.srcObject = myVideo
    if (!hostSmall.current) return
    hostSmall.current.srcObject = myVideo
  }, [hostMain, myVideo, streamOpen, hostSmall])

  // set player cams
  useEffect(() => {
    if (!viewing) {
      setToggle(!toggle)
      setCurrentPlayer(null)
      setCurrentTeam(null)
      return
    }
    if (viewing === "leaderboard") {
      setCurrentPlayer(null)
      setCurrentTeam(null)
      return
    }
    if (!playerMain.current) return
    if (
      !topLeft.current ||
      !topRight.current ||
      !bottomLeft.current ||
      !bottomRight.current
    ) {
      return
    }

    let viewArr = Object.entries(viewing)
    if (viewArr.length > 1) {
      Object.entries(viewing).forEach(([key, val], ind) => {
        if (val.isConnected) {
          if (ind === 0) {
            topLeft.current.srcObject = new MediaStream([
              vidTransceivers[key].receiver.track,
            ])
          }
          if (ind === 1) {
            topRight.current.srcObject = new MediaStream([
              vidTransceivers[key].receiver.track,
            ])
          }
          if (ind === 2) {
            bottomLeft.current.srcObject = new MediaStream([
              vidTransceivers[key].receiver.track,
            ])
          }
          if (ind === 3) {
            bottomRight.current.srcObject = new MediaStream([
              vidTransceivers[key].receiver.track,
            ])
          }
        }
      })
      if (
        viewArr.reduce((agg, [key, val]) => {
          return agg && val.isConnected
        }, true)
      ) {
        let t
        Object.entries(allTeams).forEach(([key, val]) => {
          if (val.players.includes(viewArr[0][0])) {
            t = key
          }
        })
        setCurrentTeam(Object.keys(viewing).map((key) => allUsers[key]))
        setCurrentTeamName(t)
        setCurrentPlayer(null)
        setToggle(!toggle)
      }
    } else {
      if (viewArr[0].length > 1 && viewArr[0][1].isConnected) {
        playerMain.current.srcObject = new MediaStream([
          vidTransceivers[viewArr[0][0]].receiver.track,
        ])
        let t
        Object.entries(allTeams).forEach(([key, val]) => {
          if (val.players.includes(viewArr[0][0])) {
            t = key
          }
        })
        setCurrentTeamName(t)
        setCurrentPlayer(allUsers[viewArr[0][0]])
        setCurrentTeam(null)
        setToggle(!toggle)
      }
    }
  }, [
    viewing,
    playerMain,
    topLeft,
    topRight,
    bottomLeft,
    bottomRight,
    allUsers,
    allTeams,
    connections,
  ])

  useEffect(() => {
    if (viewing === "leaderboard") {
      setToggle(!toggle)
    }
    setTimeout(() => setLeaderboardDelay(leaderboardType), 1000)
  }, [leaderboardType])

  useEffect(() => {
    if (toggle) {
      if (!viewing) {
        setLoading("slide-in-out-left")
      } else if (viewing === "leaderboard") {
        setLoading("slide-in-out-top")
      } else {
        setLoading("slide-in-out-right")
      }
    } else {
      if (!viewing) {
        setLoading("slide-in-out-left-copy")
      } else if (viewing === "leaderboard") {
        setLoading("slide-in-out-top-copy")
      } else {
        setLoading("slide-in-out-right-copy")
      }
    }
  }, [toggle])

  const TransitionScreenMemo = useMemo(() => {
    return <TransitionScreenLeft />
  }, [hostMain])

  const HostMainMemo = useMemo(() => {
    return <HostMain Fref={hostMain} />
  }, [hostMain, myVideo, streamOpen])

  const HostSmallMemo = useMemo(() => {
    return <HostSmall Fref={hostSmall} />
  }, [hostSmall, myVideo, streamOpen])

  const LogoTopMemo = useMemo(() => {
    return <LogoTop />
  }, [])

  const LogoBottomMemo = useMemo(() => {
    return <LogoBottom />
  }, [])

  const PlayerMainVidMemo = useMemo(() => {
    return <PlayerVidMain Fref={playerMain} />
  }, [playerMain])

  const PlayerTopLeftMemo = useMemo(() => {
    return <PlayerViewSmall styles={topLeftPlayer} Fref={topLeft} />
  }, [topLeft])
  const PlayerTopRightMemo = useMemo(() => {
    return <PlayerViewSmall styles={topRightPlayer} Fref={topRight} />
  }, [topRight])
  const PlayerBottomLeftMemo = useMemo(() => {
    return <PlayerViewSmall styles={bottomLeftPlayer} Fref={bottomLeft} />
  }, [bottomLeft])
  const PlayerBottomRightMemo = useMemo(() => {
    return <PlayerViewSmall styles={bottomRightPlayer} Fref={bottomRight} />
  }, [bottomRight])

  const NameSingle = useMemo(() => {
    return (
      <Name
        styles={topLeftName}
        player={currentPlayer ? currentPlayer : null}
      />
    )
  }, [currentPlayer])

  const NameTopLeft = useMemo(() => {
    return (
      <Name
        styles={topLeftName}
        player={currentTeam && currentTeam.length > 0 ? currentTeam[0] : null}
      />
    )
  }, [currentTeam])
  const NameTopRight = useMemo(() => {
    return (
      <Name
        styles={topRightName}
        player={currentTeam && currentTeam.length > 1 ? currentTeam[1] : null}
      />
    )
  }, [currentTeam])
  const NameBottomLeft = useMemo(() => {
    return (
      <Name
        styles={bottomLeftName}
        player={currentTeam && currentTeam.length > 2 ? currentTeam[2] : null}
      />
    )
  }, [currentTeam])
  const NameBottomRight = useMemo(() => {
    return (
      <Name
        styles={bottomRightName}
        player={currentTeam && currentTeam.length > 3 ? currentTeam[3] : null}
      />
    )
  }, [currentTeam])

  const TeamNameMemo = useMemo(() => {
    return <TeamName team={currentTeamName} />
  }, [viewing, currentPlayer, currentTeam])

  // leaderboard
  const sortPlayers = (players, myId, myName, myAttrs, myType) => {
    // object with attribues that we want to sort based on
    let attrArr = Object.entries(players).map(([key, val]) => ({
      id: key,
      name: val.streamerName,
      ...val.attributes,
    }))
    attrArr = attrArr.filter((player) => player.name !== "")
    if (myType !== "host") {
      attrArr = attrArr.concat({ id: myId, name: myName, ...myAttrs })
    }
    if (attrArr.length > 0) {
      attrArr.sort((a, b) => b.kills + b.placement - a.kills - a.placement)
      return attrArr
    } else return []
  }

  const sortTeams = (teams, myId, myName, myAttrs) => {
    let teamsArr = Object.entries(teams)
      .filter((x) => allUsers.hasOwnProperty(x))
      .map(([key, val]) => ({
        name: key,
        players: val.players.map((player) =>
          myId === player
            ? { id: myId, name: myName, ...myAttrs }
            : {
                id: allUsers[player],
                name: allUsers[player].streamerName,
                ...allUsers[player].attributes,
              }
        ),
      }))
    if (teamsArr.length > 0) {
      teamsArr.sort(
        (a, b) =>
          a.players.reduce((acc, obj) => {
            return acc + obj.kills + obj.placement
          }, 0) +
          b.players.reduce((acc, obj) => {
            return acc + obj.kills + obj.placement
          }, 0)
      )
      return teamsArr
    } else return []
  }

  const sortedPlayers = useMemo(
    () => sortPlayers(allUsers, userId, streamerName, attributes, type),
    [allUsers, userId, streamerName, type]
  )
  const sortedTeams = useMemo(
    () =>
      sortTeams(allTeams, userId, streamerName, attributes).map((team) => ({
        ...team,
        ...team.players.reduce(
          (agg, obj) => {
            agg.kills = agg.kills + obj.kills
            agg.placement = agg.placement + obj.placement
            return agg
          },
          { kills: 0, placement: 0 }
        ),
      })),
    [teams, allUsers, leaderboardDelay]
  )

  const LeaderboardMemo = useMemo(() => {
    return (
      <Leaderboard
        players={sortedPlayers}
        teams={sortedTeams}
        type={leaderboardDelay}
      />
    )
  }, [sortedPlayers, sortedTeams, leaderboardDelay])

  return (
    <>
      {streamOpen && (
        <StreamerScreen>
          <div style={mainContainer}>
            <div
              id="host-main"
              className={viewing === null ? "slide-in-left" : "slide-out-left"}
            >
              {HostMainMemo}
            </div>
            <div
              id="vid-top-left"
              className={
                currentTeam && viewing !== "leaderboard"
                  ? "slide-in-right"
                  : "slide-out-right"
              }
            >
              {PlayerTopLeftMemo}
            </div>
            <div
              id="vid-top-right"
              className={
                currentTeam && viewing !== "leaderboard"
                  ? "slide-in-right"
                  : "slide-out-right"
              }
            >
              {PlayerTopRightMemo}
            </div>
            <div
              id="vid-bottom-left"
              className={
                currentTeam && viewing !== "leaderboard"
                  ? "slide-in-right"
                  : "slide-out-right"
              }
            >
              {PlayerBottomLeftMemo}
            </div>
            <div
              id="vid-bottom-right"
              className={
                currentTeam && viewing !== "leaderboard"
                  ? "slide-in-right"
                  : "slide-out-right"
              }
            >
              {PlayerBottomRightMemo}
            </div>
            <div
              id="vid-main"
              className={
                currentPlayer && viewing !== "leaderboard"
                  ? "slide-in-right"
                  : "slide-out-right"
              }
            >
              {PlayerMainVidMemo}
            </div>{" "}
            <div
              id="leaderboard"
              className={
                viewing === "leaderboard"
                  ? "top-in-leaderboard"
                  : "top-out-leaderboard"
              }
            >
              {LeaderboardMemo}
            </div>
            <div
              id="host-small"
              className={cam && viewing ? "slide-in-left" : "slide-out-left"}
            >
              {HostSmallMemo}
            </div>
            <div
              id="team-name"
              className={teams && viewing ? "top-in-down" : "top-out-up"}
            >
              {TeamNameMemo}
            </div>
            <div
              id="logo-top"
              className={logo === "top" ? "top-in-down" : "top-out-up"}
            >
              {LogoTopMemo}
            </div>
            <div
              id="logo-bottom"
              className={logo === "bottom" ? "bottom-in-up" : "bottom-out-down"}
            >
              {LogoBottomMemo}
            </div>
            <div
              id="name-single"
              className={
                players && currentPlayer && viewing !== "leaderboard"
                  ? "top-in-down"
                  : "top-out-up"
              }
            >
              {NameSingle}
            </div>
            <div
              id="name-top-left"
              className={
                players && currentTeam && viewing !== "leaderboard"
                  ? "top-in-down"
                  : "top-out-up"
              }
            >
              {NameTopLeft}
            </div>
            <div
              id="name-top-right"
              className={
                players && currentTeam && viewing !== "leaderboard"
                  ? "top-in-down"
                  : "top-out-up"
              }
            >
              {NameTopRight}
            </div>
            <div
              id="name-bottom-left"
              className={
                players && currentTeam && viewing !== "leaderboard"
                  ? "bottom-in-up"
                  : "bottom-out-down"
              }
            >
              {NameBottomLeft}
            </div>
            <div
              id="name-bottom-right"
              className={
                players && currentTeam && viewing !== "leaderboard"
                  ? "bottom-in-up"
                  : "bottom-out-down"
              }
            >
              {NameBottomRight}
            </div>
            <div id="loading-screen" className={loading}>
              {TransitionScreenMemo}
            </div>
          </div>
        </StreamerScreen>
      )}
    </>
  )
}

export default StreamView
