// import { useReducer } from "react"
import mutations from "./mutations"


export const initialState = {
  isLoading: false,
  authorization: {
    user: null,
    merchant: null,
  }
}

export function globalReducer(state, action) {
  const mutation = mutations[action.type]
  if (mutation) {
    return mutation(state, action.payload)
  }
  throw new Error(`Invalid action type: ${action.type}`)
}