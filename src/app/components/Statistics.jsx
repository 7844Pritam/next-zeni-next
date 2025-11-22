'use client'
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { GraduationCap, BookOpen, Target, UserCheck } from "lucide-react";

const Statistics = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { id: 1, value: 5000, suffix: "+", label: "Students Enrolled", icon: <GraduationCap size={40} /> },
    { id: 2, value: 15, suffix: "+", label: "Expert Courses", icon: <BookOpen size={40} /> },
    { id: 3, value: 95, suffix: "%", label: "Success Rate", icon: <Target size={40} /> },
    { id: 4, value: 5, suffix: "+", label: "Expert Instructors", icon: <UserCheck size={40} /> },
  ];

  const Counter = ({ end, suffix }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!isVisible) return;

      let start = 0;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }, [end, isVisible]);

    return (
      <span className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-teal-600 to-orange-500 bg-clip-text text-transparent">
        {count}{suffix}
      </span>
    );
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 via-teal-50 to-orange-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-teal-200 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-200 rounded-full blur-3xl opacity-20"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-Libre font-bold text-gray-800 mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Join thousands of learners who have transformed their careers with NextZeni
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center"
            >
              <div className="text-teal-600 mb-4 flex justify-center">{stat.icon}</div>
              <Counter end={stat.value} suffix={stat.suffix} />
              <p className="text-gray-600 mt-3 font-medium text-sm md:text-base">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
