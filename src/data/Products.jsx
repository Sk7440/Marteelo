import React, { useContext, useState } from 'react';
import { 
  ShoppingOutlined, 
  EyeOutlined, 
  StarFilled, 
  ArrowRightOutlined 
} from '@ant-design/icons';
import { Cartcontext } from '../Features/Cart/Cartcontext';

const data = [
  {
    id: 1,
    sku: "TECH-AUD-001",
    name: "Apex Wireless Noise-Canceling Headphones",
    category: "Electronics",
    brand: "SoundPulse",
    price: 249.99,
    originalPrice: 299.99,
    currency: "USD",
    inStock: true,
    inventory: 45,
    rating: 4.8,
    reviewCount: 1240,
    badge: "Best Seller",
    description: "High-fidelity wireless over-ear headphones featuring hybrid active noise cancellation, 40-hour battery life, and ultra-plush memory foam earcups.",
    tags: ["audio", "wireless", "anc", "bluetooth"],
    specifications: {
      batteryLife: "40 hours",
      connectivity: "Bluetooth 5.3",
      weight: "250g",
      warranty: "2 years"
    },
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80"
    ]
  },
  {
    id: 2,
    sku: "TECH-WAT-002",
    name: "Vanguard Titan Smartwatch",
    category: "Wearables",
    brand: "Chronos Tech",
    price: 199.99,
    originalPrice: 249.99,
    currency: "USD",
    inStock: true,
    inventory: 28,
    rating: 4.6,
    reviewCount: 856,
    badge: "Sale",
    description: "Rugged GPS smartwatch with titanium bezel, sapphire crystal screen, heart rate tracking, and 50m water resistance.",
    tags: ["smartwatch", "fitness", "waterproof", "gps"],
    specifications: {
      display: "1.4-inch AMOLED",
      batteryLife: "14 days",
      waterResistance: "5 ATM",
      compatibility: "iOS & Android"
    },
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80"
    ]
  },
  {
    id: 3,
    sku: "LIF-BTL-003",
    name: "HydroShield Insulated Stainless Steel Tumbler",
    category: "Home & Kitchen",
    brand: "ThermoCraft",
    price: 34.50,
    originalPrice: 40.00,
    currency: "USD",
    inStock: true,
    inventory: 110,
    rating: 4.9,
    reviewCount: 2150,
    badge: "Popular",
    description: "Double-wall vacuum-insulated stainless steel water bottle keeping drinks ice cold for 24 hours or piping hot for 12 hours.",
    tags: ["eco-friendly", "tumbler", "hydration", "kitchen"],
    specifications: {
      capacity: "32 oz (950 ml)",
      material: "18/8 Food-Grade Stainless Steel",
      bpaFree: true,
      dishwasherSafe: true
    },
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1000&q=80"
    ]
  },
  {
    id: 4,
    sku: "FSH-BAG-004",
    name: "Nomad Urban Waxed Canvas Backpack",
    category: "Bags & Luggage",
    brand: "TrailMark",
    price: 115.00,
    originalPrice: 140.00,
    currency: "USD",
    inStock: true,
    inventory: 19,
    rating: 4.7,
    reviewCount: 432,
    badge: "New Arrival",
    description: "Water-resistant waxed canvas backpack with genuine leather trim, padded 16-inch laptop compartment, and ergonomic shoulder straps.",
    tags: ["travel", "backpack", "laptop bag", "vintage"],
    specifications: {
      dimensions: "45 x 30 x 15 cm",
      laptopFit: "Up to 16 inches",
      volume: "22 Liters",
      material: "Waterproof Cotton Canvas & Full-Grain Leather"
    },
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80"
    ]
  },
  {
    id: 5,
    sku: "TECH-KEY-005",
    name: "KeyFlow Mechanical Wireless Keyboard",
    category: "Computer Accessories",
    brand: "TactileWorks",
    price: 129.99,
    originalPrice: 159.99,
    currency: "USD",
    inStock: false,
    inventory: 0,
    rating: 4.8,
    reviewCount: 680,
    badge: "Out of Stock",
    description: "Compact 75% mechanical keyboard featuring hot-swappable tactile brown switches, RGB per-key backlighting, and aluminum chassis.",
    tags: ["gaming", "keyboard", "rgb", "productivity"],
    specifications: {
      layout: "75% ANSI",
      switches: "Gateron Brown (Hot-swappable)",
      connectivity: "2.4GHz Wireless, Bluetooth 5.0, USB-C",
      batteryCapacity: "4000 mAh"
    },
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80"
    ]
  },
  {
    id: 6,
    sku: "FSH-SNK-006",
    name: "Strata Aero Knit Running Shoes",
    category: "Footwear",
    brand: "FleetSport",
    price: 89.95,
    originalPrice: 120.00,
    currency: "USD",
    inStock: true,
    inventory: 64,
    rating: 4.5,
    reviewCount: 512,
    badge: "Sale",
    description: "Ultra-breathable running sneakers engineered with responsive energy-return foam soles and seamless knit upper for marathon comfort.",
    tags: ["running", "shoes", "fitness", "sneakers"],
    specifications: {
      weight: "210g per shoe",
      closure: "Lace-up",
      soleMaterial: "EVA Foam & High-Grip Rubber",
      terrain: "Road / Track"
    },
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80"
    ]
  },
  {
    id: 7,
    sku: "LIF-BOT-007",
    name: "Amber Noir Botanical Eau de Parfum",
    category: "Beauty & Personal Care",
    brand: "Maison Atelier",
    price: 145.00,
    originalPrice: 175.00,
    currency: "USD",
    inStock: true,
    inventory: 35,
    rating: 4.9,
    reviewCount: 380,
    badge: "Limited Edition",
    description: "Rich artisanal unisex fragrance featuring intoxicating top notes of black pepper and bergamot, balanced by a deep cedarwood and amber base.",
    tags: ["fragrance", "perfume", "luxury", "beauty"],
    specifications: {
      volume: "100 ml (3.4 fl oz)",
      concentration: "Eau de Parfum (20% oil)",
      origin: "Grasse, France",
      crueltyFree: true
    },
    images: [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=80"
    ]
  },
  {
    id: 8,
    sku: "HOM-LAM-008",
    name: "Lumière Minimalist LED Desk Lamp",
    category: "Home Decor",
    brand: "NordicModern",
    price: 68.00,
    originalPrice: 85.00,
    currency: "USD",
    inStock: true,
    inventory: 52,
    rating: 4.7,
    reviewCount: 290,
    badge: "Staff Pick",
    description: "Sleek matte-black architectural desk lamp with stepless touch dimming, 5 color temperature modes, and an integrated 10W wireless phone charger.",
    tags: ["lighting", "home office", "minimalist", "wireless charging"],
    specifications: {
      powerOutput: "12W LED",
      brightness: "800 Lumens",
      colorTemperatures: "2700K - 6500K",
      wirelessCharger: "Qi-Certified 10W"
    },
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80"
    ]
  }
];

