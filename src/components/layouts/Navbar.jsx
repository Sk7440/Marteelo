import { CiShoppingCart } from "react-icons/ci";
import { useContext } from "react";
import { mainContext } from "../../Features/Auth/Context";
import { Link, NavLink } from "react-router-dom";
import { cartContext } from "../../Features/Cart/Cartcontext";

const NAV_LINKS = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Products" },
    { to: "/about", label: "About" },
];

function Navbar() {
    const { openBar, cartCount } = useContext(cartContext);
    const { authState } = useContext(mainContext);

    return (
        <nav className="flex items-center justify-between px-6 lg:px-12 py-3.5 bg-white/80 backdrop-blur-xl border-b border-neutral-200/80 sticky top-0 z-50 transition-all">

            <Link
                to="/"
                className="text-lg font-semibold tracking-tight text-neutral-900 cursor-pointer hover:opacity-75 transition-opacity"
            >
                Marteelo
            </Link>

            <ul className="hidden md:flex items-center justify-center gap-8 text-xs font-medium uppercase tracking-[0.18em] text-neutral-600">
                {NAV_LINKS.map((link) => (
                    <li key={link.to}>
                        <NavLink
                            to={link.to}
                            end
                            className={({ isActive }) =>
                                `transition-colors hover:text-neutral-950 ${isActive ? "text-neutral-950" : ""}`
                            }
                        >
                            {link.label}
                        </NavLink>
                    </li>
                ))}
            </ul>

            <div className="flex items-center gap-2.5 sm:gap-3">
                <button
                    onClick={() => { openBar() }}
                    aria-label={`Cart (${cartCount} items)`}
                    className="relative p-2 text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 rounded-full transition-colors cursor-pointer"
                >
                    <CiShoppingCart className="w-5 h-5" />
                    {cartCount > 0 && (
                        <span className="absolute -top-0.5 -right-0.5 min-w-4 h-4 px-1 flex items-center justify-center text-[10px] font-semibold text-white bg-neutral-950 rounded-full">
                            {cartCount}
                        </span>
                    )}
                </button>

                <div className="h-4 w-px bg-neutral-200 mx-1 hidden sm:block" />

                {authState.currentUser ? (
                    <Link
                        to="/user"
                        className="px-3.5 py-1.5 text-xs font-medium cursor-pointer text-neutral-700 bg-white border border-neutral-300/80 rounded-full hover:bg-neutral-50 active:scale-95 transition-all inline-block"
                    >
                        {authState.currentUser.name.split(' ')[0]}
                    </Link>
                ) : (
                    <div className="flex items-center gap-2">
                        <Link
                            to="/login"
                            className="px-3.5 py-1.5 text-xs font-medium cursor-pointer text-neutral-700 bg-white border border-neutral-300/80 rounded-full hover:bg-neutral-50 active:scale-95 transition-all inline-block"
                        >
                            Login
                        </Link>
                        <Link
                            to="/signup"
                            className="px-4 py-1.5 text-xs font-medium cursor-pointer text-white bg-neutral-950 rounded-full hover:bg-neutral-800 active:scale-95 transition-all shadow-sm inline-block"
                        >
                            Sign Up
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
