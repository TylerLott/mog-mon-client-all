import styled from "styled-components"
import * as COLORS from "../../styles/colors"

export const PlayerRowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px;
`
export const PlayerRowName = styled.h2`
  padding: 0;
  margin: 0;
  color: ${COLORS.CONTAINER_TEXT_COLOR};
  font-size: 1.2em;
`
export const PlayerRowOptions = styled.div`
  display: flex;
  justify-content: flex-end;
`
export const PlayerRowOptionsButton = styled.button`
  margin: 0 5px 0 0;
  background-color: rgba(0, 0, 0, 0);
  border: solid 2px ${COLORS.CONTAINER_TEXT_COLOR};
  color: ${COLORS.CONTAINER_TEXT_COLOR};
  border-radius: 10px;
  cursor: pointer;
  transition: 0.4s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`

export const PlayerRowStats = styled.div`
  display: flex;
  justify-content: space-between;
`
