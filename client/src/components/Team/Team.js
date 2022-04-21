import React, { useState } from "react"
import PlayerContainer from "../PlayerContainer/PlayerContainer"
import {
  TeamButton,
  TeamButtonContainer,
  TeamDropdownButton,
  TeamName,
  TeamNameContainer,
  TeamRow,
} from "./TeamComponents"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import HearingIcon from "@mui/icons-material/Hearing"
import HearingDisabledIcon from "@mui/icons-material/HearingDisabled"
import LoginIcon from "@mui/icons-material/Login"
import LogoutIcon from "@mui/icons-material/Logout"
import MicIcon from "@mui/icons-material/Mic"
import MicOffIcon from "@mui/icons-material/MicOff"
import DesktopWindowsIcon from "@mui/icons-material/DesktopWindows"
import DesktopAccessDisabledIcon from "@mui/icons-material/DesktopAccessDisabled"
import DeleteIcon from "@mui/icons-material/Delete"
import { useDispatch, useSelector } from "react-redux"
import { uiActions } from "../../store/uiSlice"
import { entitiesActions } from "../../store/entitiesSlice"

const Team = ({ name, team }) => {
  const [dropdown, setDropdown] = useState(false)
  const [myTeam, setMyTeam] = useState({})
  const { type, userId } = useSelector((store) => store.auth)
  const { listening, viewing, speaking, teamname } = useSelector(
    (store) => store.ui
  )
  const { teams } = useSelector((store) => store.entities)
  const dispatch = useDispatch()

  const handleView = () => {
    let view = teams[name].players.reduce(
      (agg, player) => ({ ...agg, [player]: { isConnected: true } }),
      {}
    )
    if (JSON.stringify(viewing) !== JSON.stringify(view)) {
      setMyTeam(view)
      dispatch(
        uiActions.setViewing({
          viewing: view,
        })
      )
      Object.keys(view).forEach((key) => {
        dispatch(
          uiActions.sendMeVideo({
            senderId: userId,
            receiverId: key,
          })
        )
      })
    } else {
      setMyTeam({})
      dispatch(
        uiActions.setViewing({
          viewing: null,
        })
      )
    }
  }

  const handleListen = () => {
    dispatch(
      uiActions.setListening({ listening: listening !== name ? name : null })
    )
  }

  const handleSpeak = () => {
    dispatch(
      uiActions.setSpeaking({ speaking: speaking !== name ? name : null })
    )
  }

  const handleDelete = () => {
    if (window.confirm("Are you sure you would like to delete this team?")) {
      dispatch(
        entitiesActions.submitDeleteTeam({
          name: name,
        })
      )
      dispatch(uiActions.setTeamname({ teamname: null }))
    }
  }

  const handleJoin = () => {
    if (teamname) {
      dispatch(uiActions.setTeamname({ teamname: null }))
      let newPlayers = team.players.map((x) => x)
      const ind = team.players.indexOf(userId)
      if (ind > -1) {
        newPlayers.splice(ind, 1)
      }
      dispatch(
        entitiesActions.submitUpdateTeam({
          name: name,
          createdBy: team.createdBy,
          players: newPlayers,
        })
      )
    } else {
      dispatch(uiActions.setTeamname({ teamname: name }))
      dispatch(
        entitiesActions.submitUpdateTeam({
          name: name,
          createdBy: team.createdBy,
          players: team.players.concat(userId),
        })
      )
    }
  }

  // if player -> show:
  //     - join team (if not on a team)
  //     - leave team (if part of the team)
  //     - delete team (if they created)
  //     - dropdown with no player options

  return (
    <div>
      <TeamRow>
        <TeamNameContainer onClick={() => setDropdown(!dropdown)}>
          <TeamDropdownButton>
            {!dropdown && <KeyboardArrowUpIcon />}
            {dropdown && <KeyboardArrowDownIcon />}
          </TeamDropdownButton>
          <TeamName>
            {team.players.length} - {name}
          </TeamName>
        </TeamNameContainer>
        <TeamButtonContainer>
          {type === "host" && (
            <>
              <TeamButton onClick={handleListen}>
                {listening === name && <HearingIcon />}
                {listening !== name && (
                  <HearingDisabledIcon style={{ transform: "scaleX(-1)" }} />
                )}
              </TeamButton>
              <TeamButton onClick={handleSpeak}>
                {speaking === name && <MicIcon />}
                {speaking !== name && <MicOffIcon />}
              </TeamButton>
              <TeamButton onClick={handleView}>
                {JSON.stringify(viewing) === JSON.stringify(myTeam) && (
                  <DesktopWindowsIcon />
                )}
                {JSON.stringify(viewing) !== JSON.stringify(myTeam) && (
                  <DesktopAccessDisabledIcon />
                )}
              </TeamButton>
            </>
          )}
          {type !== "host" && (
            <TeamButton onClick={handleJoin}>
              {teamname !== name && <LoginIcon />}
              {teamname === name && <LogoutIcon />}
            </TeamButton>
          )}
          {(userId === team.createdBy || type === "host") && (
            <TeamButton onClick={handleDelete}>
              <DeleteIcon />
            </TeamButton>
          )}
        </TeamButtonContainer>
      </TeamRow>
      <PlayerContainer visible={dropdown} players={team.players} />
    </div>
  )
}

export default Team
