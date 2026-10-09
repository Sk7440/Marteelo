import React from 'react'
import { toast } from 'react-toastify';

export const initialState = {
  currentUser: null,
  users: [],
}

let user
export function authReducer(state, action) {
  switch (action.type) {

    case "SIGNUP":
      return {
        ...state,
        users: [...state.users, action.payload],

      };
    case "LOGIN":
      user = state.users.find(
        (ele) =>
          ele.email === action.payload.email &&
          ele.password === action.payload.password
      )
      if (user) {
        return {
          ...state,
          currentUser: user
        };
      } else {
        toast.error("Invalid Credentials")
      }
      break;                                                                               
    default:
  }

}

export default authReducer