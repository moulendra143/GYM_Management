import React, { useState, useEffect } from 'react';
import { FaClipboardList, FaEye } from 'react-icons/fa';
import memberService from '../../services/memberService';
import toast from 'react-hot-toast';

const WorkoutPlans = () => {
    const [plans, setPlans] = useState([]);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchPlans();
    }, []);

    const fetchPlans = async () => {
        try {
            const response = await memberService.getWorkoutPlans();
            if (response.success) {
                setPlans(response.data);
            }
        } catch (error) {
            toast.error('Failed to load workout plans');
        } finally {
            setLoading(false);
        }
    };

    const handleViewDetails = (plan) => {
        setSelectedPlan(plan);
        setShowModal(true);
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
                <h1 className="text-3xl font-bold text-gray-900">My Workout / Diet Plans</h1>
                <p className="text-gray-600 mt-2">
                    Workout and diet instructions assigned to you by the gym trainer/admin.
                </p>
            </div>

            {plans.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                    <FaClipboardList className="mx-auto text-4xl text-gray-400 mb-3" />
                    <p className="text-gray-600">No plans assigned yet.</p>
                    <p className="text-gray-500 text-sm mt-2">Check back later or contact your trainer.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {plans.map((plan) => (
                        <div key={plan.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">{plan.title}</h3>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {plan.planType} Plan · Created {new Date(plan.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleViewDetails(plan)}
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    <FaEye className="text-xl" />
                                </button>
                            </div>
                            <p className="text-gray-600 mt-3 line-clamp-3">{plan.description}</p>
                            <button
                                onClick={() => handleViewDetails(plan)}
                                className="mt-4 text-blue-600 text-sm font-medium hover:underline"
                            >
                                View Full
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal for plan details */}
            {showModal && selectedPlan && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <h2 className="text-2xl font-bold text-gray-900">{selectedPlan.title}</h2>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    ✕
                                </button>
                            </div>
                            <div className="mb-4">
                                <p className="text-sm text-gray-500">
                                    Type: {selectedPlan.planType} · Created: {new Date(selectedPlan.createdAt).toLocaleString()}
                                </p>
                            </div>
                            <div className="prose max-w-none">
                                <div className="whitespace-pre-wrap text-gray-700">{selectedPlan.description}</div>
                            </div>
                            <div className="mt-6">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WorkoutPlans;