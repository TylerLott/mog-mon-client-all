import * as COLORS from "../../styles/colors"

// Logo
export const logoTopContainer = {
  width: "25vw",
  height: "15vh",
  borderRadius: "0 0 10px 10px",
  border: `2px solid ${COLORS.CONTAINER_TEXT_COLOR}`,
  top: "-2vh",
  left: "37.5vw",
  backgroundSize: "20px 20px",
  backgroundColor: COLORS.BACKGROUND_COLOR,
  backgroundImage: `linear-gradient(0deg, ${COLORS.CONTAINER_GRID_LINES} 1px, transparent 1px),linear-gradient(90deg, ${COLORS.CONTAINER_GRID_LINES} 1px, transparent 1px)`,
}
export const logoBottomContainer = {
  width: "25vw",
  height: "15vh",
  borderRadius: "10px 10px 0 0",
  border: `2px solid ${COLORS.CONTAINER_TEXT_COLOR}`,
  top: "100vh",
  left: "37.5vw",
  backgroundSize: "20px 20px",
  backgroundColor: COLORS.BACKGROUND_COLOR,
  backgroundImage: `linear-gradient(0deg, ${COLORS.CONTAINER_GRID_LINES} 1px, transparent 1px),linear-gradient(90deg, ${COLORS.CONTAINER_GRID_LINES} 1px, transparent 1px)`,
}

// team names
export const teamName = {
  minWidth: "10vw",
  padding: "0.5em 1.2em 0.5em 1.2em",
  borderRadius: "0 0 0.5em 0.5em",
  top: 0,
  left: "22vw",
  border: `2px solid ${COLORS.TEXT_COLOR}`,
  borderTop: "none",
  backgroundColor: COLORS.TEAM_COLOR,
  whiteSpace: "nowrap",
}

// leaderboard
export const leaderboardStyle = {}

// host
export const hostMainContainer = {
  width: "168.88vh",
  height: "95vh",
  marginTop: "2vh",
  marginLeft: "3.5vh",
  marginBottom: "2vh",
  marginRight: "3.5vh",
  backgroundColor: "black",
  borderRadius: `2em`,
  border: `3px solid ${COLORS.CONTAINER_TEXT_COLOR}`,
  zIndex: 0,
}
export const hostSmallContainer = {
  width: "40vh",
  height: "22.5vh",
  borderRadius: "1em",
  border: `2px solid ${COLORS.CONTAINER_TEXT_COLOR}`,
  position: "absolute",
  top: "38.75vh",
  left: "10px",
  zIndex: 5,
  backgroundColor: "black",
}

export const loadingScreenStyleLeft = {
  width: "120vw",
  height: "100vh",
  padding: 0,
  margin: 0,
  borderRadius: "5em",
  position: "absolute",
  top: 0,
  left: "-10vw",
  zIndex: 5,
  backgroundSize: "20px 20px",
  backgroundColor: COLORS.BACKGROUND_COLOR,
  backgroundImage: `linear-gradient(0deg, ${COLORS.CONTAINER_GRID_LINES} 1px, transparent 1px),linear-gradient(90deg, ${COLORS.CONTAINER_GRID_LINES} 1px, transparent 1px)`,
}
// players
export const singlePlayer = {
  width: "100vw",
  height: "100vh",
  top: 0,
  left: 0,
  backgroundColor: "black",
}

export const topLeftPlayer = {
  width: "50vw",
  height: "50vh",
  top: 0,
  left: 0,
  // backgroundColor: "red",
}
export const topRightPlayer = {
  width: "50vw",
  height: "50vh",
  top: 0,
  left: "50vw",
  // backgroundColor: "yellow",
}
export const bottomLeftPlayer = {
  width: "50vw",
  height: "50vh",
  top: "50vh",
  left: 0,
  // backgroundColor: "green",
}
export const bottomRightPlayer = {
  width: "50vw",
  height: "50vh",
  top: "50vh",
  left: "50vw",
  // backgroundColor: "blue",
}

export const topLeftName = {
  minWidth: "5vw",
  padding: "0.5em 1.2em 0.5em 1.2em",
  borderRadius: "0 0 0.8em 0.8em",
  top: 0,
  left: "3vw",
  backgroundColor: COLORS.TEAM_NAME_COLOR,
  color: COLORS.NAME_COLOR,
  border: `2px solid ${COLORS.TEXT_COLOR}`,
  borderTop: "none",
  whiteSpace: "nowrap",
}
export const topRightName = {
  minWidth: "5vw",
  padding: "0.5em 1.2em 0.5em 1.2em",
  borderRadius: "0 0 0.8em 0.8em",
  top: 0,
  right: "-97vw",
  backgroundColor: COLORS.TEAM_NAME_COLOR,
  color: COLORS.NAME_COLOR,
  border: `2px solid ${COLORS.TEXT_COLOR}`,
  borderTop: "none",
  whiteSpace: "nowrap",
}
export const bottomLeftName = {
  minWidth: "3vw",
  padding: "0.5em 1.2em 0.5em 1.2em",
  borderRadius: "0.8em 0.8em 0 0",
  bottom: "-115vh",
  left: "5vw",
  backgroundColor: COLORS.TEAM_NAME_COLOR,
  color: COLORS.NAME_COLOR,
  border: `2px solid ${COLORS.TEXT_COLOR}`,
  borderBottom: "none",
  whiteSpace: "nowrap",
}
export const bottomRightName = {
  minWidth: "5vw",
  padding: "0.5em 1.2em 0.5em 1.2em",
  borderRadius: "0.8em 0.8em 0 0",
  bottom: "-115vh",
  right: "-97vw",
  backgroundColor: COLORS.TEAM_NAME_COLOR,
  color: COLORS.NAME_COLOR,
  border: `2px solid ${COLORS.TEXT_COLOR}`,
  borderBottom: "none",
  whiteSpace: "nowrap",
}

