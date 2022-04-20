import React, { useMemo, useState } from "react"
import {
  LeaderboardButton,
  LeaderboardLabelKills,
  LeaderboardLabelName,
  LeaderboardLabelPlacement,
  LeaderboardLabelPoints,
  LeaderboardLabels,
  LeaderboardList,
  LeaderboardOptions,
  LeaderboardRowContainer,
  LeaderboardRowKills,
  LeaderboardRowName,
  LeaderboardRowPlacement,
  LeaderboardRowPoints,
} from "./LeaderboardComponents"
import GroupsIcon from "@mui/icons-material/Groups"
import PersonIcon from "@mui/icons-material/Person"
import DesktopAccessDisabledIcon from "@mui/icons-material/DesktopAccessDisabled"
import DesktopWindowsIcon from "@mui/icons-material/DesktopWindows"
import {
  UIContainer,
  UIContainerTitle,
  UIContainerTop,
} from "../../styles/styleGlobalComponents"
import { useDispatch, useSelector } from "react-redux"
import { uiActions } from "../../store/uiSlice"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"

const LeaderboardRow = ({ data, sub = false, rank }) => {
  return (
    <LeaderboardRowContainer
      className="leaderboard-row-container"
      style={{ backgroundColor: sub ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0)" }}
    >
      <LeaderboardRowName className="leaderboard-row-name">
        {rank ? `${rank}. ` : ""}
        {data.name}
      </LeaderboardRowName>
      <LeaderboardRowPlacement className="leaderboard-row-placement">
        {data.placement}
      </LeaderboardRowPlacement>
      <LeaderboardRowKills className="leaderboard-row-kills">
        {data.kills}
      </LeaderboardRowKills>
      <LeaderboardRowPoints className="leaderboard-row-points">
        {data.placement + data.kills}
      </LeaderboardRowPoints>
    </LeaderboardRowContainer>
  )
}

const LeaderboardTeamRow = ({ data, rank }) => {
  const [dropdown, setDropdown] = useState(false)

  const aggregateData = (team) => {
    if (team.players.length > 0) {
      let agg = team.players.reduce((acc, obj) => {
        const kills = acc.kills + obj.kills
        const placement = acc.placement + obj.placement
        return { kills: kills, placement: placement }
      })
      return agg
    } else return { placement: 0, kills: 0 }
  }

  const teamData = useMemo(() => aggregateData(data), [data])

  return (
    <>
      <LeaderboardRowContainer
        onClick={() => setDropdown(!dropdown)}
        className="leaderboard-row-container"
      >
        <LeaderboardRowName
          style={{ cursor: "pointer" }}
          className="leaderboard-row-name"
        >
          {!dropdown && (
            <KeyboardArrowUpIcon
              style={{ fontSize: "100%", paddingRight: "10px" }}
            />
          )}
          {dropdown && (
            <KeyboardArrowDownIcon
              style={{ fontSize: "100%", paddingRight: "10px" }}
            />
          )}
          {rank ? `${rank}. ` : ""}
          {data.name}
        </LeaderboardRowName>
        <LeaderboardRowPlacement className="leaderboard-row-placement">
          {teamData.placement}
        </LeaderboardRowPlacement>
        <LeaderboardRowKills className="leaderboard-row-kills">
          {teamData.kills}
        </LeaderboardRowKills>
        <LeaderboardRowPoints className="leaderboard-row-kills">
          {teamData.placement + teamData.kills}
        </LeaderboardRowPoints>
      </LeaderboardRowContainer>
      {dropdown &&
        data.players.map((player) => {
          return (
            <LeaderboardRow
              className="leaderboard-row"
              key={player.id}
              data={player}
              sub={true}
            />
          )
        })}
    </>
  )
}

const Leaderboard = () => {
  const { type, userId, streamerName, attributes } = useSelector(
    (store) => store.auth
  )
  const { viewing, leaderboardType } = useSelector((store) => store.ui)
  const { users, teams } = useSelector((store) => store.entities)
  const dispatch = useDispatch()

  const sortPlayers = (players, myId, myName, myAttrs, myType) => {
    // object with attribues that we want to sort based on
    let attrArr = Object.entries(players).map(([key, val]) => ({
      id: key,
      name: val.streamerName,
      ...val.attributes,
    }))
    attrArr = attrArr.filter((player) => player.name !== "")
    if (
      myType !== "host" &&
      !Object.entries(attrArr).reduce((agg, [key, val]) => {
        agg = agg || val.id === myId
        return agg
      }, false)
    ) {
      attrArr = attrArr.concat({ id: myId, name: myName, ...myAttrs })
    }
    if (attrArr.length > 0) {
      attrArr.sort((a, b) => b.kills + b.placement - a.kills - a.placement)
      return attrArr
    } else return []
  }

  const sortTeams = (teams, myId, myName, myAttrs) => {
    let teamsArr = Object.entries(teams).map(([key, val]) => ({
      name: key,
      players: val.players
        .filter((x) => users.hasOwnProperty(x))
        .map((player) =>
          myId === player
            ? { id: myId, name: myName, ...myAttrs }
            : {
                id: users[player],
                name: users[player].streamerName,
                ...users[player].attributes,
              }
        ),
    }))
    if (teamsArr.length > 0) {
      teamsArr.sort(
        (a, b) =>
          a.players.reduce((acc, obj) => {
            return acc + obj.kills + obj.placement
          }, 0) +
          b.players.reduce((acc, obj) => {
            return acc + obj.kills + obj.placement
          }, 0)
      )
      return teamsArr
    } else return []
  }

  const sortedPlayers = useMemo(
    () => sortPlayers(users, userId, streamerName, attributes, type),
    [users, userId, streamerName, type]
  )
  const sortedTeams = useMemo(
    () => sortTeams(teams, userId, streamerName, attributes),
    [teams, users]
  )

  return (
    <UIContainer className="ui-container">
      <UIContainerTop className="ui-container-top">
        <UIContainerTitle className="ui-container-title">
          Leaderboard
        </UIContainerTitle>
        <LeaderboardOptions className="leaderboard-options">
          {type === "host" && (
            <LeaderboardButton
              onClick={() =>
                dispatch(
                  uiActions.setViewing({
                    viewing: viewing !== "leaderboard" ? "leaderboard" : null,
                  })
                )
              }
            >
              {viewing === "leaderboard" && <DesktopWindowsIcon />}
              {viewing !== "leaderboard" && <DesktopAccessDisabledIcon />}
            </LeaderboardButton>
          )}
          <LeaderboardButton
            onClick={() => dispatch(uiActions.toggleLeaderboardType())}
          >
            {leaderboardType && <GroupsIcon />}
            {!leaderboardType && <PersonIcon />}
          </LeaderboardButton>
        </LeaderboardOptions>
      </UIContainerTop>
      <LeaderboardList className="leaderboard-list">
        <LeaderboardLabels className="leaderboard-labels">
          <LeaderboardLabelName className="leaderboard-label-name">
            {leaderboardType ? "Team Name" : "Streamer Name"}
          </LeaderboardLabelName>
          <LeaderboardLabelPlacement className="leaderboard-label-placement">
            Placement
          </LeaderboardLabelPlacement>
          <LeaderboardLabelKills className="leaderboard-label-kills">
            Kills
          </LeaderboardLabelKills>
          <LeaderboardLabelPoints className="leaderboard-label-points">
            Points
          </LeaderboardLabelPoints>
        </LeaderboardLabels>
        {/* {data.map((item, i) => {
          return <LeaderboardRow key={i} data={item} />
        })} */}
        {!leaderboardType &&
          sortedPlayers.map((item, i) => {
            return (
              <LeaderboardRow
                classname="leaderboard-row"
                key={item.id}
                data={item}
                rank={i + 1}
              />
            )
          })}
        {leaderboardType &&
          sortedTeams.map((team, i) => {
            return (
              <LeaderboardTeamRow
                classname="leaderboard-team-row"
                key={team.name}
                data={team}
                rank={i + 1}
              />
            )
          })}
      </LeaderboardList>
    </UIContainer>
  )
}

export default Leaderboard
