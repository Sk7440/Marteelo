import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { mainContext } from '../Features/Auth/Context'

const inputClass = (hasError) =>
    `w-full px-4 py-2.5 text-sm text-gray-900 bg-gray-50 border rounded-lg focus:ring-2 focus:bg-white outline-none transition duration-150 ${
        hasError
            ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/20'
            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
    }`

function validate(form, users) {
    const errors = {}
    const email = form.email.trim().toLowerCase()

    if (form.name.trim().length < 2) errors.name = 'Please enter your full name'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email address'
    else if (users.some((u) => u.email === email)) errors.email = 'An account with this email already exists'
    if (form.password.length < 6) errors.password = 'Password must be at least 6 characters'
    if (form.confirmPassword !== form.password) errors.confirmPassword = 'Passwords do not match'

    return errors
}

function Singup() {
    const { authDispatch, authState } = useContext(mainContext)
    const navigate = useNavigate()

    const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
    const [errors, setErrors] = useState({})

    function handleChange(e) {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
        if (errors[name]) setErrors({ ...errors, [name]: undefined })
    }

    function handleSubmit(e) {
        e.preventDefault()
        const found = validate(form, authState.users)
        setErrors(found)
        if (Object.keys(found).length > 0) return

        authDispatch({
            type: 'SIGNUP',
            payload: { name: form.name, email: form.email, password: form.password },
        })
        toast.success('Account created! Please log in.')
        navigate('/login')
    }

    const fields = [
        { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Enter your name', autoComplete: 'name' },
        { name: 'email', label: 'Email Address', type: 'email', placeholder: 'Enter your email', autoComplete: 'email' },
        { name: 'password', label: 'Password', type: 'password', placeholder: 'At least 6 characters', autoComplete: 'new-password' },
        { name: 'confirmPassword', label: 'Confirm Password', type: 'password', placeholder: 'Re-enter your password', autoComplete: 'new-password' },
    ]

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md p-8 flex flex-col justify-center bg-white rounded-2xl shadow-lg border border-gray-100">
                <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Sign Up</h1>

                <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                    {fields.map((f) => (
                        <div key={f.name}>
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor={f.name}>
                                {f.label}
                            </label>
                            <input
                                id={f.name}
                                name={f.name}
                                type={f.type}
                                value={form[f.name]}
                                onChange={handleChange}
                                placeholder={f.placeholder}
                                autoComplete={f.autoComplete}
                                className={inputClass(errors[f.name])}
                            />
                            {errors[f.name] && <p className="text-xs text-rose-600 mt-1">{errors[f.name]}</p>}
                        </div>
                    ))}

                    <div className="pt-2">
                        <button
                            type="submit"
                            className="w-full py-2.5 px-4 cursor-pointer text-white bg-neutral-950 rounded-full hover:bg-neutral-800 active:scale-95 transition-all shadow-sm"
                        >
                            Create Account
                        </button>
                    </div>
                </form>

                <p className="mt-6 text-center text-xs text-slate-500">
                    Already have an account?{' '}
                    <Link to="/login" className="font-semibold text-black hover:text-indigo-500 transition-colors">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Singup