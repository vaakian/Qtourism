import React from "react"
import { useEffect } from "react"
import { useRef } from "react"

import backgroundVideo from './bg.mp4'
export default () => {
  // const ref = useRef(null)

  // useEffect(() => {
  //   if (ref.current) {
  //     console.log(ref.current)
  //     ref.current.bind('contextmenu', () => false)
  //   }
  // }, [ref])
  return (
    <div className="video-bg w-full fixed top-0 z-0">
      <video className="w-full" onContextMenu={() => false} src={backgroundVideo} autoPlay loop muted controls={false} />
    </div>
  )
}