// Components validate input and show messages; the reducer only updates data.

export const initialState = {
  users: [],               // every registered user (each has their own orders & addresses)
  currentUserEmail: null,  // who is logged in right now
}

const normalizeEmail = (email) => email.trim().toLowerCase()

// Apply a change to the logged-in user only
function updateCurrentUser(state, updater) {
  return {
    ...state,
    users: state.users.map((u) =>
      u.email === state.currentUserEmail ? updater(u) : u
    ),
  }
}

export function authReducer(state, action) {
  switch (action.type) {
    case 'SIGNUP': {
      const email = normalizeEmail(action.payload.email)
      if (state.users.some((u) => u.email === email)) return state
      const newUser = {
        name: action.payload.name.trim(),
        email,
        password: action.payload.password,
        phone: '',
        createdAt: new Date().toISOString(),
        orders: [],
        addresses: [],
      }
      return { ...state, users: [...state.users, newUser] }
    }

    case 'LOGIN':
      return { ...state, currentUserEmail: normalizeEmail(action.payload.email) }

    case 'LOGOUT':
      return { ...state, currentUserEmail: null }

    case 'UPDATE_PROFILE':
      return updateCurrentUser(state, (u) => ({
        ...u,
        name: action.payload.name.trim(),
        phone: action.payload.phone.trim(),
      }))

    case 'ADD_ORDER':
      return updateCurrentUser(state, (u) => ({
        ...u,
        orders: [action.payload, ...u.orders],
      }))

    case 'ADD_ADDRESS':
      return updateCurrentUser(state, (u) => ({
        ...u,
        addresses: [...u.addresses, action.payload],
      }))

    case 'REMOVE_ADDRESS':
      return updateCurrentUser(state, (u) => ({
        ...u,
        addresses: u.addresses.filter((a) => a.id !== action.payload),
      }))

    default:
      return state
  }
}

export default authReducer