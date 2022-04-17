import styled from "styled-components"
import * as COLORS from "../../styles/colors"

const TEXT_COLOR = "white"

export const ButtonContainer = styled.div`
  padding: 25px;
  height: 40px;
  width: 100%;
  padding: 10px;
  margin: 10px 10px 0px 10px;
  background-color: ${(props) => props.col};
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
export const ClickButton = styled.button`
  cursor: pointer;
  height: 100%;
  width: 100%;
  margin: 0;
  color: ${TEXT_COLOR};
  text-transform: uppercase;
  background-color: rgba(0, 0, 0, 0);
  border: none;
  font-size: 1.5em;
  text-align: center;
`
