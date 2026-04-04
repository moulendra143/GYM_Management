import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { FaDumbbell, FaHome, FaEye, FaEyeSlash } from 'react-icons/fa';

const TrainerLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username.trim() || !password.trim()) {
            toast.error('Please fill out username and password');
            return;
        }

        setLoading(true);

        const result = await login(username, password);

        if (result.success && result.user.role === 'Trainer') {
            toast.success('Welcome Trainer!');
            navigate('/trainer/dashboard');
        } else {
            toast.error(result.message || 'Invalid credentials');
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">

            {/* HEADER */}
            <div className="bg-gradient-to-r from-[#0f172a] to-[#1e293b] text-white py-4 shadow-md">
                <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <FaDumbbell />
                        <h1 className="font-bold">My Gym</h1>
                    </div>
                    <div className="flex gap-3">
                        <Link to="/register" className="px-4 py-2 bg-blue-100 text-black rounded-md">Sign up</Link>
                    </div>
                </div>
            </div>

            {/* MAIN */}
            <div className="flex-grow flex items-center justify-center p-6">
                <div className="w-full max-w-5xl bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl grid md:grid-cols-2 overflow-hidden">

                    {/* IMAGE */}
                    <div className="hidden md:block">
                        <img src="/trainer_gym.jpeg" className="w-full h-full object-cover" />
                    </div>

                    {/* FORM */}
                    <div className="p-10">
                        <div className="flex justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-bold">Trainer Login</h2>
                                <p className="text-gray-500 text-sm">Sign in to your dashboard</p>
                            </div>

                            <Link to="/" className="bg-blue-100 text-blue-700 p-2 rounded-md hover:bg-blue-200">
                                <FaHome />
                            </Link>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">

                            {/* USERNAME */}
                            <input
                                type="text"
                                placeholder="Enter username"
                                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                                onChange={(e) => setUsername(e.target.value)}
                            />

                            {/* PASSWORD */}
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter password"
                                    className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                                    onChange={(e) => setPassword(e.target.value)}
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3 text-gray-500"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>

                                <Link to="/forgot-password" className="text-xs text-blue-600 mt-1 inline-block">
                                    Forgot Password?
                                </Link>
                            </div>

                            {/* BUTTON */}
                            <button
                                disabled={loading}
                                className="w-full py-3 rounded-md text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 disabled:opacity-50"
                            >
                                {loading ? 'Logging in...' : 'Login'}
                            </button>

                            <p className="text-sm text-center">
                                Don’t have an account?{' '}
                                <Link to="/register" className="text-blue-600 font-medium">Sign up</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <footer className="bg-[#0f172a] text-gray-400 text-center py-6">
                © 2024 My Gym
            </footer>
        </div>
    );
};

export default TrainerLogin;