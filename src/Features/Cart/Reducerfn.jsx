import { data } from '../../data/Products'

function Reducerfn(state, action) {
  switch (action.type) {
    case 'ADDED TO CART': {
      const product = data.find((ele) => ele.id == action.payload)
      if (!product) return state

      // Already in cart -> increase qty instead of adding a duplicate row
      const exists = state.cart.some((ele) => ele.id === product.id)
      if (exists) {
        return {
          ...state,
          cart: state.cart.map((ele) =>
            ele.id === product.id ? { ...ele, qty: ele.qty + 1 } : ele
          ),
        }
      }
      return { ...state, cart: [...state.cart, { ...product, qty: 1 }] }
    }

    case 'DELETE_FROM_CART':
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter((ele) => ele.id !== action.payload),
      }

    case 'INCREASE_QTY':
      return {
        ...state,
        cart: state.cart.map((ele) =>
          ele.id === action.payload ? { ...ele, qty: ele.qty + 1 } : ele
        ),
      }

    case 'DECREASE_QTY':
      return {
        ...state,
        cart: state.cart
          .map((ele) =>
            ele.id === action.payload ? { ...ele, qty: ele.qty - 1 } : ele
          )
          .filter((ele) => ele.qty > 0),
      }

    default:
      return state
  }
}

export default Reducerfn
