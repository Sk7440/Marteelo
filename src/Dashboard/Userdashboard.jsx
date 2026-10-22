import { useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ArrowLeftIcon } from 'lucide-react';
import {
  UserOutlined,
  ShoppingOutlined,
  EnvironmentOutlined,
  SettingOutlined,
  LogoutOutlined,
  SyncOutlined,
  ArrowRightOutlined,
  DownOutlined,
  UpOutlined,
} from '@ant-design/icons';
import { mainContext } from '../Features/Auth/Context';

const TABS = [
  { key: 'overview', label: 'Overview', icon: <UserOutlined /> },
  { key: 'orders', label: 'Order History', icon: <ShoppingOutlined /> },
  { key: 'addresses', label: 'Addresses', icon: <EnvironmentOutlined /> },
  { key: 'settings', label: 'Account Settings', icon: <SettingOutlined /> },
];

const EMPTY_ADDRESS = { tag: 'Home', street: '', city: '', country: 'Pakistan', phone: '' };

const fieldClass =
  'w-full text-xs px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-neutral-400 bg-neutral-50';

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

const initials = (name) =>
  name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('');

function StatusBadge({ status }) {
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-amber-50 text-amber-700">
      <SyncOutlined spin /> {status || 'Processing'}
    </span>
  );
}

function EmptyState({ title, text, action, onAction }) {
  return (
    <div className="text-center py-12 border border-dashed border-neutral-200 rounded-2xl">
      <p className="text-sm font-medium text-neutral-800">{title}</p>
      <p className="text-xs text-neutral-500 mt-1">{text}</p>
      {action && (
        <button
          onClick={onAction}
          className="mt-4 px-4 py-2 rounded-full bg-neutral-950 text-white text-xs font-medium hover:bg-neutral-800 transition-colors"
        >
          {action}
        </button>
      )}
    </div>
  );
}

