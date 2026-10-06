import React, { useContext, useReducer } from 'react'
import { createContext } from 'react'
import Reducerfn from './Reducerfn'

export const Cartcontext = createContext()
function Contextapi({children}) {
  const initialState = {
      cart: [],
      totalPrice: 0
    }
    const [state, dispatch] = useReducer(Reducerfn, initialState)

  return (
    <Cartcontext.Provider value={{
           state, dispatch                              
        }
        } >

      {children}
    </Cartcontext.Provider>
  )
}

export default Contextapi