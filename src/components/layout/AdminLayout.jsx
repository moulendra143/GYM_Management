import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../common/Navbar';


const AdminLayout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-100">

            {/* ✅ TOP NAVBAR ONLY */}
            <Navbar onLogout={handleLogout} />

            {/* ✅ MAIN CONTENT */}
            <main className="p-6">
                <Outlet />
            </main>

        </div>
    );
};

export default AdminLayout;