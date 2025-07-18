'use client'
import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { collection, getDocs, deleteDoc, doc, query, where } from "firebase/firestore";
import Link from "next/link";

const AllBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchBlogs = async (userId) => {
            try {
            if (!userId) {
                console.error("User is not logged in");
                setError("User is not logged in");
                setLoading(false);
                return;
            }

            console.log("User ID:", userId);

            const blogsCollection = collection(db, "blogs");
            const q = query(blogsCollection, where("userId", "==", userId));
            const querySnapshot = await getDocs(q);

            console.log("Blogs Query Snapshot Size:", querySnapshot.size);

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
            setError("Error fetching blogs");
            } finally {
            setLoading(false);
            }
        };

        // Wait for the authentication state to be fully initialized
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                console.log("User is logged in:", user);
                fetchBlogs(user.uid);
            } else {
                console.log("No user is logged in");
                setError("No user is logged in");
                setLoading(false); // Set loading false if no user is logged in
            }
        });

        // Cleanup the listener when the component is unmounted
        return () => unsubscribe();
    }, []); // Empty dependency array means this will only run once when the component mounts

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, "blogs", id));
            setBlogs(blogs.filter(blog => blog.id !== id));
        } catch (error) {
            console.error("Error deleting blog: ", error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/admin/edit-blog/${id}`);
    };

    return (
        <div className="p-6 mx-auto text-white bg-black">
            <h1 className="mb-6 text-3xl font-semibold text-center">My Blogs</h1>
            {loading ? (
                <p>Loading blogs...</p>
            ) : error ? (
                <p>{error}</p> // Display any error messages here
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {blogs.length === 0 ? (
                        <p>No blogs available</p>
                    ) : (
                        blogs.map((blog) => (
                            <div
                                key={blog.id}
                                className="p-4 bg-gray-800 rounded-lg shadow-md cursor-pointer"
                            >
                                <Link href={`/my-blog/${blog.id}`}>
                                    <h2 className="text-xl font-semibold cursor-pointer hover:text-blue-600">
                                        {blog.title}
                                    </h2>
                                </Link>
                                <p className="mt-2" dangerouslySetInnerHTML={{ __html: blog.content.substring(0, 100) }} />
                                <div className="flex justify-between mt-4">
                                    <Link
                                     href={`/my-blogs/edit/${blog.id}`}
                                        className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(blog.id)}
                                        className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default AllBlogs;
