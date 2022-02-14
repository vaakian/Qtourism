import React, { useContext } from "react"
import { Outlet } from "react-router-dom"
import { GlobalContext } from "@/store"
import { UserAuthMiddleware } from "../../middlewares/auth"

const User = () => {
  const { state, dispatch } = useContext(GlobalContext)
  return (
    <div className="user">
      {/* Outlet element is for placing Children elements */}
      <Outlet />
    </div>
  )
}

export default () => (
  <UserAuthMiddleware>
    <User />
  </UserAuthMiddleware>
)