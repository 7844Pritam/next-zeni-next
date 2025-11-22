'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllResources, updateResourceStatus, deleteResource } from '../../redux/resources/resourceActions';
import { Check, X, Trash2, ExternalLink, Filter } from 'lucide-react';

const AdminResourcesPage = () => {
    const dispatch = useDispatch();
    const { resources, loading } = useSelector((state) => state.resources);
    const [filter, setFilter] = useState('pending'); // 'all', 'pending', 'approved'

    useEffect(() => {
        dispatch(fetchAllResources());
    }, [dispatch]);

    const filteredResources = resources.filter(res => {
        if (filter === 'all') return true;
        return res.status === filter;
    });

    const handleApprove = (id) => {
        if (confirm('Are you sure you want to approve this resource?')) {
            dispatch(updateResourceStatus(id, 'approved'));
        }
    };

    const handleReject = (id) => {
        if (confirm('Are you sure you want to reject (set to pending) this resource?')) {
            dispatch(updateResourceStatus(id, 'pending'));
        }
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this resource? This action cannot be undone.')) {
            dispatch(deleteResource(id));
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Resource Management</h1>

                    <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-gray-200 mt-4 md:mt-0">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filter === 'all' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setFilter('pending')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filter === 'pending' ? 'bg-orange-100 text-orange-700' : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Pending
                        </button>
                        <button
                            onClick={() => setFilter('approved')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filter === 'approved' ? 'bg-green-100 text-green-700' : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Approved
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Resource</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Type / Category</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Submitted By</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {filteredResources.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                                                No resources found.
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredResources.map((res) => (
                                            <tr key={res.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-4">
                                                        {res.image && (
                                                            <img src={res.image} alt="" className="w-10 h-10 rounded object-cover bg-gray-100" />
                                                        )}
                                                        <div>
                                                            <div className="font-medium text-gray-900">{res.title}</div>
                                                            <a href={res.link} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                                                                View Link <ExternalLink size={10} />
                                                            </a>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-900">{res.category}</div>
                                                    <div className="text-xs text-gray-500">{res.type}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-900">{res.authorName || 'Unknown'}</div>
                                                    <div className="text-xs text-gray-500">
                                                        {res.createdAt?.seconds ? new Date(res.createdAt.seconds * 1000).toLocaleDateString() : 'Just now'}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${res.status === 'approved'
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-orange-100 text-orange-800'
                                                        }`}>
                                                        {res.status === 'approved' ? 'Approved' : 'Pending'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        {res.status !== 'approved' && (
                                                            <button
                                                                onClick={() => handleApprove(res.id)}
                                                                className="p-1.5 bg-green-100 text-green-600 rounded hover:bg-green-200 transition-colors"
                                                                title="Approve"
                                                            >
                                                                <Check size={16} />
                                                            </button>
                                                        )}
                                                        {res.status === 'approved' && (
                                                            <button
                                                                onClick={() => handleReject(res.id)}
                                                                className="p-1.5 bg-orange-100 text-orange-600 rounded hover:bg-orange-200 transition-colors"
                                                                title="Reject (Set to Pending)"
                                                            >
                                                                <X size={16} />
                                                            </button>
                                                        )}
                                                        <button
                                                            onClick={() => handleDelete(res.id)}
                                                            className="p-1.5 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors"
                                                            title="Delete"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminResourcesPage;
