import Axios from 'axios'
import { createContext, useContext, useMemo } from 'react'
import { GlobalContext } from '../store'
export const AUTH_TYPE = {
  NO_AUTH: 0,
  USER_AUTH: 1,
  MERCHANT_AUTH: 2,
}
export const AxiosContext = createContext()

const BASE_URL = process.env.NODE_ENV === 'production' ? 'https://api.merchant.com' : '/api'

const camelToSnakeCase = str => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
const transformObject = (obj) => {
  if (typeof obj !== 'object' || obj === null) return
  for (let key in obj) {
    const newKey = camelToSnakeCase(key)
    if (newKey !== key) {
      obj[newKey] = obj[key]
      delete obj[key]
    }
  }
}

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
      console.log('requesting', config)
      const { authType } = config
      if (authType === AUTH_TYPE.NO_AUTH) {
        let token = ''
        if (authType === AUTH_TYPE.USER_AUTH) token = profile.user.token
        else if (authType === AUTH_TYPE.MERCHANT_AUTH) token = profile.merchant.token
        if (token === '') {
          // cancel request

          return config
        }
        config.headers.Authorization = `Bearer ${token}`
      }

      return config
    })
    // TODO: 驼峰转下划线，body或者params
    axios.interceptors.request.use((config) => {
      console.log({ config })
      transformObject(config.data)
      transformObject(config.params)
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

