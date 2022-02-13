import { createContext, useReducer, useContext, useCallback } from "react"
import constants from "./constants"
import { globalReducer, initialState } from "./reducer"

export const GlobalContext = createContext({ state: initialState, dispatch: null })


export const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState)
  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  )
}


export const StateEditor = () => {
  const { state, dispatch } = useContext(GlobalContext)
  const handleChange = useCallback(e => {
    try {
      const newState = JSON.parse(e.target.value)
      dispatch({
        type: constants.SET_STATE,
        payload: newState
      })
    } catch (err) {
      console.log(`invalid JSON: ${err.message}`)
    }
  }, [dispatch])
  return (
    <div className="stateEditor">
      <textarea
        cols="30"
        rows="10"
        onBlur={handleChange}
        defaultValue={JSON.stringify(state, null, 2)}
        style={{ position: 'fixed', bottom: 0, right: 0 }}
      >
      </textarea>
    </div >
  )
}