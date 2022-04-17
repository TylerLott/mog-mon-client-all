import styled from "styled-components"
import * as COLORS from "../../styles/colors"

export const TeamRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`
export const TeamNameContainer = styled.div`
  display: flex;
  width: 30%;
  justify-content: flex-start;
  cursor: pointer;
  align-items: center;
  color: ${COLORS.CONTAINER_TEXT_TITLE_COLOR};
`
export const TeamButtonContainer = styled.div`
  display: flex;
  width: 70%;
  justify-content: flex-end;
`

export const TeamName = styled.h2`
  margin-left: 10px;
  font-weight: 400;
  font-size: 1.5em;
  margin: 0;
  padding: 0;
  user-select: none;
`

export const TeamDropdownButton = styled.button`
  background-color: rgba(0, 0, 0, 0);
  color: ${COLORS.CONTAINER_TEXT_TITLE_COLOR};
  border: none;
  cursor: pointer;
`

export const TeamButton = styled.button`
  margin: 0 5px 0 0;
  background-color: rgba(0, 0, 0, 0);
  border: solid 2px ${COLORS.CONTAINER_TEXT_TITLE_COLOR};
  border-radius: 10px;
  cursor: pointer;
  transition: 0.4s;
  color: ${COLORS.CONTAINER_TEXT_TITLE_COLOR};

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`
