import React, { useContext, useState } from 'react'
import { cartContext } from '../Features/Cart/Cartcontext';
import { Info, Minus, Plus, Sparkles, Trash2 } from 'lucide-react';
import { FaBackward } from 'react-icons/fa';

function Checkout() {
    const { state } = useContext(cartContext)
    const [promoInput, setPromoInput] = useState('');
    const [appliedPromo, setAppliedPromo] = useState(null);
    const [promoError, setPromoError] = useState('');
    const handleApplyPromo = (e) => {
        e.preventDefault();
        if (promoInput === 'STUDIO10') {
            setAppliedPromo('STUDIO10');
            setPromoError('');
        } else {
            setPromoError('Invalid discount code');
        }
    };
    const handleRemove = (eleId) => {

        state.cart = state?.cart?.filter((ele) => ele.id !== eleId);
    }
    const handleQuantity = (eleId, change) => {
        state.cart = state?.cart?.map((ele) => {
            if (ele.id === eleId) {
                return { ...ele, quantity: Math.max(0, ele.quantity + change) };
            }
            return ele;
        });
    };
    const subtotal = state.cart.reduce((total, ele) => total + ele.price * ele.quantity, 0);
    const discountAmount = appliedPromo ? subtotal * 0.1 : 0;
    const total = subtotal - discountAmount;
    const shippingCost = total > 100 ? 0 : 10;
    const estimatedTax = total * 0.07;
    const grandTotal = total + shippingCost + estimatedTax;
    const back = () => {
        window.history.back();
    };
    return (

        <>
            <button
                onClick={() => { back() }}
                className="mb-4 inline-flex items-center justify-center p-2 rounded-xl bg-[#0a0a0c] text-white hover:bg-white/80 hover:text-[#0a0a0c] border border-white/20 transition-all duration-200"
            >
                <FaBackward className="w-4 h-4" />
            </button>

            <div className="py-4 space-y-3 max-h-90 overflow-y-auto pr-1">
                {state.cart.length === 0 ? (
                    <div className="text-center py-10 bg-[#0a0a0c] border border-white/20 rounded-2xl text-white/80 text-sm">
                        Your bag is empty. Please add items to proceed.
                    </div>
                ) : (
                    state.cart.map((ele) => (
                        <div
                            key={ele.id}
                            className="flex gap-4 items-center justify-between p-3.5 bg-[#0a0a0c] border border-white/20 rounded-2xl transition hover:border-white/40"
                        >
                            <img
                                src={ele.image}
                                alt={ele.name}
                                className="w-16 h-16 rounded-xl object-cover bg-[#0a0a0c] border border-white/20 shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-medium text-white truncate">{ele.name}</h4>
                                <p className="text-xs text-white/80 mt-0.5 truncate">{ele.variant}</p>

                                {/* Counter controls */}
                                <div className="flex items-center gap-2 mt-2.5">
                                    <div className="inline-flex items-center border border-white/20 rounded-lg bg-[#0a0a0c] p-0.5">
                                        <button
                                            type="button"
                                            onClick={() => handleQuantity(ele.id, -1)}
                                            className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-white/80 hover:text-[#0a0a0c] text-white transition"
                                        >
                                            <Minus className="w-3 h-3" />
                                        </button>
                                        <span className="w-7 text-center text-xs font-mono font-medium text-white">
                                            {ele.quantity}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => handleQuantity(ele.id, 1)}
                                            className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-white/80 hover:text-[#0a0a0c] text-white transition"
                                        >
                                            <Plus className="w-3 h-3" />
                                        </button>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => handleRemove(ele.id)}
                                        className="text-white/80 hover:text-white p-1 rounded-md hover:bg-white/10 transition"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>

                            <div className="text-right shrink-0">
                                <span className="text-sm font-semibold text-white font-mono">
                                    ${(ele.price * ele.quantity).toFixed(2)}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="pt-4 mt-2 border-t border-white/20">
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Discount code (e.g. STUDIO10)"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        className="flex-1 bg-[#0a0a0c] border border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-white/80 focus:outline-none focus:border-white focus:bg-[#0a0a0c] transition uppercase font-mono"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2.5 rounded-xl border border-white/20 bg-white text-[#0a0a0c] hover:bg-white/80 text-xs font-semibold transition active:scale-95"
                    >
                        Apply
                    </button>
                </form>
                {promoError && (
                    <p className="text-[11px] text-white mt-2 font-mono flex items-center gap-1.5 bg-[#0a0a0c] border border-white/20 px-3 py-1.5 rounded-lg">
                        <Info className="w-3 h-3 text-white/80" /> {promoError}
                    </p>
                )}
                {appliedPromo && (
                    <div className="flex items-center justify-between mt-2.5 px-3 py-2 rounded-xl bg-[#0a0a0c] border border-white/20 text-[11px] text-white font-mono">
                        <span className="flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-white/80" /> {appliedPromo.code} applied (-{appliedPromo.discountPercent}%)
                        </span>
                        <button
                            type="button"
                            onClick={() => setAppliedPromo(null)}
                            className="underline text-white/80 hover:text-white transition"
                        >
                            Remove
                        </button>
                    </div>
                )}
            </div>

            <div className="pt-5 mt-5 border-t  space-y-2.5 text-xs font-mono bg-[#0a0a0c] border border-white/20 p-4 rounded-2xl">
                <div className="flex justify-between text-white/80">
                    <span>Subtotal</span>
                    <span className="text-white font-medium">${subtotal.toFixed(2)}</span>
                </div>

                {discountAmount > 0 && (
                    <div className="flex justify-between text-white">
                        <span className="text-white/80">Discount</span>
                        <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                )}

                <div className="flex justify-between text-white/80">
                    <span>Shipping</span>
                    <span className="text-white font-medium">
                        {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                    </span>
                </div>

                <div className="flex justify-between text-white/80">
                    <span className="flex items-center gap-1">
                        Estimated Sales Tax
                        <Info className="w-3 h-3 text-white/80" />
                    </span>
                    <span className="text-white font-medium">${estimatedTax.toFixed(2)}</span>
                </div>

                <div className="pt-3.5 mt-2 border-t border-white/20 flex justify-between items-baseline">
                    <div className="flex flex-col">
                        <span className="text-sm font-sans font-semibold text-white">Total Amount</span>
                        <span className="text-[10px] text-white/80">Including VAT & customs duties</span>
                    </div>
                    <span className="text-xl font-bold font-mono text-white">
                        ${grandTotal.toFixed(2)}
                    </span>
                </div>
            </div>

        </>
    )
}

export default Checkout