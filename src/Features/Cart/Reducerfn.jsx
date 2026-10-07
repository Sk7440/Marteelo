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
      ...state, cart:  [...state.cart, {...addProduct, qty: 1}]
    }

      break;
    case 'ADD_TO_CART':

      break;

    default:
      break;
  }
}

export default Reducerfn