// main screen styles
export const mainContainer = {
  width: "100vw",
  height: "100vh",
  padding: 0,
  margin: 0,
  backgroundColor: COLORS.CONTAINER_BACKGROUND,
  overflow: "hidden",
}
export const animations = `

@keyframes slide-in-left {
  0% {
    transform: translateX(-110vw)
  }
  100% {
    transform: translateX(0)
  }
}
@keyframes slide-out-left {
  0% {
    transform: translateX(0)
  }
  100% {
    transform: translateX(-110vw)
  }
}

@keyframes slide-in-left-load {
  0% {
    transform: translateX(-115vw)
  }
  100% {
    transform: translateX(0)
  }
}
@keyframes slide-out-left-load {
  0% {
    transform: translateX(0)
  }
  100% {
    transform: translateX(-115vw)
  }
}

@keyframes slide-in-right {
  0% {
    transform: translateX(100vw)
  }
  100% {
    transform: translateX(0)
  }
}
@keyframes slide-out-right {
  0% {
    transform: translateX(0)
  }
  100% {
    transform: translateX(100vw)
  }
}

@keyframes slide-in-right-load {
  0% {
    transform: translateX(110vw)
  }
  100% {
    transform: translateX(0)
  }
}
@keyframes slide-out-right-load {
  0% {
    transform: translateX(0)
  }
  100% {
    transform: translateX(110vw)
  }
}
@keyframes slide-in-right-load-copy {
  0% {
    transform: translateX(110vw)
  }
  100% {
    transform: translateX(0)
  }
}
@keyframes slide-out-right-load-copy {
  0% {
    transform: translateX(0)
  }
  100% {
    transform: translateX(110vw)
  }
}

@keyframes slide-in-bottom {
  0% {
    transform: translateY(0)
  }
  100% {
    transform: translateY(-15vh)
  }
}
@keyframes slide-out-bottom {
  0% {
    transform: translateY(-15vh)
  }
  100% {
    transform: translateY(0)
  }
}

@keyframes slide-in-top {
  0% {
    transform: translateY(-30vh)
  }
  100% {
    transform: translateY(0%)
  }
}
@keyframes slide-out-top {
0% {
    transform: translateY(0%)
  }
  100% {
    transform: translateY(-30vh)
  }
}

@keyframes slide-in-top-players {
  0% {
    transform: translateY(-100vh)
  }
  100% {
    transform: translateY(0)
  }
}
@keyframes slide-out-top-players {
  0% {
    transform: translateY(0)
  }
  100% {
    transform: translateY(-100vh)
  }
}
@keyframes slide-in-top-players-copy {
  0% {
    transform: translateY(-100vh)
  }
  100% {
    transform: translateY(0)
  }
}
@keyframes slide-out-top-players-copy {
  0% {
    transform: translateY(0)
  }
  100% {
    transform: translateY(-100vh)
  }
}

.top-in-leaderboard {
  animation: slide-in-top-players 0.7s ease;
  animation-fill-mode: forwards;
}
.top-out-leaderboard {
  animation: slide-out-top-players 0.7s ease 0.4s;
  animation-fill-mode: forwards;
}
.slide-in-out-top {
  animation: slide-in-top-players 0.5s ease, slide-out-top-players 0.7s ease 1s;
  animation-fill-mode: forwards;
}
.slide-in-out-top-copy {
  animation: slide-in-top-players-copy 0.5s ease, slide-out-top-players-copy 0.7s ease 1s;
  animation-fill-mode: forwards;
}

.bottom-in-up {
  animation: slide-in-bottom 1.2s ease;
  animation-fill-mode: forwards;
}
.bottom-out-down {
  animation: slide-out-bottom 1.2s ease;
  animation-fill-mode: forwards;
}

.top-in-down {
  animation: slide-in-top 1.2s ease;
  animation-fill-mode: forwards;
}
.top-out-up {
  animation: slide-out-top 1.2s ease;
  animation-fill-mode: forwards;
}

.slide-in-left {
  animation: slide-in-left 0.7s ease ;
  animation-fill-mode: forwards;
}
.slide-out-left {
  animation: slide-out-left 0.7s ease-in-out 0.4s;
  animation-fill-mode: forwards;
}
.slide-in-out-left{
  animation: slide-in-left-load 0.7s ease, slide-out-left-load 0.9s ease 1s;
  animation-fill-mode: forwards;
}
.slide-in-out-left-copy{
  animation: slide-in-left-load 0.71s ease, slide-out-left-load 0.9s ease 1s;
  animation-fill-mode: forwards;
}
.stay {
  display: none;
}

.slide-in-right {
  animation: slide-in-right 0.9s ease ;
  animation-fill-mode: forwards;
}

.slide-out-right {
  animation: slide-out-right 0.7s ease 0.4s;
  animation-fill-mode: forwards;
}
.slide-in-out-right{
  animation: slide-in-right-load 0.5s ease, slide-out-right-load 0.9s ease 1s;
  animation-fill-mode: forwards;
}
.slide-in-out-right-copy{
  animation: slide-in-right-load-copy 0.51s ease, slide-out-right-load-copy 0.9s ease 1s;
  animation-fill-mode: forwards;
}

.slide-out-left {

}

div {
  position: absolute;
}
video {
  position: absolute;
}
h2 {
  position: absolute;
  margin: 0 auto;
  text-align: center;
  font-family: sans-serif;
}

`
