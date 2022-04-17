import React from "react"
import { ReactComponent as TopSVG } from "../../icons/mogulMondays.svg"

const HostView = React.forwardRef((props, ref) => (
  <div
    style={{
      height: "100%",
      width: "100%",
    }}
  >
    <div
      style={{
        position: "absolute",
        padding: "2% 3% 1% 3%",
        left: "3%",
        bottom: "0",
        width: "20%",
        backgroundColor: "black",
        borderRadius: "20px 20px 0 0",
      }}
    >
      <TopSVG
        style={{
          width: "100%",
        }}
      />
    </div>
    <video
      style={{
        height: "100%",
        width: "100%",
      }}
      ref={ref}
      muted
      autoPlay
      playsInline
    />
  </div>
))

export default HostView
