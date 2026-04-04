import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaDumbbell, FaUsers, FaCalendarCheck, FaMoneyBillWave, FaCogs } from 'react-icons/fa';
import toast from 'react-hot-toast';
import api from '../services/api';

const LandingPage = () => {
    const navigate = useNavigate();
    const [enquiryData, setEnquiryData] = useState({
        name: '',
        email: '',
        mobile: '',
        message: '',
    });
    const [submitting, setSubmitting] = useState(false);

    const handleEnquiryChange = (e) => {
        setEnquiryData({ ...enquiryData, [e.target.name]: e.target.value });
    };

    const handleEnquirySubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const response = await api.post('/admin/enquiries', enquiryData);
            if (response.data.success) {
                toast.success('Enquiry submitted successfully!');
                setEnquiryData({ name: '', email: '', mobile: '', message: '' });
            } else {
                toast.error(response.data.message || 'Failed to submit enquiry');
            }
        } catch (error) {
            toast.error('Something went wrong');
        } finally {
            setSubmitting(false);
        }
    };

    const features = [
        { icon: FaUsers, title: 'Member Management', description: 'Add, edit, search members easily.', color: 'bg-blue-50' },
        { icon: FaCalendarCheck, title: 'Attendance Tracking', description: 'Daily check-in records.', color: 'bg-green-50' },
        { icon: FaMoneyBillWave, title: 'Payments & Plans', description: 'Paid/pending and packages.', color: 'bg-yellow-50' },
        { icon: FaCogs, title: 'Equipment', description: 'Inventory and purchase records.', color: 'bg-purple-50' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">

            {/* Header */}
            <div className="bg-gradient-to-r from-[#0f172a] to-[#1e293b] text-white py-4 shadow-md">
                <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <FaDumbbell className="text-xl" />
                        <h1 className="text-xl font-bold">My Gym</h1>
                    </div>
                    <div className="flex gap-3">
                        <Link to="/login" className="px-4 py-2 bg-teal-100 text-teal-800 rounded-md">Admin Login</Link>
                    </div>
                </div>
            </div>

            {/* Hero Card */}
            <div className="max-w-7xl mx-auto px-4 mt-8">
                <div className="rounded-2xl p-10 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white grid md:grid-cols-2 gap-10 items-center shadow-lg">

                    <div>
                        <p className="text-sm mb-2">Gym Management System</p>
                        <h2 className="text-4xl font-bold mb-4">Welcome to My Gym</h2>
                        <p className="text-white/90 mb-6">
                            Simple and professional Gym Management System built using Django, Bootstrap and SQLite.
                        </p>

                        <div className="flex gap-4">
                            <div className="flex gap-4">
                                <Link 
                                    to="/member/login" 
                                    className="bg-white/90 text-black px-5 py-2 rounded-md"
                                >
                                    Member Login
                                </Link>

                                <Link 
                                    to="/trainer/login" 
                                    className="bg-white/20 px-5 py-2 rounded-md"
                                >
                                    Trainer Login
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/20 rounded-2xl h-72 p-2 backdrop-blur overflow-hidden">
                        <img 
                            src="/gym-interior.jpg" 
                            alt="Gym" 
                            className="rounded-xl w-full h-full object-cover border-4 border-white shadow-lg"
                        />
                    </div>
                </div>
            </div>

            {/* Feature Pills */}
            <div className="max-w-7xl mx-auto px-4 mt-8 grid md:grid-cols-4 gap-4">
                {features.map((f, i) => {
                    const Icon = f.icon;
                    return (
                        <div key={i} className={`${f.color} rounded-xl px-4 py-3 shadow flex items-center gap-3`}>
                            <Icon className="text-xl text-gray-700" />
                            <div>
                                <h4 className="font-semibold text-sm">{f.title}</h4>
                                <p className="text-xs text-gray-500">{f.description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Why + Enquiry Section */}
            <div className="max-w-7xl mx-auto px-4 mt-12 grid md:grid-cols-2 gap-8 items-start">

                {/* Left - Why Section */}
                <div>
                    <h2 className="text-2xl font-bold mb-3">Why this system?</h2>
                    <p className="text-gray-600 mb-6">
                        This project helps gym owners manage day-to-day operations efficiently. Admin can handle members,
                        plans, trainers, equipment, attendance and payments, while members can view profile, membership,
                        attendance and assigned workout plans.
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-100 rounded-xl p-4">
                            <h4 className="font-semibold">🔒 Secure Access</h4>
                            <p className="text-sm text-gray-500">Role-based access for Admin and Member.</p>
                        </div>
                        <div className="bg-gray-100 rounded-xl p-4">
                            <h4 className="font-semibold">⚡ Fast & Simple</h4>
                            <p className="text-sm text-gray-500">Clean UI built with modern stack.</p>
                        </div>
                    </div>
                </div>

                {/* Right - Enquiry Card */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

                    {/* Header */}
                    <div className="bg-[#0f172a] text-white px-6 py-4">
                        <h3 className="font-semibold">Contact / Enquiry</h3>
                        <p className="text-xs text-gray-300">We will respond as soon as possible.</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleEnquirySubmit} className="p-6 space-y-4">
                        <div>
                            <label className="text-sm font-medium">Name *</label>
                            <input name="name" placeholder="Enter your name" value={enquiryData.name} onChange={handleEnquiryChange} className="w-full mt-1 p-3 border rounded-md" required />
                        </div>

                        <div>
                            <label className="text-sm font-medium">Email</label>
                            <input name="email" placeholder="abc@example.com" value={enquiryData.email} onChange={handleEnquiryChange} className="w-full mt-1 p-3 border rounded-md" />
                        </div>

                        <div>
                            <label className="text-sm font-medium">Mobile</label>
                            <input name="mobile" placeholder="e.g. 9876543210" value={enquiryData.mobile} onChange={handleEnquiryChange} className="w-full mt-1 p-3 border rounded-md" />
                        </div>

                        <div>
                            <label className="text-sm font-medium">Message *</label>
                            <textarea name="message" placeholder="Write your message..." value={enquiryData.message} onChange={handleEnquiryChange} className="w-full mt-1 p-3 border rounded-md" required />
                        </div>

                        <button className="w-full bg-gray-900 text-white py-3 rounded-md hover:bg-black">
                            ✈ Submit Enquiry
                        </button>
                    </form>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-[#0f172a] text-gray-400 text-center py-6">
                © 2024 My Gym
            </footer>
        </div>
    );
};

export default LandingPage;
