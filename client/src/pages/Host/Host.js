import React from "react"
import Leaderboard from "../../components/Leaderboard/Leaderboard"
import LogoutButton from "../../components/LogoutButton/LogoutButton"
import HostSettings from "../../components/Settings/HostSettings"
import TeamContainer from "../../components/TeamContainer/TeamContainer"
import TopLogo from "../../components/TopLogo/TopLogo"

import { useSelector } from "react-redux"
import BlankContainer from "../../components/BlankContainer/BlankContainer"
import StreamOptions from "../../components/StreamOptions/StreamOptions"
import StreamView from "../../components/StreamView/StreamView"
import { PageContainer } from "../../styles/styleGlobalComponents"
import SoundOptions from "../../components/SoundOptions/SoundOptions"

const Host = () => {
  // Redux stuff
  const isConnected = useSelector((store) => store.auth.isConnected)

  return (
    <PageContainer>
      <TopLogo />
      <div>
        <LogoutButton />
      </div>
      <HostSettings />
      {isConnected && (
        <>
          <BlankContainer title="Sound Options">
            <SoundOptions />
          </BlankContainer>
          <BlankContainer title="Stream Options">
            <StreamOptions />
            <StreamView />
          </BlankContainer>
          <TeamContainer />
          <Leaderboard />
        </>
      )}
    </PageContainer>
  )
}

export default Host
