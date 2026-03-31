import React, { useState, useEffect } from 'react';
import { FaEdit, FaKey } from 'react-icons/fa';
import memberService from '../../services/memberService';
import toast from 'react-hot-toast';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await memberService.getProfile();
            if (response.success) {
                setProfile(response.data);
                setFormData(response.data);
            }
        } catch (error) {
            toast.error('Failed to load profile');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const response = await memberService.updateProfile(formData);
            if (response.success) {
                setProfile(response.data);
                setEditing(false);
                toast.success('Profile updated successfully');
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error('Failed to update profile');
        } finally {
            setSaving(false);
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
                <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
                {!editing && (
                    <button
                        onClick={() => setEditing(true)}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        <FaEdit /> Edit Profile
                    </button>
                )}
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {!editing ? (
                    // View Mode
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="text-sm text-gray-500">Full Name</label>
                                <p className="text-lg font-medium">{profile.fullName}</p>
                            </div>
                            <div>
                                <label className="text-sm text-gray-500">Username</label>
                                <p className="text-lg font-medium">{profile.username}</p>
                            </div>
                            <div>
                                <label className="text-sm text-gray-500">Email</label>
                                <p className="text-lg font-medium">{profile.email || 'Not provided'}</p>
                            </div>
                            <div>
                                <label className="text-sm text-gray-500">Mobile</label>
                                <p className="text-lg font-medium">{profile.mobile || 'Not provided'}</p>
                            </div>
                            <div>
                                <label className="text-sm text-gray-500">Age</label>
                                <p className="text-lg font-medium">{profile.age || 'Not provided'}</p>
                            </div>
                            <div>
                                <label className="text-sm text-gray-500">Gender</label>
                                <p className="text-lg font-medium">{profile.gender || 'Not provided'}</p>
                            </div>
                            <div className="md:col-span-2">
                                <label className="text-sm text-gray-500">Address</label>
                                <p className="text-lg font-medium">{profile.address || 'Not provided'}</p>
                            </div>
                            <div>
                                <label className="text-sm text-gray-500">Join Date</label>
                                <p className="text-lg font-medium">{new Date(profile.joinDate).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    // Edit Mode
                    <form onSubmit={handleSubmit} className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Full Name *</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName || ''}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email || ''}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Mobile</label>
                                <input
                                    type="tel"
                                    name="mobile"
                                    value={formData.mobile || ''}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Age</label>
                                <input
                                    type="number"
                                    name="age"
                                    value={formData.age || ''}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Gender</label>
                                <select
                                    name="gender"
                                    value={formData.gender || ''}
                                    onChange={handleChange}
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
                                    value={formData.address || ''}
                                    onChange={handleChange}
                                    rows="3"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                        <div className="mt-6 flex gap-3">
                            <button
                                type="submit"
                                disabled={saving}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                            >
                                {saving ? 'Saving...' : 'Save Changes'}
                            </button>
                            <button
                                type="button"
                                onClick={() => setEditing(false)}
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Profile;