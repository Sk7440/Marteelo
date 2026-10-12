import React, { useContext, useState } from 'react';
import { cartContext } from '../Features/Cart/Cartcontext';
import { Info, Minus, Plus, Sparkles, Trash2, ArrowLeft, ShieldCheck, Tag } from 'lucide-react';

function Checkout() {
    const { state, dispatch } = useContext(cartContext)

    const [promoInput, setPromoInput] = useState('');
    const [appliedPromo, setAppliedPromo] = useState(null);
    const [promoError, setPromoError] = useState('');


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
        const updated = cart.filter((ele) => ele.id !== eleId);
        updateCart(updated);
    };

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
                    {cart.length} {cart.length === 1 ? 'item' : 'items'}
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
                                src={ele.image}
                                alt={ele.name}
                                className="w-16 h-16 rounded-xl object-cover bg-neutral-800 border border-neutral-700/50 shrink-0"
                            />

                            <div className="flex-1 min-w-0">
                                <h2 className="text-sm font-medium text-neutral-200 truncate">{ele.name}</h2>
                                <p className="text-xs text-neutral-400 mt-0.5 truncate">{ele.variant}</p>

                                {/* Counter & Delete Controls */}
                                <div className="flex items-center gap-3 mt-2.5">
                                    <div className="inline-flex items-center border border-neutral-700 bg-neutral-950 rounded-lg p-0.5 shadow-inner">
                                        <button
                                            type="button"

                                            className="w-6 h-6 flex items-center justify-center rounded-md text-neutral-400 hover:text-white hover:bg-neutral-800 transition"
                                        >
                                            <Minus className="w-3 h-3" />
                                        </button>
                                        <span className="w-7 text-center text-xs font-mono font-semibold text-neutral-200">
                                            {ele.quantity}
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
                                    ${(ele.price * ele.quantity).toFixed(2)}
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


        </div>
    );
}

export default Checkout;