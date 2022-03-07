import React, { useContext } from "react"
import { Outlet } from "react-router-dom"
import { UserAuthMiddleware } from "../../middlewares/auth"

const User = () => {
  return (
    <div className="user z-10">
      {/* UserCenter */}
      <Outlet />
    </div>
  )
}

export default () => (
  <UserAuthMiddleware>
    <User />
  </UserAuthMiddleware>
)