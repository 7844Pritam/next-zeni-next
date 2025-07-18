'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation'; 
import React from 'react';

const BlogSidebar = ({ toggleSidebar }) => {
  const router = useRouter();

  return (
    <div className="w-64 h-screen p-4 space-y-6 text-white bg-[#212529]">
      <div className="flex flex-col w-full p-2 border border-gray-500 rounded-lg cursor-pointer">
        <p
          onClick={() => {
            router.push('/');
          }}
          className="mt-2 text-xl font-bold text-center"
        >
          Next Zeni
        </p>
      </div>

      <ul className="space-y-4">
        <li>
          <Link
            href="/my-blogs/create-new-blog"
            className="block px-4 py-2 text-white rounded-md hover:bg-gray-700"
            onClick={toggleSidebar}
          >
            Add Blogs
          </Link>
        </li>
        <li>
          <Link
            href="/my-blogs"
            className="block px-4 py-2 text-white rounded-md hover:bg-gray-700"
            onClick={toggleSidebar}
          >
            All Blogs
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default BlogSidebar;
