import React from "react"
import Leaderboard from "../../components/Leaderboard/Leaderboard"
import LogoutButton from "../../components/LogoutButton/LogoutButton"
import Settings from "../../components/Settings/Settings"
import TeamContainer from "../../components/TeamContainer/TeamContainer"
import TopLogo from "../../components/TopLogo/TopLogo"
import { PlayerButtonContainer } from "./PlayerComponents"
import { useSelector } from "react-redux"
import FileUpload from "../../components/FileUpload/FileUpload"
import BlankContainer from "../../components/BlankContainer/BlankContainer"
import { PageContainer } from "../../styles/styleGlobalComponents"
import SoundOptions from "../../components/SoundOptions/SoundOptions"

const Player = () => {
  const isConnected = useSelector((store) => store.auth.isConnected)

  return (
    <PageContainer>
      <TopLogo />
      <LogoutButton />
      <Settings />
      {isConnected && (
        <>
          <BlankContainer title="Sound Options">
            <SoundOptions />
          </BlankContainer>
          <PlayerButtonContainer></PlayerButtonContainer>
          <TeamContainer />
          <Leaderboard />
          <FileUpload />
        </>
      )}
    </PageContainer>
  )
}

export default Player
