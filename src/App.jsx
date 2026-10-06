import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Singup from './pages/Singup'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import About from './pages/About'
import Products from './pages/Products'
import Contextapi from './Features/Cart/Cartcontext'

function App() {
  return (
    <><Contextapi>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/signup" element={<Singup />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </Contextapi>

    </>
  )
}

export default App