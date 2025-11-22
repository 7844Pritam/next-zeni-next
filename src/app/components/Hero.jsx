'use client'
import { motion } from "framer-motion";
import { GraduationCap, Star, CheckCircle, Infinity, BookOpen, Target, ArrowDown } from "lucide-react";

const HeroHello = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.2 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const badgeVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.4 } },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-white via-teal-50/30 to-orange-50/30"
    >
      {/* Animated background blobs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: 1000000,
          ease: "easeInOut",
        }}
        className="bg-teal-200 w-96 h-96 blur-3xl absolute left-0 top-0"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: 1000000,
          ease: "easeInOut",
          delay: 1,
        }}
        className="bg-orange-300 w-96 h-96 blur-3xl absolute right-0 bottom-0"
      />

      <div className="container relative mx-auto px-4 flex flex-col-reverse md:flex-row items-center gap-8 py-12">
        {/* Text Content */}
        <motion.div
          className="w-full md:w-1/2 text-left px-4"
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          {/* Trust badge */}
          <motion.div
            variants={badgeVariants}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md mb-6 border border-teal-200"
          >
            <GraduationCap className="text-teal-600" size={24} />
            <span className="text-sm font-semibold text-gray-700">
              Trusted by 5000+ Students
            </span>
          </motion.div>

          <h1 className="text-3xl font-Libre text-teal-800 relative z-10 sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
            Empowering Your Future,{" "}
            <span className="bg-gradient-to-r from-teal-600 to-orange-500 bg-clip-text text-transparent">
              One Skill at a Time
            </span>
          </h1>

          <p className="text-gray-600 font-Libre relative z-10 text-base sm:text-lg md:text-xl leading-relaxed mt-6 max-w-lg">
            Master Communication, English Speaking, and Soft Skills with NextZeni - Your Partner in Personal and Professional Growth.
          </p>

          {/* Trust indicators */}
          <motion.div
            variants={badgeVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-4 mt-6 mb-8"
          >
            <div className="flex items-center gap-2 text-gray-700">
              <Star className="text-yellow-400 fill-yellow-400" size={20} />
              <span className="text-sm font-medium">4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <CheckCircle className="text-teal-600" size={20} />
              <span className="text-sm font-medium">Industry Certified</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Infinity className="text-orange-600" size={20} />
              <span className="text-sm font-medium">Lifetime Access</span>
            </div>
          </motion.div>

          <div className="flex relative z-10 justify-start gap-4 mt-6 flex-wrap">
            <motion.button
              className="bg-gradient-to-r from-teal-600 to-teal-700 text-white py-4 px-8 rounded-full hover:from-teal-700 hover:to-teal-800 transition-all duration-300 text-sm sm:text-base shadow-xl hover:shadow-2xl hover:scale-105 font-semibold flex items-center gap-2"
              variants={buttonVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Join a Free Workshop
              <i className="fa fa-long-arrow-alt-right"></i>
            </motion.button>
            <motion.button
              className="bg-white border-2 border-teal-600 text-teal-700 py-4 px-8 rounded-full hover:bg-teal-50 transition-all duration-300 text-sm sm:text-base shadow-lg hover:shadow-xl font-semibold flex items-center gap-2"
              variants={buttonVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Courses
              <i className="fa fa-long-arrow-alt-right"></i>
            </motion.button>
          </div>
        </motion.div>

        {/* Image Content */}
        <motion.div
          className="w-full relative md:w-1/2 flex justify-center"
          initial="hidden"
          animate="visible"
          variants={imageVariants}
        >
          {/* Floating badges */}
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: 1000000,
              ease: "easeInOut",
            }}
            className="absolute top-10 right-10 bg-white rounded-2xl p-4 shadow-xl z-20 hidden md:block"
          >
            <div className="flex items-center gap-2">
              <BookOpen className="text-teal-600" size={32} />
              <div>
                <p className="text-xs text-gray-500">Available Courses</p>
                <p className="text-lg font-bold text-teal-700">15+</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 4,
              repeat: 1000000,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="absolute bottom-20 left-10 bg-white rounded-2xl p-4 shadow-xl z-20 hidden md:block"
          >
            <div className="flex items-center gap-2">
              <Target className="text-orange-600" size={32} />
              <div>
                <p className="text-xs text-gray-500">Success Rate</p>
                <p className="text-lg font-bold text-orange-600">95%</p>
              </div>
            </div>
          </motion.div>

          <img
            src="/images/landing.png"
            alt="NextZeni Learning Platform"
            className="w-full relative z-10 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg object-contain drop-shadow-2xl"
          />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: 1000000,
          ease: "easeInOut",
        }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400 text-sm flex flex-col items-center gap-2"
      >
        <span>Scroll to explore</span>
        <ArrowDown size={24} />
      </motion.div>
    </section>
  );
};

export default HeroHello;