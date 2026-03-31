import React, { useState, useEffect } from 'react';
import { FaPlus, FaEye, FaTrash } from 'react-icons/fa';
import adminService from '../../services/adminService';
import toast from 'react-hot-toast';

const ManageWorkoutPlans = () => {
    const [plans, setPlans] = useState([]);
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [formData, setFormData] = useState({
        userId: '',
        title: '',
        description: '',
        planType: 'Workout',
    });
    const [filterMember, setFilterMember] = useState('');

    useEffect(() => {
        fetchPlans();
        fetchMembers();
    }, []);

    const fetchPlans = async () => {
        try {
            const response = await adminService.getAllWorkoutPlans(filterMember ? parseInt(filterMember) : null);
            if (response.success) {
                setPlans(response.data);
            }
        } catch (error) {
            toast.error('Failed to load workout plans');
        } finally {
            setLoading(false);
        }
    };

    const fetchMembers = async () => {
        try {
            const response = await adminService.getMembers();
            if (response.success) {
                setMembers(response.data);
            }
        } catch (error) {
            console.error('Failed to load members', error);
        }
    };

    const handleFilter = () => {
        setLoading(true);
        fetchPlans();
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await adminService.addWorkoutPlan(formData);
            if (response.success) {
                toast.success('Workout plan added successfully');
                setShowModal(false);
                fetchPlans();
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error('Failed to add plan');
        }
    };

    const handleDelete = async (id) => {
        // Note: Backend might need a delete endpoint; you can add it.
        // For now, just show a message.
        toast.error('Delete functionality not implemented in backend');
    };

    const viewDetails = (plan) => {
        setSelectedPlan(plan);
        setShowDetailsModal(true);
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
            <div className="mb-8 flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">Workout / Diet Plans</h1>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                    <FaPlus /> Add Plan
                </button>
            </div>

            {/* Filter Bar */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                <div className="flex gap-4 items-end">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Member</label>
                        <select
                            value={filterMember}
                            onChange={(e) => setFilterMember(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                            <option value="">All Members</option>
                            {members.map(member => (
                                <option key={member.id} value={member.id}>{member.fullName} ({member.username})</option>
                            ))}
                        </select>
                    </div>
                    <button
                        onClick={handleFilter}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Filter
                    </button>
                </div>
            </div>

            {/* Plans List */}
            <div className="space-y-4">
                {plans.map((plan) => (
                    <div key={plan.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                        <div className="flex justify-between items-start">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <h3 className="text-lg font-semibold text-gray-900">{plan.title}</h3>
                                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                                        {plan.planType}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500 mb-2">
                                    Member: {plan.userName} · Created: {new Date(plan.createdAt).toLocaleString()}
                                </p>
                                <p className="text-gray-600 line-clamp-2">{plan.description}</p>
                            </div>
                            <div className="flex gap-2 ml-4">
                                <button
                                    onClick={() => viewDetails(plan)}
                                    className="text-blue-600 hover:text-blue-800"
                                    title="View Details"
                                >
                                    <FaEye />
                                </button>
                                <button
                                    onClick={() => handleDelete(plan.id)}
                                    className="text-red-600 hover:text-red-800"
                                    title="Delete"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                {plans.length === 0 && (
                    <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-500">
                        No workout plans found.
                    </div>
                )}
            </div>

            {/* Add Plan Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <h2 className="text-2xl font-bold mb-4">Add Workout / Diet Plan</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Member *</label>
                                        <select
                                            name="userId"
                                            value={formData.userId}
                                            onChange={handleInputChange}
                                            required
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        >
                                            <option value="">Select Member</option>
                                            {members.map(member => (
                                                <option key={member.id} value={member.id}>{member.fullName} ({member.username})</option>
                                            ))}
                                        </select>
                                        <p className="text-xs text-gray-500 mt-1">Choose the member for whom this plan is created.</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Title *</label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="e.g., 4-Week Strength + Diet Plan"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Plan Type *</label>
                                        <select
                                            name="planType"
                                            value={formData.planType}
                                            onChange={handleInputChange}
                                            required
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        >
                                            <option value="Workout">Workout</option>
                                            <option value="Diet">Diet</option>
                                            <option value="Both">Both</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Description / Plan Details *</label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            required
                                            rows="8"
                                            placeholder="Tip: Use Day-wise points for clarity (Workout + Diet)."
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                    >
                                        Save Plan
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* View Details Modal */}
            {showDetailsModal && selectedPlan && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <h2 className="text-2xl font-bold text-gray-900">{selectedPlan.title}</h2>
                                <button
                                    onClick={() => setShowDetailsModal(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    ✕
                                </button>
                            </div>
                            <div className="mb-4">
                                <p className="text-sm text-gray-500">
                                    Member: {selectedPlan.userName} · Type: {selectedPlan.planType} · Created: {new Date(selectedPlan.createdAt).toLocaleString()}
                                </p>
                            </div>
                            <div className="prose max-w-none">
                                <div className="whitespace-pre-wrap text-gray-700">{selectedPlan.description}</div>
                            </div>
                            <div className="mt-6">
                                <button
                                    onClick={() => setShowDetailsModal(false)}
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

export default ManageWorkoutPlans;