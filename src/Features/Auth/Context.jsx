import React, { createContext, useReducer } from 'react'
import authReducer, { loginState } from './loginReducer'

export const mainContext = createContext()

function Context({ children }) {
  const [state, dispatch] = useReducer(authReducer, loginState)

  return (
    <mainContext.Provider value={{ state, dispatch }}>
      {children}
    </mainContext.Provider>
  )
}

export default Context