import { useMemo } from "react"
import { AUTH_TYPE, useAxios } from "./http"



export default () => {
  const axios = useAxios()
  // const { state: { profile } } = useStore()
  const commentApi = useMemo(() => {
    return {
      getUserComments() {
        return axios.get('/user/comment', {
          authType: AUTH_TYPE.USER_AUTH
        })
      },
      deletePackageComment({ commentId }) {
        return axios.delete(`/comment/${commentId}`, {
          authType: AUTH_TYPE.USER_AUTH
        })
      },
      getPackageComments({ packageId }) {
        return axios.get(`/package/${packageId}/comment`, {
          authType: AUTH_TYPE.NO_AUTH
        })
      },
      addPackageComment({ packageId, content }) {
        const body = { content }
        return axios.post(`/package/${packageId}/comment`, body, {
          authType: AUTH_TYPE.USER_AUTH
        })
      }
    }
  }, [axios])
  return commentApi
}
