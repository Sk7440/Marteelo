import React from 'react'
import { ToastContainer } from 'react-toastify'
import Home from './pages/Home'
import Login from './pages/Login'
import Singup from './pages/Singup'
function App() {
    return (
        <>
            <Login />
            <Singup/>
            <Home />
            <ToastContainer position='bottom-center' />


        </>
    )
}

export default App