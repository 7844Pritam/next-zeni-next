'use client';
import Link from "next/link";
import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowRight
} from "lucide-react";

const CustomFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-teal-900 text-white pt-16 pb-8 font-sans">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold font-Libre tracking-wide">
              NextZeni
            </h2>
            <p className="text-teal-100 leading-relaxed">
              Empowering individuals with communication and soft skills for a brighter professional future. Join our community of lifelong learners.
            </p>
            <div className="flex gap-4">
              <a href="#" className="bg-teal-800 p-2 rounded-full hover:bg-teal-700 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="bg-teal-800 p-2 rounded-full hover:bg-teal-700 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="bg-teal-800 p-2 rounded-full hover:bg-teal-700 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="bg-teal-800 p-2 rounded-full hover:bg-teal-700 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 font-Libre">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="text-teal-100 hover:text-white hover:pl-2 transition-all flex items-center gap-2">
                  <ArrowRight size={16} /> Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-teal-100 hover:text-white hover:pl-2 transition-all flex items-center gap-2">
                  <ArrowRight size={16} /> About Us
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-teal-100 hover:text-white hover:pl-2 transition-all flex items-center gap-2">
                  <ArrowRight size={16} /> All Courses
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="text-teal-100 hover:text-white hover:pl-2 transition-all flex items-center gap-2">
                  <ArrowRight size={16} /> Latest Blogs
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xl font-bold mb-6 font-Libre">Support</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/contact" className="text-teal-100 hover:text-white hover:pl-2 transition-all flex items-center gap-2">
                  <ArrowRight size={16} /> Contact Us
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-teal-100 hover:text-white hover:pl-2 transition-all flex items-center gap-2">
                  <ArrowRight size={16} /> Free Resources
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-teal-100 hover:text-white hover:pl-2 transition-all flex items-center gap-2">
                  <ArrowRight size={16} /> Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-teal-100 hover:text-white hover:pl-2 transition-all flex items-center gap-2">
                  <ArrowRight size={16} /> Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 font-Libre">Get in Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-teal-100">
                <MapPin size={20} className="mt-1 shrink-0" />
                <span>123 Education Lane, Knowledge City, India 560001</span>
              </li>
              <li className="flex items-center gap-3 text-teal-100">
                <Phone size={20} className="shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3 text-teal-100">
                <Mail size={20} className="shrink-0" />
                <span>hello@nextzeni.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-teal-800 pt-8 mt-8 text-center text-teal-200 text-sm">
          <p>© {currentYear} NextZeni. Designed & Developed by Difmo Technologies</p>
        </div>
      </div>
    </footer>
  );
};

export default CustomFooter;
