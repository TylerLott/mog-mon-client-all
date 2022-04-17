import React from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { authActions } from "../../store/authSlice"
import {
  LogoutButtonContainer,
  LogoutClickButton,
} from "./LogoutButtonComponents"

const LogoutButton = () => {
  let nav = useNavigate()
  const dispatch = useDispatch()

  return (
    <LogoutButtonContainer>
      <LogoutClickButton
        onClick={() => {
          if (
            window.confirm(
              "Are you sure you want to Logout? \nYOU WILL LOSE ALL GAME DATA."
            )
          ) {
            window.localStorage.setItem("mondays-roomcode", null)
            window.localStorage.setItem("mondays-userId", null)
            window.localStorage.setItem("mondays-timestamp", null)
            dispatch(authActions.logout())
            nav("/")
          }
        }}
      >
        Logout
      </LogoutClickButton>
    </LogoutButtonContainer>
  )
}

export default LogoutButton
