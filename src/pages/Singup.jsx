import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify';
import { mainContext } from '../Features/Auth/Context';
import Password from 'antd/es/input/Password';
import { useNavigate } from 'react-router-dom';

function Singup() {
    const { login } = useContext(mainContext);
const navigate = useNavigate()
    const { authDispatch } = useContext(mainContext);
    const [signupData, setSignupData] = useState({
        Name: "",
        email: "",
        Password: "",
    });
    function handling(e) {
        setSignupData({
            ...signupData,
            [e.target.name]: e.target.value,
        });
    }
    function handleSignup(e) {
        e.preventDefault();
            authDispatch({ type: "SIGNUP", payload: signupData })
            toast.success("Signup Successful")
             navigate('/login')

    }
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md p-8 flex flex-col justify-center item-center bg-white rounded-2xl shadow-lg border border-gray-100">
            <div>
                <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
                    Sign Up
                </h1>
            </div>

            <form className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
                        Full Name
                    </label>
                    <input
                        onChange={(e) => { handling(e) }}
                        name="Name"
                        type="text"
                        placeholder="Enter your Name"
                        className="w-full px-4 py-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition duration-150"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                        Email Address
                    </label>
                    <input
                        onChange={(e) => { handling(e) }}
                        name="email"
                        type="email"
                        placeholder="Enter your Email"
                        className="w-full px-4 py-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition duration-150"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
                        Password
                    </label>
                    <input
                        id="password"
                        name='password'
                        onChange={(e) => { handling(e) }}
                        type="password"
                        placeholder="Enter your password"
                        className="w-full px-4 py-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition duration-150"
                    />
                </div>

                <div className="pt-2">
                    <button
                        type="submit"
                        onClick={(e) => { handleSignup(e) }}
                        className="w-full py-2.5 px-4 cursor-pointer text-white bg-neutral-950 rounded-full hover:bg-neutral-800 active:scale-95 transition-all shadow-sm"
                    >
                        Submit
                    </button>
                </div>
            </form>
             <p className="mt-6 text-center text-xs text-slate-500">
                    Already have an account?
                    <button  className="font-semibold text-black hover:text-indigo-500 transition-colors"  onClick={() => navigate('/login')}>

                
                       Login
                   
                    </button>
                </p>
        </div>
    </div>
)
}

export default Singup