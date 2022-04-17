import React from "react"
import {
  UIContainer,
  UIContainerTitle,
  UIContainerTop,
} from "../../styles/styleGlobalComponents"

const BlankContainer = ({ children, title }) => {
  return (
    <UIContainer>
      <UIContainerTop>
        <UIContainerTitle>{title}</UIContainerTitle>
      </UIContainerTop>
      {children}
    </UIContainer>
  )
}

export default BlankContainer
