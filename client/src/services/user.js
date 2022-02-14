import { useMemo } from "react"
import { useGlobalState } from "../store"
import constants from "../store/constants"
import { AUTH_TYPE, useAxios } from "./http"



export default () => {
  const axios = useAxios()
  const { dispatch } = useGlobalState()
  const userApi = useMemo(() => {
    return {
      register({ username, password, tel }) {
        const body = { username, password, tel }
        return axios.post('/user/register', body, {
          authType: AUTH_TYPE.NO_AUTH
        })
      },
      login({ username, password }) {
        const body = { username, password }
        const loginRequest = axios.post('/user/login', body, {
          authType: AUTH_TYPE.NO_AUTH
        })
        loginRequest.then(({ data }) => {
          // 存储token
          dispatch({ type: constants.SET_USER, payload: data })
        })
        return loginRequest
      },
      logout() {
        dispatch({ type: constants.CLEAR_USER })
        return Promise.resolve('loged out')
      },
      getUserInfo() {
        return axios.get('/user/info', {
          authType: AUTH_TYPE.USER_AUTH
        })
      },
      getUserComments() {
        return axios.get('/user/comment', {
          authType: AUTH_TYPE.USER_AUTH
        })
      },
      getUserOrders() {
        return axios.get('/user/order', {
          authType: AUTH_TYPE.USER_AUTH
        })
      },
      updateProfile({ password, tel, avatarUrl }) {
        const body = { password, tel, avatarUrl }
        for (let key in body) {
          if (!body[key]) delete body[key]
        }
        return axios.put('/user/profile', body, {
          authType: AUTH_TYPE.USER_AUTH
        })
      },
      order({ packageId }) {
        const body = { packageId }
        return axios.post('/user/order', body, {
          authType: AUTH_TYPE.USER_AUTH
        })
      }
    }
  }, [axios])
  return userApi
}