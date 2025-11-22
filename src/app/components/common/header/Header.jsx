'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { sendEmailVerification } from 'firebase/auth';
import { FaUser, FaUserCheck } from 'react-icons/fa';

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
      transition: { duration: 0.4, ease: 'easeOut' },
    },
    exit: { x: '100%', opacity: 0, transition: { duration: 0.3 } },
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
        className={`fixed top-0 left-0 w-full z-50 font-Libre transition-all duration-300 ${scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-md py-2'
          : 'bg-transparent py-4'
          }`}
      >
        <nav className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-10 h-10 overflow-hidden rounded-full border border-gray-100 shadow-sm">
              <Image
                src={logoImg}
                alt="Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <span className={`text-xl font-bold tracking-tight hidden sm:block ${scrolled ? 'text-teal-700' : 'text-teal-800'}`}>
              NextZeni
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.name} className="relative group">
                {item.path ? (
                  <Link
                    href={item.path}
                    className={`font-medium transition-colors ${scrolled ? 'text-gray-700 hover:text-teal-600' : 'text-gray-800 hover:text-teal-700'}`}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <button
                    onClick={() => handleScrollToSection(item.id)}
                    className={`font-medium transition-colors ${scrolled ? 'text-gray-700 hover:text-teal-600' : 'text-gray-800 hover:text-teal-700'}`}
                  >
                    {item.name}
                  </button>
                )}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-500 transition-all duration-300 group-hover:w-full"></span>
              </li>
            ))}
          </ul>

          {/* Auth Buttons & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/contact"
                className="text-teal-600 font-medium hover:text-teal-700 transition-colors"
              >
                Get Certificate
              </Link>

              {user ? (
                <>
                  <Link
                    href="/profile"
                    className="text-gray-600 hover:text-teal-600 transition-colors"
                    title={isVerified ? 'Verified' : 'Unverified'}
                  >
                    {isVerified ? (
                      <FaUserCheck size={20} className="text-teal-500" />
                    ) : (
                      <FaUser size={20} />
                    )}
                  </Link>

                  {!isVerified && (
                    <button
                      onClick={handleResendVerification}
                      className="text-xs text-orange-500 underline hover:text-orange-600"
                    >
                      Verify
                    </button>
                  )}

                  <button
                    onClick={handleLogout}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/auth/login"
                  className="bg-teal-600 text-white px-5 py-2 rounded-full text-sm font-medium shadow-md hover:bg-teal-700 transition-all hover:shadow-lg"
                >
                  Login
                </Link>
              )}

              {isAdmin && (
                <Link
                  href="/admin/all-blogs"
                  className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-orange-600 transition-colors"
                >
                  Admin
                </Link>
              )}
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden text-2xl text-gray-800 focus:outline-none z-50"
              onClick={() => setClick(!click)}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <motion.span
                  animate={{ rotate: click ? 45 : 0, y: click ? 9 : 0 }}
                  className="w-full h-0.5 bg-gray-800 rounded-full origin-center"
                />
                <motion.span
                  animate={{ opacity: click ? 0 : 1 }}
                  className="w-full h-0.5 bg-gray-800 rounded-full"
                />
                <motion.span
                  animate={{ rotate: click ? -45 : 0, y: click ? -9 : 0 }}
                  className="w-full h-0.5 bg-gray-800 rounded-full origin-center"
                />
              </div>
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
              className="absolute top-full left-0 w-full bg-green-500 text-white text-center py-2 text-sm font-medium"
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
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
              />
              <motion.div
                className="fixed top-0 right-0 w-[75%] max-w-sm h-screen bg-white shadow-2xl z-50 flex flex-col pt-24 px-8 md:hidden"
                variants={menuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <ul className="flex flex-col gap-6">
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
                          className="text-xl font-medium text-gray-800 hover:text-teal-600 block"
                        >
                          {item.name}
                        </Link>
                      ) : (
                        <button
                          onClick={() => handleScrollToSection(item.id)}
                          className="text-xl font-medium text-gray-800 hover:text-teal-600 block text-left w-full"
                        >
                          {item.name}
                        </button>
                      )}
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  className="mt-8 pt-8 border-t border-gray-100 flex flex-col gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.4 } }}
                >
                  {user ? (
                    <>
                      <Link
                        href="/profile"
                        className="flex items-center gap-2 text-gray-700 font-medium"
                        onClick={() => setClick(false)}
                      >
                        <FaUser className="text-teal-500" />
                        Profile {isVerified ? '(Verified)' : '(Unverified)'}
                      </Link>

                      {!isVerified && (
                        <button
                          onClick={handleResendVerification}
                          className="text-left text-orange-500 font-medium"
                        >
                          Verify Email
                        </button>
                      )}

                      <button
                        onClick={handleLogout}
                        className="bg-gray-100 text-gray-800 px-4 py-3 rounded-lg font-medium text-center hover:bg-gray-200"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link
                      href="/auth/login"
                      className="bg-teal-600 text-white px-4 py-3 rounded-lg font-medium text-center shadow-md hover:bg-teal-700"
                      onClick={() => setClick(false)}
                    >
                      Login
                    </Link>
                  )}

                  {isAdmin && (
                    <Link
                      href="/admin/all-blogs"
                      className="bg-orange-500 text-white px-4 py-3 rounded-lg font-medium text-center hover:bg-orange-600"
                      onClick={() => setClick(false)}
                    >
                      Admin Dashboard
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
