import * as STYLES from "./StreamViewStyles"
import * as COLORS from "../../styles/colors"

export const HostMain = ({ Fref }) => {
  return (
    <video style={STYLES.hostMainContainer} ref={Fref} autoPlay muted={true} />
  )
}
export const HostSmall = ({ Fref }) => {
  return (
    <video style={STYLES.hostSmallContainer} ref={Fref} autoPlay muted={true} />
  )
}

export const TransitionScreenLeft = () => {
  return <div style={STYLES.loadingScreenStyleLeft}></div>
}

export const PlayerVidMain = ({ Fref }) => {
  return <video style={STYLES.singlePlayer} ref={Fref} autoPlay muted={true} />
}

export const PlayerViewSmall = ({ styles, Fref }) => {
  return <video style={styles} ref={Fref} autoPlay muted={true} />
}

export const Name = ({ player, styles }) => {
  return (
    <h2 style={styles}>
      {player && player.streamerName ? player.streamerName : ""}
    </h2>
  )
}

export const TeamName = ({ team }) => {
  return <h2 style={STYLES.teamName}>{team ? team : ""}</h2>
}

export const LogoTop = () => {
  return (
    <div style={STYLES.logoTopContainer}>
      <svg id="a" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320.5 107.53">
        <defs>
          <style>
            {
              ".b{fill:#ec008c;font-family:MVBoli, MV Boli;font-size:45px;}.c{letter-spacing:-.09em;}.d{fill:#fff;font-family:Roboto-Bold, Roboto;font-size:60px;}.e{letter-spacing:-.07em;}"
            }
          </style>
        </defs>
        <text class="d" transform="translate(59.29 66.33)">
          <tspan class="c" x="0" y="0">
            L
          </tspan>
          <tspan class="e" x="27.35" y="0">
            UDWIG
          </tspan>
        </text>
        <text class="b" transform="translate(40 92.23)">
          <tspan x="0" y="0">
            MONDAYS
          </tspan>
        </text>
      </svg>
    </div>
  )
}
export const LogoBottom = () => {
  return (
    <div style={STYLES.logoBottomContainer}>
      <svg id="a" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320.5 107.53">
        <defs>
          <style>
            {
              ".b{fill:#ec008c;font-family:MVBoli, MV Boli;font-size:45px;}.c{letter-spacing:-.09em;}.d{fill:#fff;font-family:Roboto-Bold, Roboto;font-size:60px;}.e{letter-spacing:-.07em;}"
            }
          </style>
        </defs>
        <text class="d" transform="translate(59.29 66.33)">
          <tspan class="c" x="0" y="0">
            L
          </tspan>
          <tspan class="e" x="27.35" y="0">
            UDWIG
          </tspan>
        </text>
        <text class="b" transform="translate(40 92.23)">
          <tspan x="0" y="0">
            MONDAYS
          </tspan>
        </text>
      </svg>
    </div>
  )
}

