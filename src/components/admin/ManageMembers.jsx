import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaUserPlus, FaEye } from 'react-icons/fa';
import adminService from '../../services/adminService';
import toast from 'react-hot-toast';

const ManageMembers = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingMember, setEditingMember] = useState(null);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        fullName: '',
        email: '',
        mobile: '',
        age: '',
        gender: '',
        address: '',
    });
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);
    const [plans, setPlans] = useState([]);
    const [assignData, setAssignData] = useState({
        planId: '',
        startDate: '',
        amountPaid: '',
        paymentMode: 'Cash',
        notes: '',
    });

    useEffect(() => {
        fetchMembers();
        fetchPlans();
    }, []);

    const fetchMembers = async () => {
        try {
            const response = await adminService.getMembers();
            if (response.success) {
                setMembers(response.data);
            }
        } catch (error) {
            toast.error('Failed to load members');
        } finally {
            setLoading(false);
        }
    };

    const fetchPlans = async () => {
        try {
            const response = await adminService.getPlans();
            if (response.success) {
                setPlans(response.data);
            }
        } catch (error) {
            console.error('Failed to load plans', error);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAssignInputChange = (e) => {
        setAssignData({ ...assignData, [e.target.name]: e.target.value });
    };

    const openAddModal = () => {
        setEditingMember(null);
        setFormData({
            username: '',
            password: '',
            fullName: '',
            email: '',
            mobile: '',
            age: '',
            gender: '',
            address: '',
        });
        setShowModal(true);
    };

    const openEditModal = (member) => {
        setEditingMember(member);
        setFormData({
            username: member.username,
            password: '', // leave blank for edit
            fullName: member.fullName,
            email: member.email || '',
            mobile: member.mobile || '',
            age: member.age || '',
            gender: member.gender || '',
            address: member.address || '',
        });
        setShowModal(true);
    };

    const openAssignModal = (member) => {
        setSelectedMember(member);
        setAssignData({
            planId: '',
            startDate: new Date().toISOString().split('T')[0],
            amountPaid: '',
            paymentMode: 'Cash',
            notes: '',
        });
        setShowAssignModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingMember) {
                const response = await adminService.updateMember(editingMember.id, formData);
                if (response.success) {
                    toast.success('Member updated successfully');
                    fetchMembers();
                    setShowModal(false);
                } else {
                    toast.error(response.message);
                }
            } else {
                const response = await adminService.addMember(formData);
                if (response.success) {
                    toast.success('Member added successfully');
                    fetchMembers();
                    setShowModal(false);
                } else {
                    toast.error(response.message);
                }
            }
        } catch (error) {
            toast.error('Operation failed');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this member?')) {
            try {
                const response = await adminService.deleteMember(id);
                if (response.success) {
                    toast.success('Member deleted successfully');
                    fetchMembers();
                } else {
                    toast.error(response.message);
                }
            } catch (error) {
                toast.error('Delete failed');
            }
        }
    };

    const handleAssignMembership = async (e) => {
        e.preventDefault();
        if (!assignData.planId || !assignData.startDate) {
            toast.error('Please select a plan and start date');
            return;
        }
        try {
            const payload = {
                userId: selectedMember.id,
                planId: parseInt(assignData.planId),
                startDate: assignData.startDate,
                amountPaid: parseFloat(assignData.amountPaid) || 0,
                paymentMode: assignData.paymentMode,
                notes: assignData.notes,
            };
            const response = await adminService.assignMembership(payload);
            if (response.success) {
                toast.success('Membership assigned successfully');
                setShowAssignModal(false);
                fetchMembers(); // refresh member list
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error('Failed to assign membership');
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
            <div className="mb-8 flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">Manage Members</h1>
                <button
                    onClick={openAddModal}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                    <FaUserPlus /> Add Member
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {members.map((member, index) => (
                                <tr key={member.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{member.fullName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.username}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.mobile || '-'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(member.joinDate).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => openEditModal(member)}
                                                className="text-blue-600 hover:text-blue-900"
                                                title="Edit"
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                onClick={() => openAssignModal(member)}
                                                className="text-green-600 hover:text-green-900"
                                                title="Assign Membership"
                                            >
                                                <FaEye />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(member.id)}
                                                className="text-red-600 hover:text-red-900"
                                                title="Delete"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add/Edit Member Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <h2 className="text-2xl font-bold mb-4">{editingMember ? 'Edit Member' : 'Add New Member'}</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Username *</label>
                                        <input
                                            type="text"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleInputChange}
                                            required
                                            disabled={!!editingMember}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            {editingMember ? 'Password (leave blank to keep current)' : 'Password *'}
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            required={!editingMember}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Full Name *</label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleInputChange}
                                            required
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Mobile</label>
                                        <input
                                            type="tel"
                                            name="mobile"
                                            value={formData.mobile}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Age</label>
                                        <input
                                            type="number"
                                            name="age"
                                            value={formData.age}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Gender</label>
                                        <select
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        >
                                            <option value="">Select</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700">Address</label>
                                        <textarea
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            rows="2"
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
                                        {editingMember ? 'Update' : 'Add'} Member
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Assign Membership Modal */}
            {showAssignModal && selectedMember && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-md w-full">
                        <div className="p-6">
                            <h2 className="text-2xl font-bold mb-4">Assign Membership</h2>
                            <p className="text-gray-600 mb-4">Member: <strong>{selectedMember.fullName}</strong></p>
                            <form onSubmit={handleAssignMembership}>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Plan *</label>
                                        <select
                                            name="planId"
                                            value={assignData.planId}
                                            onChange={handleAssignInputChange}
                                            required
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        >
                                            <option value="">Select a plan</option>
                                            {plans.map(plan => (
                                                <option key={plan.id} value={plan.id}>
                                                    {plan.name} - ₹{plan.fee} ({plan.durationMonths} month{plan.durationMonths > 1 ? 's' : ''})
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Start Date *</label>
                                        <input
                                            type="date"
                                            name="startDate"
                                            value={assignData.startDate}
                                            onChange={handleAssignInputChange}
                                            required
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Amount Paid</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            name="amountPaid"
                                            value={assignData.amountPaid}
                                            onChange={handleAssignInputChange}
                                            placeholder="0.00"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Payment Mode</label>
                                        <select
                                            name="paymentMode"
                                            value={assignData.paymentMode}
                                            onChange={handleAssignInputChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        >
                                            <option value="Cash">Cash</option>
                                            <option value="Card">Card</option>
                                            <option value="UPI">UPI</option>
                                            <option value="Bank Transfer">Bank Transfer</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Notes</label>
                                        <textarea
                                            name="notes"
                                            value={assignData.notes}
                                            onChange={handleAssignInputChange}
                                            rows="2"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowAssignModal(false)}
                                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                    >
                                        Assign
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageMembers;