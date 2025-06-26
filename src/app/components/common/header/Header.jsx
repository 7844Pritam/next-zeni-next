'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { sendEmailVerification } from 'firebase/auth';
// import { useDispatch, useSelector } from 'react-redux';
import { FaUser, FaUserCheck } from 'react-icons/fa';

import logoImg from '../../../../../public/images/logo1.jpeg';

import { logoutUser, monitorAuth } from '@/app/redux/auth/authActions';
import { clearUserProfile, getUserProfile } from '@/app/redux/user/userActions';
import {  useDispatch, useSelector } from 'react-redux';

const Header = () => {
  const [click, setClick] = useState(false);
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
    hidden: { x: '-100%', opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeInOut', type: 'spring' },
    },
    exit: { x: '-100%', opacity: 0, transition: { duration: 0.3 } },
  };

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
              className="rounded-full object-cover"
              priority
            />
          </Link>

          {/* Mobile toggle */}
          <div
            className="md:hidden text-2xl relative z-40 cursor-pointer text-gray-800"
            onClick={() => setClick(!click)}
            role="button"
            tabIndex={0}
            aria-label="Toggle menu"
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

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-6">
            {navItems.map((item, index) => (
              <motion.li
                key={item.name}
                className="text-base font-medium"
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
              >
                {item.path ? (
                  <Link href={item.path} className="text-white hover:text-orange-500">
                    {item.name}
                  </Link>
                ) : (
                  <button
                    onClick={() => handleScrollToSection(item.id)}
                    className="text-white hover:text-orange-500"
                  >
                    {item.name}
                  </button>
                )}
              </motion.li>
            ))}
          </ul>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/contact"
              className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm hover:bg-orange-600"
            >
              Get Certificate
            </Link>

            {user ? (
              <>
                <Link href="/profile" className="text-white" title={isVerified ? 'Verified' : 'Unverified'}>
                  {isVerified ? <FaUserCheck size={24} /> : <FaUser size={24} />}
                </Link>

                {!isVerified && (
                  <button
                    onClick={handleResendVerification}
                    className="text-white text-sm underline hover:text-orange-300"
                  >
                    Verify Email
                  </button>
                )}

                <button
                  onClick={handleLogout}
                  className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm hover:bg-black"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/auth/login"
                className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm hover:bg-black"
              >
                Login
              </Link>
            )}

            {isAdmin && (
              <Link
                href="/admin/all-blogs"
                className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm hover:bg-orange-600"
              >
                Admin
              </Link>
            )}
          </div>
        </nav>

        {/* Verification message */}
        {verificationMessage && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-md z-50">
            {verificationMessage}
          </div>
        )}

        {/* Mobile Nav */}
        <AnimatePresence>
          {click && (
            <motion.ul
              className="fixed top-0 left-0 w-full h-screen bg-gradient-to-b from-teal-500 to-teal-600 flex flex-col items-center justify-center gap-6 md:hidden"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {navItems.map((item, index) => (
                <motion.li
                  key={item.name}
                  className="text-lg"
                  custom={index}
                  variants={navItemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {item.path ? (
                    <Link href={item.path} onClick={() => setClick(false)} className="text-white">
                      {item.name}
                    </Link>
                  ) : (
                    <button onClick={() => handleScrollToSection(item.id)} className="text-white">
                      {item.name}
                    </button>
                  )}
                </motion.li>
              ))}

              {user ? (
                <>
                  <Link href="/profile" className="text-white" onClick={() => setClick(false)}>
                    Profile {isVerified ? '(Verified)' : '(Unverified)'}
                  </Link>

                  {!isVerified && (
                    <button onClick={handleResendVerification} className="text-white">
                      Verify Email
                    </button>
                  )}

                  <button onClick={handleLogout} className="text-white">
                    Logout
                  </button>
                </>
              ) : (
                <Link href="/auth/login" className="text-white" onClick={() => setClick(false)}>
                  Login
                </Link>
              )}

              {isAdmin && (
                <Link href="/admin/all-blogs" className="text-white" onClick={() => setClick(false)}>
                  Admin
                </Link>
              )}
            </motion.ul>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;
