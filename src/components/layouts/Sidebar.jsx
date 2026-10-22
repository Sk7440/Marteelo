import { useContext, useEffect } from 'react'
import { IoMdArrowRoundBack } from "react-icons/io";
import { ImCross } from "react-icons/im";
import { cartContext } from '../../Features/Cart/Cartcontext';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
    const { state, dispatch, sideBar, setSidebar, cartTotal } = useContext(cartContext)
    const navigate = useNavigate()

    // Close the cart with the Escape key
    useEffect(() => {
        if (!sideBar) return
        const onKey = (e) => { if (e.key === 'Escape') setSidebar(false) }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [sideBar, setSidebar])

    const close = () => setSidebar(false)

    function goToCheckout() {
        close()
        navigate('/checkout')
    }

    return (
        <>
            {/* Dark backdrop: click outside the panel to close it */}
            <div
                onClick={close}
                className={`fixed inset-0 z-[60] bg-black/40 transition-opacity duration-300 ${sideBar ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            />

            <aside
                aria-hidden={!sideBar}
                className={`fixed top-0 right-0 z-[70] h-full w-full sm:w-120 bg-neutral-950/95 backdrop-blur-xl border-l border-neutral-800/80 text-white flex flex-col p-6 shadow-2xl transition-transform duration-500 ${sideBar ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="flex items-center justify-between mb-6">
                    <button
                        onClick={close}
                        aria-label="Close cart"
                        className="h-9 w-9 inline-flex items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white hover:border-neutral-700 transition active:scale-95"
                    >
                        <IoMdArrowRoundBack className="text-lg" />
                    </button>
                    <h2 className="text-sm font-semibold tracking-wide">Your Cart</h2>
                    <span className="w-9" />
                </div>

                <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                    {state.cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center gap-3">
                            <p className="text-sm text-neutral-400">Your cart is empty</p>
                            <button
                                onClick={() => { close(); navigate('/products') }}
                                className="px-4 py-2 rounded-lg bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition"
                            >
                                Browse products
                            </button>
                        </div>
                    ) : (
                        state.cart.map((ele) => (
                            <div key={ele.id} className="flex items-center gap-4 p-4 rounded-xl border border-neutral-800/60 bg-neutral-900/50">
                                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-neutral-800 border border-neutral-700/40">
                                    <img src={ele.images?.[0]} alt={ele.name} className="h-full w-full object-cover" />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h3 className="text-sm font-semibold text-white truncate">{ele.name}</h3>
                                    <p className="text-xs text-neutral-400 mt-0.5">${ele.price.toFixed(2)}</p>

                                    <div className="inline-flex items-center gap-2 mt-3 rounded-lg border border-neutral-800 bg-neutral-900/80 px-2 py-1">
                                        <button
                                            onClick={() => dispatch({ type: "DECREASE_QTY", payload: ele.id })}
                                            aria-label="Decrease quantity"
                                            className="h-5 w-5 flex items-center justify-center rounded text-neutral-400 hover:text-white hover:bg-neutral-800 transition active:scale-90 text-sm font-bold">
                                            -
                                        </button>
                                        <p className="text-xs font-semibold text-neutral-200 min-w-4 text-center">{ele.qty}</p>
                                        <button
                                            onClick={() => dispatch({ type: "INCREASE_QTY", payload: ele.id })}
                                            aria-label="Increase quantity"
                                            className="h-5 w-5 flex items-center justify-center rounded text-neutral-400 hover:text-white hover:bg-neutral-800 transition active:scale-90 text-sm font-bold">
                                            +
                                        </button>
                                    </div>
                                </div>

                                <div className="text-right self-stretch flex flex-col justify-between items-end gap-2">
                                    <button
                                        onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: ele.id })}
                                        aria-label={`Remove ${ele.name}`}
                                        className="h-7 w-7 inline-flex items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-red-500 hover:border-neutral-700 transition active:scale-95"
                                    >
                                        <ImCross className="text-[10px]" />
                                    </button>
                                    <span className="text-sm font-bold text-white">${(ele.price * ele.qty).toFixed(2)}</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {state.cart.length > 0 && (
                    <div className="pt-4 mt-4 border-t border-neutral-800 space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-neutral-400">Subtotal</span>
                            <span className="font-semibold font-mono">${cartTotal.toFixed(2)}</span>
                        </div>
                        <button
                            onClick={goToCheckout}
                            className="h-10 w-full rounded-lg bg-white text-black text-sm font-semibold hover:bg-neutral-200 transition"
                        >
                            Checkout
                        </button>
                    </div>
                )}
            </aside>
        </>
    )
}

export default Sidebar
