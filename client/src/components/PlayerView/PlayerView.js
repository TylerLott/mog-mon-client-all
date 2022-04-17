import React from "react"
import { ReactComponent as TopSVG } from "../../icons/mogulMondays.svg"

const PlayerView = ({ hostRef, showHost, playerRef, player, team }) => {
  // const players = {
  //   player1: {
  //     name: "",
  //   },
  //   player2: {
  //     name: "",
  //   },
  //   player3: {
  //     name: "",
  //   },
  //   player4: {
  //     name: "",
  //   },
  // }

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div
        style={{
          position: "absolute",
          padding: "1% 2% 0.5% 2%",
          left: "41.7%",
          width: "12%",
          borderRadius: "0 0 10px 10px",
          backgroundColor: "black",
          zIndex: 2,
        }}
      >
        <TopSVG />
      </div>
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          backgroundColor: "gray",
          padding: "1%",
          borderRadius: "0 0 10px 0",
        }}
      >
        teamName: rank
      </div>
      <div
        style={{
          position: "absolute",
          top: "90%",
          backgroundColor: "gray",
          padding: "0.5% 1% 0.5% 2%",
          borderRadius: "0 10px 10px 0",
        }}
      >
        player1
      </div>
      {showHost && (
        <video
          ref={hostRef}
          style={{
            position: "absolute",
            height: "11.25vw",
            width: "20vw",
            zIndex: 2,
            top: "40%",
          }}
          muted
          autoPlay
          playsInline
        />
      )}
      <video
        ref={playerRef}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          left: "0",
          top: "0",
        }}
        muted
        autoPlay
        playsInline
      />
    </div>
  )
}

export default PlayerView
