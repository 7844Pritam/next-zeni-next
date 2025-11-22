'use client'
import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { collection, getDocs, deleteDoc, doc, query, where } from "firebase/firestore";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import { Plus, Edit2, Trash2, FileText, Loader2, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const AllBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchBlogs = async (userId) => {
            try {
                const blogsCollection = collection(db, "blogs");
                const q = query(blogsCollection, where("userId", "==", userId));
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    setBlogs([]);
                } else {
                    const blogsData = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    setBlogs(blogsData);
                }
            } catch (error) {
                console.error("Error fetching blogs: ", error);
                setError("Failed to load blogs. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                fetchBlogs(currentUser.uid);
            } else {
                setUser(null);
                setLoading(false);
                setError("Please log in to view your blogs.");
            }
        });

        return () => unsubscribe();
    }, []);

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this blog? This action cannot be undone.")) {
            try {
                await deleteDoc(doc(db, "blogs", id));
                setBlogs(blogs.filter(blog => blog.id !== id));
            } catch (error) {
                console.error("Error deleting blog: ", error);
                alert("Failed to delete blog.");
            }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-10 w-10 text-teal-600 animate-spin" />
                    <p className="text-gray-500 font-medium">Loading your blogs...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 font-Libre">My Blogs</h1>
                        <p className="text-gray-500 mt-1">Manage and track your content.</p>
                    </div>
                    <Link
                        href="/my-blogs/create-new-blog"
                        className="flex items-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-all shadow-md hover:shadow-lg transform active:scale-95 font-medium"
                    >
                        <Plus size={20} /> Create New Blog
                    </Link>
                </div>

                {error ? (
                    <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl flex items-center gap-3">
                        <AlertCircle size={20} />
                        {error}
                    </div>
                ) : blogs.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                            <FileText size={40} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No blogs yet</h3>
                        <p className="text-gray-500 mb-8 max-w-md mx-auto">
                            You haven't created any blogs yet. Share your knowledge and start writing today!
                        </p>
                        <Link
                            href="/my-blogs/create-new-blog"
                            className="inline-flex items-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors font-medium"
                        >
                            <Plus size={20} /> Start Writing
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {blogs.map((blog, index) => (
                            <motion.div
                                key={blog.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 overflow-hidden flex flex-col h-full group"
                            >
                                <div className="relative h-48 overflow-hidden bg-gray-100">
                                    {blog.image ? (
                                        <img
                                            src={blog.image}
                                            alt={blog.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            <FileText size={48} />
                                        </div>
                                    )}
                                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold shadow-sm ${blog.isApproved
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {blog.isApproved ? 'Published' : 'Pending Approval'}
                                    </div>
                                </div>

                                <div className="p-6 flex flex-col flex-grow">
                                    <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-teal-600 transition-colors">
                                        {blog.title}
                                    </h2>
                                    <p className="text-gray-500 text-sm mb-4 line-clamp-3 flex-grow">
                                        {blog.subtitle || "No description available."}
                                    </p>

                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                                        <span className="text-xs text-gray-400">
                                            {blog.createdAt?.seconds
                                                ? new Date(blog.createdAt.seconds * 1000).toLocaleDateString()
                                                : 'Just now'}
                                        </span>
                                        <div className="flex gap-2">
                                            <Link
                                                href={`/my-blogs/create-new-blog?id=${blog.id}`} // Assuming edit uses query param or dynamic route. Adjusting to match likely edit flow.
                                                className="p-2 text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                                                title="Edit"
                                            >
                                                <Edit2 size={18} />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(blog.id)}
                                                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllBlogs;
