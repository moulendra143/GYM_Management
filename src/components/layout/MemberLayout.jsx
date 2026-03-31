import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    FaTachometerAlt, FaUser, FaDumbbell, FaCalendarCheck,
    FaMoneyBillWave, FaClipboardList, FaComment, FaSignOutAlt
} from 'react-icons/fa';

const MemberLayout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = [
        { path: '/member/dashboard', icon: FaTachometerAlt, label: 'Dashboard' },
        { path: '/member/profile', icon: FaUser, label: 'My Profile' },
        { path: '/member/membership', icon: FaDumbbell, label: 'Membership' },
        { path: '/member/attendance', icon: FaCalendarCheck, label: 'Attendance' },
        { path: '/member/payments', icon: FaMoneyBillWave, label: 'Payments' },
        { path: '/member/workout-plans', icon: FaClipboardList, label: 'Workout Plans' },
        { path: '/member/feedback', icon: FaComment, label: 'Feedback' },
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 text-white flex flex-col">
                <div className="p-4 border-b border-gray-700">
                    <h1 className="text-xl font-bold">My Gym</h1>
                    <p className="text-sm text-gray-400">Member Portal</p>
                </div>
                <nav className="flex-1 p-4">
                    <ul className="space-y-2">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <li key={item.path}>
                                    <Link
                                        to={item.path}
                                        className="flex items-center space-x-3 p-2 rounded hover:bg-gray-700 transition"
                                    >
                                        <Icon className="text-lg" />
                                        <span>{item.label}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
                <div className="p-4 border-t border-gray-700">
                    <div className="flex items-center space-x-3 mb-3">
                        <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                            <FaUser />
                        </div>
                        <div>
                            <p className="text-sm font-medium">{user?.fullName}</p>
                            <p className="text-xs text-gray-400">Member</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 w-full p-2 rounded hover:bg-gray-700 transition text-red-400"
                    >
                        <FaSignOutAlt />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <div className="p-6">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default MemberLayout;