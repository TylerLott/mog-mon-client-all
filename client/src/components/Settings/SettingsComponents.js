import styled from "styled-components"

const BG_COLOR = "#505050"
const TITLE_COLOR = "#d0d0d0"
const TEXT_COLOR = "#A0A0A0"
const SUBMIT_COLOR = "#58cced"
const SUBMIT_COLOR_HOV = "#3895D3"

export const SettingsContainer = styled.div`
  margin-top: 20px;
  padding: 25px;
  border-radius: 30px;
  background-color: ${BG_COLOR};
`

export const SettingsTopContainer = styled.div`
  display: flex;
  justify-content: space-between;
`
export const SettingsTitle = styled.h1`
  margin-top: 0;
  margin-bottom: 20px;
  color: ${TITLE_COLOR};
`

export const SettingsFormContainer = styled.div``
export const SettingsForm = styled.form`
  display: flex;
  flex-direction: column;
`
export const SettingsFormRow = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`
export const SettingsLabel = styled.label`
  width: 30%;
  text-transform: uppercase;
  font-size: 1.2em;
  font-weight: 600;
  color: ${TEXT_COLOR};
`
export const SettingsInput = styled.input`
  width: 70%;
  height: 20px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 1em;
  text-align: center;
  border: solid 2px black;
  color: ${TEXT_COLOR};
`
export const SettingsButton = styled.button`
  margin-top: 20px;
  height: 40px;
  border-radius: 2em;
  border: solid 3px ${(props) => props.col};
  color: ${(props) => props.col};
  font-weight: 600;
  font-size: 1.3em;
  background-color: rgba(0, 0, 0, 0);
  transition: 0.4s;
  text-transform: uppercase;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`

export const SettingsInputButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`

export const SettingsInputButton = styled.input`
  margin-top: 30px;
  width: 30%;
  height: 40px;
  border-radius: 2em;
  border: solid 3px ${SUBMIT_COLOR};
  color: ${SUBMIT_COLOR};
  background-color: rgba(0, 0, 0, 0);
  transition: 0.4s;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 1.3em;

  &:hover {
    border-color: ${SUBMIT_COLOR_HOV};
    background-color: rgba(0, 0, 0, 0.1);
    color: ${SUBMIT_COLOR_HOV};
  }

  &:disabled {
    background-color: rgba(0, 0, 0, 1);
    color: gray;
    border-color: gray;
    text-decoration: line-through;
  }
`

export const SettingsFrozen = styled.div``

export const SettingsFrozenRow = styled.div`
  display: flex;
`
export const SettingsFrozenRowIcon = styled.div`
  display: flex;
  justify-content: space-around;
  padding-top: 20px;
`
export const SettingsFrozenLabel = styled.h1`
  font-size: 1.3em;
  margin: 0;
  margin-right: 20px;
  color: ${TEXT_COLOR};
`
export const SettingsFrozenField = styled.h2`
  margin: 0;
  font-size: 1.2em;
  color: ${TITLE_COLOR};
`

export const SettingsFrozenIconContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const SettingsFrozenIconTitle = styled.h2`
  font-size: 1.2em;
  color: ${TEXT_COLOR};
  margin: 4px;
`
