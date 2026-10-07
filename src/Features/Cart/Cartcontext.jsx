import React, { useReducer, useState } from 'react'
import { createContext } from 'react'
import Reducerfn from './Reducerfn'
import { data } from '../../data/Products'
export const cartContext = createContext()
function Contextapi({ children }) {

  const initialState = {
    cart: [],
    totalPrice: 0
  }
  const [state, dispatch] = useReducer(Reducerfn, initialState)
  const [sideBar, setSidebar] = useState(false)

  function openBar(id) {

    setSidebar(true)

 
    dispatch({type:"ADDED TO CART",payload:id})



  }

  return (
    <cartContext.Provider value={{
      state, dispatch, sideBar, setSidebar, openBar
    }
    } >

      {children}
    </cartContext.Provider>
  )
}

export default Contextapi