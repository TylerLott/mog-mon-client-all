import React from "react"
import PlayerRow from "../PlayerRow/PlayerRow"
import { PlayerListContainer } from "./PlayerContainerComponents"

const PlayerContainer = ({ visible, players }) => {
  return (
    <>
      {visible && (
        <PlayerListContainer>
          {players &&
            players.map((player) => <PlayerRow key={player} player={player} />)}
        </PlayerListContainer>
      )}
    </>
  )
}

export default PlayerContainer
