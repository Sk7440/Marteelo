import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Singup from './pages/Singup'
import About from './pages/About'
import ProductsPage from './pages/Products'
import Checkout from './pages/Checkout'
import UserDashboard from './Dashboard/Userdashboard'
import Layout from './components/layouts/Layout'
import Contextapi from './Features/Cart/Cartcontext'

// Start every new page at the top instead of keeping the old scroll position
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function App() {
  return (
    <Contextapi>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Singup />} />
            <Route path="about" element={<About />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="user" element={<UserDashboard />} />
            {/* Unknown URLs go back to the home page */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer position="bottom-right" autoClose={2500} />
    </Contextapi>
  )
}

export default App
