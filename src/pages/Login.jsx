import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { mainContext } from '../Features/Auth/Context';
import { toast } from 'react-toastify';

function Login() {
    const { authDispatch, authState } = useContext(mainContext);

    const navigate = useNavigate()

    const [signinData, setSigninData] = useState({
        email: "",
        password: "",
    });
    function handlingSignin(e) {
        setSigninData({
            ...signinData,
            [e.target.name]: e.target.value,
        });
    }
    function handleSignin(e) {
        e.preventDefault();
        authDispatch({ type: "LOGIN", payload: signinData })



    }
    useEffect(() => {
        if (authState.currentUser !== null) {

            toast.success("Login Successful")
            navigate('/')
        }

    }, [authState])


    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-8 sm:p-10 transition-all">
                <div className="text-center mb-8">

                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">Welcome to Marteelo</h1>
                    <p className="text-sm text-slate-500 mt-1">Please enter your details to sign in</p>
                </div>


                <form className="space-y-5" onSubmit="event.preventDefault();">
                    <div>
                        <label for="email" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                            Email address
                        </label>
                        <input
                            id="email"
                            onChange={(e) => { handlingSignin(e) }}
                            name="email"
                            required
                            placeholder="name@company.com"
                            className="w-full px-4 py-2.5 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-lg placeholder-slate-400 focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 outline-none transition duration-150"
                        />
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <label for="password" className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                                Password
                            </label>
                            <a href="#" className="text-xs font-medium text-black hover:text-indigo-500 transition-colors">
                                Forgot password?
                            </a>
                        </div>
                        <input
                            onChange={(e) => { handlingSignin(e) }}
                            name='password'
                            required
                            placeholder="••••••••"
                            className="w-full px-4 py-2.5 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-lg placeholder-slate-400 focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 outline-none transition duration-150"
                        />
                    </div>

                    <button
                        type="submit"
                        onClick={(e) => { handleSignin(e) }}
                        className="w-full py-2.5 px-4 cursor-pointer text-white bg-neutral-950 rounded-full hover:bg-neutral-800 active:scale-95 transition-all shadow-sm"
                    >
                        Sign In
                    </button>
                </form>

                <p className="mt-6 text-center text-xs text-slate-500">
                    Don't have an account?
                    <button className="font-semibold text-black hover:text-indigo-500 transition-colors" onClick={() => navigate('/signup')}>


                        Sign up

                    </button>
                </p>
            </div>
        </div>
    )
}

export default Login