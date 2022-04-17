import styled from "styled-components"
import * as COLORS from "./colors"

// Page components
export const PageContainer = styled.div`
  width: 80vw;
  min-width: 600px;
  max-width: 1200px;
`

// UI Components
export const UIContainer = styled.div`
  margin-top: 20px;
  padding: 25px;
  background-color: ${COLORS.BACKGROUND_COLOR};
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  outline: 2px solid ${COLORS.TEXT_COLOR};
  outline-offset: -10px;
  background-size: 20px 20px;
  color: ${COLORS.TEXT_COLOR};
  background-image: linear-gradient(
      0deg,
      ${COLORS.CONTAINER_GRID_LINES} 1px,
      transparent 1px
    ),
    linear-gradient(90deg, ${COLORS.CONTAINER_GRID_LINES} 1px, transparent 1px);
`
export const UIContainerTop = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`
export const UIContainerTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 0;
  font-size: 2em;
  color: ${COLORS.TEXT_COLOR};
`
export const UIContainerSubTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 0;
  font-size: 1.2em;
  white-space: nowrap;
  margin-right: 10px;
  color: ${COLORS.TEXT_COLOR};
`
export const UIContainerText = styled.p``

export const UIInput = styled.input``

export const UIBoolButton = styled.button`
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
  font-size: 1.5em;
  text-align: center;
  justify-content: center;
  transition: 0.3s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`

export const UIButton = styled.button``
