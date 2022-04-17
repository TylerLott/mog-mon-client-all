import styled from "styled-components"
import * as COLORS from "../../styles/colors"

export const TeamsContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const TeamsList = styled.div``
export const TeamsListOptions = styled.form`
  margin-top: 20px;
  display: flex;
`
export const TeamsListAdd = styled.button`
  margin: 0;
  padding: 6px;
  border: none;
  border-radius: 10px 0 0 10px;
  color: ${COLORS.TEXT_COLOR};
  background-color: rgba(236, 18, 123, 0.9);

  &:hover {
    background-color: rgba(236, 18, 123, 1);
  }
`
export const TeamsListAddInput = styled.input`
  width: 100%;
  margin: 0;
  padding: 0 10px 0 10px;
  border-radius: 0 10px 10px 0;
  background-color: ${COLORS.TEXT_COLOR};
  border: none;
  font-size: 1.2em;

  &:focus {
    outline: none;
  }
`
