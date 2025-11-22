'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses, addCourse, deleteCourse } from '../../redux/courses/courseActions';
import { Plus, Trash2, Edit2, X, Check } from 'lucide-react';

const AdminCoursesPage = () => {
    const dispatch = useDispatch();
    const { courses, loading } = useSelector((state) => state.courses);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        category: 'Academic', // 'Academic' or 'Professional'
        subCategory: '',
        description: '',
        features: '', // Comma separated string for input
        fees: '',
        image: '',
    });

    useEffect(() => {
        dispatch(fetchCourses());
    }, [dispatch]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const featuresArray = formData.features.split(',').map(f => f.trim()).filter(f => f);

            await dispatch(addCourse({
                ...formData,
                features: featuresArray,
            }));

            setIsModalOpen(false);
            setFormData({
                title: '',
                category: 'Academic',
                subCategory: '',
                description: '',
                features: '',
                fees: '',
                image: '',
            });
            alert('Course added successfully!');
        } catch (error) {
            alert('Failed to add course: ' + error.message);
        }
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this course?')) {
            dispatch(deleteCourse(id));
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Course Management</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-teal-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-teal-700 transition-colors"
                    >
                        <Plus size={20} /> Add New Course
                    </button>
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
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Course</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Fees</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {courses.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                                                No courses found. Add one to get started.
                                            </td>
                                        </tr>
                                    ) : (
                                        courses.map((course) => (
                                            <tr key={course.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-4">
                                                        {course.image && (
                                                            <img src={course.image} alt="" className="w-10 h-10 rounded object-cover bg-gray-100" />
                                                        )}
                                                        <div>
                                                            <div className="font-medium text-gray-900">{course.title}</div>
                                                            <div className="text-xs text-gray-500">{course.subCategory}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${course.category === 'Academic'
                                                            ? 'bg-blue-100 text-blue-800'
                                                            : 'bg-purple-100 text-purple-800'
                                                        }`}>
                                                        {course.category}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600">
                                                    {course.fees}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button
                                                        onClick={() => handleDelete(course.id)}
                                                        className="p-1.5 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors"
                                                        title="Delete"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
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

            {/* Add Course Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <h2 className="text-xl font-bold text-gray-800">Add New Course</h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        required
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 outline-none"
                                        placeholder="e.g., Class 10 Mathematics"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 outline-none"
                                    >
                                        <option value="Academic">Academic Tuition</option>
                                        <option value="Professional">Professional / Soft Skills</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Sub-Category / Class</label>
                                    <input
                                        type="text"
                                        name="subCategory"
                                        required
                                        value={formData.subCategory}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 outline-none"
                                        placeholder="e.g., Class 10 or English Speaking"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Fees</label>
                                    <input
                                        type="text"
                                        name="fees"
                                        required
                                        value={formData.fees}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 outline-none"
                                        placeholder="e.g., ₹500/month"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    name="description"
                                    required
                                    rows="3"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 outline-none resize-none"
                                    placeholder="Course details..."
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Features (comma separated)</label>
                                <input
                                    type="text"
                                    name="features"
                                    value={formData.features}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 outline-none"
                                    placeholder="e.g., Daily Homework, Weekly Tests, 1-on-1 Attention"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                                <input
                                    type="url"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 outline-none"
                                    placeholder="https://..."
                                />
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    className="w-full bg-teal-600 text-white font-semibold py-3 rounded-lg hover:bg-teal-700 transition-colors shadow-md"
                                >
                                    Add Course
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminCoursesPage;
