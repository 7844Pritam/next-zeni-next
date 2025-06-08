'use client';

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import logoImg from "../../../../../public/images/logo.png";

const Header = () => {
  const [click, setClick] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const navItems = [
    { name: "Home", id: "home", path: "/" },
    { name: "All Courses", id: "courses", path: "/courses" },
    { name: "About", id: "about", path: "/about" },
    { name: "Blogs", id: "blogs", path: "/blogs" },
    { name: "Free Resources", path: "/free-resources" },
    { name: "Contact", id: "contact", path: "/contact" },
  ];

  const handleScrollToSection = (sectionId) => {
    if (typeof window !== "undefined") {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      setClick(false);
    }
  };

  // Animation variants for mobile menu
  const menuVariants = {
    hidden: { x: "-100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeInOut", type: "spring" },
    },
    exit: { x: "-100%", opacity: 0, transition: { duration: 0.3 } },
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
      <header className="sticky top-0 z-50 bg-primary rounded-full mt-2 mx-4 backdrop-blur-md shadow-sm">
        <nav className="container mx-auto px-4 py-1 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src={logoImg}
              alt="Logo"
              width={48}
              height={48}
              className="rounded-full object-cover"
              priority
            />
          </Link>

          {/* Mobile Menu Toggle */}
          <div
            className="md:hidden text-2xl cursor-pointer text-gray-800"
            onClick={() => setClick(!click)}
            aria-label={click ? "Close menu" : "Open menu"}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setClick(!click);
              }
            }}
          >
            {/* Simple hamburger / close icon */}
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
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button
                onClick={() => setShowLogin(true)}
                className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-4 py-2 rounded-full hover:from-gray-900 hover:to-black transition-all duration-300 text-sm font-medium"
              >
                Login
              </button>
            </motion.div>
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
            </motion.ul>
          )}
        </AnimatePresence>
      </header>

      {/* Modal Mount */}
      {/* <LoginScreen isOpen={showLogin} onClose={() => setShowLogin(false)} />
      {showSignup && <SignUpScreen closeModal={() => setShowSignup(false)} />} */}
    </>
  );
};

export default Header;
