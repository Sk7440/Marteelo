import Herosection from '../components/layouts/Herosection'
import ProductHeroCarousel from '../data/Products'
import Testimonials from '../data/Reviews'

// Navbar, cart Sidebar and Footer come from Layout, so they are not repeated here
function Home() {
  return (
    <>
      <Herosection />
      <ProductHeroCarousel />
      <Testimonials />
    </>
  )
}

export default Home
