import React from "react"
import TopLogo from "../../components/TopLogo/TopLogo"
import {
  LoginButtonInput,
  LoginForm,
  LoginInput,
  LoginPage,
} from "./LoginComponents"

const Login = ({ handleLogin, handleRoomcode }) => {
  return (
    <LoginPage>
      <TopLogo />
      <LoginForm onSubmit={handleLogin}>
        <LoginInput
          type="text"
          onChange={(e) => {
            handleRoomcode(e.target.value)
          }}
          placeholder="Enter Room Code:"
        />
        <LoginButtonInput type="submit" value="Join" />
      </LoginForm>
    </LoginPage>
  )
}

export default Login
