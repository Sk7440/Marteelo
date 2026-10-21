import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Eye, EyeOff } from 'lucide-react'
import { mainContext } from '../Features/Auth/Context'

const inputClass = (hasError) =>
    `w-full px-4 py-2.5 text-sm text-slate-900 bg-slate-50 border rounded-lg placeholder-slate-400 focus:bg-white focus:ring-2 outline-none transition duration-150 ${
        hasError
            ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/20'
            : 'border-slate-200 focus:border-indigo-600 focus:ring-indigo-600/20'
    }`

function Login() {
    const { authDispatch, authState } = useContext(mainContext)
    const navigate = useNavigate()

    const [form, setForm] = useState({ email: '', password: '' })
    const [error, setError] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    // Already logged in? Skip the login page.
    useEffect(() => {
        if (authState.currentUser) navigate('/User', { replace: true })
    }, [authState.currentUser, navigate])

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
        setError('')
    }

    function handleSubmit(e) {
        e.preventDefault()
        const email = form.email.trim().toLowerCase()

        if (!email || !form.password) {
            setError('Please enter your email and password')
            return
        }

        const user = authState.users.find((u) => u.email === email)
        if (!user || user.password !== form.password) {
            setError('Invalid email or password')
            toast.error('Invalid credentials')
            return
        }

        authDispatch({ type: 'LOGIN', payload: { email } })
        toast.success(`Welcome back, ${user.name.split(' ')[0]}!`)
        // the useEffect above redirects to the dashboard once currentUser is set
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-8 sm:p-10 transition-all">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">Welcome to Marteelo</h1>
                    <p className="text-sm text-slate-500 mt-1">Please enter your details to sign in</p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit} noValidate>
                    <div>
                        <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                            Email address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="name@company.com"
                            className={inputClass(error)}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                autoComplete="current-password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className={inputClass(error) + ' pr-11'}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((s) => !s)}
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <p className="text-xs text-rose-600 bg-rose-50 border border-rose-100 rounded-lg px-3 py-2">{error}</p>
                    )}

                    <button
                        type="submit"
                        className="w-full py-2.5 px-4 cursor-pointer text-white bg-neutral-950 rounded-full hover:bg-neutral-800 active:scale-95 transition-all shadow-sm"
                    >
                        Sign In
                    </button>
                </form>

                <p className="mt-6 text-center text-xs text-slate-500">
                    Don't have an account?{' '}
                    <Link to="/signup" className="font-semibold text-black hover:text-indigo-500 transition-colors">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login