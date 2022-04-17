import React from "react"
import { ReactComponent as TopSVG } from "../../icons/mogulMondays.svg"
import { TopLogoContainer } from "./TopLogoComponents"

const TopLogo = () => {
  return (
    <TopLogoContainer>
      {/* <TopSVG /> */}
      <img
        src="/daddyscummies/lud-twitter.png"
        alt="top"
        style={{ width: "100%" }}
      />
    </TopLogoContainer>
  )
}

export default TopLogo
