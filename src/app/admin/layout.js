'use client';

import { useRouter } from 'next/navigation';
import { FaBlog, FaUserCheck, FaSignOutAlt } from 'react-icons/fa';

export default function AdminLayout({ children }) {
  const router = useRouter();

  const handleLogout = () => {
    // Clear admin-auth cookie
    document.cookie = 'admin-auth=; path=/; max-age=0';
    router.refresh(); // Refresh to trigger middleware redirect
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Fixed Sidebar */}
      <aside className="w-64 fixed inset-y-0 left-0 bg-teal-800 text-white">
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
          <nav className="space-y-2">
            <a
              href="#blogs"
              className="flex items-center gap-2 p-2 rounded hover:bg-teal-700 transition"
            >
              <FaBlog size={20} />
              Blogs
            </a>
            <a
              href="#requests"
              className="flex items-center gap-2 p-2 rounded hover:bg-teal-700 transition"
            >
              <FaUserCheck size={20} />
              Requests
            </a>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Navbar */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-20">
          <h1 className="text-2xl font-bold text-teal-700">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            <FaSignOutAlt size={16} />
            Logout
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 px-2">
          {children}
        </main>
      </div>
    </div>
  );
}