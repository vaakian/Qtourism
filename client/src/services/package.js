import { useEffect, useMemo } from "react"
import { AUTH_TYPE, useAxios } from "./http"



export default () => {
  const axios = useAxios()
  // const { state: { profile } } = useStore()
  const packageApi = useMemo(() => {
    return {
      getPackages({ keyword, page } = { keyword: '', page: 1 }) {
        if (typeof keyword === 'undefined') keyword = ''
        if (typeof page === 'undefined') page = 1
        return axios.get('/package', {
          params: { keyword, page },
          authType: AUTH_TYPE.NO_AUTH
        })
      },
      getPackageDetail({ packageId }) {
        return axios.get(`/package/${packageId}`, {
          authType: AUTH_TYPE.NO_AUTH
        })
      }
    }
  }, [axios])
  return packageApi
}