import { useEffect, useState } from "react"
import { Navigate } from 'react-router-dom'
import { useGlobalState } from "../store"

export const UserAuthMiddleware = ({ children }) => {
  const { state: { profile } } = useGlobalState()
  if (!profile.user) {
    return <Navigate to="/user/login" />
  } else {
    return <>{children}</>
  }
}
export const MerchantAuthMiddleware = ({ children }) => {
  const { state: { profile } } = useGlobalState()
  if (!profile.merchant) {
    return <Navigate to="/merchant/login" />
  } else {
    return <>{children}</>
  }
}