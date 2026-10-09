import React, { useContext, useMemo } from 'react';
import {
  ShoppingOutlined,
  EyeOutlined,
  StarFilled,
  ArrowRightOutlined
} from '@ant-design/icons';
import { cartContext } from '../Features/Cart/Cartcontext';
import { Products } from "../data/DataofProducts";
import { ArrowLeftIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ProductsPage() {
  const context = useContext(cartContext);
  const openBar = context?.openBar;
  const navigate = useNavigate();

  const safeProducts = useMemo(
    () => (Array.isArray(Products) ? Products : []),
    [Products]
  );

  const handleAddToCart = (item) => {
    if (item.inStock && openBar) {
      openBar(item.id);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#fbfbfd] text-neutral-900 antialiased font-sans">
      {/* Header Section */}
      <section className="border-b border-neutral-200/80 bg-white/70 backdrop-blur-md pt-16 pb-12 px-4 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <button onClick={() => navigate(-1)} aria-label="Go Back">
              <ArrowLeftIcon />
            </button>
            <span className="w-2 h-2 rounded-full bg-neutral-900" />
            <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-neutral-500">
              Complete Catalog
            </span>
          </div>
          <div>
            <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-neutral-900">
              All <span className="font-serif italic font-normal text-neutral-700">Products</span>
            </h1>
            <p className="text-neutral-500 text-sm mt-2 max-w-md">
              Refined essentials designed for everyday performance, longevity, and modern aesthetics.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-10">
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-neutral-200/80 text-xs">
          <span className="font-mono text-neutral-500">
            Showing <strong className="text-neutral-900">{safeProducts.length}</strong> items
          </span>
        </div>

        <section>
          {safeProducts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-neutral-200/80 p-16 text-center">
              <p className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-2">
                No Products Available
              </p>
              <h3 className="text-xl font-light text-neutral-800">
                There are currently no items in the catalog.
              </h3>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-7">
              {safeProducts.map((ele) => {
                const discount =
                  ele.originalPrice && ele.price
                    ? Math.round(((ele.originalPrice - ele.price) / ele.originalPrice) * 100)
                    : 0;

                const firstSpec =
                  ele.specifications && Object.values(ele.specifications).length > 0
                    ? String(Object.values(ele.specifications)[0])
                    : null;

                return (
                  <div
                    key={ele.id}
                    className="group relative flex flex-col bg-white rounded-2xl border border-neutral-200/80 overflow-hidden hover:border-neutral-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300"
                  >
                    <div className="relative aspect-square w-full bg-[#f4f4f6] overflow-hidden">
                      {ele.badge && (
                        <div className="absolute top-3.5 left-3.5 z-10">
                          <span
                            className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-medium tracking-wider uppercase backdrop-blur-md ${
                              ele.badge === 'Out of Stock'
                                ? 'bg-neutral-900/80 text-neutral-300'
                                : ele.badge === 'Sale'
                                ? 'bg-rose-600 text-white'
                                : 'bg-neutral-950/80 text-white'
                            }`}
                          >
                            {ele.badge}
                          </span>
                        </div>
                      )}

                      {discount > 0 && ele.inStock && (
                        <span className="absolute top-3.5 right-3.5 z-10 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                          -{discount}%
                        </span>
                      )}

                      <img
                        src={ele.images?.[0] || 'https://placehold.co/400x400?text=No+Image'}
                        alt={ele.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                        loading="lazy"
                      />

                      <div className="absolute inset-x-3 bottom-3 z-10 flex gap-2 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                        <button
                          disabled={!ele.inStock}
                          onClick={() => handleAddToCart(ele)}
                          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold tracking-wide uppercase transition-colors shadow-lg ${
                            ele.inStock
                              ? 'bg-neutral-950 text-white hover:bg-neutral-800 active:scale-98'
                              : 'bg-neutral-300 text-neutral-500 cursor-not-allowed shadow-none'
                          }`}
                        >
                          <ShoppingOutlined className="text-sm" />
                          {ele.inStock ? 'Add to Cart' : 'Sold Out'}
                        </button>
                        <button
                          type="button"
                          aria-label="Quick View"
                          className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/95 text-neutral-700 hover:text-black hover:bg-white border border-neutral-200 shadow-lg active:scale-98 transition-colors"
                        >
                          <EyeOutlined className="text-sm" />
                        </button>
                      </div>
                    </div>

                    <div className="p-4 sm:p-5 flex flex-col flex-1">
                      <div className="flex items-center justify-between text-xs text-neutral-500 mb-1.5 font-mono">
                        <span className="uppercase tracking-wider text-[11px] truncate max-w-[65%]">
                          {ele.brand}
                        </span>
                        <span className="flex items-center gap-1 text-neutral-700 font-medium">
                          <StarFilled className="text-amber-400 text-[10px]" />
                          {ele.rating}
                        </span>
                      </div>

                      <h3 className="text-sm font-medium text-neutral-900 line-clamp-1 group-hover:text-blue-600 transition-colors mb-2">
                        {ele.name}
                      </h3>

                      <div className="text-[11px] text-neutral-500 line-clamp-1 mb-4">
                        {ele.category} {firstSpec ? `• ${firstSpec}` : ''}
                      </div>

                      <div className="mt-auto pt-3 border-t border-neutral-100 flex items-baseline justify-between">
                        <div className="flex items-baseline gap-2">
                          <span className="text-base sm:text-lg font-semibold text-neutral-950 font-mono">
                            ${Number(ele.price || 0).toFixed(2)}
                          </span>
                          {ele.originalPrice && (
                            <span className="text-xs text-neutral-400 line-through font-mono">
                              ${Number(ele.originalPrice).toFixed(2)}
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
          )}
        </section>
      </main>
    </div>
  );
}