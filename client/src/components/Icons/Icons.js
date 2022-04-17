import React from "react"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"
import HighlightOffIcon from "@mui/icons-material/HighlightOff"
import * as COLORS from "../../styles/colors"
import MicIcon from "@mui/icons-material/Mic"
import MicOffIcon from "@mui/icons-material/MicOff"
import HearingIcon from "@mui/icons-material/Hearing"
import HearingDisabledIcon from "@mui/icons-material/HearingDisabled"
export const CircleBool = (track = false) => {
  return (
    <>
      {track && (
        <CheckCircleOutlineIcon
          style={{
            color: COLORS.BUTTON_GREEN,
            fontSize: "250%",
          }}
        />
      )}
      {!track && (
        <HighlightOffIcon
          style={{
            color: COLORS.BUTTON_RED,
            fontSize: "250%",
          }}
        />
      )}
    </>
  )
}

export const MuteIcon = ({ track = false }) => {
  return (
    <>
      {track && <MicIcon style={{ fontSize: "120%" }} />}
      {!track && <MicOffIcon style={{ fontSize: "120%" }} />}
    </>
  )
}

export const DeafenIcon = ({ track = false }) => {
  return (
    <>
      {track && (
        <HearingIcon style={{ fontSize: "120%", transform: "scaleX(-1)" }} />
      )}
      {!track && <HearingDisabledIcon style={{ fontSize: "120%" }} />}
    </>
  )
}
