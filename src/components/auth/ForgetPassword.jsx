import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaDumbbell, FaHome, FaEye, FaEyeSlash } from 'react-icons/fa';
import api from '../../services/api';

const ForgotPassword = () => {
    const navigate = useNavigate();

    const [step, setStep] = useState(1);

    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    // STEP 1 → SEND OTP
    const handleSendOtp = async () => {
        if (!email.trim()) {
            toast.error('Enter email');
            return;
        }

        setLoading(true);
        try {
            const res = await api.post('/auth/send-otp', { email });

            if (res.data.success) {
                toast.success('OTP sent');
                setStep(2);
            } else {
                toast.error(res.data.message);
            }
        } catch {
            toast.error('Error sending OTP');
        }
        setLoading(false);
    };

    // STEP 2 → VERIFY OTP
    const handleVerifyOtp = async () => {
        if (!otp.trim()) {
            toast.error('Enter OTP');
            return;
        }

        setLoading(true);
        try {
            const res = await api.post('/auth/verify-otp', { email, otp });

            if (res.data.success) {
                toast.success('OTP Verified');
                setStep(3);
            } else {
                toast.error('Invalid OTP');
            }
        } catch {
            toast.error('Verification failed');
        }
        setLoading(false);
    };

    // STEP 3 → RESET PASSWORD
    const handleResetPassword = async () => {
        if (!newPassword || !confirmPassword) {
            toast.error('Fill all fields');
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        setLoading(true);

        try {
            const res = await api.post('/auth/reset-password', {
                email,
                otp,
                newPassword
            });

            if (res.data.success) {
                toast.success('Password reset successful');
                navigate('/login');
            } else {
                toast.error(res.data.message);
            }
        } catch {
            toast.error('Reset failed');
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">

            {/* HEADER */}
            <div className="bg-slate-900 text-white py-4 px-6 flex justify-between">
                <div className="flex gap-2 items-center">
                    <FaDumbbell />
                    <h1>My Gym</h1>
                </div>

                <Link to="/" className="bg-indigo-100 text-indigo-700 p-2 rounded-md">
                    <FaHome />
                </Link>
            </div>

            {/* MAIN */}
            <div className="flex-grow flex items-center justify-center p-6">

                <div className="w-full max-w-5xl grid md:grid-cols-2 rounded-2xl overflow-hidden shadow-xl bg-white/80 backdrop-blur">

                    {/* LEFT IMAGE */}
                    <div className="hidden md:block">
                        <img
                            src="/forget_gym.jpg"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* RIGHT FORM */}
                    <div className="p-10">

                        <h2 className="text-2xl font-bold mb-2">Forgot Password</h2>
                        <p className="text-gray-500 text-sm mb-6">
                            Reset your account password
                        </p>

                        {/* STEP INDICATOR */}
                        <div className="flex justify-between mb-6 text-sm">
                            {[1,2,3].map((s) => (
                                <div key={s} className={`flex-1 text-center`}>
                                    <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center 
                                        ${step >= s ? 'bg-indigo-600 text-white' : 'bg-gray-300'}`}>
                                        {s}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* STEP 1 */}
                        {step === 1 && (
                            <>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full p-3 border rounded-md mb-4 focus:ring-2 focus:ring-indigo-400"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                                <button
                                    onClick={handleSendOtp}
                                    className="w-full py-3 bg-indigo-600 text-white rounded-md"
                                >
                                    {loading ? 'Sending...' : 'Send OTP'}
                                </button>
                            </>
                        )}

                        {/* STEP 2 */}
                        {step === 2 && (
                            <>
                                <input
                                    placeholder="Enter OTP"
                                    className="w-full p-3 border rounded-md mb-4"
                                    onChange={(e) => setOtp(e.target.value)}
                                />

                                <button
                                    onClick={handleVerifyOtp}
                                    className="w-full py-3 bg-indigo-600 text-white rounded-md"
                                >
                                    Verify OTP
                                </button>
                            </>
                        )}

                        {/* STEP 3 */}
                        {step === 3 && (
                            <>
                                <div className="relative mb-4">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="New Password"
                                        className="w-full p-3 border rounded-md"
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-3"
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>

                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    className="w-full p-3 border rounded-md mb-4"
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />

                                <button
                                    onClick={handleResetPassword}
                                    className="w-full py-3 bg-indigo-600 text-white rounded-md"
                                >
                                    Reset Password
                                </button>
                            </>
                        )}

                        <p className="text-center text-sm mt-6">
                            Back to <Link to="/" className="text-indigo-600">Login</Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <footer className="bg-slate-900 text-gray-400 text-center py-4">
                © 2024 My Gym
            </footer>
        </div>
    );
};

export default ForgotPassword;