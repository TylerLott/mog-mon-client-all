import styled from "styled-components"
import * as COLORS from "../../styles/colors"

export const LoginPage = styled.div`
  width: 80vw;
  height: 50vh;
  min-width: 600px;
  max-width: 1200px;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
`
export const LoginInput = styled.input`
  width: 40vw;
  min-width: 400px;
  max-width: 500px;
  height: 80px;
  margin-bottom: 20px;
  border-radius: 5em;
  text-align: center;
  font-size: 1.5em;
`
export const LoginButtonInput = styled.input`
  height: 80px;
  border-radius: 5em;
  font-size: 2em;
  background-color: ${COLORS.BUTTON_COLOR};
  transition: 0.4s;
  border: none;

  &:hover {
    background-color: ${COLORS.BUTTON_HOVER};
  }
`
