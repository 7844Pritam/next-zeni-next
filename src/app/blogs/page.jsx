'use client'
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import Link from "next/link";
import { collection, getDocs, query, where } from "firebase/firestore";

const ShowBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogsQuery = query(collection(db, "blogs"), where("isApproved", "==", true));
        const querySnapshot = await getDocs(blogsQuery);
        const blogsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogs(blogsData);
      } catch (err) {
        setError("Error fetching blogs: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (blogs.length === 0) return <div className="text-center py-10">No approved blogs available</div>;

  return (
    <div className="flex justify-center px-4 py-18" id="blogs">
      <div className="max-w-7xl w-full">
        <h1 className="text-4xl sm:text-5xl py-6 font-extrabold text-center text-gray-900 bg-gradient-to-r from-primary via-secondary to-pink-500 bg-clip-text">
          Our Blogs
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-4">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="p-4 border border-gray-200 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-all bg-white"
            >
              <div className="w-full mb-3">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-auto rounded-md"
                  style={{ maxHeight: "400px", objectFit: "contain" }}
                />
              </div>

              <h2 className="text-lg font-bold text-gray-800 mb-1">{blog.title}</h2>

              <p className="text-gray-600 text-sm line-clamp-2">
                {blog.subtitle}
              </p>

              <div className="mt-2 text-sm text-blue-600 hover:underline">
                <Link href={`/blog-details/${blog.id}`}>Continue reading →</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowBlogs;
