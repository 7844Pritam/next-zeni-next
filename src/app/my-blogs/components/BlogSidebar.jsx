'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, PenTool, User, Settings, LogOut, FileText } from 'lucide-react';

const BlogSidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', path: '/my-blogs', icon: LayoutDashboard },
    { name: 'Create New', path: '/my-blogs/create-new-blog', icon: PenTool },
    { name: 'My Profile', path: '/profile', icon: User },
  ];

  return (
    <div className="h-full bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3 text-teal-700">
          <div className="bg-teal-100 p-2 rounded-lg">
            <FileText size={24} />
          </div>
          <span className="font-bold text-lg tracking-tight">Writer Studio</span>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${isActive
                  ? 'bg-teal-50 text-teal-700 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
            >
              <Icon size={20} className={isActive ? 'text-teal-600' : 'text-gray-400'} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-xs font-medium text-gray-500 uppercase mb-2">Need Help?</p>
          <p className="text-sm text-gray-600 mb-3">Check our writing guidelines to improve your content.</p>
          <Link href="/contact" className="text-sm font-semibold text-teal-600 hover:text-teal-700">
            View Guidelines
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogSidebar;
