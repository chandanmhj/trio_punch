import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LogIn, Mail, Lock, ShieldCheck } from 'lucide-react';

const Login = () => {
    const [formData, setFormData] = useState({
        identifier: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const validate = () => {
        let newErrors = {};
        if (!formData.identifier) {
            newErrors.identifier = 'Email or Mobile number is required';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            alert('Login successful! (Simulated)');
        }, 1500);
    };

    return (
        <div className="premium-card animate-fade-in">
            <div className="flex flex-col items-center mb-10">
                <div className="bg-primary/10 p-4 rounded-2xl mb-5">
                    <ShieldCheck className="w-10 h-10 text-primary" />
                </div>
                <h1 className="text-3xl font-extrabold text-secondary tracking-tight">Secure Login</h1>
                <p className="text-gray-500 mt-2 font-medium">Enter your credentials to access your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-bold text-secondary mb-2 px-1">
                        Email / Mobile Number
                    </label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                            <Mail className="w-5 h-5" />
                        </span>
                        <input
                            type="text"
                            className={`premium-input pl-12 ${errors.identifier ? 'border-red-400 ring-1 ring-red-100' : ''}`}
                            placeholder="name@example.com"
                            value={formData.identifier}
                            onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                        />
                    </div>
                    {errors.identifier && <p className="text-red-500 text-xs font-semibold mt-2 ml-1">{errors.identifier}</p>}
                </div>

                <div>
                    <div className="flex justify-between items-center mb-2 px-1">
                        <label className="block text-sm font-bold text-secondary">
                            Password
                        </label>
                        <Link to="/forgot-password" size="sm" className="premium-link text-xs">
                            Forgot?
                        </Link>
                    </div>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                            <Lock className="w-5 h-5" />
                        </span>
                        <input
                            type="password"
                            className={`premium-input pl-12 ${errors.password ? 'border-red-400 ring-1 ring-red-100' : ''}`}
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>
                    {errors.password && <p className="text-red-500 text-xs font-semibold mt-2 ml-1">{errors.password}</p>}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="premium-button mt-4"
                >
                    {loading ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Verifying...
                        </span>
                    ) : 'Sign In'}
                </button>
            </form>

            <div className="mt-10 pt-8 border-t border-gray-100 text-center">
                <p className="text-sm text-gray-500 font-medium">
                    New to the platform?{' '}
                    <Link to="/create-account" className="premium-link">
                        Create an account
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
