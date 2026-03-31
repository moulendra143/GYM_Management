import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarCheck, FaMoneyBillWave, FaDumbbell, FaUser } from 'react-icons/fa';
import memberService from '../../services/memberService';
import toast from 'react-hot-toast';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalAttendance: 0,
        totalPayments: 0,
        workoutPlans: 0,
        activeMembership: null
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const response = await memberService.getDashboard();
            if (response.success) {
                setStats(response.data);
            }
        } catch (error) {
            toast.error('Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };

    const handleCheckIn = async () => {
        try {
            const response = await memberService.checkIn();
            if (response.success) {
                toast.success('Checked in successfully!');
                fetchDashboardData();
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error('Failed to check in');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Member Dashboard</h1>
                <p className="text-gray-600 mt-2">
                    Track your attendance, payments, membership, and workout plans in one place.
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">Total Attendance</p>
                            <p className="text-3xl font-bold text-gray-900">{stats.totalAttendance}</p>
                            <p className="text-sm text-gray-600 mt-2">Check-in history</p>
                        </div>
                        <FaCalendarCheck className="text-4xl text-blue-500" />
                    </div>
                    <Link to="/member/attendance" className="text-blue-600 text-sm mt-4 inline-block">
                        View Attendance →
                    </Link>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">Total Payments</p>
                            <p className="text-3xl font-bold text-gray-900">{stats.totalPayments}</p>
                            <p className="text-sm text-gray-600 mt-2">Payment records</p>
                        </div>
                        <FaMoneyBillWave className="text-4xl text-green-500" />
                    </div>
                    <Link to="/member/payments" className="text-blue-600 text-sm mt-4 inline-block">
                        View Payments →
                    </Link>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">Workout Plans</p>
                            <p className="text-3xl font-bold text-gray-900">{stats.workoutPlans}</p>
                            <p className="text-sm text-gray-600 mt-2">Plans assigned</p>
                        </div>
                        <FaDumbbell className="text-4xl text-purple-500" />
                    </div>
                    <Link to="/member/workout-plans" className="text-blue-600 text-sm mt-4 inline-block">
                        View Plans →
                    </Link>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">Active Membership</p>
                            {stats.activeMembership ? (
                                <>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {stats.activeMembership.planName}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Valid until: {new Date(stats.activeMembership.endDate).toLocaleDateString()}
                                    </p>
                                </>
                            ) : (
                                <p className="text-lg text-gray-600">No active membership</p>
                            )}
                        </div>
                        <FaUser className="text-4xl text-orange-500" />
                    </div>
                    <Link to="/member/membership" className="text-blue-600 text-sm mt-4 inline-block">
                        View Details →
                    </Link>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <button
                        onClick={handleCheckIn}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Check In
                    </button>
                    <Link
                        to="/member/profile"
                        className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition text-center"
                    >
                        My Profile
                    </Link>
                    <Link
                        to="/member/membership"
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-center"
                    >
                        My Membership
                    </Link>
                    <Link
                        to="/member/feedback"
                        className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition text-center"
                    >
                        Feedback
                    </Link>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
                <div className="space-y-4">
                    <div className="border-l-4 border-blue-500 pl-4">
                        <p className="text-gray-900 font-medium">Membership Status</p>
                        {stats.activeMembership ? (
                            <p className="text-gray-600 text-sm">
                                Your {stats.activeMembership.planName} is active until{' '}
                                {new Date(stats.activeMembership.endDate).toLocaleDateString()}
                                {stats.activeMembership.remainingAmount > 0 && (
                                    <span className="text-red-600">
                                        {' '}· ₹{stats.activeMembership.remainingAmount} remaining
                                    </span>
                                )}
                            </p>
                        ) : (
                            <p className="text-gray-600 text-sm">
                                No active membership. Please contact admin to purchase a plan.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;