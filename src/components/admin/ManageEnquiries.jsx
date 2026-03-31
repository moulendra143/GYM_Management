import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaSearch } from 'react-icons/fa';
import adminService from '../../services/adminService';
import toast from 'react-hot-toast';

const ManageEnquiries = () => {
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchEnquiries();
    }, []);

    const fetchEnquiries = async () => {
        try {
            const response = await adminService.getEnquiries();
            if (response.success) {
                setEnquiries(response.data);
            }
        } catch (error) {
            toast.error('Failed to load enquiries');
        } finally {
            setLoading(false);
        }
    };

    const handleResolve = async (id) => {
        try {
            const response = await adminService.resolveEnquiry(id);
            if (response.success) {
                toast.success('Enquiry marked as resolved');
                fetchEnquiries();
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    const filteredEnquiries = enquiries.filter(e =>
        e.name.toLowerCase().includes(search.toLowerCase()) ||
        e.email?.toLowerCase().includes(search.toLowerCase()) ||
        e.message.toLowerCase().includes(search.toLowerCase())
    );

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
                <h1 className="text-3xl font-bold text-gray-900">Enquiries</h1>
                <p className="text-gray-600 mt-2">Track incoming enquiries and update their status.</p>
            </div>

            {/* Search Bar */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by name, email or message..."
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </div>

            {/* Enquiries Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredEnquiries.map((enquiry) => (
                                <tr key={enquiry.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{enquiry.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{enquiry.email || '-'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{enquiry.mobile || '-'}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{enquiry.message}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(enquiry.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${enquiry.status === 'Resolved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {enquiry.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        {enquiry.status !== 'Resolved' && (
                                            <button
                                                onClick={() => handleResolve(enquiry.id)}
                                                className="text-green-600 hover:text-green-900 flex items-center gap-1"
                                                title="Mark as Resolved"
                                            >
                                                <FaCheckCircle /> Resolve
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredEnquiries.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        No enquiries found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageEnquiries;