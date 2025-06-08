
'use client'
import { motion } from "framer-motion"; 

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

  return (
    <section
      id="home"
      className="relative bg-gray-50 min-h-screen flex items-center py-12 overflow-hidden"
    >
      
      <img
        src="/images/bgimages/herosvg.svg"
        alt="Hero background"
        className="absolute top-0 right-0 w-40 sm:w-64 md:w-80 lg:w-96 z-0 pointer-events-none"
      />
      <img
        src="/images/bgimages/herosvg2.svg"
        alt="Hero background"
        className="absolute bottom-0 left-0  z-0 pointer-events-none"
      />


      <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center gap-8">
        {/* Text Content */}
        <motion.div
          className="w-full md:w-1/2 text-left px-4"
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          <h2 className="text-2xl relative z-10 sm:text-3xl md:text-4xl font-bold text-gray-800">
            Empowering Your Future, One Skill at a Time
          </h2>
          <p className="text-gray-600 relative z-10 text-sm sm:text-base md:text-lg leading-relaxed mt-4 max-w-md">
            Learn Communication, English Speaking, and Soft Skills with NextZeni - Your Partner in Personal and Professional Growth.
          </p>
          <div className="flex relative z-10 justify-start gap-4 mt-6 flex-wrap">
            <motion.button
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-6 rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-300 text-sm sm:text-base shadow-lg"
              variants={buttonVariants}
            >
              Join a Free Workshop
              <i className="fa fa-long-arrow-alt-right ml-2"></i>
            </motion.button>
            <motion.button
              className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-3 px-6 rounded-full hover:from-gray-900 hover:to-black transition-all duration-300 text-sm sm:text-base shadow-lg"
              variants={buttonVariants}
            >
              Explore Courses
              <i className="fa fa-long-arrow-alt-right ml-2"></i>
            </motion.button>
          </div>
        </motion.div>
        <motion.div
          className="w-full md:w-1/2 flex justify-center"
          initial="hidden"
          animate="visible"
          variants={imageVariants}
        >
          <img
            src="/images/landing.png"
            alt="Landing"
            className="w-full relative z-10 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg object-contain"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroHello;