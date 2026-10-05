import React from 'react'

function Singup() {
    return (
        <div class="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
            <h1 class="text-2xl font-bold text-gray-800 text-center mb-6">
                Sign Up
            </h1>

            <form class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1" for="name">
                        Full Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Enter your Name"
                        class="w-full px-4 py-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition duration-150"
                    />
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1" for="email">
                        Email Address
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Enter your Email"
                        class="w-full px-4 py-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition duration-150"
                    />
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1" for="password">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        class="w-full px-4 py-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition duration-150"
                    />
                </div>

                <div class="pt-2">
                    <button
                        type="submit"
                        class="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white text-sm font-semibold rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Singup