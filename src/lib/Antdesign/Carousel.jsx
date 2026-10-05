import React, { useRef, useState } from 'react';
import { Carousel } from 'antd';
import { 
  ArrowRightOutlined, 
  LeftOutlined, 
  RightOutlined,
  CheckCircleFilled
} from '@ant-design/icons';

const products = [
  {
    id: 1,
    category: "Acoustics",
    badge: "New Release",
    name: "Aura Studio",
    edition: "Wireless Hi-Fi",
    description: "Custom 40mm planar magnetic drivers deliver pure harmonic clarity with transparent low-end extension.",
    price: "$349",
    originalPrice: "$420",
    specs: ["45h Playtime", "Adaptive ANC", "Bluetooth 5.3"],
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=2000&q=85",
  },
  {
    id: 2,
    category: "Horology",
    badge: "Limited to 500",
    name: "Monolith IV",
    edition: "Automatic Chrono",
    description: "Hand-finished 316L brushed steel with double-domed anti-reflective sapphire crystal.",
    price: "$890",
    originalPrice: "$1,150",
    specs: ["Swiss Caliber", "100m Depth", "Sapphire Glass"],
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=2000&q=85",
  },
  {
    id: 3,
    category: "Olfactory",
    badge: "Curated",
    name: "Santorini Terra",
    edition: "Extrait de Parfum",
    description: "Sun-drenched Calabrian bergamot, smoked dry vetiver, and mineral amber extracted at 24% concentration.",
    price: "$165",
    originalPrice: "$210",
    specs: ["100ml / 3.4oz", "Hand Poured", "Pure Extract"],
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=2000&q=85",
  },
  {
    id: 4,
    category: "Travel",
    badge: "Essential",
    name: "AeroCarbon",
    edition: "Cabin Spinner",
    description: "Aerospace-grade polycarbonate construction designed to flex without cracking under extreme pressure.",
    price: "$420",
    originalPrice: "$495",
    specs: ["TSA Integrated", "3.1 kg", "Silent Wheels"],
    image: "https://images.unsplash.com/photo-1581553680321-4fffae59fccd?auto=format&fit=crop&w=2000&q=85",
  }
];

export default function Slider() {
  const carouselRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="w-full bg-neutral-950 overflow-hidden relative select-none">
      
      {/* Ant Design Carousel */}
      <Carousel
        ref={carouselRef}
        autoplay={{ dotDuration: true }}
        autoplaySpeed={6000}
        effect="fade"
        beforeChange={(_, next) => setCurrentSlide(next)}
        dots={false} /* Custom indicators used below for human-crafted look */
      >
        {products.map((item) => (
          <div key={item.id} className="relative w-full h-[580px] sm:h-[620px] lg:h-[680px]">
            
            {/* Background Full-Width Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[8000ms] ease-out scale-100 hover:scale-105"
              style={{ backgroundImage: `url(${item.image})` }}
            />

            {/* Natural Vignette & Contrast Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/85 sm:via-neutral-950/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/30" />

            {/* Editorial Content Grid */}
            <div className="relative z-10 h-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 flex flex-col justify-center">
              <div className="max-w-xl">
                
                {/* Meta Header */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-neutral-400">
                    {item.category}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-neutral-600" />
                  <span className="text-[11px] font-medium tracking-wider uppercase text-amber-300/90 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                    {item.badge}
                  </span>
                </div>

                {/* Editorial Typography */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-[1.08] mb-1">
                  {item.name} <span className="font-serif italic font-normal text-neutral-300">{item.edition}</span>
                </h1>

                {/* Subtitle / Description */}
                <p className="mt-4 text-sm sm:text-base text-neutral-300/90 leading-relaxed font-light line-clamp-2 max-w-lg">
                  {item.description}
                </p>

                {/* Mini Hardware Spec Badges */}
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  {item.specs.map((spec, i) => (
                    <span 
                      key={i} 
                      className="inline-flex items-center gap-1.5 text-xs text-neutral-300 bg-neutral-900/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10"
                    >
                      <CheckCircleFilled className="text-[10px] text-neutral-400" />
                      {spec}
                    </span>
                  ))}
                </div>

                {/* Pricing & CTA Line */}
                <div className="mt-8 flex items-center gap-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-semibold tracking-tight text-white font-mono">
                      {item.price}
                    </span>
                    <span className="text-sm font-mono text-neutral-500 line-through">
                      {item.originalPrice}
                    </span>
                  </div>

                  <div className="h-8 w-[1px] bg-white/15" />

                  <div className="flex items-center gap-3">
                    <button className="h-12 px-7 rounded-full bg-white text-neutral-950 text-sm font-medium tracking-tight hover:bg-neutral-200 transition-all duration-200 shadow-[0_0_30px_rgba(255,255,255,0.15)] active:scale-95">
                      Order Now
                    </button>
                    <button className="h-12 w-12 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-white/10 transition-colors active:scale-95">
                      <ArrowRightOutlined className="text-xs" />
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>
        ))}
      </Carousel>

      {/* Human-Crafted Bottom Bar: Slide Counter & Nav Controls */}
      <div className="absolute bottom-8 right-6 sm:right-12 lg:right-16 z-20 flex items-center gap-6 bg-neutral-900/40 backdrop-blur-xl border border-white/10 px-5 py-2.5 rounded-full">
        {/* Dynamic Number Index */}
        <div className="font-mono text-xs text-neutral-400 tracking-wider">
          <span className="text-white font-semibold">0{currentSlide + 1}</span>
          <span className="mx-1.5 text-neutral-600">/</span>
          <span>0{products.length}</span>
        </div>

        <div className="h-3 w-[1px] bg-white/15" />

        {/* Tactile Arrows */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => carouselRef.current?.prev()}
            aria-label="Previous Slide"
            className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <LeftOutlined className="text-xs" />
          </button>
          <button
            onClick={() => carouselRef.current?.next()}
            aria-label="Next Slide"
            className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <RightOutlined className="text-xs" />
          </button>
        </div>
      </div>

      {/* Minimal Progress Bars */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex h-[2px] bg-white/5">
        {products.map((_, i) => (
          <div
            key={i}
            onClick={() => carouselRef.current?.goTo(i)}
            className="flex-1 cursor-pointer relative h-full overflow-hidden"
          >
            <div
              className={`h-full transition-all duration-500 ${
                i === currentSlide ? 'bg-white' : 'bg-transparent hover:bg-white/20'
              }`}
            />
          </div>
        ))}
      </div>

    </div>
  );
}