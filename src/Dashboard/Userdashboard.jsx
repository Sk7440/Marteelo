import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from 'lucide-react';
import {
  UserOutlined,
  ShoppingOutlined,
  EnvironmentOutlined,
  SettingOutlined,
  LogoutOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  SyncOutlined,
  ArrowRightOutlined,
  CreditCardOutlined
} from '@ant-design/icons';

export default function UserDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Dummy user data
  const user = {
    name: 'Zaryab Khan',
    email: 'zaryab.dev@example.com',
    memberSince: 'March 2024',
    tier: 'Platinum Member',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80'
  };

  const orders = [
    {
      id: 'ORD-98214',
      date: 'Oct 04, 2026',
      total: 189.00,
      status: 'Delivered',
      itemsCount: 2,
      previewImg: 'https://placehold.co/100x100?text=Item+1'
    },
    {
      id: 'ORD-98102',
      date: 'Sep 27, 2026',
      total: 74.50,
      status: 'In Transit',
      itemsCount: 1,
      previewImg: 'https://placehold.co/100x100?text=Item+2'
    },
    {
      id: 'ORD-97554',
      date: 'Aug 14, 2026',
      total: 312.00,
      status: 'Delivered',
      itemsCount: 4,
      previewImg: 'https://placehold.co/100x100?text=Item+3'
    }
  ];

  const addresses = [
    {
      id: 1,
      tag: 'Home (Default)',
      street: 'House 42, Street 8, Sector F-7',
      city: 'Islamabad',
      country: 'Pakistan',
      phone: '+92 300 1234567'
    },
    {
      id: 2,
      tag: 'Office',
      street: 'Suite 302, Tech Heights, Gulberg III',
      city: 'Lahore',
      country: 'Pakistan',
      phone: '+92 321 9876543'
    }
  ];

  return (
    <div className="w-full min-h-screen bg-[#fbfbfd] text-neutral-900 antialiased font-sans">
      {/* Header Section */}
      <section className="border-b border-neutral-200/80 bg-white/70 backdrop-blur-md pt-16 pb-12 px-4 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <button
              onClick={() => navigate(-1)}
              className="p-1 -ml-1 text-neutral-700 hover:text-neutral-950 transition-colors"
              aria-label="Go Back"
            >
              <ArrowLeftIcon className="w-5 h-5" />
            </button>
            <span className="w-2 h-2 rounded-full bg-neutral-900" />
            <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-neutral-500">
              Account Hub
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 rounded-full object-cover border border-neutral-200"
              />
              <div>
                <h1 className="text-2xl sm:text-3xl font-light text-neutral-900">
                  Welcome back, <span className="font-serif italic font-normal">{user.name}</span>
                </h1>
                <p className="text-neutral-500 text-xs font-mono mt-0.5">
                  {user.email} • <span className="text-emerald-700">{user.tier}</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate('/products')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-950 text-white text-xs font-medium uppercase tracking-wider hover:bg-neutral-800 transition-colors self-start sm:self-auto"
            >
              Shop Catalog <ArrowRightOutlined className="text-[10px]" />
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-3 space-y-1">
            <nav className="bg-white rounded-2xl border border-neutral-200/80 p-2 space-y-1">
              {[
                { key: 'overview', label: 'Overview', icon: <UserOutlined /> },
                { key: 'orders', label: 'Order History', icon: <ShoppingOutlined /> },
                { key: 'addresses', label: 'Addresses', icon: <EnvironmentOutlined /> },
                { key: 'settings', label: 'Account Settings', icon: <SettingOutlined /> },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    activeTab === tab.key
                      ? 'bg-neutral-950 text-white'
                      : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                  }`}
                >
                  <span className="text-sm">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}

              <div className="pt-2 border-t border-neutral-100 mt-2">
                <button
                  onClick={() => {}}
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  <LogoutOutlined className="text-sm" />
                  Sign Out
                </button>
              </div>
            </nav>

            <div className="p-4 bg-white/60 rounded-2xl border border-neutral-200/70 text-xs font-mono text-neutral-500">
              <p>Member Since: {user.memberSince}</p>
              <p className="mt-1">Loyalty Points: <strong className="text-neutral-900 font-semibold">1,420 pts</strong></p>
            </div>
          </aside>

          {/* Tab Content Display */}
          <section className="lg:col-span-9 space-y-8">
            
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white rounded-2xl border border-neutral-200/80 p-5">
                    <span className="text-[11px] font-mono uppercase text-neutral-400">Total Spent</span>
                    <div className="text-2xl font-semibold font-mono text-neutral-900 mt-1">$575.50</div>
                    <span className="text-[10px] text-neutral-500">Lifetime purchases</span>
                  </div>

                  <div className="bg-white rounded-2xl border border-neutral-200/80 p-5">
                    <span className="text-[11px] font-mono uppercase text-neutral-400">Total Orders</span>
                    <div className="text-2xl font-semibold font-mono text-neutral-900 mt-1">3 Orders</div>
                    <span className="text-[10px] text-emerald-600">1 active delivery</span>
                  </div>

                  <div className="bg-white rounded-2xl border border-neutral-200/80 p-5">
                    <span className="text-[11px] font-mono uppercase text-neutral-400">Default Payment</span>
                    <div className="text-sm font-medium text-neutral-900 mt-2 flex items-center gap-2 font-mono">
                      <CreditCardOutlined /> •••• 4242
                    </div>
                    <span className="text-[10px] text-neutral-500">Expires 08/28</span>
                  </div>
                </div>

                {/* Recent Orders Overview */}
                <div className="bg-white rounded-2xl border border-neutral-200/80 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-900">
                      Recent Activity
                    </h3>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className="text-xs font-mono text-neutral-500 hover:text-neutral-950 transition-colors"
                    >
                      View All →
                    </button>
                  </div>

                  <div className="divide-y divide-neutral-100">
                    {orders.slice(0, 2).map((order) => (
                      <div key={order.id} className="py-4 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={order.previewImg}
                            alt="Order item"
                            className="w-12 h-12 rounded-xl object-cover bg-neutral-100 border border-neutral-200"
                          />
                          <div>
                            <span className="text-xs font-mono font-medium text-neutral-900">{order.id}</span>
                            <p className="text-[11px] text-neutral-500">{order.date} • {order.itemsCount} items</p>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-xs font-mono font-semibold">${order.total.toFixed(2)}</span>
                          <div className="mt-0.5">
                            <span className={`inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded ${
                              order.status === 'Delivered'
                                ? 'bg-emerald-50 text-emerald-700'
                                : 'bg-amber-50 text-amber-700'
                            }`}>
                              {order.status === 'Delivered' ? <CheckCircleOutlined /> : <SyncOutlined spin />}
                              {order.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ORDERS TAB */}
            {activeTab === 'orders' && (
              <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 space-y-6">
                <div className="border-b border-neutral-200/70 pb-4">
                  <h2 className="text-base font-semibold text-neutral-900">Order History</h2>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    View receipts, shipment timelines, and invoices.
                  </p>
                </div>

                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="p-4 rounded-xl border border-neutral-200/80 hover:border-neutral-300 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={order.previewImg}
                          alt="item"
                          className="w-14 h-14 rounded-xl object-cover bg-neutral-100 border border-neutral-200"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-mono font-bold text-neutral-900">{order.id}</h4>
                            <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                              order.status === 'Delivered'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                          <p className="text-[11px] text-neutral-500 mt-1">Placed on {order.date}</p>
                          <p className="text-[11px] text-neutral-400">{order.itemsCount} Products included</p>
                        </div>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2">
                        <span className="text-sm font-mono font-semibold text-neutral-950">
                          ${order.total.toFixed(2)}
                        </span>
                        <button className="text-xs px-3 py-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-100 font-medium transition-colors">
                          View Order
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ADDRESSES TAB */}
            {activeTab === 'addresses' && (
              <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 space-y-6">
                <div className="flex items-center justify-between border-b border-neutral-200/70 pb-4">
                  <div>
                    <h2 className="text-base font-semibold text-neutral-900">Saved Addresses</h2>
                    <p className="text-xs text-neutral-500 mt-0.5">Manage delivery locations for quick checkout.</p>
                  </div>
                  <button className="px-3.5 py-1.5 rounded-full bg-neutral-950 text-white text-xs font-medium">
                    + Add New
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className="p-5 rounded-xl border border-neutral-200 bg-[#fbfbfd] flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-[10px] font-mono uppercase bg-neutral-200/70 text-neutral-800 px-2 py-0.5 rounded">
                          {addr.tag}
                        </span>
                        <p className="text-xs font-medium text-neutral-900 mt-3">{addr.street}</p>
                        <p className="text-xs text-neutral-500">{addr.city}, {addr.country}</p>
                        <p className="text-xs text-neutral-500 font-mono mt-2">{addr.phone}</p>
                      </div>

                      <div className="flex gap-3 pt-4 mt-4 border-t border-neutral-200/60 text-xs">
                        <button className="text-neutral-600 hover:text-black font-medium">Edit</button>
                        <button className="text-rose-600 hover:text-rose-800 font-medium">Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SETTINGS TAB */}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 space-y-6">
                <div className="border-b border-neutral-200/70 pb-4">
                  <h2 className="text-base font-semibold text-neutral-900">Personal Details</h2>
                  <p className="text-xs text-neutral-500 mt-0.5">Update your basic profile credentials.</p>
                </div>

                <form className="space-y-4 max-w-lg" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-500 mb-1">Full Name</label>
                    <input
                      type="text"
                      defaultValue={user.name}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-neutral-400 bg-neutral-50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-500 mb-1">Email Address</label>
                    <input
                      type="email"
                      defaultValue={user.email}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-neutral-400 bg-neutral-50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-500 mb-1">Contact Number</label>
                    <input
                      type="tel"
                      defaultValue="+92 300 1234567"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-neutral-400 bg-neutral-50 font-mono"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-full bg-neutral-950 text-white text-xs font-medium uppercase tracking-wider hover:bg-neutral-800 transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}

          </section>
        </div>
      </main>
    </div>
  );
}