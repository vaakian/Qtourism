import { useMemo } from "react"
import { useGlobalState } from "../store"
import constants from "../store/constants"
import { AUTH_TYPE, useAxios } from "./http"



export default () => {
  const axios = useAxios()
  const { dispatch } = useGlobalState()
  const merchantApi = useMemo(() => {
    return {
      register({ username, password, tel, description }) {
        const body = { username, password, tel, description }
        return axios.post('/merchant/register', body, {
          authType: AUTH_TYPE.NO_AUTH
        })
      },
      login({ username, password }) {
        const params = { username, password }
        const loginRequest = axios.post('/merchant/login', {
          params,
          authType: AUTH_TYPE.NO_AUTH
        })
        loginRequest.then(({ data }) => {
          // 存储Profile
          dispatch({ type: constants.SET_MERCHANT, payload: data })
        })
      },
      logout() {
        dispatch({ type: constants.CLEAR_MERCHANT })
      },
      addPackage({ name, description, price, banner_url }) {
        const body = { name, description, price, banner_url }
        return axios.post('/merchant/package', body, {
          authType: AUTH_TYPE.MERCHANT_AUTH
        })
      },
      deletePackage({ packageId }) {
        return axios.delete(`/merchant/package/${packageId}`, {
          authType: AUTH_TYPE.MERCHANT_AUTH
        })
      },
      getMerchantPackages({ keyword, page } = { keyword: '', page: 1 }) {
        return axios.get('/merchant/package', {
          params: { keyword, page },
          authType: AUTH_TYPE.MERCHANT_AUTH
        })
      },
      getMerchantOrders({ packageId, page } = { packageId: '', page: 1 }) {
        return axios.get('/merchant/order', {
          params: { packageId, page },
          authType: AUTH_TYPE.MERCHANT_AUTH
        })
      }
    }
  }, [axios])
  return merchantApi
}