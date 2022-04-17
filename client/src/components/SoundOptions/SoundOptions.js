import React from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { UIContainerSubTitle } from "../../styles/styleGlobalComponents"
import Button from "../Button/Button"
import { entitiesActions } from "../../store/entitiesSlice"
import { MuteIcon, DeafenIcon } from "../Icons/Icons"

const SoundOptionRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const SoundOptions = () => {
  const { deafen, myMute, remoteMute } = useSelector((store) => store.entities)
  const type = useSelector((store) => store.auth.type)
  const dispatch = useDispatch()

  const toggleMyMute = () => {
    dispatch(entitiesActions.changeMyMute())
  }

  const toggleRemoteMute = () => {
    dispatch(
      entitiesActions.changeRemoteMute({
        remoteMute: !remoteMute,
      })
    )
  }

  const toggleDeafen = () => {
    dispatch(entitiesActions.changeDeafen())
  }

  return (
    <>
      {type === "host" && (
        <SoundOptionRow>
          <UIContainerSubTitle>Open Mic:</UIContainerSubTitle>
          <Button handle={toggleRemoteMute} track={!remoteMute}>
            <MuteIcon track={!remoteMute} />
          </Button>
        </SoundOptionRow>
      )}
      <SoundOptionRow>
        <UIContainerSubTitle>Mute:</UIContainerSubTitle>
        <Button handle={toggleMyMute} track={!myMute}>
          <MuteIcon track={!myMute} />
        </Button>
      </SoundOptionRow>
      <SoundOptionRow>
        <UIContainerSubTitle>Deafen:</UIContainerSubTitle>
        <Button handle={toggleDeafen} track={!deafen}>
          <DeafenIcon track={!deafen} />
        </Button>
      </SoundOptionRow>
    </>
  )
}

export default SoundOptions
