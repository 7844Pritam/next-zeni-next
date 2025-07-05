'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '../firebase';
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import {
  FaTrash,
  FaEdit,
  FaCheckCircle,
  FaTimesCircle,
} from 'react-icons/fa';

const ADMIN_PASSWORD = 'supersecret123'; 

const AdminPanel = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const [blogs, setBlogs] = useState([]);
  const [users, setUsers] = useState({});
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const authCookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith('admin-auth='))
      ?.split('=')[1];
    if (authCookie === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch blogs
      const blogsSnapshot = await getDocs(collection(db, 'blogs'));
      const blogsData = blogsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Fetch users
      const usersSnapshot = await getDocs(collection(db, 'users'));
      const usersData = {};
      usersSnapshot.docs.forEach((doc) => {
        usersData[doc.id] = doc.data();
      });

      // Fetch writer requests
      const requestsSnapshot = await getDocs(collection(db, 'writerRequests'));
      const requestsData = requestsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setBlogs(blogsData);
      setUsers(usersData);
      setRequests(requestsData);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
    setLoading(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      // Set cookie with 1-day expiration
      document.cookie = `admin-auth=${ADMIN_PASSWORD}; path=/; max-age=86400; secure; samesite=strict`;
      setIsAuthenticated(true);
      setError('');
      fetchData(); // Fetch data after successful login
    } else {
      setError('Incorrect password');
    }
  };

  const handleLogout = () => {
    // Clear cookie
    document.cookie = 'admin-auth=; path=/; max-age=0';
    setIsAuthenticated(false);
    setPassword('');
    router.refresh(); // Refresh to trigger middleware redirect
  };

  // Existing AdminPanel functions
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      await deleteDoc(doc(db, 'blogs', id));
      setBlogs(blogs.filter((blog) => blog.id !== id));
    }
  };

  const handleApprove = async (id, isApproved) => {
    const blogRef = doc(db, 'blogs', id);
    await updateDoc(blogRef, { isApproved });
    setBlogs(
      blogs.map((blog) =>
        blog.id === id ? { ...blog, isApproved } : blog
      )
    );
  };

  const handleApproveRequest = async (id) => {
    const reqRef = doc(db, 'writerRequests', id);
    await updateDoc(reqRef, { approved: true, status: 'confirmed' });
    setRequests(
      requests.map((r) => (r.id === id ? { ...r, approved: true } : r))
    );
  };

  const startEdit = (blog) => {
    setEditId(blog.id);
    setEditTitle(blog.title);
    setEditContent(blog.content);
    setShowModal(true);
  };

  const saveEdit = async () => {
    const blogRef = doc(db, 'blogs', editId);
    await updateDoc(blogRef, {
      title: editTitle,
      content: editContent,
    });
    setBlogs(
      blogs.map((blog) =>
        blog.id === editId
          ? { ...blog, title: editTitle, content: editContent }
          : blog
      )
    );
    setShowModal(false);
    setEditId(null);
  };

  const groupBlogsByUser = () => {
    const grouped = {};
    blogs
      .filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((blog) => {
        if (activeTab === 'approved') return blog.isApproved;
        if (activeTab === 'not-approved') return !blog.isApproved;
        return true;
      })
      .forEach((blog) => {
        const userId = blog.userId;
        if (!grouped[userId]) {
          grouped[userId] = {
            user: users[userId] || { name: 'Unknown User', email: 'N/A' },
            blogs: [],
          };
        }
        grouped[userId].blogs.push(blog);
      });
    return grouped;
  };

  const groupedBlogs = groupBlogsByUser();

  // Render login form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
           
          </form>
        </div>
      </div>
    );
  }

  // Render AdminPanel if authenticated
  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans scroll-smooth">
  

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
        </div>
      ) : (
        <>
          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search blogs by title or content..."
              className="w-full max-w-md p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          {/* Tabs */}
          <div className="mb-6 flex gap-4 border-b">
            <button
              onClick={() => setActiveTab('all')}
              className={`pb-2 px-4 ${
                activeTab === 'all'
                  ? 'border-b-2 border-teal-600 text-teal-600'
                  : 'text-gray-600'
              }`}
            >
              All Blogs
            </button>
            <button
              onClick={() => setActiveTab('approved')}
              className={`pb-2 px-4 ${
                activeTab === 'approved'
                  ? 'border-b-2 border-teal-600 text-teal-600'
                  : 'text-gray-600'
              }`}
            >
              Approved
            </button>
            <button
              onClick={() => setActiveTab('not-approved')}
              className={`pb-2 px-4 ${
                activeTab === 'not-approved'
                  ? 'border-b-2 border-teal-600 text-teal-600'
                  : 'text-gray-600'
              }`}
            >
              Not Approved
            </button>
          </div>

          {/* Blogs Section */}
          <section id="blogs" className="mb-12">
            <h2 className="text-2xl font-semibold text-orange-600 mb-4">
              Blogs Management
            </h2>
            {Object.keys(groupedBlogs).length === 0 && (
              <p className="text-gray-500">No blogs found.</p>
            )}

            {Object.entries(groupedBlogs).map(([userId, { user, blogs }]) => (
              <div key={userId} className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {user.name} ({user.email})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {blogs.map((blog) => (
                    <div
                      key={blog.id}
                      className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
                    >
                      <h3 className="text-xl font-semibold text-gray-800">
                        {blog.title}
                      </h3>
                      <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                        {blog.subtitle}
                      </p>

                      <div className="mt-4 flex items-center gap-4 flex-wrap">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-sm font-semibold
                            ${
                              blog.isApproved
                                ? 'bg-teal-100 text-teal-800'
                                : 'bg-orange-100 text-orange-800'
                            }`}
                        >
                          {blog.isApproved ? 'Approved' : 'Not Approved'}
                        </span>

                        <button
                          onClick={() => startEdit(blog)}
                          title="Edit"
                          className="text-teal-600 hover:text-teal-800 transition"
                        >
                          <FaEdit size={20} />
                        </button>

                        <button
                          onClick={() => handleDelete(blog.id)}
                          title="Delete"
                          className="text-red-600 hover:text-red-800 transition"
                        >
                          <FaTrash size={20} />
                        </button>

                        {blog.isApproved ? (
                          <button
                            onClick={() => handleApprove(blog.id, false)}
                            title="Disapprove"
                            className="text-orange-600 hover:text-orange-800 transition"
                          >
                            <FaTimesCircle size={20} />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleApprove(blog.id, true)}
                            title="Approve"
                            className="text-teal-600 hover:text-teal-800 transition"
                          >
                            <FaCheckCircle size={20} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>

          {/* Requests Section */}
          <section id="requests">
            <h2 className="text-2xl font-semibold text-orange-600 mb-4">
              User Requests
            </h2>
            {requests.length === 0 && (
              <p className="text-gray-500">No requests found.</p>
            )}

            <div className="space-y-6">
              {requests.map((req) => (
                <div
                  key={req.id}
                  className="bg-white p-5 rounded-lg shadow border border-gray-200 flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium text-gray-800">
                      {req.title || 'Request Title'}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {req.description || 'Request description'}
                    </p>
                    <span
                      className={`inline-block mt-1 px-2 py-1 text-xs font-semibold rounded
                        ${
                          req.approved
                            ? 'bg-teal-100 text-teal-800'
                            : 'bg-orange-100 text-orange-800'
                        }`}
                    >
                      {req.approved ? 'Approved' : 'Pending'}
                    </span>
                  </div>

                  {!req.approved && (
                    <button
                      onClick={() => handleApproveRequest(req.id)}
                      className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition"
                    >
                      Approve
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* Floating Bottom Tab */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-full px-6 py-2 flex gap-6 z-50 border border-gray-300">
        <a
          href="#blogs"
          className="text-teal-700 font-medium hover:text-teal-900 transition"
        >
          All Blogs
        </a>
        <a
          href="#requests"
          className="text-orange-600 font-medium hover:text-orange-800 transition"
        >
          Requests
        </a>
      </div>

      {/* Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Edit Blog</h3>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full mb-3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="Title"
            />
            <textarea
              rows={4}
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full mb-4 p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="Content"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;