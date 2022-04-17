import React from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { UIContainerSubTitle } from "../../styles/styleGlobalComponents"
import { uiActions } from "../../store/uiSlice"
import Button from "../Button/Button"

const StreamOptionRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const StreamOptions = () => {
  const { streamOpen, cam, players, teams, logo } = useSelector(
    (store) => store.ui
  )
  const dispatch = useDispatch()

  // set streamOpen
  const toggleStreamOpen = () => {
    dispatch(uiActions.showStream())
  }
  // set cam
  const toggleCam = () => {
    dispatch(uiActions.showCam())
  }
  // set players
  const setPlayersNone = () => {
    dispatch(uiActions.setPlayers({ players: null }))
  }
  const setPlayersName = () => {
    dispatch(uiActions.setPlayers({ players: "name" }))
  }
  const setPlayersStats = () => {
    dispatch(uiActions.setPlayers({ players: "stats" }))
  }
  // set teams
  const setTeamsNone = () => {
    dispatch(uiActions.setTeams({ teams: null }))
  }
  const setTeamsName = () => {
    dispatch(uiActions.setTeams({ teams: "name" }))
  }
  const setTeamsStats = () => {
    dispatch(uiActions.setTeams({ teams: "stats" }))
  }
  // set logo
  const setLogoNone = () => {
    dispatch(uiActions.setLogo({ logo: null }))
  }
  const setLogoTop = () => {
    dispatch(uiActions.setLogo({ logo: "top" }))
  }
  const setLogoBottom = () => {
    dispatch(uiActions.setLogo({ logo: "bottom" }))
  }
  const setLogoRight = () => {
    dispatch(uiActions.setLogo({ logo: "right" }))
  }

  return (
    <>
      <StreamOptionRow>
        <UIContainerSubTitle>Open Stream:</UIContainerSubTitle>
        <Button handle={toggleStreamOpen}>stream window</Button>
      </StreamOptionRow>
      <StreamOptionRow>
        <UIContainerSubTitle>Show Cam:</UIContainerSubTitle>
        <Button handle={toggleCam} track={cam}>
          host camera
        </Button>
      </StreamOptionRow>
      <StreamOptionRow>
        <UIContainerSubTitle>Show Players:</UIContainerSubTitle>
        <Button handle={setPlayersNone} track={!players}>
          None
        </Button>
        <Button handle={setPlayersName} track={players === "name"}>
          Name
        </Button>
      </StreamOptionRow>
      <StreamOptionRow>
        <UIContainerSubTitle>Show Team:</UIContainerSubTitle>
        <Button handle={setTeamsNone} track={!teams}>
          none
        </Button>
        <Button handle={setTeamsName} track={teams === "name"}>
          name
        </Button>
      </StreamOptionRow>
      <StreamOptionRow>
        <UIContainerSubTitle>Show Logo:</UIContainerSubTitle>
        <Button handle={setLogoNone} track={!logo}>
          none
        </Button>
        <Button handle={setLogoTop} track={logo === "top"}>
          top
        </Button>
        <Button handle={setLogoBottom} track={logo === "bottom"}>
          bottom
        </Button>
      </StreamOptionRow>
    </>
  )
}

export default StreamOptions
