import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Mail, Lock, Phone, User, CheckCircle, ShieldCheck } from 'lucide-react';

const CreateAccount = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Form, 2: OTP, 3: Success
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        password: ''
    });
    const [otp, setOtp] = useState('');
    const [generatedOtp, setGeneratedOtp] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const validateForm = () => {
        let newErrors = {};
        if (!formData.name) newErrors.name = 'Full name is required';
        if (!formData.email) {
            newErrors.email = 'Email address is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }
        if (!formData.mobile) {
            newErrors.mobile = 'Mobile number is required';
        } else if (!/^\d{10}$/.test(formData.mobile)) {
            newErrors.mobile = 'Must be exactly 10 digits';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Minimum 6 characters required';
        }
        return newErrors;
    };

    const handleSendOtp = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);
        setTimeout(() => {
            const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
            setGeneratedOtp(newOtp);
            setStep(2);
            setLoading(false);
            console.log('Generated OTP:', newOtp);
            alert(`OTP sent to ${formData.mobile}: ${newOtp}`);
        }, 1200);
    };

    const handleVerifyOtp = (e) => {
        e.preventDefault();
        if (otp === generatedOtp || otp === '123456') {
            setLoading(true);
            setTimeout(() => {
                setStep(3);
                setLoading(false);
                setTimeout(() => {
                    navigate('/login');
                }, 2500);
            }, 1200);
        } else {
            setErrors({ otp: 'Verification failed. Try 123456' });
        }
    };

    return (
        <div className="premium-card animate-fade-in">
            {step === 1 && (
                <>
                    <div className="flex flex-col items-center mb-10">
                        <div className="bg-primary/10 p-4 rounded-2xl mb-5">
                            <UserPlus className="w-10 h-10 text-primary" />
                        </div>
                        <h1 className="text-3xl font-extrabold text-secondary tracking-tight">Join Us</h1>
                        <p className="text-gray-500 mt-2 font-medium text-center">Start your journey with a professional account</p>
                    </div>

                    <form onSubmit={handleSendOtp} className="space-y-4">
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-secondary mb-2 px-1">Full Name</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                                        <User className="w-5 h-5" />
                                    </span>
                                    <input
                                        type="text"
                                        className={`premium-input pl-12 ${errors.name ? 'border-red-400 ring-1 ring-red-100' : ''}`}
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                {errors.name && <p className="text-red-500 text-xs font-semibold mt-1 ml-1">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-secondary mb-2 px-1">Email Address</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                                        <Mail className="w-5 h-5" />
                                    </span>
                                    <input
                                        type="email"
                                        className={`premium-input pl-12 ${errors.email ? 'border-red-400 ring-1 ring-red-100' : ''}`}
                                        placeholder="john@example.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                                {errors.email && <p className="text-red-500 text-xs font-semibold mt-1 ml-1">{errors.email}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-secondary mb-2 px-1">Mobile Number</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                                        <Phone className="w-5 h-5" />
                                    </span>
                                    <input
                                        type="tel"
                                        className={`premium-input pl-12 ${errors.mobile ? 'border-red-400 ring-1 ring-red-100' : ''}`}
                                        placeholder="10-digit number"
                                        value={formData.mobile}
                                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                    />
                                </div>
                                {errors.mobile && <p className="text-red-500 text-xs font-semibold mt-1 ml-1">{errors.mobile}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-secondary mb-2 px-1">Password</label>
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
                                {errors.password && <p className="text-red-500 text-xs font-semibold mt-1 ml-1">{errors.password}</p>}
                            </div>
                        </div>

                        <button type="submit" disabled={loading} className="premium-button mt-6">
                            {loading ? 'Processing...' : 'Secure Registration'}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                        <p className="text-sm text-gray-500 font-medium">
                            Already part of our network?{' '}
                            <Link to="/login" className="premium-link">Sign In</Link>
                        </p>
                    </div>
                </>
            )}

            {step === 2 && (
                <>
                    <div className="flex flex-col items-center mb-10">
                        <div className="bg-primary/10 p-4 rounded-2xl mb-5">
                            <ShieldCheck className="w-10 h-10 text-primary" />
                        </div>
                        <h1 className="text-3xl font-extrabold text-secondary tracking-tight">Security Code</h1>
                        <p className="text-gray-500 mt-2 font-medium text-center px-4">
                            Verification code sent to <span className="text-secondary font-bold">{formData.mobile}</span>
                        </p>
                    </div>

                    <form onSubmit={handleVerifyOtp} className="space-y-8">
                        <div className="flex justify-center">
                            <input
                                type="text"
                                maxLength="6"
                                className={`w-full text-center text-4xl tracking-[0.75rem] py-5 bg-gray-50 border-2 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-mono font-bold ${errors.otp ? 'border-red-400' : 'border-gray-200'}`}
                                placeholder="000000"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                            />
                        </div>
                        {errors.otp && <p className="text-red-500 text-center text-sm font-bold animate-pulse">{errors.otp}</p>}

                        <button type="submit" disabled={loading || otp.length !== 6} className="premium-button">
                            {loading ? 'Verifying...' : 'Validate & Continue'}
                        </button>

                        <button 
                            type="button" 
                            onClick={() => setStep(1)} 
                            className="w-full text-gray-400 text-xs font-bold hover:text-primary tracking-widest uppercase transition-colors"
                        >
                            ← Edit Details
                        </button>
                    </form>
                </>
            )}

            {step === 3 && (
                <div className="text-center py-10">
                    <div className="relative inline-block mb-8">
                        <div className="absolute inset-0 bg-green-100 rounded-full scale-150 animate-ping opacity-25"></div>
                        <div className="relative bg-green-500 p-6 rounded-full shadow-xl shadow-green-200">
                            <CheckCircle className="w-12 h-12 text-white" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-extrabold text-secondary mb-3">Verification Complete</h1>
                    <p className="text-gray-500 font-medium max-w-xs mx-auto mb-10 leading-relaxed">
                        Welcome to the platform! Redirecting you to the secure dashboard...
                    </p>
                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-green-500 h-full w-0 animate-[progress_2s_ease-in-out_forwards]"></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateAccount;
