import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { cartContext } from '../Features/Cart/Cartcontext';
import { mainContext } from '../Features/Auth/Context';
import {
    Info, Minus, Plus, Sparkles, Trash2, ArrowLeft, ShieldCheck, Tag,
    User, MapPin, CheckCircle2, Truck,
} from 'lucide-react';

const COUNTRIES = ['Pakistan', 'United States', 'United Kingdom', 'Canada', 'Australia', 'United Arab Emirates'];

const inputClass = (hasError) =>
    `w-full bg-neutral-900 border rounded-xl px-3.5 py-2.5 text-xs text-neutral-100 placeholder:text-neutral-500 focus:outline-none transition ${
        hasError ? 'border-rose-700 focus:border-rose-500' : 'border-neutral-800 focus:border-neutral-500'
    }`;

function Field({ label, name, value, onChange, error, type = 'text', placeholder, optional, autoComplete }) {
    return (
        <div>
            <label htmlFor={name} className="block text-[11px] font-medium text-neutral-400 mb-1.5">
                {label} {optional && <span className="text-neutral-600">(optional)</span>}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                autoComplete={autoComplete}
                className={inputClass(error)}
            />
            {error && <p className="text-[11px] text-rose-400 mt-1">{error}</p>}
        </div>
    );
}

function generateOrderId() {
    return 'MRT-' + Date.now().toString().slice(-8);
}

function validateShipping(form) {
    const errors = {};
    if (!form.fullName.trim()) errors.fullName = 'Full name is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = 'Enter a valid email';
    const digits = form.phone.replace(/\D/g, '');
    if (digits.length < 10 || digits.length > 15) errors.phone = 'Enter a valid phone number';
    if (!form.address.trim()) errors.address = 'Street address is required';
    if (!form.city.trim()) errors.city = 'City is required';
    if (!form.state.trim()) errors.state = 'State / province is required';
    if (!/^[A-Za-z0-9 -]{3,10}$/.test(form.postalCode.trim())) errors.postalCode = 'Enter a valid postal code';
    if (!form.country) errors.country = 'Select a country';
    return errors;
}

