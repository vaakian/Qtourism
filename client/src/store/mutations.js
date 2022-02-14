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
      return { ...state, profile: { ...state.profile, user: payload } }
    }
  },
  [constants.SET_MERCHANT](state, payload) {
    if (payload instanceof Object) {
      return { ...state, profile: { ...state.profile, merchant: payload } }
    }
  },
  [constants.SET_STATE](state, payload) {
    if (payload instanceof Object) {
      return payload
    }
  }
}