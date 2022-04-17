import React, { useState, useContext, useEffect } from "react"
import {
  SettingsForm,
  SettingsFormContainer,
  SettingsFormRow,
  SettingsFrozen,
  SettingsFrozenField,
  SettingsFrozenIconContainer,
  SettingsFrozenIconTitle,
  SettingsFrozenLabel,
  SettingsFrozenRow,
  SettingsFrozenRowIcon,
  SettingsInput,
  SettingsInputButton,
  SettingsInputButtonContainer,
  SettingsLabel,
} from "./SettingsComponents"
import Button from "../Button/Button"
import { CircleBool } from "../Icons/Icons"
import SettingsIcon from "@mui/icons-material/Settings"
import { useDispatch, useSelector } from "react-redux"
import { authActions } from "../../store/authSlice"
import { StreamContext } from "../../context/StreamContext"
import {
  UIContainer,
  UIContainerTitle,
  UIContainerTop,
} from "../../styles/styleGlobalComponents"

let VIDEO_SETTINGS = {
  width: { ideal: 1280, max: 1920 },
  height: { ideal: 720, max: 1080 },
  frameRate: { ideal: 50, max: 60 },
  aspectRatio: 1.333333,
}

if (process.env.NODE_ENV !== "production") {
  VIDEO_SETTINGS = {
    width: { idea: 320, max: 320 },
    height: { ideal: 180, max: 180 },
    frameRate: { ideal: 10, max: 10 },
    aspectRatio: 1.333333,
  }
}

const Settings = () => {
  const [editable, setEditable] = useState(true)
  const [streamerNameInput, setStreamerNameInput] = useState("")
  const [gameNameInput, setGameNameInput] = useState("")
  const { myAudio, myVideo, streamerName, gameName, userId, isConnected } =
    useSelector((store) => store.auth)
  const dispatch = useDispatch()
  const { setMyVideo, setMyAudio } = useContext(StreamContext)

  // Functions
  const handleSubmit = (e) => {
    e.preventDefault()
    if (streamerNameInput === "" || gameNameInput === "") {
      window.alert("Names cannot be empty")
    } else {
      setEditable(!editable)

      if (!isConnected) {
        dispatch(authActions.startConnecting())
      }

      dispatch(
        authActions.setName({
          playerId: userId,
          streamerName: streamerNameInput,
          gameName: gameNameInput,
        })
      )
    }
  }

  const handleScreen = () => {
    navigator.mediaDevices
      .getDisplayMedia({
        video: VIDEO_SETTINGS,
        audio: false,
      })
      .then((stream) => {
        stream.getVideoTracks()[0].onended = () => {
          dispatch(authActions.setVideo({ videoStream: null }))
        }
        dispatch(authActions.setVideo({ myVideo: stream.id }))
        setMyVideo(stream)
      })
  }

  const handleAudio = () => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      stream.getAudioTracks()[0].onended = () =>
        dispatch(authActions.setAudio(null))
      dispatch(authActions.setAudio({ myAudio: stream.id }))
      setMyAudio(stream)
    })
  }

  useEffect(() => {
    dispatch(
      authActions.setName({
        playerId: userId,
        streamerName: streamerName,
        gameName: gameName,
      })
    )
  }, [isConnected])

  return (
    <UIContainer>
      <UIContainerTop>
        <UIContainerTitle>Settings</UIContainerTitle>
        {!editable && (
          <SettingsIcon
            onClick={() => setEditable(!editable)}
            style={{ color: "white", fontSize: "250%", margin: 0, padding: 0 }}
          />
        )}
      </UIContainerTop>

      {editable && (
        <SettingsFormContainer>
          <SettingsForm onSubmit={handleSubmit}>
            <SettingsFormRow>
              <SettingsLabel>Streamer Name:</SettingsLabel>
              <SettingsInput
                type="text"
                value={streamerNameInput}
                onChange={(i) => setStreamerNameInput(i.target.value)}
              />
            </SettingsFormRow>
            <SettingsFormRow>
              <SettingsLabel>Game Name:</SettingsLabel>
              <SettingsInput
                type="text"
                value={gameNameInput}
                onChange={(i) => setGameNameInput(i.target.value)}
              />
            </SettingsFormRow>
            <Button
              type="button"
              buttonType="bool"
              track={myVideo}
              handle={handleScreen}
            >
              Add Video
            </Button>
            <Button
              type="button"
              buttonType="bool"
              track={myAudio}
              handle={handleAudio}
            >
              Add Audio
            </Button>
            <SettingsInputButtonContainer>
              <SettingsInputButton
                type="submit"
                value="Save"
                disabled={!myAudio || !myVideo}
              />
            </SettingsInputButtonContainer>
          </SettingsForm>
        </SettingsFormContainer>
      )}
      {!editable && (
        <SettingsFrozen>
          <SettingsFrozenRow>
            <SettingsFrozenLabel>streamer name:</SettingsFrozenLabel>
            <SettingsFrozenField>{streamerName}</SettingsFrozenField>
          </SettingsFrozenRow>
          <SettingsFrozenRow>
            <SettingsFrozenLabel>game name:</SettingsFrozenLabel>
            <SettingsFrozenField>{gameName}</SettingsFrozenField>
          </SettingsFrozenRow>
          <SettingsFrozenRowIcon>
            <SettingsFrozenIconContainer>
              <CircleBool track={myVideo} />
              <SettingsFrozenIconTitle>Video</SettingsFrozenIconTitle>
            </SettingsFrozenIconContainer>
            <SettingsFrozenIconContainer>
              <CircleBool track={myAudio} />
              <SettingsFrozenIconTitle>Audio</SettingsFrozenIconTitle>
            </SettingsFrozenIconContainer>
          </SettingsFrozenRowIcon>
        </SettingsFrozen>
      )}
    </UIContainer>
  )
}

export default Settings
