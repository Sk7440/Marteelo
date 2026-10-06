import { CiShoppingCart } from "react-icons/ci";
import { useContext } from "react";
import { toast } from "react-toastify";
import { mainContext } from "../../Features/Auth/Context";
import { Link } from "react-router-dom";

function Navbar() {
    const { login } = useContext(mainContext);

    return (
        <nav className="flex items-center justify-between px-6 lg:px-12 py-3.5 bg-white/80 backdrop-blur-xl border-b border-neutral-200/80 sticky top-0 z-50 transition-all">

            <h1
                onClick={() => toast('hello')}
                className="text-lg font-semibold tracking-tight text-neutral-900 cursor-pointer hover:opacity-75 transition-opacity"
            >
                Marteelo
            </h1>

            <ul className="hidden md:flex items-center justify-center gap-8 cursor-pointer text-xs font-medium uppercase tracking-[0.18em] text-neutral-600">
                <li className="text-neutral-950 transition-colors">Home</li>
                <Link to="/products">
                    <li className="hover:text-neutral-950 transition-colors">Products</li>
                </Link>
                <Link to="/about">
                    <li className="hover:text-neutral-950 transition-colors">About</li>
                </Link>
            </ul>

            <div className="flex items-center gap-2.5 sm:gap-3">
                <button
                    aria-label="Cart"
                    className="relative p-2 text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 rounded-full transition-colors cursor-pointer"
                >
                    <CiShoppingCart className="w-5 h-5" />
                    <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-neutral-950 rounded-full" />
                </button>

                <div className="h-4 w-px bg-neutral-200 mx-1 hidden sm:block" />
                <Link to="/login">

                    <button className="px-3.5 py-1.5 text-xs font-medium cursor-pointer text-neutral-700 bg-white border border-neutral-300/80 rounded-full hover:bg-neutral-50 active:scale-95 transition-all">
                        Login
                    </button>
                </Link>
                <Link to="/signup">
                    <button className="px-4 py-1.5 text-xs font-medium cursor-pointer text-white bg-neutral-950 rounded-full hover:bg-neutral-800 active:scale-95 transition-all shadow-sm">
                        Sign Up
                    </button>
                </Link>
            </div>

        </nav>
    );
}

export default Navbar;