export const Leaderboard = ({ players, teams, type }) => {
  // false type = players, true type = teams
  // im defining styles here to make it easier to write
  // this is so gross, should be refactores ASAP
  const leaderboardLeft = {
    width: "45vw",
    height: "77vh",
    display: "block",
    paddingTop: "3vh",
    top: "16vh",
    left: "3vw",
    borderRadius: "2em",
    border: `3px solid ${COLORS.BACKGROUND_COLOR}`,
    backgroundColor: COLORS.LEADERBOARD_BACKGROUND,
  }
  const leaderboardRight = {
    width: "45vw",
    height: "77vh",
    display: "block",
    paddingTop: "3vh",
    top: "16vh",
    left: "52vw",
    borderRadius: "2em",
    border: `3px solid ${COLORS.BACKGROUND_COLOR}`,
    backgroundColor: COLORS.LEADERBOARD_BACKGROUND,
  }
  const leaderboardItem = {
    width: "40vw",
    borderBottom: "1px solid white",
    display: "block",
    height: "5vh",
    display: "grid",
    gridTemplateColumns: ".3fr 0.7fr 1fr 1fr 1fr",
    marginLeft: "2.5vw",
    marginRight: "2.5vw",
    alignItems: "center",
    color: "white",
    gap: "10px",
    fontFamily: "sans-serif",
  }
  const leaderboardPosition = {
    gridColumn: 1,
    gridRow: 1,
    justifySelf: "center",
    margin: 0,
    padding: 0,
  }
  const leaderboardName = {
    gridColumn: 2,
    gridRow: 1,
    margin: 0,
    padding: 0,
  }
  const leaderboardKill = {
    gridColumn: 3,
    gridRow: 1,
    justifySelf: "center",
    margin: 0,
    padding: 0,
  }
  const leaderboardPlacement = {
    gridColumn: 4,
    gridRow: 1,
    justifySelf: "center",
    margin: 0,
    padding: 0,
  }
  const leaderboardTotal = {
    gridColumn: 5,
    gridRow: 1,
    justifySelf: "center",
    paddingRight: "2vw",
    margin: 0,
    padding: 0,
  }
  const leftPlayers = players.slice(0, 13)
  const rightPlayers = players.slice(13, 26)
  const leftTeams = teams.slice(0, 13)
  const rightTeams = teams.slice(13, 26)

  return (
    <>
      {!type && (
        <>
          <div style={leaderboardLeft}>
            <span style={leaderboardItem}>
              <h3 style={leaderboardPosition}>#</h3>
              <h3 style={leaderboardName}>Name</h3>
              <h3 style={leaderboardKill}>Knockouts</h3>
              <h3 style={leaderboardPlacement}>Placement</h3>
              <h3 style={leaderboardTotal}>Total</h3>
            </span>
            <span style={leaderboardItem}>
              <h3 style={leaderboardPosition}>
                {leftPlayers.length > 0 ? 1 : ""}
              </h3>
              {leftPlayers.length > 0 && (
                <>
                  <h4 style={leaderboardName}>{leftPlayers[0].name}</h4>
                  <h4 style={leaderboardKill}>{leftPlayers[0].kills}</h4>
                  <h4 style={leaderboardPlacement}>
                    {leftPlayers[0].placement}
                  </h4>
                  <h4 style={leaderboardTotal}>
                    {leftPlayers[0].kills + leftPlayers[0].placement}
                  </h4>
                </>
              )}
            </span>
            <span style={leaderboardItem}>
              <h3 style={leaderboardPosition}>
                {leftPlayers.length > 1 ? 2 : ""}
              </h3>
              {leftPlayers.length > 1 && (
                <>
                  <h4 style={leaderboardName}>{leftPlayers[1].name}</h4>
                  <h4 style={leaderboardKill}>{leftPlayers[1].kills}</h4>
                  <h4 style={leaderboardPlacement}>
                    {leftPlayers[1].placement}
                  </h4>
                  <h4 style={leaderboardTotal}>
                    {leftPlayers[1].kills + leftPlayers[1].placement}
                  </h4>
                </>
              )}
            </span>{" "}
            <span style={leaderboardItem}>
              <h3 style={leaderboardPosition}>
                {leftPlayers.length > 2 ? 3 : ""}
              </h3>
              {leftPlayers.length > 2 && (
                <>
                  <h4 style={leaderboardName}>{leftPlayers[2].name}</h4>
                  <h4 style={leaderboardKill}>{leftPlayers[2].kills}</h4>
                  <h4 style={leaderboardPlacement}>
                    {leftPlayers[2].placement}
                  </h4>
                  <h4 style={leaderboardTotal}>
                    {leftPlayers[2].kills + leftPlayers[2].placement}
                  </h4>
                </>
              )}
            </span>{" "}
            <span style={leaderboardItem}>
              <h3 style={leaderboardPosition}>
                {leftPlayers.length > 3 ? 4 : ""}
              </h3>
              {leftPlayers.length > 3 && (
                <>
                  <h4 style={leaderboardName}>{leftPlayers[3].name}</h4>
                  <h4 style={leaderboardKill}>{leftPlayers[3].kills}</h4>
                  <h4 style={leaderboardPlacement}>
                    {leftPlayers[3].placement}
                  </h4>
                  <h4 style={leaderboardTotal}>
                    {leftPlayers[3].kills + leftPlayers[3].placement}
                  </h4>
                </>
              )}
            </span>{" "}
            <span style={leaderboardItem}>
              <h3 style={leaderboardPosition}>
                {leftPlayers.length > 4 ? 5 : ""}
              </h3>
              {leftPlayers.length > 4 && (
                <>
                  <h4 style={leaderboardName}>{leftPlayers[4].name}</h4>
                  <h4 style={leaderboardKill}>{leftPlayers[4].kills}</h4>
                  <h4 style={leaderboardPlacement}>
                    {leftPlayers[4].placement}
                  </h4>
                  <h4 style={leaderboardTotal}>
                    {leftPlayers[4].kills + leftPlayers[4].placement}
                  </h4>
                </>
              )}
            </span>{" "}
            <span style={leaderboardItem}>
              <h3 style={leaderboardPosition}>
                {leftPlayers.length > 5 ? 6 : ""}
              </h3>
              {leftPlayers.length > 5 && (
                <>
                  <h4 style={leaderboardName}>{leftPlayers[5].name}</h4>
                  <h4 style={leaderboardKill}>{leftPlayers[5].kills}</h4>
                  <h4 style={leaderboardPlacement}>
                    {leftPlayers[5].placement}
                  </h4>
                  <h4 style={leaderboardTotal}>
                    {leftPlayers[5].kills + leftPlayers[5].placement}
                  </h4>
                </>
              )}
            </span>{" "}
            <span style={leaderboardItem}>
              <h3 style={leaderboardPosition}>
                {leftPlayers.length > 6 ? 7 : ""}
              </h3>
              {leftPlayers.length > 6 && (
                <>
                  <h4 style={leaderboardName}>{leftPlayers[6].name}</h4>
                  <h4 style={leaderboardKill}>{leftPlayers[6].kills}</h4>
                  <h4 style={leaderboardPlacement}>
                    {leftPlayers[6].placement}
                  </h4>
                  <h4 style={leaderboardTotal}>
                    {leftPlayers[6].kills + leftPlayers[6].placement}
                  </h4>
                </>
              )}
            </span>{" "}
            <span style={leaderboardItem}>
              <h3 style={leaderboardPosition}>
                {leftPlayers.length > 7 ? 8 : ""}
              </h3>
              {leftPlayers.length > 7 && (
                <>
                  <h4 style={leaderboardName}>{leftPlayers[7].name}</h4>
                  <h4 style={leaderboardKill}>{leftPlayers[7].kills}</h4>
                  <h4 style={leaderboardPlacement}>
                    {leftPlayers[7].placement}
                  </h4>
                  <h4 style={leaderboardTotal}>
                    {leftPlayers[7].kills + leftPlayers[7].placement}
                  </h4>
                </>
              )}
            </span>{" "}
            <span style={leaderboardItem}>
              <h3 style={leaderboardPosition}>
                {leftPlayers.length > 8 ? 9 : ""}
              </h3>
              {leftPlayers.length > 8 && (
                <>
                  <h4 style={leaderboardName}>{leftPlayers[8].name}</h4>
                  <h4 style={leaderboardKill}>{leftPlayers[8].kills}</h4>
                  <h4 style={leaderboardPlacement}>
                    {leftPlayers[8].placement}
                  </h4>
                  <h4 style={leaderboardTotal}>
                    {leftPlayers[8].kills + leftPlayers[8].placement}
                  </h4>
                </>
              )}
            </span>{" "}
            <span style={leaderboardItem}>
              <h3 style={leaderboardPosition}>
                {leftPlayers.length > 9 ? 10 : ""}
              </h3>
              {leftPlayers.length > 9 && (
                <>
                  <h4 style={leaderboardName}>{leftPlayers[9].name}</h4>
                  <h4 style={leaderboardKill}>{leftPlayers[9].kills}</h4>
                  <h4 style={leaderboardPlacement}>
                    {leftPlayers[9].placement}
                  </h4>
                  <h4 style={leaderboardTotal}>
                    {leftPlayers[9].kills + leftPlayers[9].placement}
                  </h4>
                </>
              )}
            </span>{" "}
            <span style={leaderboardItem}>
              <h3 style={leaderboardPosition}>
                {leftPlayers.length > 10 ? 11 : ""}
              </h3>
              {leftPlayers.length > 10 && (
                <>
                  <h4 style={leaderboardName}>{leftPlayers[10].name}</h4>
                  <h4 style={leaderboardKill}>{leftPlayers[10].kills}</h4>
                  <h4 style={leaderboardPlacement}>
                    {leftPlayers[10].placement}
                  </h4>
                  <h4 style={leaderboardTotal}>
                    {leftPlayers[10].kills + leftPlayers[10].placement}
                  </h4>
                </>
              )}
            </span>{" "}
            <span style={leaderboardItem}>
              <h3 style={leaderboardPosition}>
                {leftPlayers.length > 11 ? 12 : ""}
              </h3>
              {leftPlayers.length > 11 && (
                <>
                  <h4 style={leaderboardName}>{leftPlayers[11].name}</h4>
                  <h4 style={leaderboardKill}>{leftPlayers[11].kills}</h4>
                  <h4 style={leaderboardPlacement}>
                    {leftPlayers[11].placement}
                  </h4>
                  <h4 style={leaderboardTotal}>
                    {leftPlayers[11].kills + leftPlayers[11].placement}
                  </h4>
                </>
              )}
            </span>{" "}
            <span style={leaderboardItem}>
              <h3 style={leaderboardPosition}>
                {leftPlayers.length > 12 ? 13 : ""}
              </h3>
              {leftPlayers.length > 12 && (
                <>
                  <h4 style={leaderboardName}>{leftPlayers[12].name}</h4>
                  <h4 style={leaderboardKill}>{leftPlayers[12].kills}</h4>
                  <h4 style={leaderboardPlacement}>
                    {leftPlayers[12].placement}
                  </h4>
                  <h4 style={leaderboardTotal}>
                    {leftPlayers[12].kills + leftPlayers[12].placement}
                  </h4>
                </>
              )}
            </span>
          </div>
          <div style={leaderboardRight}>
            <span style={leaderboardItem}>
              <h3 style={leaderboardPosition}>#</h3>
              <h3 style={leaderboardName}>Name</h3>
              <h3 style={leaderboardKill}>Knockouts</h3>
              <h3 style={leaderboardPlacement}>Placement</h3>
              <h3 style={leaderboardTotal}>Total</h3>
            </span>
            <span style={leaderboardItem}>
              <h3 style={leaderboardPosition}>
                {rightPlayers.length > 0 ? 14 : ""}
              </h3>
              {rightPlayers.length > 0 && (
                <>
                  <h4 style={leaderboardName}>{rightPlayers[0].name}</h4>
                  <h4 style={leaderboardKill}>{rightPlayers[0].kills}</h4>
                  <h4 style={leaderboardPlacement}>
                    {rightPlayers[0].placement}
                  </h4>
                  <h4 style={leaderboardTotal}>
                    {rightPlayers[0].kills + rightPlayers[0].placement}
                  </h4>
                </>
              )}
            </span>
            <span style={leaderboardItem}>
              <h3 style={leaderboardPosition}>
                {rightPlayers.length > 1 ? 15 : ""}
              </h3>
              {rightPlayers.length > 1 && (
                <>
                  <h4 style={leaderboardName}>{rightPlayers[1].name}</h4>
                  <h4 style={leaderboardKill}>{rightPlayers[1].kills}</h4>
                  <h4 style={leaderboardPlacement}>
                    {rightPlayers[1].placement}
                  </h4>
                  <h4 style={leaderboardTotal}>
                    {rightPlayers[1].kills + rightPlayers[1].placement}
                  </h4>
                </>
              )}
            </span>{" "}
            <span style={leaderboardItem}>
              <h3 style={leaderboardPosition}>
                {rightPlayers.length > 2 ? 16 : ""}
              </h3>
              {rightPlayers.length > 2 && (
                <>
                  <h4 style={leaderboardName}>{rightPlayers[2].name}</h4>
                  <h4 style={leaderboardKill}>{rightPlayers[2].kills}</h4>
                  <h4 style={leaderboardPlacement}>
                    {rightPlayers[2].placement}
                  </h4>
                  <h4 style={leaderboardTotal}>
                    {rightPlayers[2].kills + rightPlayers[2].placement}
                  </h4>
                </>
              )}
            </span>{" "}
            <span style={leaderboardItem}>
              <h3 style={leaderboardPosition}>
                {rightPlayers.length > 3 ? 17 : ""}
              </h3>
              {rightPlayers.length > 3 && (
                <>
                  <h4 style={leaderboardName}>{rightPlayers[3].name}</h4>
                  <h4 style={leaderboardKill}>{rightPlayers[3].kills}</h4>
                  <h4 style={leaderboardPlacement}>
                    {rightPlayers[3].placement}
                  </h4>
                  <h4 style={leaderboardTotal}>
                    {rightPlayers[3].kills + rightPlayers[3].placement}
                  </h4>
                </>
              )}
            </span>{" "}
            <span style={leaderboardItem}>
              <h3 style={leaderboardPosition}>
                {rightPlayers.length > 4 ? 18 : ""}
              </h3>
              {rightPlayers.length > 4 && (
                <>
                  <h4 style={leaderboardName}>{rightPlayers[4].name}</h4>
                  <h4 style={leaderboardKill}>{rightPlayers[4].kills}</h4>
                  <h4 style={leaderboardPlacement}>
                    {rightPlayers[4].placement}
                  </h4>
                  <h4 style={leaderboardTotal}>
                    {rightPlayers[4].kills + rightPlayers[4].placement}
                  </h4>
                </>
              )}
            </span>{" "}
            <span style={leaderboardItem}>
              <h3 style={leaderboardPosition}>
                {rightPlayers.length > 5 ? 19 : ""}
              </h3>
              {rightPlayers.length > 5 && (
                <>
                  <h4 style={leaderboardName}>{rightPlayers[5].name}</h4>
                  <h4 style={leaderboardKill}>{rightPlayers[5].kills}</h4>
                  <h4 style={leaderboardPlacement}>
                    {rightPlayers[5].placement}
                  </h4>
                  <h4 style={leaderboardTotal}>
                    {rightPlayers[5].kills + rightPlayers[5].placement}
                  </h4>
                </>
              )}
            </span>{" "}
            <span style={leaderboardItem}>
              <h3 style={leaderboardPosition}>
                {rightPlayers.length > 6 ? 20 : ""}
              </h3>
              {rightPlayers.length > 6 && (
                <>
                  <h4 style={leaderboardName}>{rightPlayers[6].name}</h4>
                  <h4 style={leaderboardKill}>{rightPlayers[6].kills}</h4>
                  <h4 style={leaderboardPlacement}>
                    {rightPlayers[6].placement}
                  </h4>
                  <h4 style={leaderboardTotal}>
                    {rightPlayers[6].kills + rightPlayers[6].placement}
                  </h4>
                </>
              )}
            </span>{" "}
            <span style={leaderboardItem}>
              <h3 style={leaderboardPosition}>
                {rightPlayers.length > 7 ? 21 : ""}
              </h3>
              {rightPlayers.length > 7 && (
                <>
                  <h4 style={leaderboardName}>{rightPlayers[7].name}</h4>
                  <h4 style={leaderboardKill}>{rightPlayers[7].kills}</h4>
                  <h4 style={leaderboardPlacement}>
                    {rightPlayers[7].placement}
                  </h4>
                  <h4 style={leaderboardTotal}>
                    {rightPlayers[7].kills + rightPlayers[7].placement}
                  </h4>
                </>
              )}
            </span>{" "}
            <span style={leaderboardItem}>
              <h3 style={leaderboardPosition}>
                {rightPlayers.length > 8 ? 22 : ""}
              </h3>
              {rightPlayers.length > 8 && (
                <>
                  <h4 style={leaderboardName}>{rightPlayers[8].name}</h4>
                  <h4 style={leaderboardKill}>{rightPlayers[8].kills}</h4>
                  <h4 style={leaderboardPlacement}>
                    {rightPlayers[8].placement}
                  </h4>
                  <h4 style={leaderboardTotal}>
                    {rightPlayers[8].kills + rightPlayers[8].placement}
                  </h4>
                </>
              )}
            </span>{" "}
            <span style={leaderboardItem}>
              <h3 style={leaderboardPosition}>
                {rightPlayers.length > 9 ? 23 : ""}
              </h3>
              {rightPlayers.length > 9 && (
                <>
                  <h4 style={leaderboardName}>{rightPlayers[9].name}</h4>
                  <h4 style={leaderboardKill}>{rightPlayers[9].kills}</h4>
                  <h4 style={leaderboardPlacement}>
                    {rightPlayers[9].placement}
                  </h4>
                  <h4 style={leaderboardTotal}>
                    {rightPlayers[9].kills + rightPlayers[9].placement}
                  </h4>
                </>
              )}
            </span>{" "}
            <span style={leaderboardItem}>
              <h3 style={leaderboardPosition}>
                {rightPlayers.length > 10 ? 24 : ""}
              </h3>
              {rightPlayers.length > 10 && (
                <>
                  <h4 style={leaderboardName}>{rightPlayers[10].name}</h4>
                  <h4 style={leaderboardKill}>{rightPlayers[10].kills}</h4>
                  <h4 style={leaderboardPlacement}>
                    {rightPlayers[10].placement}
                  </h4>
                  <h4 style={leaderboardTotal}>
                    {rightPlayers[10].kills + rightPlayers[10].placement}
                  </h4>
                </>
              )}
            </span>{" "}
            <span style={leaderboardItem}>
              <h3 style={leaderboardPosition}>
                {rightPlayers.length > 11 ? 25 : ""}
              </h3>
              {rightPlayers.length > 11 && (
                <>
                  <h4 style={leaderboardName}>{rightPlayers[11].name}</h4>
                  <h4 style={leaderboardKill}>{rightPlayers[11].kills}</h4>
                  <h4 style={leaderboardPlacement}>
                    {rightPlayers[11].placement}
                  </h4>
                  <h4 style={leaderboardTotal}>
                    {rightPlayers[11].kills + rightPlayers[11].placement}
                  </h4>
                </>
              )}
            </span>{" "}
            <span style={leaderboardItem}>
              <h3 style={leaderboardPosition}>
                {rightPlayers.length > 12 ? 26 : ""}
              </h3>
              {rightPlayers.length > 12 && (
                <>
                  <h4 style={leaderboardName}>{rightPlayers[12].name}</h4>
                  <h4 style={leaderboardKill}>{rightPlayers[12].kills}</h4>
                  <h4 style={leaderboardPlacement}>
                    {rightPlayers[12].placement}
                  </h4>
                  <h4 style={leaderboardTotal}>
                    {rightPlayers[12].kills + rightPlayers[12].placement}
                  </h4>
                </>
              )}
            </span>
          </div>
        </>
      )}
      {type && (
        <>
          <div style={leaderboardLeft}>
            <span style={leaderboardItem}>
              <h3 style={leaderboardPosition}>#</h3>
              <h3 style={leaderboardName}>Name</h3>
              <h3 style={leaderboardKill}>Knockouts</h3>
              <h3 style={leaderboardPlacement}>Placement</h3>
              <h3 style={leaderboardTotal}>Total</h3>
            </span>
            <span style={leaderboardItem}>
              <h3 style={leaderboardPosition}>
                {leftTeams.length > 0 ? 1 : ""}
              </h3>
              {leftTeams.length > 0 && (
                <>
                  <h4 style={leaderboardName}>{leftTeams[0].name}</h4>
                  <h4 style={leaderboardKill}>{leftTeams[0].kills}</h4>
                  <h4 style={leaderboardPlacement}>{leftTeams[0].placement}</h4>
                  <h4 style={leaderboardTotal}>
                    {leftTeams[0].kills + leftTeams[0].placement}
                  </h4>
                </>
              )}
            </span>
            <span style={leaderboardItem}>
              <h3 style={leaderboardPosition}>
                {leftTeams.length > 1 ? 2 : ""}
              </h3>
              {leftTeams.length > 1 && (
                <>
                  <h4 style={leaderboardName}>{leftTeams[1].name}</h4>
                  <h4 style={leaderboardKill}>{leftTeams[1].kills}</h4>
                  <h4 style={leaderboardPlacement}>{leftTeams[1].placement}</h4>
                  <h4 style={leaderboardTotal}>
                    {leftTeams[1].kills + leftTeams[1].placement}
                  </h4>
                </>
              )}
            </span>{" "}
            <span style={leaderboardItem}>
              <h3 style={leaderboardPosition}>
                {leftTeams.length > 2 ? 3 : ""}
              </h3>
              {leftTeams.length > 2 && (
                <>
                  <h4 style={leaderboardName}>{leftTeams[2].name}</h4>
                  <h4 style={leaderboardKill}>{leftTeams[2].kills}</h4>
                  <h4 style={leaderboardPlacement}>{leftTeams[2].placement}</h4>
                  <h4 style={leaderboardTotal}>
                    {leftTeams[2].kills + leftTeams[2].placement}
                  </h4>
                </>
              )}
            </span>{" "}
            <span style={leaderboardItem}>
              <h3 style={leaderboardPosition}>
                {leftTeams.length > 3 ? 4 : ""}
              </h3>
              {leftTeams.length > 3 && (
                <>
                  <h4 style={leaderboardName}>{leftTeams[3].name}</h4>
                  <h4 style={leaderboardKill}>{leftTeams[3].kills}</h4>
                  <h4 style={leaderboardPlacement}>{leftTeams[3].placement}</h4>
                  <h4 style={leaderboardTotal}>
                    {leftTeams[3].kills + leftTeams[3].placement}
                  </h4>
                </>
              )}
            </span>{" "}
            <span style={leaderboardItem}>
              <h3 style={leaderboardPosition}>
                {leftTeams.length > 4 ? 5 : ""}
              </h3>
              {leftTeams.length > 4 && (
                <>
                  <h4 style={leaderboardName}>{leftTeams[4].name}</h4>
                  <h4 style={leaderboardKill}>{leftTeams[4].kills}</h4>
                  <h4 style={leaderboardPlacement}>{leftTeams[4].placement}</h4>
                  <h4 style={leaderboardTotal}>
                    {leftTeams[4].kills + leftTeams[4].placement}
                  </h4>
                </>
              )}
            </span>{" "}
            <span style={leaderboardItem}>
              <h3 style={leaderboardPosition}>
                {leftTeams.length > 5 ? 6 : ""}
              </h3>
              {leftTeams.length > 5 && (
                <>
                  <h4 style={leaderboardName}>{leftTeams[5].name}</h4>
                  <h4 style={leaderboardKill}>{leftTeams[5].kills}</h4>
                  <h4 style={leaderboardPlacement}>{leftTeams[5].placement}</h4>
                  <h4 style={leaderboardTotal}>
                    {leftTeams[5].kills + leftTeams[5].placement}
                  </h4>
                </>
              )}
            </span>{" "}
            <span style={leaderboardItem}>
              <h3 style={leaderboardPosition}>
                {leftTeams.length > 6 ? 7 : ""}
              </h3>
              {leftTeams.length > 6 && (
                <>
                  <h4 style={leaderboardName}>{leftTeams[6].name}</h4>
                  <h4 style={leaderboardKill}>{leftTeams[6].kills}</h4>
                  <h4 style={leaderboardPlacement}>{leftTeams[6].placement}</h4>
                  <h4 style={leaderboardTotal}>
                    {leftTeams[6].kills + leftTeams[6].placement}
                  </h4>
                </>
              )}
            </span>{" "}
            <span style={leaderboardItem}>
              <h3 style={leaderboardPosition}>
                {leftTeams.length > 7 ? 8 : ""}
              </h3>
              {leftTeams.length > 7 && (
                <>
                  <h4 style={leaderboardName}>{leftTeams[7].name}</h4>
                  <h4 style={leaderboardKill}>{leftTeams[7].kills}</h4>
                  <h4 style={leaderboardPlacement}>{leftTeams[7].placement}</h4>
                  <h4 style={leaderboardTotal}>
                    {leftTeams[7].kills + leftTeams[7].placement}
                  </h4>
                </>
              )}
            </span>{" "}
            <span style={leaderboardItem}>
              <h3 style={leaderboardPosition}>
                {leftTeams.length > 8 ? 9 : ""}
              </h3>
              {leftTeams.length > 8 && (
                <>
                  <h4 style={leaderboardName}>{leftTeams[8].name}</h4>
                  <h4 style={leaderboardKill}>{leftTeams[8].kills}</h4>
                  <h4 style={leaderboardPlacement}>{leftTeams[8].placement}</h4>
                  <h4 style={leaderboardTotal}>
                    {leftTeams[8].kills + leftTeams[8].placement}
                  </h4>
                </>
              )}
            </span>{" "}
            <span style={leaderboardItem}>
              <h3 style={leaderboardPosition}>
                {leftTeams.length > 9 ? 10 : ""}
              </h3>
              {leftTeams.length > 9 && (
                <>
                  <h4 style={leaderboardName}>{leftTeams[9].name}</h4>
                  <h4 style={leaderboardKill}>{leftTeams[9].kills}</h4>
                  <h4 style={leaderboardPlacement}>{leftTeams[9].placement}</h4>
                  <h4 style={leaderboardTotal}>
                    {leftTeams[9].kills + leftTeams[9].placement}
                  </h4>
                </>
              )}
            </span>{" "}
            <span style={leaderboardItem}>
              <h3 style={leaderboardPosition}>
                {leftTeams.length > 10 ? 11 : ""}
              </h3>
              {leftTeams.length > 10 && (
                <>
                  <h4 style={leaderboardName}>{leftTeams[10].name}</h4>
                  <h4 style={leaderboardKill}>{leftTeams[10].kills}</h4>
                  <h4 style={leaderboardPlacement}>
                    {leftTeams[10].placement}
                  </h4>
                  <h4 style={leaderboardTotal}>
                    {leftTeams[10].kills + leftTeams[10].placement}
                  </h4>
                </>
              )}
            </span>{" "}
            <span style={leaderboardItem}>
              <h3 style={leaderboardPosition}>
                {leftTeams.length > 11 ? 12 : ""}
              </h3>
              {leftTeams.length > 11 && (
                <>
                  <h4 style={leaderboardName}>{leftTeams[11].name}</h4>
                  <h4 style={leaderboardKill}>{leftTeams[11].kills}</h4>
                  <h4 style={leaderboardPlacement}>
                    {leftTeams[11].placement}
                  </h4>
                  <h4 style={leaderboardTotal}>
                    {leftTeams[11].kills + leftTeams[11].placement}
                  </h4>
                </>
              )}
            </span>{" "}
            <span style={leaderboardItem}>
              <h3 style={leaderboardPosition}>
                {leftTeams.length > 12 ? 13 : ""}
              </h3>
              {leftTeams.length > 12 && (
                <>
                  <h4 style={leaderboardName}>{leftTeams[12].name}</h4>
                  <h4 style={leaderboardKill}>{leftTeams[12].kills}</h4>
                  <h4 style={leaderboardPlacement}>
                    {leftTeams[12].placement}
                  </h4>
                  <h4 style={leaderboardTotal}>
                    {leftTeams[12].kills + leftTeams[12].placement}
                  </h4>
                </>
              )}
            </span>
          </div>
          <div style={leaderboardRight}>
            <span style={leaderboardItem}>
              <h3 style={leaderboardPosition}>#</h3>
              <h3 style={leaderboardName}>Name</h3>
              <h3 style={leaderboardKill}>Knockouts</h3>
              <h3 style={leaderboardPlacement}>Placement</h3>
              <h3 style={leaderboardTotal}>Total</h3>
            </span>
            <span style={leaderboardItem}>
              <h3 style={leaderboardPosition}>
                {rightTeams.length > 0 ? 14 : ""}
              </h3>
              {rightTeams.length > 0 && (
                <>
                  <h4 style={leaderboardName}>{rightTeams[0].name}</h4>
                  <h4 style={leaderboardKill}>{rightTeams[0].kills}</h4>
                  <h4 style={leaderboardPlacement}>
                    {rightTeams[0].placement}
                  </h4>
                  <h4 style={leaderboardTotal}>
                    {rightTeams[0].kills + rightTeams[0].placement}
                  </h4>
                </>
              )}
            </span>
            <span style={leaderboardItem}>
              <h3 style={leaderboardPosition}>
                {rightTeams.length > 1 ? 15 : ""}
              </h3>
              {rightTeams.length > 1 && (
                <>
                  <h4 style={leaderboardName}>{rightTeams[1].name}</h4>
                  <h4 style={leaderboardKill}>{rightTeams[1].kills}</h4>
                  <h4 style={leaderboardPlacement}>
                    {rightTeams[1].placement}
                  </h4>
                  <h4 style={leaderboardTotal}>
                    {rightTeams[1].kills + rightTeams[1].placement}
                  </h4>
                </>
              )}
            </span>{" "}
            <span style={leaderboardItem}>
              <h3 style={leaderboardPosition}>
                {rightTeams.length > 2 ? 16 : ""}
              </h3>
              {rightTeams.length > 2 && (
                <>
                  <h4 style={leaderboardName}>{rightTeams[2].name}</h4>
                  <h4 style={leaderboardKill}>{rightTeams[2].kills}</h4>
                  <h4 style={leaderboardPlacement}>
                    {rightTeams[2].placement}
                  </h4>
                  <h4 style={leaderboardTotal}>
                    {rightTeams[2].kills + rightTeams[2].placement}
                  </h4>
                </>
              )}
            </span>{" "}
            <span style={leaderboardItem}>
              <h3 style={leaderboardPosition}>
                {rightTeams.length > 3 ? 17 : ""}
              </h3>
              {rightTeams.length > 3 && (
                <>
                  <h4 style={leaderboardName}>{rightTeams[3].name}</h4>
                  <h4 style={leaderboardKill}>{rightTeams[3].kills}</h4>
                  <h4 style={leaderboardPlacement}>
                    {rightTeams[3].placement}
                  </h4>
                  <h4 style={leaderboardTotal}>
                    {rightTeams[3].kills + rightTeams[3].placement}
                  </h4>
                </>
              )}
            </span>{" "}
            <span style={leaderboardItem}>
              <h3 style={leaderboardPosition}>
                {rightTeams.length > 4 ? 18 : ""}
              </h3>
              {rightTeams.length > 4 && (
                <>
                  <h4 style={leaderboardName}>{rightTeams[4].name}</h4>
                  <h4 style={leaderboardKill}>{rightTeams[4].kills}</h4>
                  <h4 style={leaderboardPlacement}>
                    {rightTeams[4].placement}
                  </h4>
                  <h4 style={leaderboardTotal}>
                    {rightTeams[4].kills + rightTeams[4].placement}
                  </h4>
                </>
              )}
            </span>{" "}
            <span style={leaderboardItem}>
              <h3 style={leaderboardPosition}>
                {rightTeams.length > 5 ? 19 : ""}
              </h3>
              {rightTeams.length > 5 && (
                <>
                  <h4 style={leaderboardName}>{rightTeams[5].name}</h4>
                  <h4 style={leaderboardKill}>{rightTeams[5].kills}</h4>
                  <h4 style={leaderboardPlacement}>
                    {rightTeams[5].placement}
                  </h4>
                  <h4 style={leaderboardTotal}>
                    {rightTeams[5].kills + rightTeams[5].placement}
                  </h4>
                </>
              )}
            </span>{" "}
            <span style={leaderboardItem}>
              <h3 style={leaderboardPosition}>
                {rightTeams.length > 6 ? 20 : ""}
              </h3>
              {rightTeams.length > 6 && (
                <>
                  <h4 style={leaderboardName}>{rightTeams[6].name}</h4>
                  <h4 style={leaderboardKill}>{rightTeams[6].kills}</h4>
                  <h4 style={leaderboardPlacement}>
                    {rightTeams[6].placement}
                  </h4>
                  <h4 style={leaderboardTotal}>
                    {rightTeams[6].kills + rightTeams[6].placement}
                  </h4>
                </>
              )}
            </span>{" "}
            <span style={leaderboardItem}>
              <h3 style={leaderboardPosition}>
                {rightTeams.length > 7 ? 21 : ""}
              </h3>
              {rightTeams.length > 7 && (
                <>
                  <h4 style={leaderboardName}>{rightTeams[7].name}</h4>
                  <h4 style={leaderboardKill}>{rightTeams[7].kills}</h4>
                  <h4 style={leaderboardPlacement}>
                    {rightTeams[7].placement}
                  </h4>
                  <h4 style={leaderboardTotal}>
                    {rightTeams[7].kills + rightTeams[7].placement}
                  </h4>
                </>
              )}
            </span>{" "}
            <span style={leaderboardItem}>
              <h3 style={leaderboardPosition}>
                {rightTeams.length > 8 ? 22 : ""}
              </h3>
              {rightTeams.length > 8 && (
                <>
                  <h4 style={leaderboardName}>{rightTeams[8].name}</h4>
                  <h4 style={leaderboardKill}>{rightTeams[8].kills}</h4>
                  <h4 style={leaderboardPlacement}>
                    {rightTeams[8].placement}
                  </h4>
                  <h4 style={leaderboardTotal}>
                    {rightTeams[8].kills + rightTeams[8].placement}
                  </h4>
                </>
              )}
            </span>{" "}
            <span style={leaderboardItem}>
              <h3 style={leaderboardPosition}>
                {rightTeams.length > 9 ? 23 : ""}
              </h3>
              {rightTeams.length > 9 && (
                <>
                  <h4 style={leaderboardName}>{rightTeams[9].name}</h4>
                  <h4 style={leaderboardKill}>{rightTeams[9].kills}</h4>
                  <h4 style={leaderboardPlacement}>
                    {rightTeams[9].placement}
                  </h4>
                  <h4 style={leaderboardTotal}>
                    {rightTeams[9].kills + rightTeams[9].placement}
                  </h4>
                </>
              )}
            </span>{" "}
            <span style={leaderboardItem}>
              <h3 style={leaderboardPosition}>
                {rightTeams.length > 10 ? 24 : ""}
              </h3>
              {rightTeams.length > 10 && (
                <>
                  <h4 style={leaderboardName}>{rightTeams[10].name}</h4>
                  <h4 style={leaderboardKill}>{rightTeams[10].kills}</h4>
                  <h4 style={leaderboardPlacement}>
                    {rightTeams[10].placement}
                  </h4>
                  <h4 style={leaderboardTotal}>
                    {rightTeams[10].kills + rightTeams[10].placement}
                  </h4>
                </>
              )}
            </span>{" "}
            <span style={leaderboardItem}>
              <h3 style={leaderboardPosition}>
                {rightTeams.length > 11 ? 25 : ""}
              </h3>
              {rightTeams.length > 11 && (
                <>
                  <h4 style={leaderboardName}>{rightTeams[11].name}</h4>
                  <h4 style={leaderboardKill}>{rightTeams[11].kills}</h4>
                  <h4 style={leaderboardPlacement}>
                    {rightTeams[11].placement}
                  </h4>
                  <h4 style={leaderboardTotal}>
                    {rightTeams[11].kills + rightTeams[11].placement}
                  </h4>
                </>
              )}
            </span>{" "}
            <span style={leaderboardItem}>
              <h3 style={leaderboardPosition}>
                {rightTeams.length > 12 ? 26 : ""}
              </h3>
              {rightTeams.length > 12 && (
                <>
                  <h4 style={leaderboardName}>{rightTeams[12].name}</h4>
                  <h4 style={leaderboardKill}>{rightTeams[12].kills}</h4>
                  <h4 style={leaderboardPlacement}>
                    {rightTeams[12].placement}
                  </h4>
                  <h4 style={leaderboardTotal}>
                    {rightTeams[12].kills + rightTeams[12].placement}
                  </h4>
                </>
              )}
            </span>
          </div>
        </>
      )}
    </>
  )
}
