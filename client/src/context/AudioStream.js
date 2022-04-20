import React, { useRef, useEffect, useState } from "react"

const AudioStream = ({ track, muted }) => {
  const audRef = useRef()
  const [ticker, setTicker] = useState(false)

  useEffect(() => {
    if (track) {
      console.log("trackkkkkk", track)
      audRef.current.srcObject = new MediaStream([track])
    }
    console.log("track in", audRef.current.srcObject)
    setTimeout(() => setTicker(!ticker), 1500)
  }, [ticker])

  return <audio ref={audRef} autoPlay volume="true" muted={false} />
}

export default AudioStream
