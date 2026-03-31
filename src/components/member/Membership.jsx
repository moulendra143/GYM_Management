import React, { useState, useEffect } from 'react';
import memberService from '../../services/memberService';
import toast from 'react-hot-toast';

const Membership = () => {
    const [membership, setMembership] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMembership();
    }, []);

    const fetchMembership = async () => {
        try {
            const response = await memberService.getMembership();
            if (response.success) {
                setMembership(response.data);
            }
        } catch (error) {
            toast.error('Failed to load membership details');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!membership) {
        return (
            <div className="p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">My Membership</h1>
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                    <p className="text-gray-600 mb-4">No active membership found.</p>
                    <p className="text-gray-500 text-sm">Please contact the gym admin to purchase a membership plan.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">My Membership</h1>
                <p className="text-gray-600 mt-2">Your current plan, validity dates and payment summary.</p>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
                    <h2 className="text-xl font-bold text-white">Membership Details</h2>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-sm text-gray-500">Plan Name</label>
                            <p className="text-lg font-semibold">{membership.planName}</p>
                        </div>
                        <div>
                            <label className="text-sm text-gray-500">Duration</label>
                            <p className="text-lg font-semibold">{membership.durationMonths} month(s)</p>
                        </div>
                        <div>
                            <label className="text-sm text-gray-500">Plan Fee</label>
                            <p className="text-lg font-semibold">₹{membership.planFee.toFixed(2)}</p>
                        </div>
                        <div>
                            <label className="text-sm text-gray-500">Total Paid</label>
                            <p className="text-lg font-semibold text-green-600">₹{membership.totalPaid.toFixed(2)}</p>
                        </div>
                        <div>
                            <label className="text-sm text-gray-500">Remaining Amount</label>
                            <p className="text-lg font-semibold text-red-600">₹{membership.remainingAmount.toFixed(2)}</p>
                        </div>
                        <div>
                            <label className="text-sm text-gray-500">Start Date</label>
                            <p className="text-lg font-semibold">{new Date(membership.startDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                            <label className="text-sm text-gray-500">End Date</label>
                            <p className="text-lg font-semibold">{new Date(membership.endDate).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Membership;