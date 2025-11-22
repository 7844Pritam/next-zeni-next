"use client";

import React from "react";
import { motion } from "framer-motion";
import { Target, Eye, Mic, BookOpen, Brain, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

const AboutNew = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-teal-900 text-white py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold font-Libre mb-6 tracking-tight"
          >
            Next Step, <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-200 to-orange-200">Next Zenith.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-teal-100 max-w-3xl mx-auto leading-relaxed font-light"
          >
            Education is not just about textbooks—it's about transformation. We are building a dynamic space for learners, dreamers, and doers.
          </motion.p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 font-Libre">Our Story</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              We began as a humble coaching initiative to empower students in communication, personality development, and public speaking. Today, we’re evolving into an <strong className="text-teal-700">educational content powerhouse</strong>.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Whether you're a student preparing for life, a curious mind exploring new subjects, or someone rediscovering the joy of learning—<strong className="text-orange-600">you belong here</strong>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-teal-50 rounded-3xl p-10 relative overflow-hidden group hover:shadow-lg transition-all duration-300"
          >
            <div className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-sm text-teal-600 group-hover:scale-110 transition-transform">
              <Target size={32} />
            </div>
            <h3 className="text-3xl font-bold text-teal-900 mb-4 font-Libre">Our Mission</h3>
            <p className="text-teal-800 text-lg leading-relaxed">
              To make knowledge <strong>accessible</strong>, <strong>engaging</strong>, and <strong>inspiring</strong> across a wide range of subjects. We aim to nurture not just academic minds but aware, articulate, and confident individuals who can thrive in the real world.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-orange-50 rounded-3xl p-10 relative overflow-hidden group hover:shadow-lg transition-all duration-300"
          >
            <div className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-sm text-orange-600 group-hover:scale-110 transition-transform">
              <Eye size={32} />
            </div>
            <h3 className="text-3xl font-bold text-orange-900 mb-4 font-Libre">Our Vision</h3>
            <p className="text-orange-800 text-lg leading-relaxed">
              To be the catalyst for personal and professional growth, creating a world where every individual has the tools and confidence to reach their own zenith, regardless of their starting point.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-Libre">What We Offer</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A comprehensive ecosystem designed for your holistic growth.
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <FeatureCard
              icon={<Mic size={28} />}
              title="Communication"
              description="Speak better. Think deeper. Grow stronger with our specialized training."
              color="bg-blue-100 text-blue-600"
            />
            <FeatureCard
              icon={<BookOpen size={28} />}
              title="Curated Learning"
              description="Explore content across disciplines—Mathematics, History, Tech, and more."
              color="bg-purple-100 text-purple-600"
            />
            <FeatureCard
              icon={<Brain size={28} />}
              title="Life-Ready Skills"
              description="Beyond exams, we focus on confidence, expression, strategy, and growth."
              color="bg-pink-100 text-pink-600"
            />
            <FeatureCard
              icon={<Users size={28} />}
              title="Community"
              description="Join a community of learners who support, uplift, and challenge each other."
              color="bg-green-100 text-green-600"
            />
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-teal-600 to-teal-800 rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold font-Libre mb-6">Ready to start your journey?</h2>
            <p className="text-teal-100 text-lg mb-10 max-w-2xl mx-auto">
              Join NextZeni today and take the first step towards unlocking your true potential.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/courses" className="bg-white text-teal-800 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-lg flex items-center justify-center gap-2">
                Explore Courses <ArrowRight size={20} />
              </Link>
              <Link href="/contact" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description, color }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    }}
    className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group"
  >
    <div className={`w-14 h-14 rounded-xl ${color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed text-sm">
      {description}
    </p>
  </motion.div>
);

export default AboutNew;
