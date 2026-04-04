import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { FaDumbbell, FaHome, FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    // ✅ FIXED HANDLE SUBMIT
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username.trim() || !password.trim()) {
            toast.error('Please fill out username and password');
            return;
        }

        setLoading(true);

        try {
            const result = await login(username, password);

            console.log("🧠 FINAL RESULT:", result);
            console.log("👤 USER:", result.user);
            console.log("🎭 ROLE:", result.user?.role);

            if (result.success) {
                toast.success(`Welcome ${result.user.role}!`);

                // ✅ NORMALIZE ROLE
                const role = result.user.role?.toLowerCase().trim();

                console.log("🔍 NORMALIZED ROLE:", role);

                if (role === "admin") {
                    console.log("🚀 Redirecting to ADMIN dashboard");
                    navigate("/admin/dashboard");
                } else {
                    console.log("🚀 Redirecting to MEMBER dashboard");
                    navigate("/member/dashboard");
                }

            } else {
                toast.error(result.message || "Login failed");
            }

        } catch (error) {
            console.error("❌ ERROR:", error);
            toast.error("Something went wrong");
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
                        <Link to="/member/login" className="px-4 py-2 bg-teal-100 text-black rounded-md">
                            Member Login
                        </Link>
                    </div>
                </div>
            </div>

            {/* MAIN */}
            <div className="flex-grow flex items-center justify-center p-6">
                <div className="w-full max-w-5xl bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl grid md:grid-cols-2 overflow-hidden">

                    {/* IMAGE */}
                    <div className="hidden md:block">
                        <img src="/admin_gym.jpg" alt="gym" className="w-full h-full object-cover" />
                    </div>

                    {/* FORM */}
                    <div className="p-10">
                        <div className="flex justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-bold">Admin Login</h2>
                                <p className="text-gray-500 text-sm">Manage your gym</p>
                            </div>

                            <Link to="/" className="bg-blue-100 text-blue-700 p-2 rounded-md hover:bg-blue-200">
                                <FaHome />
                            </Link>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">

                            <input
                                type="text"
                                placeholder="Admin username"
                                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                                onChange={(e) => setUsername(e.target.value)}
                            />

                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Password"
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

                            <button
                                disabled={loading}
                                className="w-full py-3 text-white rounded-md bg-gradient-to-r from-blue-500 to-purple-600"
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

export default Login;