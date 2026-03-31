import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import adminService from '../../services/adminService';
import toast from 'react-hot-toast';

const ManageTrainers = () => {
    const [trainers, setTrainers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingTrainer, setEditingTrainer] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        email: '',
        specialization: '',
        shiftTiming: '',
        experienceYears: '',
    });

    useEffect(() => {
        fetchTrainers();
    }, []);

    const fetchTrainers = async () => {
        try {
            const response = await adminService.getTrainers();
            if (response.success) {
                setTrainers(response.data);
            }
        } catch (error) {
            toast.error('Failed to load trainers');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const openAddModal = () => {
        setEditingTrainer(null);
        setFormData({ name: '', mobile: '', email: '', specialization: '', shiftTiming: '', experienceYears: '' });
        setShowModal(true);
    };

    const openEditModal = (trainer) => {
        setEditingTrainer(trainer);
        setFormData({
            name: trainer.name,
            mobile: trainer.mobile || '',
            email: trainer.email || '',
            specialization: trainer.specialization || '',
            shiftTiming: trainer.shiftTiming || '',
            experienceYears: trainer.experienceYears || '',
        });
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingTrainer) {
                const response = await adminService.updateTrainer(editingTrainer.id, formData);
                if (response.success) {
                    toast.success('Trainer updated successfully');
                    fetchTrainers();
                    setShowModal(false);
                } else {
                    toast.error(response.message);
                }
            } else {
                const response = await adminService.addTrainer(formData);
                if (response.success) {
                    toast.success('Trainer added successfully');
                    fetchTrainers();
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
        if (window.confirm('Are you sure you want to delete this trainer?')) {
            try {
                const response = await adminService.deleteTrainer(id);
                if (response.success) {
                    toast.success('Trainer deleted successfully');
                    fetchTrainers();
                } else {
                    toast.error(response.message);
                }
            } catch (error) {
                toast.error('Delete failed');
            }
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
                <h1 className="text-3xl font-bold text-gray-900">Trainers</h1>
                <button
                    onClick={openAddModal}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                    <FaPlus /> Add Trainer
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialization</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shift Timing</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {trainers.map((trainer, index) => (
                                <tr key={trainer.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{trainer.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trainer.mobile || '-'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trainer.specialization || '-'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trainer.shiftTiming || '-'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trainer.experienceYears ? `${trainer.experienceYears} years` : '-'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => openEditModal(trainer)}
                                                className="text-blue-600 hover:text-blue-900"
                                                title="Edit"
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(trainer.id)}
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

            {/* Add/Edit Trainer Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-md w-full">
                        <div className="p-6">
                            <h2 className="text-2xl font-bold mb-4">{editingTrainer ? 'Edit Trainer' : 'Add New Trainer'}</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Name *</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
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
                                        <label className="block text-sm font-medium text-gray-700">Specialization</label>
                                        <input
                                            type="text"
                                            name="specialization"
                                            value={formData.specialization}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Shift Timing</label>
                                        <input
                                            type="text"
                                            name="shiftTiming"
                                            value={formData.shiftTiming}
                                            onChange={handleInputChange}
                                            placeholder="e.g., 6 AM - 10 AM"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Experience (years)</label>
                                        <input
                                            type="number"
                                            name="experienceYears"
                                            value={formData.experienceYears}
                                            onChange={handleInputChange}
                                            min="0"
                                            step="0.5"
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
                                        {editingTrainer ? 'Update' : 'Add'} Trainer
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

export default ManageTrainers;