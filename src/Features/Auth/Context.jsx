import React, { createContext, useReducer } from 'react'
import authReducer, { initialState } from './loginReducer'

export const mainContext = createContext()

function Context({ children }) {
  const [authState, authDispatch] = useReducer(authReducer,initialState)

  return (
    <mainContext.Provider value={{ authState, authDispatch}}>
      {children}
    </mainContext.Provider> 
  )
}

export default Context