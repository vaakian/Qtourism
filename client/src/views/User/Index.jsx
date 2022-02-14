import React, { useContext } from "react"
import { Outlet } from "react-router-dom"
import { UserAuthMiddleware } from "../../middlewares/auth"
import { useGlobalState } from "../../store"

const User = () => {
  return (
    <div className="user">
      <h1>用户首页</h1>
      <Outlet />
    </div>
  )
}

export default () => (
  <UserAuthMiddleware>
    <User />
  </UserAuthMiddleware>
)