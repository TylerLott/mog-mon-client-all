import React from "react"
import { UIBoolButton } from "../../styles/styleGlobalComponents"

const Button = ({
  type = "button",
  activeText = "",
  disabledText = "",
  track = true,
  handle = () => {},
  children,
}) => {
  return (
    <UIBoolButton type={type} onClick={handle} track={track}>
      {track ? activeText : disabledText}
      {children}
    </UIBoolButton>
  )
}

export default Button
