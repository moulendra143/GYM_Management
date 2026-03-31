import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white mt-auto">
            <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-3">My Gym</h3>
                        <p className="text-gray-400 text-sm">
                            Your fitness journey starts here. Professional gym management system.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="/login" className="hover:text-white">Member Login</a></li>
                            <li><a href="/admin/dashboard" className="hover:text-white">Admin Login</a></li>
                            <li><a href="/register" className="hover:text-white">Register</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Contact</h3>
                        <p className="text-gray-400 text-sm">Email: support@mygym.com</p>
                        <p className="text-gray-400 text-sm">Phone: +91 9876543210</p>
                        <p className="text-gray-400 text-sm">Address: 123 Fitness Street, City, Country</p>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
                    <p>&copy; {new Date().getFullYear()} My Gym. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;