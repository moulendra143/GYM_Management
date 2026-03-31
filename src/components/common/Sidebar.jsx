import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    FaTachometerAlt,
    FaUsers,
    FaDumbbell,
    FaChalkboardTeacher,
    FaMoneyBillWave,
    FaClipboardList,
    FaEnvelope,
    FaCogs,
    FaUser,
    FaCalendarCheck,
    FaComment,
    FaSignOutAlt,
} from 'react-icons/fa';

const Sidebar = () => {
    const { user, isAdmin, logout } = useAuth();

    const memberNavItems = [
        { path: '/member/dashboard', icon: FaTachometerAlt, label: 'Dashboard' },
        { path: '/member/profile', icon: FaUser, label: 'My Profile' },
        { path: '/member/membership', icon: FaDumbbell, label: 'Membership' },
        { path: '/member/attendance', icon: FaCalendarCheck, label: 'Attendance' },
        { path: '/member/payments', icon: FaMoneyBillWave, label: 'Payments' },
        { path: '/member/workout-plans', icon: FaClipboardList, label: 'Workout Plans' },
        { path: '/member/feedback', icon: FaComment, label: 'Feedback' },
    ];

    const adminNavItems = [
        { path: '/admin/dashboard', icon: FaTachometerAlt, label: 'Dashboard' },
        { path: '/admin/members', icon: FaUsers, label: 'Manage Members' },
        { path: '/admin/plans', icon: FaDumbbell, label: 'Membership Plans' },
        { path: '/admin/trainers', icon: FaChalkboardTeacher, label: 'Trainers' },
        { path: '/admin/payments', icon: FaMoneyBillWave, label: 'Payments' },
        { path: '/admin/workout-plans', icon: FaClipboardList, label: 'Workout Plans' },
        { path: '/admin/enquiries', icon: FaEnvelope, label: 'Enquiries' },
        { path: '/admin/equipment', icon: FaCogs, label: 'Equipment' },
    ];

    const navItems = isAdmin() ? adminNavItems : memberNavItems;

    return (
        <aside className="w-64 bg-gray-800 text-white flex flex-col h-screen sticky top-0">
            <div className="p-4 border-b border-gray-700">
                <h1 className="text-xl font-bold">My Gym</h1>
                <p className="text-sm text-gray-400">
                    {isAdmin() ? 'Admin Panel' : 'Member Portal'}
                </p>
            </div>

            <nav className="flex-1 p-4">
                <ul className="space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <li key={item.path}>
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `flex items-center space-x-3 p-2 rounded transition ${isActive
                                            ? 'bg-blue-600 text-white'
                                            : 'hover:bg-gray-700'
                                        }`
                                    }
                                >
                                    <Icon className="text-lg" />
                                    <span>{item.label}</span>
                                </NavLink>
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
                        <p className="text-xs text-gray-400">
                            {isAdmin() ? 'Administrator' : 'Member'}
                        </p>
                    </div>
                </div>
                <button
                    onClick={logout}
                    className="flex items-center space-x-3 w-full p-2 rounded hover:bg-gray-700 transition text-red-400"
                >
                    <FaSignOutAlt />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;