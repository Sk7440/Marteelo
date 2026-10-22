import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

function Layout() {
    return (
        <>
            <Navbar />
            <Sidebar />
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout
