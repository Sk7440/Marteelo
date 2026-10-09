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
import Checkout from './pages/Checkout'
import ProductsPage from './pages/Products'
import UserDashboard from './Dashboard/Userdashboard'

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
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/Products" element={<ProductsPage />} />
          <Route path="/User" element={<UserDashboard />} />

        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </Contextapi>

    </>
  )
}

export default App