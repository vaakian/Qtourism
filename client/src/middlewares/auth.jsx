import { useEffect, useState } from "react"
import { Navigate } from 'react-router-dom'

export const UserAuthMiddleware = ({ children }) => {
  const auth = useAuthorization()
  if (!auth.user) {
    return <Navigate to="/user/login" />
  } else {
    return <>{children}</>
  }
}
export const MerchantAuthMiddleware = ({ children }) => {
  const auth = useAuthorization()
  if (!auth.merchant) {
    return <Navigate to="/merchant/login" />
  } else {
    return <>{children}</>
  }
}

export const useAuthorization = () => {
  const [user, setUser] = useState(null)
  const [merchant, setMerchant] = useState(null)
  useEffect(() => {
    const $user = localStorage.getItem('user')
    if ($user) setUser(JSON.parse($user))
    const $merchant = localStorage.getItem('merchant')
    if ($merchant) setMerchant(JSON.parse($merchant))
  }, [])
  return { user, merchant }
}