import React, { useState } from 'react'
import { createContext } from 'react'
export const mainContext = createContext()
function Context({ children }) {
    const [login, setLogin] = useState(false)
  
    return (
        <mainContext.Provider value={{ login, setLogin}}>
            {children}
        </mainContext.Provider>
    )
}

export default Context