import React from "react"
import SubLoading from "../components/SubLoading"


const Fallback = () => {
  return (
    <div className="route-fallback">
      <SubLoading tip="页面加载中" />
    </div>
  )
}

export default Fallback