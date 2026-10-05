import React, { useState } from 'react';
import { 
  StarFilled, 
  CheckCircleFilled, 
  ArrowRightOutlined, 
  LeftOutlined, 
  RightOutlined 
} from '@ant-design/icons';

const testimonialsData = [
  {
    id: 1,
    author: "Elena Rostova",
    role: "Audio Engineer & Producer",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    purchasedProduct: "Apex Wireless Noise-Canceling Headphones",
    rating: 5,
    date: "2 weeks ago",
    verified: true,
    title: "Remarkable frequency separation",
    quote: "I use these alongside $1,000 studio monitors for reference checks. The mid-range neutrality and soundstage clarity are honestly unbelievable at this price point."
  },
  {
    id: 2,
    author: "Marcus Vance",
    role: "Trail Marathoner",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    purchasedProduct: "Vanguard Titan Smartwatch",
    rating: 5,
    date: "1 month ago",
    verified: true,
    title: "100+ miles on a single charge",
    quote: "Finished a 50-mile ridge run with GPS on continuous tracking and finished the day with 68% battery remaining. The titanium bezel has taken several rock hits with zero scuffs."
  },
  {
    id: 3,
    author: "Sophia Chen",
    role: "Architectural Designer",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    purchasedProduct: "Lumière Minimalist LED Desk Lamp",
    rating: 5,
    date: "3 weeks ago",
    verified: true,
    title: "Understated, pure form",
    quote: "The anodized aluminum finish matches my drafting table seamlessly. The warm color temperature mode eliminates all eye fatigue during late-night blueprint work."
  },
  {
    id: 4,
    author: "David K.",
    role: "Software Architect",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    purchasedProduct: "KeyFlow Mechanical Wireless Keyboard",
    rating: 5,
    date: "4 days ago",
    verified: true,
    title: "Tactile perfection right out of the box",
    quote: "The custom brown switches are smooth with just the right tactile bump. Zero latency over 2.4GHz wireless and the chassis has a reassuring, solid heft."
  },
  {
    id: 5,
    author: "Amara Okonjo",
    role: "Creative Director",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    purchasedProduct: "Nomad Urban Waxed Canvas Backpack",
    rating: 5,
    date: "2 months ago",
    verified: true,
    title: "Develops character with age",
    quote: "Already took this through rainy London commutes and airline overhead bins. The waxed canvas repels torrential rain and is gaining a gorgeous natural patina."
  },
  {
    id: 6,
    author: "Julian Meier",
    role: "Sommelier",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80",
    purchasedProduct: "Amber Noir Botanical Eau de Parfum",
    rating: 5,
    date: "1 week ago",
    verified: true,
    title: "Nuanced, smoky dry-down",
    quote: "Not overpowering like synthetic department store fragrances. Opens with sharp pink pepper, settles into an intoxicating, warm cedarwood that lingers all evening."
  }
];

export default function Testimonials() {
  const [filterRating, setFilterRating] = useState('all');

  const filteredTestimonials = filterRating === 'all'
    ? testimonialsData
    : testimonialsData.filter((item) => item.rating === Number(filterRating));

  return (
    <section className="w-full bg-[#fbfbfd] text-neutral-900 py-16 sm:py-24 px-4 sm:px-8 lg:px-12 border-b border-neutral-200/80 antialiased">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Block with Trust Metrics */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between pb-8 mb-12 border-b border-neutral-200/80 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-neutral-900" />
              <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-neutral-500">
                Verified Reviews
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-neutral-900">
              Trusted by <span className="font-serif italic font-normal text-neutral-700">Creators & Collectors</span>
            </h2>
          </div>

          {/* Social Proof Stats Counter */}
          <div className="flex items-center gap-6 sm:gap-10">
            <div>
              <div className="flex items-baseline gap-1.5 font-mono text-2xl sm:text-3xl font-semibold text-neutral-900">
                <span>4.85</span>
                <span className="text-sm text-neutral-400 font-normal">/ 5.0</span>
              </div>
              <div className="flex items-center gap-1 text-amber-500 text-xs mt-1">
                {[...Array(5)].map((_, i) => (
                  <StarFilled key={i} />
                ))}
                <span className="text-neutral-500 font-sans text-xs ml-1 font-medium">Over 4,200 Reviews</span>
              </div>
            </div>

            <div className="h-10 w-[1px] bg-neutral-200 hidden sm:block" />

            <div className="hidden sm:block">
              <div className="font-mono text-2xl sm:text-3xl font-semibold text-neutral-900">
                98.4%
              </div>
              <p className="text-xs text-neutral-500 font-medium mt-1">
                Repeat purchase satisfaction
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials Masonry/Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredTestimonials.map((item) => (
            <div 
              key={item.id}
              className="bg-white rounded-2xl border border-neutral-200/80 p-6 sm:p-7 flex flex-col justify-between hover:border-neutral-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300"
            >
              <div>
                {/* Rating Stars & Relative Date */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400 text-xs">
                    {[...Array(item.rating)].map((_, i) => (
                      <StarFilled key={i} />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-neutral-400">
                    {item.date}
                  </span>
                </div>

                {/* Review Headline & Body */}
                <h3 className="text-base font-medium text-neutral-900 tracking-tight mb-2.5">
                  "{item.title}"
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed font-light mb-6">
                  {item.quote}
                </p>
              </div>

              {/* Bottom Meta: Purchased Product Tag + Reviewer Profile */}
              <div className="pt-4 border-t border-neutral-100">
                {/* Purchased Product Tag */}
                <div className="mb-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-50 border border-neutral-200/60 text-[11px] text-neutral-600 font-mono">
                  <span className="text-neutral-400">Purchased:</span>
                  <span className="font-medium text-neutral-800 truncate max-w-[210px]">
                    {item.purchasedProduct}
                  </span>
                </div>

                {/* Author Details */}
                <div className="flex items-center gap-3">
                  <img 
                    src={item.avatar} 
                    alt={item.author} 
                    className="w-10 h-10 rounded-full object-cover border border-neutral-200"
                    loading="lazy"
                  />
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold text-neutral-900 tracking-tight">
                        {item.author}
                      </span>
                      {item.verified && (
                        <span title="Verified Customer" className="flex items-center text-emerald-600 text-[11px]">
                          <CheckCircleFilled />
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-neutral-400 font-light">
                      {item.role}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Footer Guarantee Strip */}
        <div className="mt-14 pt-8 border-t border-neutral-200/80 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-neutral-700">
              <CheckCircleFilled className="text-emerald-600 text-xs" />
              100% Real Customer Submissions
            </span>
            <span>•</span>
            <span>Unfiltered & Verified Order Logs</span>
          </div>

          <button className="inline-flex items-center gap-1.5 text-neutral-900 font-semibold hover:text-neutral-600 transition-colors">
            Read all 4,200+ reviews
            <ArrowRightOutlined className="text-[10px]" />
          </button>
        </div>

      </div>
    </section>
  );
}