'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses } from '../redux/courses/courseActions';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Briefcase, CheckCircle, Star, Clock, Users, ArrowRight, X } from 'lucide-react';
import emailjs from '@emailjs/browser';

const CoursesPage = () => {
  const dispatch = useDispatch();
  const { courses, loading } = useSelector((state) => state.courses);
  const [activeTab, setActiveTab] = useState('academic'); // 'academic' or 'professional'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Demo Booking Form
  const form = useRef();
  const [bookingStatus, setBookingStatus] = useState(null);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const filteredCourses = courses.filter(course => {
    if (activeTab === 'academic') {
      return course.category === 'Academic';
    } else {
      return course.category === 'Professional';
    }
  });

  const handleBookDemo = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setBookingStatus('sending');

    emailjs
      .sendForm("service_dmsch3b", "template_mlny9t8", form.current, {
        publicKey: "QAJJWF5gOlV6ZCU-M",
      })
      .then(
        () => {
          setBookingStatus('success');
          e.target.reset();
          setTimeout(() => {
            setIsModalOpen(false);
            setBookingStatus(null);
          }, 3000);
        },
        (error) => {
          console.error(error.text);
          setBookingStatus('error');
        }
      );
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Hero Section */}
      <div className="relative bg-teal-900 text-white pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold font-Libre mb-6"
          >
            Unlock Your True Potential
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-teal-100 max-w-2xl mx-auto mb-10"
          >
            Whether you're a student aiming for top grades or a professional looking to upskill, we have the perfect course for you.
          </motion.p>

          {/* Tabs */}
          <div className="inline-flex bg-teal-800/50 p-1 rounded-full backdrop-blur-sm border border-teal-700">
            <button
              onClick={() => setActiveTab('academic')}
              className={`px-8 py-3 rounded-full text-sm md:text-base font-semibold transition-all duration-300 flex items-center gap-2 ${activeTab === 'academic'
                  ? 'bg-white text-teal-900 shadow-lg'
                  : 'text-teal-200 hover:text-white'
                }`}
            >
              <BookOpen size={18} /> Academic Tuition (1st - 10th)
            </button>
            <button
              onClick={() => setActiveTab('professional')}
              className={`px-8 py-3 rounded-full text-sm md:text-base font-semibold transition-all duration-300 flex items-center gap-2 ${activeTab === 'professional'
                  ? 'bg-white text-teal-900 shadow-lg'
                  : 'text-teal-200 hover:text-white'
                }`}
            >
              <Briefcase size={18} /> Professional & Soft Skills
            </button>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No courses available in this category yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full group"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={course.image || 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
                    alt={course.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-teal-800 shadow-sm">
                    {course.subCategory}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {course.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-6 flex-grow">
                    {course.features?.slice(0, 3).map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-500">
                        <CheckCircle size={14} className="text-teal-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-gray-400 uppercase font-semibold">Fees</span>
                      <div className="text-lg font-bold text-teal-700">{course.fees}</div>
                    </div>
                    <button
                      onClick={() => handleBookDemo(course)}
                      className="bg-orange-500 text-white px-5 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors shadow-md hover:shadow-lg transform active:scale-95"
                    >
                      Book Demo
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>

              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Book a Free Demo</h2>
                <p className="text-gray-600 mb-6 text-sm">
                  Interested in <span className="font-semibold text-teal-600">{selectedCourse?.title}</span>? Fill out the form below and we'll contact you shortly.
                </p>

                <form ref={form} onSubmit={sendEmail} className="space-y-4">
                  <input type="hidden" name="subject" value={`Demo Request for ${selectedCourse?.title}`} />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      name="from_name"
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      name="phone" // Make sure template supports this or put in message
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email (Optional)</label>
                    <input
                      type="email"
                      name="email"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message / Questions</label>
                    <textarea
                      name="message"
                      rows="3"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all resize-none"
                      placeholder="Any specific requirements?"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={bookingStatus === 'sending'}
                    className="w-full bg-teal-600 text-white font-semibold py-3 rounded-lg hover:bg-teal-700 transition-colors shadow-md flex justify-center items-center gap-2 disabled:opacity-70"
                  >
                    {bookingStatus === 'sending' ? (
                      <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                    ) : bookingStatus === 'success' ? (
                      <>Request Sent <CheckCircle size={18} /></>
                    ) : (
                      'Confirm Booking'
                    )}
                  </button>

                  {bookingStatus === 'error' && (
                    <p className="text-red-500 text-xs text-center mt-2">Something went wrong. Please try again.</p>
                  )}
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CoursesPage;
