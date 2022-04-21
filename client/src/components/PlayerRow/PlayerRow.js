import React from "react"
import {
  PlayerRowContainer,
  PlayerRowName,
  PlayerRowOptions,
  PlayerRowOptionsButton,
  PlayerRowStats,
} from "./PlayerRowComponents"
import HearingIcon from "@mui/icons-material/Hearing"
import HearingDisabledIcon from "@mui/icons-material/HearingDisabled"
import MicIcon from "@mui/icons-material/Mic"
import MicOffIcon from "@mui/icons-material/MicOff"
import DesktopWindowsIcon from "@mui/icons-material/DesktopWindows"
import DesktopAccessDisabledIcon from "@mui/icons-material/DesktopAccessDisabled"
import { useDispatch, useSelector } from "react-redux"
import { uiActions } from "../../store/uiSlice"

const PlayerRow = ({ player, leaderboard = false }) => {
  const { type, userId, streamerName } = useSelector((store) => store.auth)
  const { users } = useSelector((store) => store.entities)
  const { viewing, listening, speaking } = useSelector((store) => store.ui)
  const dispatch = useDispatch()

  const handleViewing = () => {
    let play = { [player]: { isConnected: true } }
    if (JSON.stringify(viewing) !== JSON.stringify(play)) {
      dispatch(
        uiActions.setViewing({
          viewing: play,
        })
      )
      dispatch(
        uiActions.sendMeVideo({
          senderId: userId,
          receiverId: player,
        })
      )
    } else {
      dispatch(
        uiActions.setViewing({
          viewing: null,
        })
      )
    }
  }
  const handleListening = () => {
    dispatch(
      uiActions.setListening({
        listening: listening !== player ? player : null,
      })
    )
  }
  const handleSpeaking = () => {
    dispatch(
      uiActions.setSpeaking({ speaking: speaking !== player ? player : null })
    )
  }

  return (
    <PlayerRowContainer>
      <PlayerRowName>
        {users && Object.keys(users).includes(player)
          ? users[player].streamerName
          : streamerName}
      </PlayerRowName>
      {!leaderboard && (
        <PlayerRowOptions>
          {type === "host" && (
            <>
              <PlayerRowOptionsButton onClick={handleListening}>
                {listening && (
                  <HearingIcon
                    style={{ fontSize: "140%", transform: "scaleX(-1)" }}
                  />
                )}
                {!listening && (
                  <HearingDisabledIcon style={{ fontSize: "140%" }} />
                )}
              </PlayerRowOptionsButton>
              <PlayerRowOptionsButton onClick={handleSpeaking}>
                {speaking === player && (
                  <MicIcon style={{ fontSize: "140%" }} />
                )}
                {speaking !== player && (
                  <MicOffIcon style={{ fontSize: "140%" }} />
                )}
              </PlayerRowOptionsButton>
              <PlayerRowOptionsButton onClick={handleViewing}>
                {JSON.stringify(viewing) ===
                  JSON.stringify({ [player]: { isConnected: true } }) && (
                  <DesktopWindowsIcon style={{ fontSize: "140%" }} />
                )}
                {JSON.stringify(viewing) !==
                  JSON.stringify({ [player]: { isConnected: true } }) && (
                  <DesktopAccessDisabledIcon style={{ fontSize: "140%" }} />
                )}
              </PlayerRowOptionsButton>
            </>
          )}
        </PlayerRowOptions>
      )}
      {leaderboard && (
        <PlayerRowStats>
          <h2>stat</h2>
        </PlayerRowStats>
      )}
    </PlayerRowContainer>
  )
}

export default PlayerRow
