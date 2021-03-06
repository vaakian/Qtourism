import mutations from "./mutations"

const initializeProfile = () => {
  const userProfile = localStorage.getItem("userProfile")
  const merchantProfile = localStorage.getItem("merchantProfile")
  return {
    user: JSON.parse(userProfile || null),
    merchant: JSON.parse(merchantProfile || null)
  }
}

export const initialState = {
  isLoading: false,
  profile: initializeProfile()
}

export function globalReducer(state, action) {
  const mutation = mutations[action.type]
  if (mutation) {
    return mutation(state, action.payload)
  }
  throw new Error(`Invalid action type: ${action.type}`)
}