import React from 'react'
import { data } from '../../data/Products'

function Reducerfn(state, action) {
  console.log(action)
  console.log(state)
  let addProduct;
  switch (action.type) {
    case 'ADDED TO CART':
      addProduct = data.find((ele) => {
        return ele.id == action.payload
      })
      return {
        ...state, cart: [...state.cart, { ...addProduct, qty: 1 }]
      }

      break;
    case 'DELETE FROM CART':
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload)
      };

      break;
    case 'INCREASE QTY':
      return {
        ...state,
        cart: state.cart.map((ele) => {
          if (ele.id === action.payload) {
            return { ...ele, qty: ele.qty + 1 };
          }
          return ele;
        })
      };
      break;
    case 'DECREASE QTY':
      return {
        ...state,
        cart: state.cart.map((ele) => {
          if (ele.id === action.payload) {
            return { ...ele, qty: ele.qty - 1 };
          }
          return ele;
        }).filter((ele) => ele.qty > 0)
      };
      break;
    default:
      break;
  }
}

export default Reducerfn