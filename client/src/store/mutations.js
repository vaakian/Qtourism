import constants from "./constants"

export default {
  [constants.SET_LOADING](state, payload) {
    if (typeof payload === 'boolean') {
      return { ...state, isLoading: payload }
    }
    throw new Error('Invalid payload')
  },
  [constants.TOGGLE_LOADING](state) {
    return { ...state, isLoading: !state.isLoading }
  },
  [constants.SET_USER](state, payload) {
    if (payload instanceof Object) {
      if (!payload.avatar_url) payload.avatar_url = `https://joeschmoe.io/api/v1/${payload.username}`
      localStorage.setItem('userProfile', JSON.stringify(payload))
      return { ...state, profile: { ...state.profile, user: payload } }
    }
  },
  [constants.CLEAR_USER](state) {
    localStorage.removeItem('userProfile')
    return { ...state, profile: { ...state.profile, user: null } }
  },
  [constants.SET_MERCHANT](state, payload) {
    if (payload instanceof Object) {
      localStorage.setItem('merchantProfile', JSON.stringify(payload))
      return { ...state, profile: { ...state.profile, merchant: payload } }
    }
  },
  [constants.CLEAR_MERCHANT](state) {
    localStorage.removeItem('merchantProfile')
    return { ...state, profile: { ...state.profile, merchant: null } }
  },
  [constants.SET_STATE](state, payload) {
    if (payload instanceof Object) {
      return payload
    }
  }
}