import React, { useRef, useEffect, useState } from "react"

const AudioStream = ({ track, muted }) => {
  const audRef = useRef()

  useEffect(() => {
    if (track) {
      audRef.current.srcObject = new MediaStream([track.track])
    }
  })

  return <audio ref={audRef} autoPlay volume="true" muted={muted} />
}

export default AudioStream