// One order row with an expandable details panel
function OrderCard({ order, expanded, onToggle }) {
  const itemsCount = order.items.reduce((n, i) => n + i.qty, 0);
  return (
    <div className="rounded-xl border border-neutral-200/80 hover:border-neutral-300 transition-colors">
      <div className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={order.items[0]?.images?.[0]}
            alt={order.items[0]?.name || 'Order item'}
            className="w-14 h-14 rounded-xl object-cover bg-neutral-100 border border-neutral-200"
          />
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-mono font-bold text-neutral-900">{order.id}</h4>
              <StatusBadge status={order.status} />
            </div>
            <p className="text-[11px] text-neutral-500 mt-1">Placed on {formatDate(order.placedAt)}</p>
            <p className="text-[11px] text-neutral-400">{itemsCount} {itemsCount === 1 ? 'item' : 'items'}</p>
          </div>
        </div>

        <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2">
          <span className="text-sm font-mono font-semibold text-neutral-950">${order.total.toFixed(2)}</span>
          <button
            onClick={onToggle}
            className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-100 font-medium transition-colors"
          >
            {expanded ? 'Hide details' : 'View order'} {expanded ? <UpOutlined /> : <DownOutlined />}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="border-t border-neutral-100 p-4 grid sm:grid-cols-2 gap-5 text-xs">
          <div className="space-y-2">
            <p className="font-mono uppercase text-[10px] text-neutral-400">Items</p>
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between gap-3">
                <span className="text-neutral-700 truncate">{item.name} × {item.qty}</span>
                <span className="font-mono">${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
            <div className="pt-2 border-t border-neutral-100 space-y-1">
              <div className="flex justify-between text-neutral-500">
                <span>Subtotal</span><span className="font-mono">${order.subtotal.toFixed(2)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Discount ({order.promo})</span><span className="font-mono">-${order.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-semibold">
                <span>Total</span><span className="font-mono">${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <div>
            <p className="font-mono uppercase text-[10px] text-neutral-400 mb-2">Shipping to</p>
            <p className="text-neutral-900 font-medium">{order.shipping.fullName}</p>
            <p className="text-neutral-500 leading-relaxed">
              {order.shipping.address}{order.shipping.apartment && `, ${order.shipping.apartment}`}<br />
              {order.shipping.city}, {order.shipping.state} {order.shipping.postalCode}<br />
              {order.shipping.country}<br />
              <span className="font-mono">{order.shipping.phone}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function UserDashboard() {
  const navigate = useNavigate();
  const { authState, authDispatch } = useContext(mainContext);
  const user = authState.currentUser;

  const [activeTab, setActiveTab] = useState('overview');
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState(EMPTY_ADDRESS);
  const [profile, setProfile] = useState({ name: user?.name || '', phone: user?.phone || '' });

  // Only logged-in users can see the dashboard
  if (!user) return <Navigate to="/login" replace />;

  const orders = user.orders;
  const totalSpent = orders.reduce((sum, o) => sum + o.total, 0);
  const memberSince = new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  function handleSignOut() {
    authDispatch({ type: 'LOGOUT' });
    toast.info('You have been signed out');
    navigate('/');
  }

  function handleAddAddress(e) {
    e.preventDefault();
    if (!newAddress.street.trim() || !newAddress.city.trim()) {
      toast.error('Street and city are required');
      return;
    }
    authDispatch({ type: 'ADD_ADDRESS', payload: { ...newAddress, id: Date.now() } });
    setNewAddress(EMPTY_ADDRESS);
    setShowAddressForm(false);
    toast.success('Address saved');
  }

  function handleSaveProfile(e) {
    e.preventDefault();
    if (profile.name.trim().length < 2) {
      toast.error('Please enter your full name');
      return;
    }
    authDispatch({ type: 'UPDATE_PROFILE', payload: profile });
    toast.success('Profile updated');
  }

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
            <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-neutral-500">Account Hub</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-neutral-950 text-white flex items-center justify-center text-lg font-semibold">
                {initials(user.name)}
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-light text-neutral-900">
                  Welcome back, <span className="font-serif italic font-normal">{user.name}</span>
                </h1>
                <p className="text-neutral-500 text-xs font-mono mt-0.5">{user.email}</p>
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
              {TABS.map((tab) => (
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
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  <LogoutOutlined className="text-sm" />
                  Sign Out
                </button>
              </div>
            </nav>

            <div className="p-4 bg-white/60 rounded-2xl border border-neutral-200/70 text-xs font-mono text-neutral-500">
              <p>Member since: {memberSince}</p>
            </div>
          </aside>

          {/* Tab Content Display */}
          <section className="lg:col-span-9 space-y-8">
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white rounded-2xl border border-neutral-200/80 p-5">
                    <span className="text-[11px] font-mono uppercase text-neutral-400">Total Spent</span>
                    <div className="text-2xl font-semibold font-mono text-neutral-900 mt-1">${totalSpent.toFixed(2)}</div>
                    <span className="text-[10px] text-neutral-500">Lifetime purchases</span>
                  </div>

                  <div className="bg-white rounded-2xl border border-neutral-200/80 p-5">
                    <span className="text-[11px] font-mono uppercase text-neutral-400">Total Orders</span>
                    <div className="text-2xl font-semibold font-mono text-neutral-900 mt-1">
                      {orders.length} {orders.length === 1 ? 'Order' : 'Orders'}
                    </div>
                    <span className="text-[10px] text-neutral-500">Placed with this account</span>
                  </div>

                  <div className="bg-white rounded-2xl border border-neutral-200/80 p-5">
                    <span className="text-[11px] font-mono uppercase text-neutral-400">Saved Addresses</span>
                    <div className="text-2xl font-semibold font-mono text-neutral-900 mt-1">{user.addresses.length}</div>
                    <span className="text-[10px] text-neutral-500">For faster checkout</span>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-neutral-200/80 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-900">Recent Activity</h3>
                    {orders.length > 0 && (
                      <button
                        onClick={() => setActiveTab('orders')}
                        className="text-xs font-mono text-neutral-500 hover:text-neutral-950 transition-colors"
                      >
                        View All →
                      </button>
                    )}
                  </div>

                  {orders.length === 0 ? (
                    <EmptyState
                      title="No orders yet"
                      text="Your orders will appear here after checkout."
                      action="Start shopping"
                      onAction={() => navigate('/products')}
                    />
                  ) : (
                    <div className="divide-y divide-neutral-100">
                      {orders.slice(0, 3).map((order) => (
                        <div key={order.id} className="py-4 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <img
                              src={order.items[0]?.images?.[0]}
                              alt={order.items[0]?.name || 'Order item'}
                              className="w-12 h-12 rounded-xl object-cover bg-neutral-100 border border-neutral-200"
                            />
                            <div>
                              <span className="text-xs font-mono font-medium text-neutral-900">{order.id}</span>
                              <p className="text-[11px] text-neutral-500">
                                {formatDate(order.placedAt)} • {order.items.reduce((n, i) => n + i.qty, 0)} items
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-mono font-semibold">${order.total.toFixed(2)}</span>
                            <div className="mt-0.5"><StatusBadge status={order.status} /></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ORDERS TAB */}
            {activeTab === 'orders' && (
              <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 space-y-6">
                <div className="border-b border-neutral-200/70 pb-4">
                  <h2 className="text-base font-semibold text-neutral-900">Order History</h2>
                  <p className="text-xs text-neutral-500 mt-0.5">Every order placed while signed in to this account.</p>
                </div>

                {orders.length === 0 ? (
                  <EmptyState
                    title="No orders yet"
                    text="Place an order while logged in and it will show up here."
                    action="Browse products"
                    onAction={() => navigate('/products')}
                  />
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <OrderCard
                        key={order.id}
                        order={order}
                        expanded={expandedOrder === order.id}
                        onToggle={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ADDRESSES TAB */}
            {activeTab === 'addresses' && (
              <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 space-y-6">
                <div className="flex items-center justify-between border-b border-neutral-200/70 pb-4">
                  <div>
                    <h2 className="text-base font-semibold text-neutral-900">Saved Addresses</h2>
                    <p className="text-xs text-neutral-500 mt-0.5">Your first address is pre-filled at checkout.</p>
                  </div>
                  {!showAddressForm && (
                    <button
                      onClick={() => setShowAddressForm(true)}
                      className="px-3.5 py-1.5 rounded-full bg-neutral-950 text-white text-xs font-medium hover:bg-neutral-800"
                    >
                      + Add New
                    </button>
                  )}
                </div>

                {showAddressForm && (
                  <form onSubmit={handleAddAddress} className="p-5 rounded-xl border border-neutral-200 bg-[#fbfbfd] grid sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="addr-tag" className="block text-[11px] font-mono uppercase text-neutral-500 mb-1">Label</label>
                      <select
                        id="addr-tag"
                        value={newAddress.tag}
                        onChange={(e) => setNewAddress({ ...newAddress, tag: e.target.value })}
                        className={fieldClass}
                      >
                        <option>Home</option>
                        <option>Office</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="addr-phone" className="block text-[11px] font-mono uppercase text-neutral-500 mb-1">Phone</label>
                      <input
                        id="addr-phone"
                        type="tel"
                        value={newAddress.phone}
                        onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                        placeholder="0300 1234567"
                        className={fieldClass + ' font-mono'}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="addr-street" className="block text-[11px] font-mono uppercase text-neutral-500 mb-1">Street address</label>
                      <input
                        id="addr-street"
                        value={newAddress.street}
                        onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                        placeholder="House 12, Street 5, Gulberg III"
                        className={fieldClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="addr-city" className="block text-[11px] font-mono uppercase text-neutral-500 mb-1">City</label>
                      <input
                        id="addr-city"
                        value={newAddress.city}
                        onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                        placeholder="Lahore"
                        className={fieldClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="addr-country" className="block text-[11px] font-mono uppercase text-neutral-500 mb-1">Country</label>
                      <input
                        id="addr-country"
                        value={newAddress.country}
                        onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
                        className={fieldClass}
                      />
                    </div>
                    <div className="sm:col-span-2 flex gap-2 pt-1">
                      <button type="submit" className="px-4 py-2 rounded-full bg-neutral-950 text-white text-xs font-medium hover:bg-neutral-800">
                        Save address
                      </button>
                      <button
                        type="button"
                        onClick={() => { setShowAddressForm(false); setNewAddress(EMPTY_ADDRESS); }}
                        className="px-4 py-2 rounded-full border border-neutral-200 text-xs font-medium hover:bg-neutral-100"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                {user.addresses.length === 0 && !showAddressForm ? (
                  <EmptyState title="No saved addresses" text="Add an address to speed up checkout." />
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {user.addresses.map((addr, idx) => (
                      <div key={addr.id} className="p-5 rounded-xl border border-neutral-200 bg-[#fbfbfd] flex flex-col justify-between">
                        <div>
                          <span className="text-[10px] font-mono uppercase bg-neutral-200/70 text-neutral-800 px-2 py-0.5 rounded">
                            {addr.tag}{idx === 0 && ' (Default)'}
                          </span>
                          <p className="text-xs font-medium text-neutral-900 mt-3">{addr.street}</p>
                          <p className="text-xs text-neutral-500">{addr.city}, {addr.country}</p>
                          {addr.phone && <p className="text-xs text-neutral-500 font-mono mt-2">{addr.phone}</p>}
                        </div>
                        <div className="flex gap-3 pt-4 mt-4 border-t border-neutral-200/60 text-xs">
                          <button
                            onClick={() => {
                              authDispatch({ type: 'REMOVE_ADDRESS', payload: addr.id });
                              toast.info('Address removed');
                            }}
                            className="text-rose-600 hover:text-rose-800 font-medium"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* SETTINGS TAB */}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 space-y-6">
                <div className="border-b border-neutral-200/70 pb-4">
                  <h2 className="text-base font-semibold text-neutral-900">Personal Details</h2>
                  <p className="text-xs text-neutral-500 mt-0.5">Update your basic profile details.</p>
                </div>

                <form className="space-y-4 max-w-lg" onSubmit={handleSaveProfile}>
                  <div>
                    <label htmlFor="profile-name" className="block text-xs font-mono uppercase text-neutral-500 mb-1">Full Name</label>
                    <input
                      id="profile-name"
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className={fieldClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="profile-email" className="block text-xs font-mono uppercase text-neutral-500 mb-1">Email Address</label>
                    <input
                      id="profile-email"
                      type="email"
                      value={user.email}
                      readOnly
                      className={fieldClass + ' text-neutral-500 cursor-not-allowed'}
                    />
                    <p className="text-[10px] text-neutral-400 mt-1">Email is your login and can't be changed.</p>
                  </div>

                  <div>
                    <label htmlFor="profile-phone" className="block text-xs font-mono uppercase text-neutral-500 mb-1">Contact Number</label>
                    <input
                      id="profile-phone"
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      placeholder="0300 1234567"
                      className={fieldClass + ' font-mono'}
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