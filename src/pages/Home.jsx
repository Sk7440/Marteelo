import React from 'react'
import Navbar from '../components/layouts/Navbar'
import Herosection from '../components/layouts/Herosection'
import Footer from '../components/layouts/Footer'
import ProductHeroCarousel from '../data/Products'
import Testimonials from '../data/Reviews'

function Home() {
  return (
    <>
    <Navbar/>
    <Herosection/>
    <ProductHeroCarousel/>
    <Testimonials/>
    <Footer/>
    </>

  )
}

export default Home