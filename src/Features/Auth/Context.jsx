import { createContext, useEffect, useReducer } from 'react'
import authReducer, { initialState } from './loginReducer'

export const mainContext = createContext()

const STORAGE_KEY = 'marteelo-auth'

// Load saved users/session so accounts survive a page refresh
function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (saved && Array.isArray(saved.users)) return { ...initialState, ...saved }
  } catch {
    // storage blocked or corrupted -> start fresh
  }
  return initialState
}

function Context({ children }) {
  const [state, authDispatch] = useReducer(authReducer, undefined, loadState)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // ignore (private mode / storage full)
    }
  }, [state])

  // currentUser is derived from the users list, so it is always up to date
  const currentUser = state.users.find((u) => u.email === state.currentUserEmail) || null
  const authState = { ...state, currentUser }

  return (
    <mainContext.Provider value={{ authState, authDispatch }}>
      {children}
    </mainContext.Provider>
  )
}

export default Context