"use client";

import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_dmsch3b", "template_mlny9t8", form.current, {
        publicKey: "QAJJWF5gOlV6ZCU-M",
      })
      .then(
        () => {
          alert("Message Sent Successfully!");
          e.target.reset();
        },
        (error) => {
          console.log(error.text);
          alert("Failed to send message. Please try again.");
        }
      );
  };

  const map =
    "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3559.1451950395885!2d81.01597737543788!3d26.86712767667439!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjbCsDUyJzAxLjciTiA4McKwMDEnMDYuOCJF!5e0!3m2!1sen!2sin!4v1738667917368!5m2!1sen!2sin";

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div
        className="w-full h-[400px] md:h-[500px] bg-cover bg-center relative"
        style={{ backgroundImage: "url('/images/bgimg.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600/80 to-orange-400/80 flex justify-center items-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Get in Touch
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Map Section */}
            <div className="relative">
              <iframe
                src={map}
                className="w-full h-[300px] md:h-[500px] rounded-2xl shadow-lg"
                style={{ border: "none" }}
                allowFullScreen
                loading="lazy"
              ></iframe>
              <div className="absolute top-4 left-4 bg-teal-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow">
                Our Location
              </div>
            </div>

            {/* Contact Form & Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Contact Us
                </h2>
                <p className="mt-2 text-gray-600 max-w-md">
                  We’re here for your suggestions, questions, or just a friendly chat.
                </p>
              </div>

              {/* Contact Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-orange-400 transition-colors">
                  <h4 className="font-semibold text-gray-900">Address</h4>
                  <p className="text-gray-600 mt-1">
                    4/37 Vibhav Khand, Gomtinagar, Lucknow, Uttar Pradesh, 226010
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-orange-400 transition-colors">
                  <h4 className="font-semibold text-gray-900">Email</h4>
                  <p className="text-gray-600 mt-1">yournextzeni@gmail.com</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-orange-400 transition-colors">
                  <h4 className="font-semibold text-gray-900">Phone</h4>
                  <p className="text-gray-600 mt-1">+91 6307749532</p>
                </div>
              </div>

              {/* Form */}
              <form ref={form} onSubmit={sendEmail} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="from_name"
                    placeholder="Your Name"
                    required
                    className="p-3 border border-gray-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    required
                    className="p-3 border border-gray-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                  />
                </div>
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  required
                  className="p-3 border border-gray-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                />
                <textarea
                  name="message"
                  rows="5"
                  placeholder="Your Message"
                  required
                  className="p-3 border border-gray-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                ></textarea>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 bg-orange-400 text-white font-semibold rounded-lg hover:bg-orange-500 transition-colors shadow-md"
                >
                  Send Message
                </button>
              </form>

              {/* Social Links */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Follow Us</h3>
                <div className="flex space-x-4 mt-3">
                  <a
                    href="https://www.facebook.com/profile.php?id=61571258289396"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-600 hover:text-teal-700 transition"
                  >
                    <i className="fab fa-facebook-f text-2xl"></i>
                  </a>
                  <a
                    href="https://www.instagram.com/nextzeni/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-600 hover:text-teal-700 transition"
                  >
                    <i className="fab fa-instagram text-2xl"></i>
                  </a>
                  <a
                    href="https://x.com/next_zeni"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-600 hover:text-teal-700 transition"
                  >
                    <i className="fab fa-twitter text-2xl"></i>
                  </a>
                  <a
                    href="https://www.youtube.com/@NextZeni"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-600 hover:text-teal-700 transition"
                  >
                    <i className="fab fa-youtube text-2xl"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;