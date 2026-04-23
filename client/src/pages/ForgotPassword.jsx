import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { KeyRound, Mail, Phone, CheckCircle, ArrowLeft, ShieldAlert } from 'lucide-react';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Input, 2: OTP, 3: Success
    const [identifier, setIdentifier] = useState('');
    const [otp, setOtp] = useState('');
    const [generatedOtp, setGeneratedOtp] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleSendOtp = (e) => {
        e.preventDefault();
        if (!identifier) {
            setErrors({ identifier: 'Email or Mobile number is required' });
            return;
        }

        setLoading(true);
        setTimeout(() => {
            const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
            setGeneratedOtp(newOtp);
            setStep(2);
            setLoading(false);
            console.log('Generated OTP:', newOtp);
            alert(`OTP sent to ${identifier}: ${newOtp}`);
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
        <div className="premium-card animate-fade-in relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
                <ShieldAlert className="w-40 h-40" />
            </div>

            <Link 
                to="/login" 
                className="inline-flex items-center text-xs font-bold text-gray-400 hover:text-primary mb-10 tracking-widest uppercase transition-colors"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Return to Login
            </Link>

            {step === 1 && (
                <>
                    <div className="flex flex-col mb-10">
                        <div className="bg-primary/10 w-fit p-4 rounded-2xl mb-6">
                            <KeyRound className="w-10 h-10 text-primary" />
                        </div>
                        <h1 className="text-3xl font-extrabold text-secondary tracking-tight">Recover Access</h1>
                        <p className="text-gray-500 mt-2 font-medium">Enter your details to receive a security code</p>
                    </div>

                    <form onSubmit={handleSendOtp} className="space-y-8">
                        <div>
                            <label className="block text-sm font-bold text-secondary mb-3 px-1">
                                Email Address / Mobile Number
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                                    <Mail className="w-5 h-5" />
                                </span>
                                <input
                                    type="text"
                                    className={`premium-input pl-12 ${errors.identifier ? 'border-red-400 ring-1 ring-red-100' : ''}`}
                                    placeholder="yourname@domain.com"
                                    value={identifier}
                                    onChange={(e) => {
                                        setIdentifier(e.target.value);
                                        setErrors({});
                                    }}
                                />
                            </div>
                            {errors.identifier && <p className="text-red-500 text-xs font-semibold mt-2 ml-1">{errors.identifier}</p>}
                        </div>

                        <button type="submit" disabled={loading} className="premium-button">
                            {loading ? 'Sending Code...' : 'Request Security Code'}
                        </button>
                    </form>
                </>
            )}

            {step === 2 && (
                <>
                    <div className="flex flex-col mb-10">
                        <div className="bg-primary/10 w-fit p-4 rounded-2xl mb-6">
                            <Phone className="w-10 h-10 text-primary" />
                        </div>
                        <h1 className="text-3xl font-extrabold text-secondary tracking-tight">Verify Identity</h1>
                        <p className="text-gray-500 mt-2 font-medium">
                            Security code sent to <br />
                            <span className="text-secondary font-bold">{identifier}</span>
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
                        {errors.otp && <p className="text-red-500 text-center text-sm font-bold">{errors.otp}</p>}

                        <button type="submit" disabled={loading || otp.length !== 6} className="premium-button">
                            {loading ? 'Checking...' : 'Confirm Security Code'}
                        </button>

                        <button 
                            type="button" 
                            onClick={() => setStep(1)} 
                            className="w-full text-gray-400 text-xs font-bold hover:text-primary tracking-widest uppercase transition-colors"
                        >
                            Try Different Contact
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
                    <h1 className="text-3xl font-extrabold text-secondary mb-3">Identity Confirmed</h1>
                    <p className="text-gray-500 font-medium max-w-xs mx-auto mb-10 leading-relaxed">
                        Access has been successfully restored. Returning to login...
                    </p>
                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-green-500 h-full w-0 animate-[progress_2s_ease-in-out_forwards]"></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ForgotPassword;
