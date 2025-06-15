'use client';

import React from 'react';
import BlogSidebar from './components/BlogSidebar';
import BlogNavbar from './components/BlogNavbar';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar at the top */}
      <BlogNavbar />

      {/* Main content area with sidebar and page content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 text-white hidden md:block">
          <BlogSidebar />
        </aside>

        {/* Main content */}
        <main className="flex-1 bg-gray-100  overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}



 {/* <aside className="w-64 bg-gray-800 text-white p-4 hidden md:block">
        <h2 className="text-lg font-bold mb-4">My Blogs</h2>
        <ul>
          <li><a href="/my-blogs" className="block py-2">All Blogs</a></li>
          <li><a href="/my-blogs/create-new-blog" className="block py-2">Create Blog</a></li>
        </ul>
      </aside> */}