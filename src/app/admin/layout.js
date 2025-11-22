'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  BookOpen,
  GraduationCap,
  Users,
  LogOut,
  PlusCircle,
  Menu,
  X
} from 'lucide-react';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const handleLogout = () => {
    // Clear admin-auth cookie
    document.cookie = 'admin-auth=; path=/; max-age=0';
    router.refresh(); // Refresh to trigger middleware redirect
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'All Blogs', path: '/admin/all-blogs', icon: FileText }, // Assuming this route exists or maps to the main list
    { name: 'Resources', path: '/admin/resources', icon: BookOpen },
    { name: 'Courses', path: '/admin/courses', icon: GraduationCap },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-900 text-white transition-transform duration-300 ease-in-out lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo / Header */}
          <div className="h-16 flex items-center px-6 border-b border-gray-800">
            <span className="text-xl font-bold bg-gradient-to-r from-teal-400 to-teal-200 bg-clip-text text-transparent">
              NextZeni Admin
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            <p className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Menu
            </p>
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${isActive
                      ? 'bg-teal-600 text-white'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                    }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}

            <div className="mt-8">
              <p className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Quick Actions
              </p>
              <div className="space-y-2">
                <Link
                  href="/admin/resources"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors group"
                >
                  <PlusCircle size={20} className="text-teal-500 group-hover:text-teal-400" />
                  <span className="font-medium">Add Resource</span>
                </Link>
                <Link
                  href="/admin/courses"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors group"
                >
                  <PlusCircle size={20} className="text-orange-500 group-hover:text-orange-400" />
                  <span className="font-medium">Add Course</span>
                </Link>
              </div>
            </div>
          </nav>

          {/* User Profile / Logout */}
          <div className="p-4 border-t border-gray-800">
            <div className="flex items-center gap-3 mb-4 px-2">
              <div className="w-10 h-10 rounded-full bg-teal-900 flex items-center justify-center text-teal-400 font-bold">
                A
              </div>
              <div>
                <p className="text-sm font-medium text-white">Administrator</p>
                <p className="text-xs text-gray-500">admin@nextzeni.com</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 bg-gray-800 hover:bg-red-600/90 text-gray-300 hover:text-white py-2 rounded-lg transition-all duration-200"
            >
              <LogOut size={18} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col lg:ml-64 min-w-0">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-semibold text-gray-800">
              Dashboard Overview
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-teal-50 text-teal-700 rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></span>
              System Active
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}