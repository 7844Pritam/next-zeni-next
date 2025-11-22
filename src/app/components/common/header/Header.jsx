'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { sendEmailVerification } from 'firebase/auth';
import { Menu, X, User, UserCheck, LogOut, Shield, ChevronRight } from 'lucide-react';

import logoImg from '../../../../../public/images/logo1.jpeg';

import { logoutUser, monitorAuth } from '@/app/redux/auth/authActions';
import { clearUserProfile, getUserProfile } from '@/app/redux/user/userActions';
import { useDispatch, useSelector } from 'react-redux';

const Header = () => {
  const [click, setClick] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState('');

  const dispatch = useDispatch();
  const { user, isVerified, isAdmin } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.user);

  const navItems = [
    { name: 'Home', id: 'home', path: '/' },
    { name: 'All Courses', id: 'courses', path: '/courses' },
    { name: 'About', id: 'about', path: '/about' },
    { name: 'Blogs', id: 'blogs', path: '/blogs' },
    { name: 'Free Resources', path: '/free-resources' },
    { name: 'Contact', id: 'contact', path: '/contact' },
  ];

  // Init auth listener
  useEffect(() => {
    dispatch(monitorAuth());
  }, [dispatch]);

  // Fetch user profile
  useEffect(() => {
    if (user) {
      dispatch(getUserProfile(user.uid));
    } else {
      dispatch(clearUserProfile());
    }
  }, [dispatch, user]);

  // Handle scroll for sticky header shadow
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleResendVerification = async () => {
    if (user && !isVerified) {
      try {
        await sendEmailVerification(user);
        setVerificationMessage('Verification email sent!');
        setTimeout(() => setVerificationMessage(''), 5000);
      } catch (error) {
        console.error('Verification error:', error);
        setVerificationMessage('Failed to send verification email.');
        setTimeout(() => setVerificationMessage(''), 5000);
      }
    }
  };

  const handleScrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setClick(false);
  };

  const menuVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    },
    exit: { x: '100%', opacity: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
  };

  const navItemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.3 },
    }),
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 font-Libre transition-all duration-500 ${scrolled
            ? 'bg-white/80 backdrop-blur-lg shadow-sm py-3'
            : 'bg-transparent py-5'
          }`}
      >
        <nav className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 overflow-hidden rounded-xl border-2 border-teal-500/20 shadow-sm group-hover:border-teal-500/50 transition-colors">
              <Image
                src={logoImg}
                alt="Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className={`text-xl font-bold tracking-tight leading-none ${scrolled ? 'text-gray-900' : 'text-gray-900'}`}>
                NextZeni
              </span>
              <span className="text-[10px] font-medium text-teal-600 tracking-widest uppercase">
                Academy
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.name} className="relative group">
                {item.path ? (
                  <Link
                    href={item.path}
                    className={`text-sm font-medium transition-colors duration-300 ${scrolled ? 'text-gray-600 hover:text-teal-600' : 'text-gray-700 hover:text-teal-600'
                      }`}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <button
                    onClick={() => handleScrollToSection(item.id)}
                    className={`text-sm font-medium transition-colors duration-300 ${scrolled ? 'text-gray-600 hover:text-teal-600' : 'text-gray-700 hover:text-teal-600'
                      }`}
                  >
                    {item.name}
                  </button>
                )}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-500 transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100"></span>
              </li>
            ))}
          </ul>

          {/* Auth Buttons & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-4">
              <Link
                href="/contact"
                className="text-sm font-semibold text-teal-600 hover:text-teal-700 transition-colors"
              >
                Get Certificate
              </Link>

              {user ? (
                <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                  <Link
                    href="/profile"
                    className="group flex items-center gap-2"
                    title={isVerified ? 'Verified' : 'Unverified'}
                  >
                    <div className={`p-2 rounded-full transition-colors ${isVerified ? 'bg-teal-50 text-teal-600 group-hover:bg-teal-100' : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'}`}>
                      {isVerified ? <UserCheck size={18} /> : <User size={18} />}
                    </div>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                    title="Logout"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              ) : (
                <Link
                  href="/auth/login"
                  className="bg-gray-900 text-white px-6 py-2.5 rounded-full text-sm font-medium shadow-lg shadow-gray-900/20 hover:bg-gray-800 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                >
                  Login
                </Link>
              )}

              {isAdmin && (
                <Link
                  href="/admin/all-blogs"
                  className="bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition-colors shadow-md"
                  title="Admin Dashboard"
                >
                  <Shield size={18} />
                </Link>
              )}
            </div>

            {/* Mobile toggle */}
            <button
              className="lg:hidden text-gray-800 focus:outline-none z-50 p-2"
              onClick={() => setClick(!click)}
              aria-label="Toggle menu"
            >
              {click ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </nav>

        {/* Verification message */}
        <AnimatePresence>
          {verificationMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-green-500 text-white text-center py-2 text-sm font-medium shadow-md"
            >
              {verificationMessage}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Nav Overlay */}
        <AnimatePresence>
          {click && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setClick(false)}
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
              />
              <motion.div
                className="fixed top-0 right-0 w-[85%] max-w-sm h-screen bg-white shadow-2xl z-50 flex flex-col pt-28 px-8 lg:hidden border-l border-gray-100"
                variants={menuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <ul className="flex flex-col gap-4">
                  {navItems.map((item, index) => (
                    <motion.li
                      key={item.name}
                      custom={index}
                      variants={navItemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {item.path ? (
                        <Link
                          href={item.path}
                          onClick={() => setClick(false)}
                          className="flex items-center justify-between text-lg font-medium text-gray-800 hover:text-teal-600 py-2 border-b border-gray-50 group"
                        >
                          {item.name}
                          <ChevronRight size={16} className="text-gray-300 group-hover:text-teal-500 transition-colors" />
                        </Link>
                      ) : (
                        <button
                          onClick={() => handleScrollToSection(item.id)}
                          className="flex items-center justify-between w-full text-lg font-medium text-gray-800 hover:text-teal-600 py-2 border-b border-gray-50 group"
                        >
                          {item.name}
                          <ChevronRight size={16} className="text-gray-300 group-hover:text-teal-500 transition-colors" />
                        </button>
                      )}
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  className="mt-auto mb-10 flex flex-col gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.4 } }}
                >
                  {user ? (
                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-600">
                          {isVerified ? <UserCheck size={24} /> : <User size={24} />}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">My Account</p>
                          <p className="text-xs text-gray-500">{isVerified ? 'Verified User' : 'Unverified User'}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <Link
                          href="/profile"
                          className="bg-white border border-gray-200 text-gray-700 py-2 rounded-lg text-sm font-medium text-center hover:bg-gray-50"
                          onClick={() => setClick(false)}
                        >
                          Profile
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="bg-white border border-gray-200 text-red-600 py-2 rounded-lg text-sm font-medium text-center hover:bg-red-50"
                        >
                          Logout
                        </button>
                      </div>

                      {!isVerified && (
                        <button
                          onClick={handleResendVerification}
                          className="w-full mt-3 text-xs text-orange-500 hover:text-orange-600 font-medium"
                        >
                          Resend Verification Email
                        </button>
                      )}
                    </div>
                  ) : (
                    <Link
                      href="/auth/login"
                      className="bg-gray-900 text-white px-6 py-4 rounded-xl font-bold text-center shadow-lg hover:bg-gray-800 transition-all"
                      onClick={() => setClick(false)}
                    >
                      Login / Sign Up
                    </Link>
                  )}

                  {isAdmin && (
                    <Link
                      href="/admin/all-blogs"
                      className="bg-orange-500 text-white px-6 py-4 rounded-xl font-bold text-center shadow-lg hover:bg-orange-600 transition-all flex items-center justify-center gap-2"
                      onClick={() => setClick(false)}
                    >
                      <Shield size={20} /> Admin Dashboard
                    </Link>
                  )}
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;
