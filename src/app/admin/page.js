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
  Trash2,
  Edit,
  CheckCircle,
  XCircle,
  Search,
  Users,
  FileText,
  AlertCircle,
  Calendar,
  Eye,
  Heart,
  MessageCircle
} from 'lucide-react';

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

  // New State for Month Filter
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7)); // YYYY-MM

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
        // Ensure fields exist
        views: doc.data().views || 0,
        likesCount: doc.data().likes?.length || 0,
        commentsCount: doc.data().commentsCount || 0,
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
    router.push(`/admin/my-blogs/edit/${blog.id}`);
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

  // Filter blogs by selected month
  const getBlogsByMonth = () => {
    if (!selectedMonth) return blogs;
    const [year, month] = selectedMonth.split('-');
    return blogs.filter(blog => {
      if (!blog.createdAt) return false;
      const date = new Date(blog.createdAt.seconds * 1000);
      return date.getFullYear() === parseInt(year) && date.getMonth() + 1 === parseInt(month);
    });
  };

  const filteredBlogsByMonth = getBlogsByMonth();

  // Aggregate Stats for Selected Month
  const monthlyStats = filteredBlogsByMonth.reduce((acc, blog) => ({
    views: acc.views + (blog.views || 0),
    likes: acc.likes + (blog.likesCount || 0),
    comments: acc.comments + (blog.commentsCount || 0)
  }), { views: 0, likes: 0, comments: 0 });

  const getFilteredBlogs = () => {
    return filteredBlogsByMonth
      .filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (blog.content && blog.content.toLowerCase().includes(searchTerm.toLowerCase()))
      )
      .filter((blog) => {
        if (activeTab === 'approved') return blog.isApproved;
        if (activeTab === 'not-approved') return !blog.isApproved;
        return true;
      });
  };

  const filteredBlogs = getFilteredBlogs();

  // Prepare data for the graph (Top 5 Blogs by Engagement in Selected Month)
  const chartData = filteredBlogsByMonth
    .map(blog => ({
      title: blog.title,
      views: blog.views || 0,
      likes: blog.likesCount || 0,
      comments: blog.commentsCount || 0,
      totalEngagement: (blog.views || 0) + (blog.likesCount || 0) + (blog.commentsCount || 0)
    }))
    .sort((a, b) => b.totalEngagement - a.totalEngagement)
    .slice(0, 5);

  const maxEngagement = Math.max(...chartData.map(d => d.totalEngagement), 1);

  // Render login form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Admin Login</h2>
            <p className="text-gray-500 text-sm mt-2">Enter your credentials to access the panel</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg flex items-center gap-2"><AlertCircle size={16} /> {error}</p>}
            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-3 rounded-xl font-semibold hover:bg-teal-700 transition-colors shadow-lg shadow-teal-600/20"
            >
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Render AdminPanel if authenticated
  return (
    <div className="space-y-8">
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
        </div>
      ) : (
        <>
          {/* Month Filter */}
          <div className="flex justify-end">
            <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-100 flex items-center gap-2">
              <Calendar size={18} className="text-gray-500" />
              <input
                type="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="text-sm text-gray-700 focus:outline-none font-medium"
              />
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                <FileText size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Total Blogs</p>
                <h3 className="text-2xl font-bold text-gray-900">{filteredBlogsByMonth.length}</h3>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="p-3 bg-teal-50 text-teal-600 rounded-xl">
                <Eye size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Total Views</p>
                <h3 className="text-2xl font-bold text-gray-900">{monthlyStats.views}</h3>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="p-3 bg-red-50 text-red-600 rounded-xl">
                <Heart size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Total Likes</p>
                <h3 className="text-2xl font-bold text-gray-900">{monthlyStats.likes}</h3>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                <MessageCircle size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Total Comments</p>
                <h3 className="text-2xl font-bold text-gray-900">{monthlyStats.comments}</h3>
              </div>
            </div>
          </div>

          {/* Top Blogs Graph */}
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Top Blogs by Engagement ({selectedMonth})</h2>
            <div className="space-y-6">
              {chartData.map((data, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700 truncate w-1/3" title={data.title}>{data.title}</span>
                    <div className="flex gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><Eye size={12} /> {data.views}</span>
                      <span className="flex items-center gap-1"><Heart size={12} /> {data.likes}</span>
                      <span className="flex items-center gap-1"><MessageCircle size={12} /> {data.comments}</span>
                    </div>
                  </div>
                  <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden flex">
                    {/* Views Segment */}
                    <div
                      className="h-full bg-teal-500 transition-all duration-1000 ease-out"
                      style={{ width: `${(data.views / maxEngagement) * 100}%` }}
                      title={`Views: ${data.views}`}
                    />
                    {/* Likes Segment */}
                    <div
                      className="h-full bg-red-500 transition-all duration-1000 ease-out"
                      style={{ width: `${(data.likes / maxEngagement) * 100}%` }}
                      title={`Likes: ${data.likes}`}
                    />
                    {/* Comments Segment */}
                    <div
                      className="h-full bg-purple-500 transition-all duration-1000 ease-out"
                      style={{ width: `${(data.comments / maxEngagement) * 100}%` }}
                      title={`Comments: ${data.comments}`}
                    />
                  </div>
                </div>
              ))}
              {chartData.length === 0 && <p className="text-gray-500 text-center py-4">No data available for this month</p>}
            </div>
          </section>

          {/* Main Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Blog Management */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Recent Blogs</h2>
                <div className="flex gap-2">
                  {['all', 'approved', 'not-approved'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${activeTab === tab
                        ? 'bg-teal-600 text-white'
                        : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                        }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search blogs..."
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all text-sm"
                />
              </div>

              <div className="space-y-4">
                {filteredBlogs.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 border-dashed">
                    <p className="text-gray-500">No blogs found matching your criteria.</p>
                  </div>
                ) : (
                  filteredBlogs.map((blog) => (
                    <div
                      key={blog.id}
                      className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <h3 className="font-semibold text-gray-900 line-clamp-1">{blog.title}</h3>
                          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{blog.subtitle || 'No subtitle'}</p>
                          <div className="flex items-center gap-3 mt-3">
                            <span className="text-xs text-gray-400">
                              By {users[blog.userId]?.name || 'Unknown'}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide
                                ${blog.isApproved ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}
                            >
                              {blog.isApproved ? 'Published' : 'Pending'}
                            </span>
                            <div className="flex items-center gap-2 text-xs text-gray-400 ml-2 border-l pl-2 border-gray-200">
                              <span className="flex items-center gap-1"><Eye size={10} /> {blog.views || 0}</span>
                              <span className="flex items-center gap-1"><Heart size={10} /> {blog.likesCount || 0}</span>
                              <span className="flex items-center gap-1"><MessageCircle size={10} /> {blog.commentsCount || 0}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 shrink-0">
                          {blog.isApproved ? (
                            <button
                              onClick={() => handleApprove(blog.id, false)}
                              className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                              title="Unpublish"
                            >
                              <XCircle size={18} />
                            </button>
                          ) : (
                            <button
                              onClick={() => handleApprove(blog.id, true)}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Publish"
                            >
                              <CheckCircle size={18} />
                            </button>
                          )}
                          <button
                            onClick={() => startEdit(blog)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(blog.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Right Column: Requests */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900">Writer Requests</h2>
              <div className="space-y-4">
                {requests.length === 0 ? (
                  <p className="text-gray-500 text-sm">No pending requests.</p>
                ) : (
                  requests.map((req) => (
                    <div
                      key={req.id}
                      className="bg-white p-5 rounded-xl shadow-sm border border-gray-100"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-900">{req.title || 'Request'}</h4>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase
                            ${req.approved ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}
                        >
                          {req.approved ? 'Approved' : 'Pending'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                        {req.description || 'No description provided.'}
                      </p>
                      {!req.approved && (
                        <button
                          onClick={() => handleApproveRequest(req.id)}
                          className="w-full py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors"
                        >
                          Approve Request
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Edit Blog Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <textarea
                  rows={6}
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium shadow-lg shadow-teal-600/20"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;