function Checkout() {
    const { state, dispatch } = useContext(cartContext)

    const [promoInput, setPromoInput] = useState('');
    const [appliedPromo, setAppliedPromo] = useState(null);
    const [promoError, setPromoError] = useState('');

    // Prefill contact details and the default saved address if the user is logged in
    const { authState, authDispatch } = useContext(mainContext);
    const currentUser = authState.currentUser;
    const savedAddress = currentUser?.addresses?.[0];
    const [shipping, setShipping] = useState({
        fullName: currentUser?.name || '',
        email: currentUser?.email || '',
        phone: savedAddress?.phone || currentUser?.phone || '',
        address: savedAddress?.street || '',
        apartment: '',
        city: savedAddress?.city || '',
        state: '',
        postalCode: '',
        country: COUNTRIES.includes(savedAddress?.country) ? savedAddress.country : 'Pakistan',
        notes: '',
    });
    const [errors, setErrors] = useState({});
    const [placedOrder, setPlacedOrder] = useState(null);

    const handleShippingChange = (e) => {
        const { name, value } = e.target;
        setShipping((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    const handleApplyPromo = (e) => {
        e.preventDefault();

        const cleanCode = promoInput.trim().toUpperCase();
        if (cleanCode === 'STUDIO10') {
            setAppliedPromo({ code: 'STUDIO10', discountPercent: 10 });
            setPromoError('');
            setPromoInput('');
        } else {
            setPromoError('Invalid discount code. Try STUDIO10');
        }
    };

    const handleRemove = (eleId) => {
        dispatch({ type: 'DELETE_FROM_CART', payload: eleId });
    };

    const subtotal = state.cart.reduce((sum, ele) => sum + ele.price * ele.qty, 0);
    const discount = appliedPromo ? subtotal * (appliedPromo.discountPercent / 100) : 0;
    const total = subtotal - discount;

    const handlePlaceOrder = (e) => {
        e.preventDefault();
        if (state.cart.length === 0) {
            toast.error('Your cart is empty');
            return;
        }
        const found = validateShipping(shipping);
        setErrors(found);
        if (Object.keys(found).length > 0) {
            toast.error('Please fill the highlighted fields');
            return;
        }

        // No backend yet: build the order object here (send it to an API later)
        const order = {
            id: generateOrderId(),
            items: state.cart,
            shipping,
            promo: appliedPromo?.code || null,
            subtotal,
            discount,
            total,
            status: 'Processing',
            placedAt: new Date().toISOString(),
        };

        // Save it to the account so it shows in the dashboard's order history
        if (currentUser) authDispatch({ type: 'ADD_ORDER', payload: order });

        setPlacedOrder(order);
        dispatch({ type: 'CLEAR_CART' });
        setAppliedPromo(null);
        toast.success('Order placed successfully!');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // ---------- Order confirmation screen ----------
    if (placedOrder) {
        const s = placedOrder.shipping;
        return (
            <div className="max-w-xl mt-3 mb-3 mx-auto p-4 sm:p-6 bg-neutral-950 text-neutral-100 min-h-screen">
                <div className="text-center py-8">
                    <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                    <h1 className="text-lg font-semibold mt-4">Thank you, {s.fullName.split(' ')[0]}!</h1>
                    <p className="text-xs text-neutral-400 mt-1">
                        Your order <span className="font-mono text-neutral-200">{placedOrder.id}</span> has been placed.
                        A confirmation will be sent to {s.email}.
                    </p>
                </div>

                <div className="space-y-4 text-sm">
                    <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800">
                        <h2 className="flex items-center gap-2 text-xs font-semibold text-neutral-300 mb-2">
                            <Truck className="w-3.5 h-3.5" /> Shipping to
                        </h2>
                        <p className="text-neutral-200">{s.fullName}</p>
                        <p className="text-neutral-400 text-xs leading-relaxed">
                            {s.address}{s.apartment && `, ${s.apartment}`}<br />
                            {s.city}, {s.state} {s.postalCode}<br />
                            {s.country}<br />
                            {s.phone}
                        </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-2">
                        {placedOrder.items.map((ele) => (
                            <div key={ele.id} className="flex justify-between text-xs">
                                <span className="text-neutral-300 truncate pr-3">{ele.name} × {ele.qty}</span>
                                <span className="font-mono text-neutral-200">${(ele.price * ele.qty).toFixed(2)}</span>
                            </div>
                        ))}
                        <div className="pt-2 mt-2 border-t border-neutral-800 space-y-1.5 text-xs">
                            <div className="flex justify-between text-neutral-400">
                                <span>Subtotal</span><span className="font-mono">${placedOrder.subtotal.toFixed(2)}</span>
                            </div>
                            {placedOrder.discount > 0 && (
                                <div className="flex justify-between text-emerald-400">
                                    <span>Discount ({placedOrder.promo})</span><span className="font-mono">-${placedOrder.discount.toFixed(2)}</span>
                                </div>
                            )}
                            <div className="flex justify-between font-semibold text-sm text-white pt-1">
                                <span>Total paid</span><span className="font-mono">${placedOrder.total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    <Link
                        to="/products"
                        className="block text-center w-full py-3 rounded-xl bg-white text-neutral-950 hover:bg-neutral-200 text-xs font-semibold tracking-wide transition"
                    >
                        Continue shopping
                    </Link>
                    {currentUser && (
                        <Link
                            to="/user"
                            className="block text-center w-full py-3 rounded-xl border border-neutral-700 text-neutral-200 hover:bg-neutral-900 text-xs font-semibold tracking-wide transition"
                        >
                            View my orders
                        </Link>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-xl mt-3 mb-3 mx-auto p-4 sm:p-6 bg-neutral-950 text-neutral-100 min-h-screen">
            {/* Top Header */}
            <div className="flex items-center justify-between pb-6 border-b border-neutral-800">
                <button
                    type="button"
                    onClick={() => window.history.back()}
                    className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 transition active:scale-95"
                    aria-label="Go back"
                >
                    <ArrowLeft className="w-4 h-4" />
                </button>
                <h1 className="text-base font-semibold tracking-wide">Order Summary</h1>
                <span className="text-xs font-mono text-neutral-400 bg-neutral-900 border border-neutral-800 px-2.5 py-1 rounded-full">
                    {state.cart.length} {state.cart.length === 1 ? 'item' : 'items'}
                </span>
            </div>

            {/* Cart Items List */}
            <div className="py-5 space-y-3 max-h-[420px] overflow-y-auto pr-1">
                {state.cart.length === 0 ? (
                    <div className="text-center py-16 bg-neutral-900/50 border border-dashed border-neutral-800 rounded-2xl">
                        <p className="text-sm text-neutral-400 font-medium">Your shopping bag is empty</p>
                        <p className="text-xs text-neutral-500 mt-1">Explore the shop to add items</p>
                    </div>
                ) : (
                    state.cart.map((ele) => (
                        <div
                            key={ele.id}
                            className="flex gap-4 items-center p-3.5 bg-neutral-900/80 border border-neutral-800/80 rounded-2xl hover:border-neutral-700 transition"
                        >
                            <img
                                src={ele.images?.[0]}
                                alt={ele.name}
                                className="w-16 h-16 rounded-xl object-cover bg-neutral-800 border border-neutral-700/50 shrink-0"
                            />

                            <div className="flex-1 min-w-0">
                                <h2 className="text-sm font-medium text-neutral-200 truncate">{ele.name}</h2>
                                <p className="text-xs text-neutral-400 mt-0.5 truncate">{ele.brand}</p>

                                {/* Counter & Delete Controls */}
                                <div className="flex items-center gap-3 mt-2.5">
                                    <div className="inline-flex items-center border border-neutral-700 bg-neutral-950 rounded-lg p-0.5 shadow-inner">
                                        <button
                                            type="button"
                                            onClick={() => dispatch({ type: "DECREASE_QTY", payload: ele.id })}
                                            className="w-6 h-6 flex items-center justify-center rounded-md text-neutral-400 hover:text-white hover:bg-neutral-800 transition"
                                        >
                                            <Minus className="w-3 h-3" />
                                        </button>
                                        <span className="w-7 text-center text-xs font-mono font-semibold text-neutral-200">
                                            {ele.qty}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => dispatch({ type: "INCREASE_QTY", payload: ele.id })}
                                            className="w-6 h-6 flex items-center justify-center rounded-md text-neutral-400 hover:text-white hover:bg-neutral-800 transition"
                                        >
                                            <Plus className="w-3 h-3" />
                                        </button>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => handleRemove(ele.id)}
                                        className="text-neutral-500 hover:text-rose-400 p-1 rounded-md hover:bg-rose-500/10 transition"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>

                            <div className="text-right shrink-0">
                                <span className="text-sm font-semibold font-mono text-neutral-100">
                                    ${(ele.price * ele.qty).toFixed(2)}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Promo Code Section */}
            <div className="pt-4 border-t border-neutral-800">
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <div className="relative flex-1">
                        <Tag className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
                        <input
                            type="text"
                            placeholder="Promo code (e.g. STUDIO10)"
                            value={promoInput}
                            onChange={(e) => setPromoInput(e.target.value)}
                            className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:border-neutral-500 transition uppercase font-mono"
                        />
                    </div>
                    <button
                        type="submit"
                        className="px-4 py-2.5 rounded-xl bg-white text-neutral-950 hover:bg-neutral-200 text-xs font-semibold tracking-wide transition active:scale-95"
                    >
                        Apply
                    </button>
                </form>

                {promoError && (
                    <p className="text-[11px] text-rose-400 mt-2 font-mono flex items-center gap-1.5 bg-rose-950/30 border border-rose-900/50 px-3 py-1.5 rounded-lg">
                        <Info className="w-3 h-3 text-rose-400 shrink-0" /> {promoError}
                    </p>
                )}

                {appliedPromo && (
                    <div className="flex items-center justify-between mt-2.5 px-3 py-2 rounded-xl bg-emerald-950/20 border border-emerald-900/40 text-[11px] text-emerald-300 font-mono">
                        <span className="flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> {appliedPromo.code} applied (-{appliedPromo.discountPercent}%)
                        </span>
                        <button
                            type="button"
                            onClick={() => setAppliedPromo(null)}
                            className="underline text-emerald-400 hover:text-emerald-200 transition"
                        >
                            Remove
                        </button>
                    </div>
                )}
            </div>

            {/* Order Totals */}
            <div className="mt-5 pt-4 border-t border-neutral-800 space-y-2.5 text-sm">
                <div className="flex justify-between text-neutral-400">
                    <span>Subtotal</span>
                    <span className="font-mono text-neutral-200">${subtotal.toFixed(2)}</span>
                </div>

                {appliedPromo && (
                    <div className="flex justify-between text-emerald-400">
                        <span>Discount ({appliedPromo.code} -{appliedPromo.discountPercent}%)</span>
                        <span className="font-mono">-${discount.toFixed(2)}</span>
                    </div>
                )}

                <div className="flex justify-between items-baseline pt-3 border-t border-neutral-800">
                    <span className="font-semibold text-neutral-100">Total</span>
                    <span className="text-lg font-semibold font-mono text-white">${total.toFixed(2)}</span>
                </div>
            </div>

            {/* Contact + Shipping Details */}
            <form onSubmit={handlePlaceOrder} noValidate className="mt-6 pt-5 border-t border-neutral-800 space-y-6">
                {!currentUser && (
                    <p className="text-[11px] text-neutral-400 bg-neutral-900 border border-neutral-800 rounded-xl px-3.5 py-2.5">
                        Checking out as a guest. <Link to="/login" state={{ from: '/checkout' }} className="underline text-neutral-200 hover:text-white">Log in</Link> to save this order to your account.
                    </p>
                )}
                <section>
                    <h2 className="flex items-center gap-2 text-sm font-semibold text-neutral-200 mb-3">
                        <User className="w-4 h-4 text-neutral-400" /> Contact details
                    </h2>
                    <div className="space-y-3">
                        <Field label="Full name" name="fullName" value={shipping.fullName} onChange={handleShippingChange} error={errors.fullName} placeholder="Muhammad Ali" autoComplete="name" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <Field label="Email" name="email" type="email" value={shipping.email} onChange={handleShippingChange} error={errors.email} placeholder="you@example.com" autoComplete="email" />
                            <Field label="Phone" name="phone" type="tel" value={shipping.phone} onChange={handleShippingChange} error={errors.phone} placeholder="0300 1234567" autoComplete="tel" />
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="flex items-center gap-2 text-sm font-semibold text-neutral-200 mb-3">
                        <MapPin className="w-4 h-4 text-neutral-400" /> Shipping address
                    </h2>
                    <div className="space-y-3">
                        <Field label="Street address" name="address" value={shipping.address} onChange={handleShippingChange} error={errors.address} placeholder="House 12, Street 5" autoComplete="address-line1" />
                        <Field label="Apartment, suite, etc." name="apartment" value={shipping.apartment} onChange={handleShippingChange} optional placeholder="Flat 3B" autoComplete="address-line2" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <Field label="City" name="city" value={shipping.city} onChange={handleShippingChange} error={errors.city} placeholder="Lahore" autoComplete="address-level2" />
                            <Field label="State / Province" name="state" value={shipping.state} onChange={handleShippingChange} error={errors.state} placeholder="Punjab" autoComplete="address-level1" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <Field label="Postal code" name="postalCode" value={shipping.postalCode} onChange={handleShippingChange} error={errors.postalCode} placeholder="54000" autoComplete="postal-code" />
                            <div>
                                <label htmlFor="country" className="block text-[11px] font-medium text-neutral-400 mb-1.5">Country</label>
                                <select
                                    id="country"
                                    name="country"
                                    value={shipping.country}
                                    onChange={handleShippingChange}
                                    autoComplete="country-name"
                                    className={inputClass(errors.country)}
                                >
                                    {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                                </select>
                                {errors.country && <p className="text-[11px] text-rose-400 mt-1">{errors.country}</p>}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="notes" className="block text-[11px] font-medium text-neutral-400 mb-1.5">
                                Delivery notes <span className="text-neutral-600">(optional)</span>
                            </label>
                            <textarea
                                id="notes"
                                name="notes"
                                rows={2}
                                value={shipping.notes}
                                onChange={handleShippingChange}
                                placeholder="e.g. Call before delivery"
                                className={inputClass(false) + ' resize-none'}
                            />
                        </div>
                    </div>
                </section>

                <button
                    type="submit"
                    disabled={state.cart.length === 0}
                    className="w-full py-3.5 rounded-xl bg-white text-neutral-950 hover:bg-neutral-200 text-sm font-semibold tracking-wide transition active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    Place order · ${total.toFixed(2)}
                </button>

                <p className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-500">
                    <ShieldCheck className="w-3.5 h-3.5" /> Secure checkout
                </p>
            </form>
        </div>
    );
}

export default Checkout;