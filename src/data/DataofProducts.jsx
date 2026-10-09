export const Products = [
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

export default Products;