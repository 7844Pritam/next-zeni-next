"use client";

import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Send, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Contact = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    emailjs
      .sendForm("service_dmsch3b", "template_mlny9t8", form.current, {
        publicKey: "QAJJWF5gOlV6ZCU-M",
      })
      .then(
        () => {
          setLoading(false);
          setStatus("success");
          form.current.reset();
          setTimeout(() => setStatus(null), 5000);
        },
        (error) => {
          setLoading(false);
          setStatus("error");
          console.error(error.text);
        }
      );
  };

  const mapUrl =
    "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3559.1451950395885!2d81.01597737543788!3d26.86712767667439!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjbCsDUyJzAxLjciTiA4McKwMDEnMDYuOCJF!5e0!3m2!1sen!2sin!4v1738667917368!5m2!1sen!2sin";

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 font-Libre mb-4"
          >
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Have a question or just want to say hi? We'd love to hear from you.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-10"
          >
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
              <div className="space-y-6">
                <ContactItem
                  icon={<MapPin className="w-6 h-6 text-teal-600" />}
                  title="Our Location"
                  content="4/37 Vibhav Khand, Gomtinagar, Lucknow, Uttar Pradesh, 226010"
                />
                <ContactItem
                  icon={<Mail className="w-6 h-6 text-teal-600" />}
                  title="Email Us"
                  content="yournextzeni@gmail.com"
                  link="mailto:yournextzeni@gmail.com"
                />
                <ContactItem
                  icon={<Phone className="w-6 h-6 text-teal-600" />}
                  title="Call Us"
                  content="+91 6307749532"
                  link="tel:+916307749532"
                />
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100">
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Follow Us</h4>
                <div className="flex gap-4">
                  <SocialLink href="https://www.facebook.com/profile.php?id=61571258289396" icon={<Facebook size={20} />} />
                  <SocialLink href="https://www.instagram.com/nextzeni/" icon={<Instagram size={20} />} />
                  <SocialLink href="https://x.com/next_zeni" icon={<Twitter size={20} />} />
                  <SocialLink href="https://www.youtube.com/@NextZeni" icon={<Youtube size={20} />} />
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="h-64 w-full rounded-3xl overflow-hidden shadow-sm border border-gray-100 relative group">
              <iframe
                src={mapUrl}
                className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500"
                style={{ border: "none" }}
                allowFullScreen
                loading="lazy"
              ></iframe>
              <div className="absolute inset-0 pointer-events-none border-4 border-white/20 rounded-3xl"></div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl shadow-xl p-8 md:p-10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100 rounded-bl-full -mr-10 -mt-10 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-teal-100 rounded-tr-full -ml-10 -mb-10 opacity-50"></div>

            <h2 className="text-3xl font-bold text-gray-900 mb-2 relative z-10">Send a Message</h2>
            <p className="text-gray-500 mb-8 relative z-10">We usually respond within 24 hours.</p>

            <form ref={form} onSubmit={sendEmail} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    name="from_name"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:border-teal-500 focus:bg-white focus:ring-0 transition-all duration-200"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:border-teal-500 focus:bg-white focus:ring-0 transition-all duration-200"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Subject</label>
                <input
                  type="text"
                  name="subject"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:border-teal-500 focus:bg-white focus:ring-0 transition-all duration-200"
                  placeholder="How can we help?"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Message</label>
                <textarea
                  name="message"
                  rows="4"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:border-teal-500 focus:bg-white focus:ring-0 transition-all duration-200 resize-none"
                  placeholder="Tell us more about your inquiry..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-teal-600 text-white font-semibold py-4 rounded-xl hover:bg-teal-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-teal-200 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                ) : (
                  <>
                    Send Message <Send size={18} />
                  </>
                )}
              </button>

              {status === "success" && (
                <div className="p-4 rounded-xl bg-green-50 text-green-700 text-sm text-center font-medium">
                  Message sent successfully! We'll get back to you soon.
                </div>
              )}
              {status === "error" && (
                <div className="p-4 rounded-xl bg-red-50 text-red-700 text-sm text-center font-medium">
                  Something went wrong. Please try again later.
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const ContactItem = ({ icon, title, content, link }) => (
  <div className="flex items-start gap-4">
    <div className="p-3 bg-teal-50 rounded-lg shrink-0">
      {icon}
    </div>
    <div>
      <h4 className="font-semibold text-gray-900">{title}</h4>
      {link ? (
        <a href={link} className="text-gray-600 hover:text-teal-600 transition-colors block mt-1">
          {content}
        </a>
      ) : (
        <p className="text-gray-600 mt-1">{content}</p>
      )}
    </div>
  </div>
);

const SocialLink = ({ href, icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-teal-50 hover:text-teal-600 transition-all duration-300"
  >
    {icon}
  </a>
);

export default Contact;