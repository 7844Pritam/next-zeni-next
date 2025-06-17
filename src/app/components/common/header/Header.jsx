'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { getAuth, onAuthStateChanged, signOut, sendEmailVerification } from 'firebase/auth';
import { FaUserCircle, FaUser, FaUserCheck } from 'react-icons/fa'; // Icons for profile and verification status
import logoImg from '../../../../../public/images/logo1.jpeg';
import { auth,db } from '../../../../app/firebase'; // Adjust path to your Firebase config

const Header = () => {
  const [click, setClick] = useState(false);
  const [user, setUser] = useState(null); // Store authenticated user
  const [isAdmin, setIsAdmin] = useState(false); // Admin status
  const [isVerified, setIsVerified] = useState(false); // Email verification status
  const [verificationMessage, setVerificationMessage] = useState(''); // Message for resend action

  const navItems = [
    { name: 'Home', id: 'home', path: '/' },
    { name: 'All Courses', id: 'courses', path: '/courses' },
    { name: 'About', id: 'about', path: '/about' },
    { name: 'Blogs', id: 'blogs', path: '/blogs' },
    { name: 'Free Resources', path: '/free-resources' },
    { name: 'Contact', id: 'contact', path: '/contact' },
  ];

  // Monitor authentication and verification state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setIsVerified(currentUser.emailVerified);
        // Check if user is admin (e.g., via custom claims)
        const token = await currentUser.getIdTokenResult();
        setIsAdmin(!!token.claims.admin); // Assumes 'admin' custom claim
      } else {
        setIsAdmin(false);
        setIsVerified(false);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIsAdmin(false);
      setIsVerified(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Resend verification email
  const handleResendVerification = async () => {
    if (user && !isVerified) {
      try {
        await sendEmailVerification(user);
        setVerificationMessage('Verification email sent! Please check your inbox.');
        setTimeout(() => setVerificationMessage(''), 5000); // Clear message after 5 seconds
      } catch (error) {
        console.error('Error sending verification email:', error);
        setVerificationMessage('Failed to send verification email. Try again later.');
        setTimeout(() => setVerificationMessage(''), 5000);
      }
    }
  };

  const handleScrollToSection = (sectionId) => {
    if (typeof window !== 'undefined') {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      setClick(false);
    }
  };

  // Animation variants for mobile menu
  const menuVariants = {
    hidden: { x: '-100%', opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeInOut', type: 'spring' },
    },
    exit: { x: '-100%', opacity: 0, transition: { duration: 0.3 } },
  };

  // Animation variants for nav items
  const navItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.3 },
    }),
  };

  return (
    <>
      <header className="fixed top-2 font-Libre left-3 right-3 z-50 bg-teal-500 rounded-md shadow-md backdrop-blur-md">
        <nav className="container mx-auto px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex p-1 rounded-full bg-white items-center">
            <Image
              src={logoImg}
              alt="Logo"
              width={40}
              height={40}
              className="rounded-full  object-cover"
              priority
            />
          </Link>

          {/* Mobile Menu Toggle */}
          <div
            className="md:hidden text-2xl cursor-pointer text-gray-800"
            onClick={() => setClick(!click)}
            aria-label={click ? 'Close menu' : 'Open menu'}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setClick(!click);
              }
            }}
          >
            <motion.span
              animate={{ rotate: click ? 45 : 0, y: click ? 7 : 0 }}
              className="block w-6 h-0.5 bg-gray-800 mb-1"
            />
            <motion.span
              animate={{ opacity: click ? 0 : 1 }}
              className="block w-6 h-0.5 bg-gray-800 mb-1"
            />
            <motion.span
              animate={{ rotate: click ? -45 : 0, y: click ? -7 : 0 }}
              className="block w-6 h-0.5 bg-gray-800"
            />
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-6">
            {navItems.map((item, index) => (
              <motion.li
                key={index}
                className="text-base font-medium"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.path ? (
                  <Link
                    href={item.path}
                    className="text-white hover:text-orange-500 transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <button
                    onClick={() => handleScrollToSection(item.id)}
                    className="text-gray-700 hover:text-orange-500 transition-colors duration-300"
                  >
                    {item.name}
                  </button>
                )}
              </motion.li>
            ))}
          </ul>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/contact"
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-300 text-sm font-medium"
              >
                Get Certificate
              </Link>
            </motion.div>
            {user ? (
              <div className="flex items-center gap-4">
                {/* Profile Icon with Verification Status */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title={isVerified ? 'Verified User' : 'Please verify your email'}
                >
                  <Link href="/profile" className="text-white">
                    {isVerified ? <FaUserCheck size={24} /> : <FaUser size={24} />}
                  </Link>
                </motion.div>
                {/* Resend Verification Button (if unverified) */}
                {!isVerified && (
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <button
                      onClick={handleResendVerification}
                      className="text-white text-sm underline hover:text-orange-500 transition-colors duration-300"
                    >
                      Verify Email
                    </button>
                  </motion.div>
                )}
                {/* Logout Button */}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <button
                    onClick={handleLogout}
                    className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-4 py-2 rounded-full hover:from-gray-900 hover:to-black transition-all duration-300 text-sm font-medium"
                  >
                    Logout
                  </button>
                </motion.div>
              </div>
            ) : (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/auth/login"
                  className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-4 py-2 rounded-full hover:from-gray-900 hover:to-black transition-all duration-300 text-sm font-medium"
                >
                  Login
                </Link>
              </motion.div>
            )}
            {isAdmin && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/admin/all-blogs"
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-300 text-sm font-medium"
                >
                  Admin
                </Link>
              </motion.div>
            )}
          </div>
        </nav>

        {/* Verification Message (for resend feedback) */}
        {verificationMessage && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-md shadow-md z-50">
            {verificationMessage}
          </div>
        )}

        {/* Mobile Navigation */}
        <AnimatePresence>
          {click && (
            <motion.ul
              className="fixed top-0 left-0 w-full h-screen bg-gradient-to-b from-orange-500 to-purple-600 flex flex-col items-center justify-center gap-6 md:hidden"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {navItems.map((item, index) => (
                <motion.li
                  key={index}
                  className="text-lg font-semibold"
                  custom={index}
                  variants={navItemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {item.path ? (
                    <Link
                      href={item.path}
                      onClick={() => setClick(false)}
                      className="text-white hover:text-gray-200 transition-colors duration-300"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <button
                      onClick={() => {
                        handleScrollToSection(item.id);
                        setClick(false);
                      }}
                      className="text-white hover:text-gray-200 transition-colors duration-300"
                    >
                      {item.name}
                    </button>
                  )}
                </motion.li>
              ))}
              {/* Mobile Buttons */}
              <motion.li
                className="text-lg font-semibold"
                custom={navItems.length}
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
              >
                <Link
                  href="/contact"
                  onClick={() => setClick(false)}
                  className="text-white hover:text-gray-200 transition-colors duration-300"
                >
                  Get Certificate
                </Link>
              </motion.li>
              {user ? (
                <>
                  <motion.li
                    className="text-lg font-semibold"
                    custom={navItems.length + 1}
                    variants={navItemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Link
                      href="/profile"
                      onClick={() => setClick(false)}
                      className="text-white hover:text-gray-200 transition-colors duration-300"
                    >
                      Profile {isVerified ? '(Verified)' : '(Unverified)'}
                    </Link>
                  </motion.li>
                  {!isVerified && (
                    <motion.li
                      className="text-lg font-semibold"
                      custom={navItems.length + 2}
                      variants={navItemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <button
                        onClick={() => {
                          handleResendVerification();
                          setClick(false);
                        }}
                        className="text-white hover:text-gray-200 transition-colors duration-300"
                      >
                        Verify Email
                      </button>
                    </motion.li>
                  )}
                  <motion.li
                    className="text-lg font-semibold"
                    custom={navItems.length + (isVerified ? 2 : 3)}
                    variants={navItemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <button
                      onClick={() => {
                        handleLogout();
                        setClick(false);
                      }}
                      className="text-white hover:text-gray-200 transition-colors duration-300"
                    >
                      Logout
                    </button>
                  </motion.li>
                </>
              ) : (
                <motion.li
                  className="text-lg font-semibold"
                  custom={navItems.length + 1}
                  variants={navItemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Link
                    href="/auth/login"
                    onClick={() => setClick(false)}
                    className="text-white hover:text-gray-200 transition-colors duration-300"
                  >
                    Login
                  </Link>
                </motion.li>
              )}
              {isAdmin && (
                <motion.li
                  className="text-lg font-semibold"
                  custom={navItems.length + (user ? (isVerified ? 3 : 4) : 2)}
                  variants={navItemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Link
                    href="/admin/all-blogs"
                    onClick={() => setClick(false)}
                    className="text-white hover:text-gray-200 transition-colors duration-300"
                  >
                    Admin
                  </Link>
                </motion.li>
              )}
            </motion.ul>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;