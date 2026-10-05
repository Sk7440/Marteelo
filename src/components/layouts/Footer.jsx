import React, { useState } from 'react';
import { 
  ArrowRightOutlined, 
  CheckCircleFilled,
  GlobalOutlined
} from '@ant-design/icons';
import { 
  RiInstagramLine, 
  RiTwitterXLine, 
  RiYoutubeLine, 
  RiGithubLine 
} from 'react-icons/ri';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="w-full bg-[#0a0a0c] text-neutral-400 font-sans border-t border-neutral-900 pt-16 pb-12 px-6 sm:px-12 lg:px-16 antialiased">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Section: Brand Statement & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-neutral-900">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-xl font-semibold tracking-tight text-white">
              Marteelo
            </h2>
            <p className="text-sm text-neutral-400 font-light leading-relaxed max-w-sm">
              Purpose-built hardware, precision horology, and olfactory extracts crafted with industrial integrity.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs font-mono text-neutral-500">
              <span className="flex items-center gap-1.5 text-neutral-300">
                <CheckCircleFilled className="text-[11px] text-emerald-500" /> Carbon Neutral Shipping
              </span>
              <span>•</span>
              <span>Global Dispatch</span>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="max-w-md lg:ml-auto w-full">
              <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-neutral-400 block mb-2">
                The Marteelo Dispatch
              </span>
              <p className="text-xs text-neutral-500 mb-4 font-light">
                Receive release notes, archive previews, and rare batch drops. No promotional spam.
              </p>

              {subscribed ? (
                <div className="py-2.5 px-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono flex items-center gap-2">
                  <CheckCircleFilled /> You have been subscribed to seasonal dispatches.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 bg-neutral-900 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500 transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-lg bg-white text-neutral-950 text-xs font-medium tracking-tight hover:bg-neutral-200 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                  >
                    Join
                    <ArrowRightOutlined className="text-[10px]" />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-14 border-b border-neutral-900 text-xs">
          
          {/* Column 1 */}
          <div className="space-y-3">
            <p className="font-mono text-[11px] uppercase tracking-wider text-neutral-200">
              Collection
            </p>
            <ul className="space-y-2.5">
              <li><a href="#acoustics" className="hover:text-white transition-colors">Acoustic Series</a></li>
              <li><a href="#timepieces" className="hover:text-white transition-colors">Horology & Watches</a></li>
              <li><a href="#fragrance" className="hover:text-white transition-colors">Botanical Extracts</a></li>
              <li><a href="#travel" className="hover:text-white transition-colors">Modular Carry</a></li>
              <li><a href="#workspace" className="hover:text-white transition-colors">Studio Hardware</a></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="space-y-3">
            <p className="font-mono text-[11px] uppercase tracking-wider text-neutral-200">
              Company
            </p>
            <ul className="space-y-2.5">
              <li><a href="#atelier" className="hover:text-white transition-colors">The Atelier</a></li>
              <li><a href="#sustainability" className="hover:text-white transition-colors">Material Manifesto</a></li>
              <li><a href="#careers" className="hover:text-white transition-colors">Careers <span className="text-[10px] text-neutral-500 font-mono">02</span></a></li>
              <li><a href="#press" className="hover:text-white transition-colors">Press Inquiries</a></li>
              <li><a href="#stockists" className="hover:text-white transition-colors">Stockists</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="space-y-3">
            <p className="font-mono text-[11px] uppercase tracking-wider text-neutral-200">
              Concierge
            </p>
            <ul className="space-y-2.5">
              <li><a href="#order-status" className="hover:text-white transition-colors">Track Shipment</a></li>
              <li><a href="#returns" className="hover:text-white transition-colors">Returns & Exchange</a></li>
              <li><a href="#warranty" className="hover:text-white transition-colors">Lifetime Warranty</a></li>
              <li><a href="#servicing" className="hover:text-white transition-colors">Hardware Servicing</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact Concierge</a></li>
            </ul>
          </div>

          {/* Column 4: System & Region */}
          <div className="space-y-3">
            <p className="font-mono text-[11px] uppercase tracking-wider text-neutral-200">
              Region & Currency
            </p>
            <div className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800 space-y-2">
              <div className="flex items-center justify-between text-neutral-300">
                <span className="flex items-center gap-1.5">
                  <GlobalOutlined className="text-xs" /> Global / English
                </span>
                <span className="text-neutral-500 font-mono text-[10px]">USD ($)</span>
              </div>
              <p className="text-[11px] text-neutral-500 font-light">
                Duties and local taxes calculated at checkout.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Socials */}
        <div className="pt-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <div>
            &copy; {new Date().getFullYear()} Marteelo Design Labs Inc. All rights reserved.
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4 text-sm text-neutral-400">
            <a href="#instagram" aria-label="Instagram" className="hover:text-white transition-colors">
              <RiInstagramLine />
            </a>
            <a href="#twitter" aria-label="X" className="hover:text-white transition-colors">
              <RiTwitterXLine />
            </a>
            <a href="#youtube" aria-label="YouTube" className="hover:text-white transition-colors">
              <RiYoutubeLine />
            </a>
            <a href="#github" aria-label="GitHub" className="hover:text-white transition-colors">
              <RiGithubLine />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}