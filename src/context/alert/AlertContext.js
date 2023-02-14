import { createContext, useReducer } from 'react';
import alertReducer from "./AlertReducer"

const AlertContext = createContext()

export const AlertProvider = ({ children }) => {
  const TIMEOUT_SEC = process.env.REACT_APP_TIMEOUT_SEC

  const initialState = null

  const [state, dispatch] = useReducer(alertReducer, initialState)

  // Set an alert
  const setAlert = (msg, type) => {
    dispatch({
      type: "SET_ALERT",
      payload: { msg, type },
    })

    setTimeout(() => dispatch({ type: "REMOVE_ALERT" }), TIMEOUT_SEC * 1000)
  }

  return (
    <AlertContext.Provider value=
      {{
        alert: state,
        setAlert
      }}>
      {children}
    </AlertContext.Provider>
  )
}

export default AlertContext