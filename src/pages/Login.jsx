import React from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {

    const navigate = useNavigate()


    return (
        <div class="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
            <div class="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-8 sm:p-10 transition-all">
                <div class="text-center mb-8">

                    <h1 class="text-2xl font-bold tracking-tight text-slate-900">Welcome to Marteelo</h1>
                    <p class="text-sm text-slate-500 mt-1">Please enter your details to sign in</p>
                </div>
{/* programatic navigation */}
                <button onClick={() => navigate('/signup')}>
                    back
                </button>

                <form class="space-y-5" onsubmit="event.preventDefault();">
                    <div>
                        <label for="email" class="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                            Email address
                        </label>
                        <input
                            id="email"
                            type="email"
                            required
                            placeholder="name@company.com"
                            class="w-full px-4 py-2.5 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-lg placeholder-slate-400 focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 outline-none transition duration-150"
                        />
                    </div>

                    <div>
                        <div class="flex items-center justify-between mb-1.5">
                            <label for="password" class="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                                Password
                            </label>
                            <a href="#" class="text-xs font-medium text-black hover:text-indigo-500 transition-colors">
                                Forgot password?
                            </a>
                        </div>
                        <input
                            id="password"
                            type="password"
                            required
                            placeholder="••••••••"
                            class="w-full px-4 py-2.5 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-lg placeholder-slate-400 focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 outline-none transition duration-150"
                        />
                    </div>

                    <button
                        type="submit"
                        class="w-full py-2.5 px-4 cursor-pointer text-white bg-neutral-950 rounded-full hover:bg-neutral-800 active:scale-95 transition-all shadow-sm"
                    >
                        Sign In
                    </button>
                </form>

                <p class="mt-6 text-center text-xs text-slate-500">
                    Don't have an account?
                    <a href="#" class="font-semibold text-black hover:text-indigo-500 transition-colors">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    )
}

export default Login