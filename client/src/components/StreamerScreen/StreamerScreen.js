import { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import { useDispatch, useSelector } from "react-redux"
import { uiActions } from "../../store/uiSlice"
import { animations } from "../StreamView/StreamViewStyles.js"

const StreamerScreen = (props) => {
  const [containerEl] = useState(document.createElement("div"))
  containerEl.className = "new-div"
  containerEl.setAttribute("style", "width: 100vw; height: 100vh;")
  let externalWindow = null
  const { showStream } = useSelector((store) => store.ui)
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(uiActions.showStream())
  }

  useEffect(
    () => {
      externalWindow = window.open(
        "",
        "",
        `width=1920,height=1080,left=0,top=0`,
        "resizeable=1"
      )

      let css = externalWindow.document.createElement("style")
      css.setAttribute("type", "text/css")
      css.appendChild(
        externalWindow.document.createTextNode(animations.toString())
      )
      externalWindow.document.head.appendChild(css)
      externalWindow.document.body.appendChild(containerEl)
      externalWindow.document.body.setAttribute("style", "margin:0")
      return function cleanup() {
        if (!showStream) {
          handleClose()
        }
        externalWindow.close()
        externalWindow = null
      }
    },
    // Only re-renders this component if the variable changes
    []
  )
  return ReactDOM.createPortal(props.children, containerEl)
}

export default StreamerScreen
