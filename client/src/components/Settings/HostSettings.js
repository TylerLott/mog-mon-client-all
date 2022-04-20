import React, { useState, useContext, useEffect } from "react"
import {
  SettingsForm,
  SettingsFormContainer,
  SettingsFrozen,
  SettingsFrozenIconContainer,
  SettingsFrozenIconTitle,
  SettingsFrozenRowIcon,
  SettingsInputButton,
  SettingsInputButtonContainer,
} from "./SettingsComponents"
import SettingsIcon from "@mui/icons-material/Settings"
import { useDispatch, useSelector } from "react-redux"
import { authActions } from "../../store/authSlice"
import { StreamContext } from "../../context/newStreamContext"
import Button from "../Button/Button"
import { CircleBool } from "../Icons/Icons"
import {
  UIContainer,
  UIContainerTitle,
  UIContainerTop,
} from "../../styles/styleGlobalComponents"
import { entitiesActions } from "../../store/entitiesSlice"

const HostSettings = () => {
  const [editable, setEditable] = useState(true)
  const { myAudio, myVideo } = useSelector((store) => store.auth)
  const dispatch = useDispatch()
  const { setMyAudio, setMyVideo } = useContext(StreamContext)

  // Functions
  const handleSubmit = (e) => {
    e.preventDefault()
    setEditable(!editable)
    dispatch(authActions.startConnecting())
  }

  const handleVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          width: 1920,
          height: 1080,
          frameRate: 30,
          aspectRatio: 1.333333,
        },
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
            <Button
              type="button"
              buttonType="bool"
              track={myVideo}
              handle={handleVideo}
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

export default HostSettings
