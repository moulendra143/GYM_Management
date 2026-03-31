import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaClock } from 'react-icons/fa';
import memberService from '../../services/memberService';
import toast from 'react-hot-toast';

const Attendance = () => {
    const [attendance, setAttendance] = useState([]);
    const [loading, setLoading] = useState(true);
    const [checkingIn, setCheckingIn] = useState(false);

    useEffect(() => {
        fetchAttendance();
    }, []);

    const fetchAttendance = async () => {
        try {
            const response = await memberService.getAttendance();
            if (response.success) {
                setAttendance(response.data);
            }
        } catch (error) {
            toast.error('Failed to load attendance records');
        } finally {
            setLoading(false);
        }
    };

    const handleCheckIn = async () => {
        setCheckingIn(true);
        try {
            const response = await memberService.checkIn();
            if (response.success) {
                toast.success('Checked in successfully!');
                fetchAttendance();
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error('Failed to check in');
        } finally {
            setCheckingIn(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    const today = new Date().toLocaleDateString();
    const checkedInToday = attendance.some(
        a => new Date(a.date).toLocaleDateString() === today
    );

    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">My Attendance</h1>
                <p className="text-gray-600 mt-2">Your daily check-ins and time-in history</p>
            </div>

            {/* Check-in Button */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">Check In Today</h2>
                        <p className="text-gray-600">
                            {checkedInToday
                                ? "You've already checked in today!"
                                : "Mark your attendance for today"}
                        </p>
                    </div>
                    <button
                        onClick={handleCheckIn}
                        disabled={checkedInToday || checkingIn}
                        className={`px-6 py-3 rounded-lg font-semibold ${checkedInToday
                                ? 'bg-green-600 text-white cursor-not-allowed'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                            } transition disabled:opacity-50`}
                    >
                        {checkingIn ? (
                            'Checking in...'
                        ) : checkedInToday ? (
                            <span className="flex items-center gap-2">
                                <FaCheckCircle /> Checked In
                            </span>
                        ) : (
                            'Check In'
                        )}
                    </button>
                </div>
            </div>

            {/* Attendance History */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">Attendance History</h2>
                </div>

                {attendance.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                        <FaClock className="mx-auto text-4xl mb-3" />
                        <p>No attendance records found</p>
                        <p className="text-sm mt-2">Check in today to start tracking</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        #
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Time In
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {attendance.map((record, index) => (
                                    <tr key={record.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {index + 1}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {new Date(record.date).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {new Date(record.checkInTime).toLocaleTimeString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                Present
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Attendance;