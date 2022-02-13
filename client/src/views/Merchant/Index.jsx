import React from "react"
import { Outlet } from "react-router-dom"

const Merchant = () => {
  return (
    <div className="merchant">
      Merchant!
      <Outlet />
    </div>
  )
}

export default Merchant