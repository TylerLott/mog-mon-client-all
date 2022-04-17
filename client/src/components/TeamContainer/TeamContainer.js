import React, { useState } from "react"
import Team from "../Team/Team"
import {
  TeamsContentContainer,
  TeamsList,
  TeamsListAdd,
  TeamsListAddInput,
  TeamsListOptions,
} from "./TeamContainerComponents"
import AddIcon from "@mui/icons-material/Add"
import {
  UIContainer,
  UIContainerTitle,
  UIContainerTop,
} from "../../styles/styleGlobalComponents"
import { useSelector, useDispatch } from "react-redux"
import { entitiesActions } from "../../store/entitiesSlice"
import { uiActions } from "../../store/uiSlice"

const TeamContainer = () => {
  const [teamInput, setTeamInput] = useState("")
  const { teams } = useSelector((store) => store.entities)
  const { teamname } = useSelector((store) => store.ui)
  const { type, userId } = useSelector((store) => store.auth)
  const dispatch = useDispatch()

  const compareStrings = (a, b) => {
    let la = a.toLowerCase()
    let lb = b.toLowerCase()
    return la < lb ? -1 : la > lb ? 1 : 0
  }

  // only show add team if not part of a team or host

  // handle adding a team (make sure its in middleware)
  //     - make sure the same teamname can't be created again
  const handleTeamAdd = (e) => {
    e.preventDefault()
    // dispatch add team action
    if (teams && Object.keys(teams).includes(teamInput)) {
      window.alert("Team Name already exists")
    } else if (!teamInput || teamInput === "") {
      window.alert("Team Name CANNOT be empty")
    } else {
      if (type === "host") {
        dispatch(
          entitiesActions.submitAddTeam({
            name: teamInput,
            createdBy: userId,
            players: [],
          })
        )
      } else {
        dispatch(
          entitiesActions.submitAddTeam({
            name: teamInput,
            createdBy: userId,
            players: [userId],
          })
        )
        dispatch(
          uiActions.setTeamname({
            teamname: teamInput,
          })
        )
      }
      setTeamInput("")
    }
  }

  return (
    <UIContainer>
      <UIContainerTop>
        <UIContainerTitle>Teams</UIContainerTitle>
      </UIContainerTop>
      <TeamsContentContainer>
        <TeamsList>
          {Object.entries(teams)
            .map(([key, val]) => ({ [key]: val }))
            .sort((a, b) =>
              compareStrings(Object.keys(a)[0], Object.keys(b)[0])
            )
            .map((team) => {
              return (
                <Team
                  key={Object.keys(team)[0]}
                  name={Object.keys(team)[0]}
                  team={team[Object.keys(team)[0]]}
                ></Team>
              )
            })}
        </TeamsList>
        {(!teamname || type === "host") && (
          <TeamsListOptions onSubmit={handleTeamAdd}>
            <TeamsListAdd>
              <AddIcon type="submit" style={{ color: "white" }} />
            </TeamsListAdd>
            <TeamsListAddInput
              type="text"
              value={teamInput}
              onChange={(e) => setTeamInput(e.target.value)}
            ></TeamsListAddInput>
          </TeamsListOptions>
        )}
      </TeamsContentContainer>
    </UIContainer>
  )
}

export default TeamContainer
