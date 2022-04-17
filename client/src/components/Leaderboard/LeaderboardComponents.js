import styled from "styled-components"
import * as COLORS from "../../styles/colors"

export const LeaderboardOptions = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 100%;
`
export const LeaderboardButton = styled.button`
  background-color: rgba(0, 0, 0, 0);
  border: solid 2px ${COLORS.CONTAINER_TEXT_TITLE_COLOR};
  border-radius: 10px;
  cursor: pointer;
  color: ${COLORS.CONTAINER_TEXT_TITLE_COLOR};
  transition: 0.4s;
  height: 100%;
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`

export const LeaderboardList = styled.div`
  border-bottom: solid 1px ${COLORS.TEXT_COLOR};
`

export const LeaderboardLabels = styled.div`
  display: grid;
  grid-template-columns: 40% 20% 20% 20%;
`
export const LeaderboardLabelName = styled.p`
  grid-column-start: 1;
`
export const LeaderboardLabelPlacement = styled.p`
  grid-column-start: 2;
`
export const LeaderboardLabelKills = styled.p`
  grid-column-start: 3;
`
export const LeaderboardLabelPoints = styled.p`
  grid-column-start: 4;
`

export const LeaderboardRowContainer = styled.div`
  display: grid;
  grid-template-columns: 40% 20% 20% 20%;
  padding: 4px;
  margin: 0;
  border-top: solid 1px ${COLORS.TEXT_COLOR};
`

export const LeaderboardRowName = styled.p`
  margin: 0;
  padding-left: 10px;
  grid-column-start: 1;
  user-select: none;
`
export const LeaderboardRowPlacement = styled.p`
  margin: 0;
  grid-column-start: 2;
`
export const LeaderboardRowKills = styled.p`
  margin: 0;
  grid-column-start: 3;
`
export const LeaderboardRowPoints = styled.p`
  margin: 0;
  grid-column-start: 4;
`
