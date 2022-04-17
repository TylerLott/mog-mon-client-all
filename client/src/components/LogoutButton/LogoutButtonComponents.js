import styled from "styled-components"
import * as COLORS from "../../styles/colors"

export const LogoutButtonContainer = styled.div`
  height: 40px;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: ${COLORS.BUTTON_RED};
  border-radius: 2em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0.8;
  transform: 0.4s;

  &:hover {
    opacity: 1;
  }
`
export const LogoutClickButton = styled.button`
  cursor: pointer;
  height: 100%;
  width: 100%;
  margin: 0;
  color: ${COLORS.CONTAINER_TEXT_TITLE_COLOR};
  text-transform: uppercase;
  background-color: rgba(0, 0, 0, 0);
  border: none;
  font-size: 1.5em;
  text-align: center;
`
