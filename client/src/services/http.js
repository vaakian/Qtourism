import axios from 'axios'
import { createContext, useContext } from 'react'
import { GlobalContext } from '../store'

export const AxiosContext = createContext()

const BASE_URL = process.env.NODE_ENV === 'production' ? 'https://api.merchant.com' : 'http://localhost:3000'

export const AxiosProvider = ({
  children,
}) => {
  const { profile } = useContext(GlobalContext)
  const axios = useMemo(() => {
    const axios = Axios.create({
      baseURL: BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    // 授权分3种情况：1. 无需token 2. user的token 3. merchant的token
    axios.interceptors.request.use((config) => {
      // const token = profile.user.token || profile.merchant.token
      // if (token) {
      //   config.headers.Authorization = `Bearer ${token}`
      // }

      return config
    })
    return axios
  }, [profile])

  return (
    <AxiosContext.Provider value={axios}>
      {children}
    </AxiosContext.Provider>
  )
}
export const useAxios = () => {
  const axios = useContext(AxiosContext)
  return axios
}