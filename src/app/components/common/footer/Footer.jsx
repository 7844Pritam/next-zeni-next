'use client';
import React from "react";
import Link from "next/link";
import { FaLinkedin, FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaMapMarkerAlt, FaPhoneAlt, FaPaperPlane } from "react-icons/fa";

import "./footer.css";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4 mt-44">
      <div className="px-6">
        <div className="flex flex-col sm:flex-row lg:flex-row justify-between gap-8">
          {/* First Section */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2">NEXTZENI</h1>
            <span className="block text-gray-400">ONLINE EDUCATION & LEARNING</span>
            <p className="mt-4 text-gray-300">Empower Your Voice, Elevate Your Impact!</p>
            <div className="flex space-x-4 mt-4 text-xl">
              <a
                href="https://www.facebook.com/profile.php?id=61571258289396"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://x.com/next_zeni"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a
                href="https://www.instagram.com/nextzeni/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.youtube.com/@NextZeni"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <FaYoutube />
              </a>
              <a
                href="https://www.linkedin.com/company/nextzeni"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* Explore Section */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-4">Explore</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/courses">Services</Link>
              </li>
              <li>
                <Link href="/courses">Courses</Link>
              </li>
              <li>
                <Link href="/journal">Blog</Link>
              </li>
              <li>
                <Link href="/contact">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Quick Links Section */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/contact">Contact Us</Link>
              </li>
              <li>
                <Link href="/pricing">Pricing</Link>
              </li>
              <li>
                <Link href="/">Terms & Conditions</Link>
              </li>
              <li>
                <Link href="/">Privacy</Link>
              </li>
              <li>
                <Link href="/">Feedbacks</Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-4">Have a Questions?</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-xl" />
                <span className="text-sm">
                  E-3/44, Vijayipur, Vishesh Khand 3, Gomti Nagar, Lucknow, Uttar Pradesh 226010
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhoneAlt className="text-xl" />
                <a href="tel:+916307749532" className="text-sm">
                  +91 630 774 9532
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <FaPaperPlane className="text-xl" />
                <a href="mailto:yournextzeni@gmail.com" className="text-sm">
                  yournextzeni@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <hr className="my-4 border-gray-700" />

      <div className="flex justify-center pt-4 px-4">
        <p className="text-gray-400 text-sm text-center">
          Copyright ©2025 | All rights reserved by NextZeni | Site Designed & Developed by Difmo Technologies
        </p>
      </div>
    </footer>
  );
};

export default Footer;
