import React from 'react';

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen">
      {/* Example sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4 hidden md:block">
        <h2 className="text-lg font-bold mb-4">My Blogs</h2>
        <ul>
          <li><a href="/my-blogs" className="block py-2">All Blogs</a></li>
          <li><a href="/create-blog" className="block py-2">Create Blog</a></li>
        </ul>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-100">
        {children}
      </main>
    </div>
  );
}
