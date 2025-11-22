'use client';

import React from 'react';
import BlogSidebar from './components/BlogSidebar';
// Removed BlogNavbar as the main Header is now global and sufficient, or we can keep it if it's specific. 
// Assuming we want the global header + sidebar layout.

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col pt-20"> {/* Added pt-20 to account for fixed global header */}
      <div className="flex flex-1 max-w-7xl mx-auto w-full">
        {/* Sidebar - Desktop */}
        <aside className="w-64 hidden md:block fixed h-[calc(100vh-5rem)] top-20 left-0 lg:left-[max(0px,calc(50%-40rem))] z-30">
          <BlogSidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 md:pl-64 w-full">
          <div className="p-4 sm:p-6 lg:p-8">
            {children}
          </div>
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