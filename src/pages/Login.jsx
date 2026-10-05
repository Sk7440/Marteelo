import React from 'react'

function Login() {
    return (
        <div class="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div class="w-full max-w-md p-8 bg-white rounded-2xl shadow-md border border-gray-100">
                <h1 class="text-2xl font-bold text-gray-800 text-center mb-6">User Login</h1>

                <div class="space-y-4">
                    <div>
                        <input
                            type="email"
                            placeholder="Enter your Email"
                            class="w-full px-4 py-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition duration-150"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            class="w-full px-4 py-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition duration-150"
                        />
                    </div>
                    <button class="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white text-sm font-semibold rounded-lg transition duration-150 shadow-sm">
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login