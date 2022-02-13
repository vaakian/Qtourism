import React, { useContext } from "react"
import { GlobalContext } from "@/store"
import constants from "@/store/constants"



const UserInfo = () => {
  const { state, dispatch } = useContext(GlobalContext)
  return (
    <div className="userInfo">
      <div>state: {state.isLoading.toString()}</div>
      <button
        onClick={() => dispatch({
          type: constants.TOGGLE_LOADING
        })}>SET</button>
    </div>
  )
}

export default UserInfo