export default function FeaturedProducts() {
    const { dispatch } = useContext(Cartcontext);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(data.map((item) => item.category)))];

  const filteredData = selectedCategory === "All" 
    ? data 
    : data.filter((item) => item.category === selectedCategory);

  return (
    <section className="w-full bg-[#fbfbfd] text-neutral-900 py-16 sm:py-24 px-4 sm:px-8 lg:px-12 antialiased">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-neutral-200/80 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-neutral-900" />
              <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-neutral-500">
                Curated Collection
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-neutral-900">
              Featured <span className="font-serif italic font-normal text-neutral-700">Products</span>
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {categories.slice(0, 5).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-tight whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === cat
                    ? "bg-neutral-950 text-white shadow-sm"
                    : "bg-white text-neutral-600 border border-neutral-200 hover:border-neutral-400"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {filteredData.map((ele) => {
            const discount = ele.originalPrice
              ? Math.round(((ele.originalPrice - ele.price) / ele.originalPrice) * 100)
              : 0;

            return (
              <div 
                key={ele.id} 
                className="group relative flex flex-col bg-white rounded-2xl border border-neutral-200/80 overflow-hidden hover:border-neutral-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300"
              >
                {/* Image Canvas Container */}
                <div className="relative aspect-square w-full bg-[#f4f4f6] overflow-hidden">
                  
                  {/* Badge */}
                  {ele.badge && (
                    <div className="absolute top-3.5 left-3.5 z-10">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-medium tracking-wider uppercase backdrop-blur-md ${
                        ele.badge === "Out of Stock"
                          ? "bg-neutral-900/80 text-neutral-300"
                          : ele.badge === "Sale"
                          ? "bg-rose-600 text-white"
                          : "bg-neutral-950/80 text-white"
                      }`}>
                        {ele.badge}
                      </span>
                    </div>
                  )}

                  {/* Savings Chip */}
                  {discount > 0 && ele.inStock && (
                    <span className="absolute top-3.5 right-3.5 z-10 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                      -{discount}%
                    </span>
                  )}

                  {/* Product Picture */}
                  <img
                    src={ele.images[0]}
                    alt={ele.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />

                  {/* Slide-Up Quick Actions Bar on Hover */}
                  <div className="absolute inset-x-3 bottom-3 z-10 flex gap-2 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                    <button
                      disabled={!ele.inStock}
                      onClick={()=>{dispatch({type:"ADD_TO_CART",payload:ele})}}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold tracking-wide uppercase transition-colors shadow-lg ${
                        ele.inStock
                          ? "bg-neutral-950 text-white hover:bg-neutral-800 active:scale-98"
                          : "bg-neutral-300 text-neutral-500 cursor-not-allowed shadow-none"
                      }`}
                    >
                      <ShoppingOutlined className="text-sm" />
                      {ele.inStock ? "Add to Cart" : "Sold Out"}
                    </button>
                    <button 
                      aria-label="Quick View"
                      className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/95 text-neutral-700 hover:text-black hover:bg-white border border-neutral-200 shadow-lg active:scale-98 transition-colors"
                    >
                      <EyeOutlined className="text-sm" />
                    </button>
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-4 sm:p-5 flex flex-col flex-1">
                  
                  {/* Category & Brand + Rating */}
                  <div className="flex items-center justify-between text-xs text-neutral-500 mb-1.5 font-mono">
                    <span className="uppercase tracking-wider text-[11px] truncate max-w-[65%]">
                      {ele.brand}
                    </span>
                    <span className="flex items-center gap-1 text-neutral-700 font-medium">
                      <StarFilled className="text-amber-400 text-[10px]" />
                      {ele.rating}
                    </span>
                  </div>

                  {/* Product Title */}
                  <h3 className="text-sm font-medium text-neutral-900 line-clamp-1 group-hover:text-blue-600 transition-colors mb-2">
                    {ele.name}
                  </h3>

                  {/* Short Spec Chip */}
                  <div className="text-[11px] text-neutral-500 line-clamp-1 mb-4">
                    {ele.category} • {Object.values(ele.specifications)[0]}
                  </div>

                  {/* Pricing Row */}
                  <div className="mt-auto pt-3 border-t border-neutral-100 flex items-baseline justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-base sm:text-lg font-semibold text-neutral-950 font-mono">
                        ${ele.price.toFixed(2)}
                      </span>
                      {ele.originalPrice && (
                        <span className="text-xs text-neutral-400 line-through font-mono">
                          ${ele.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    <span className="text-[11px] font-mono text-neutral-400 group-hover:text-neutral-950 transition-colors flex items-center gap-1">
                      Details <ArrowRightOutlined className="text-[9px]" />
                    </span>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom CTA / Link */}
        <div className="mt-14 text-center">
          <button className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-neutral-300 text-xs font-semibold uppercase tracking-wider text-neutral-900 hover:bg-neutral-950 hover:text-white hover:border-neutral-950 transition-all duration-200">
            View All Collection ({data.length})
            <ArrowRightOutlined className="text-xs" />
          </button>
        </div>

      </div>
    </section>
  );
}