import React, { useContext } from "react"
import { GlobalContext } from "@/store"
import constants from "@/store/constants"
import { useGlobalState } from "../../store"



const UserInfo = () => {
  const { state, dispatch } = useGlobalState()
  return (
    <div className="userProfile">
      <h1>UserProfile</h1>
      <pre>{JSON.stringify(state.profile.user, null, 2)}</pre>
      <button
        onClick={() => dispatch({
          type: constants.CLEAR_USER
        })}>LOGOUT</button>
    </div>
  )
}

export default UserInfo