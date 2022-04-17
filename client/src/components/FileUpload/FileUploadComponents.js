import styled from "styled-components"
import * as COLORS from "../../styles/colors"

export const FileForm = styled.form`
  display: flex;
  justify-content: space-around;
`
export const FileLabel = styled.label`
  cursor: pointer;
  height: 1em;
  padding: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-right: 5px;
  width: 100%;
  color: ${COLORS.BUTTON_RED};
  background-color: rgba(0, 0, 0, 0);
  border-radius: 1em;
  text-transform: uppercase;
  background-color: rgba(0, 0, 0, 0);
  border: 3px solid ${COLORS.BUTTON_RED};
  font-size: 1em;
  text-align: center;
  justify-content: center;
  transition: 0.3s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`
export const FileInput = styled.input`
  &[type="file"] {
    display: none;
  }
`
export const FileSubmit = styled.button`
  cursor: pointer;
  height: 2em;
  padding: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-right: 5px;
  width: 100%;
  color: ${(props) =>
    props.track ? COLORS.BUTTON_GREEN : COLORS.BUTTON_COLOR};
  background-color: rgba(0, 0, 0, 0);
  border-radius: 1em;
  text-transform: uppercase;
  background-color: rgba(0, 0, 0, 0);
  border: 3px solid
    ${(props) => (props.track ? COLORS.BUTTON_GREEN : COLORS.BUTTON_COLOR)};
  font-size: 1em;
  text-align: center;
  justify-content: center;
  transition: 0.3s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`
