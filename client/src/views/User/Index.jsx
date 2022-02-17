import React, { useContext } from "react"
import { UserAuthMiddleware } from "../../middlewares/auth"

const User = () => {
  return (
    <div className="user">
      User
    </div>
  )
}

export default () => (
  <UserAuthMiddleware>
    <User />
  </UserAuthMiddleware>
)