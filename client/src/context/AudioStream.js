import React, { useRef, useEffect } from "react"

const AudioStream = ({ stream, muted }) => {
  const audRef = useRef()

  useEffect(() => {
    audRef.current.srcObject = stream
  }, [])

  return <audio ref={audRef} autoPlay volume="true" muted={muted} />
}

export default AudioStream
