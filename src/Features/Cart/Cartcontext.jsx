import { createContext, useEffect, useReducer, useState } from 'react'
import Reducerfn from './Reducerfn'

export const cartContext = createContext()

const STORAGE_KEY = 'marteelo-cart'

// Load the saved cart so it survives a page refresh
function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (saved && Array.isArray(saved.cart)) return saved
  } catch {
    // storage blocked or corrupted -> start with an empty cart
  }
  return { cart: [] }
}

function Contextapi({ children }) {
  const [state, dispatch] = useReducer(Reducerfn, undefined, loadCart)
  const [sideBar, setSidebar] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // ignore (private mode / storage full)
    }
  }, [state])

  function openBar(id) {
    setSidebar(true)
    // Navbar calls openBar() with no id just to open the cart
    if (id !== undefined) dispatch({ type: 'ADDED TO CART', payload: id })
  }

  const cartCount = state.cart.reduce((n, item) => n + item.qty, 0)
  const cartTotal = state.cart.reduce((sum, item) => sum + item.price * item.qty, 0)

  return (
    <cartContext.Provider
      value={{ state, dispatch, sideBar, setSidebar, openBar, cartCount, cartTotal }}
    >
      {children}
    </cartContext.Provider>
  )
}

export default Contextapi
