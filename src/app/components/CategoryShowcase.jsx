'use client'
import { motion } from "framer-motion";

const CategoryShowcase = () => {
    const categories = [
        {
            id: 1,
            name: "Communication Skills",
            icon: "💬",
            courseCount: "5 Courses",
            color: "from-blue-500 to-cyan-500",
        },
        {
            id: 2,
            name: "English Speaking",
            icon: "🗣️",
            courseCount: "4 Courses",
            color: "from-purple-500 to-pink-500",
        },
        {
            id: 3,
            name: "Soft Skills",
            icon: "🤝",
            courseCount: "6 Courses",
            color: "from-orange-500 to-red-500",
        },
        {
            id: 4,
            name: "Mock Interviews",
            icon: "🎤",
            courseCount: "3 Courses",
            color: "from-teal-500 to-green-500",
        },
        {
            id: 5,
            name: "Presentation Skills",
            icon: "📊",
            courseCount: "4 Courses",
            color: "from-indigo-500 to-blue-500",
        },
        {
            id: 6,
            name: "Career Readiness",
            icon: "💼",
            courseCount: "5 Courses",
            color: "from-pink-500 to-rose-500",
        },
        {
            id: 7,
            name: "Group Discussions",
            icon: "👥",
            courseCount: "3 Courses",
            color: "from-yellow-500 to-orange-500",
        },
        {
            id: 8,
            name: "Vocabulary Building",
            icon: "📖",
            courseCount: "4 Courses",
            color: "from-green-500 to-emerald-500",
        },
    ];

    return (
        <section className="py-16 md:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-96 h-96 bg-teal-500 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-5xl font-Libre font-bold text-white mb-4">
                        Explore Our Course Categories
                    </h2>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                        Discover the perfect course to enhance your skills and advance your career
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="group relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 cursor-pointer overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-300"
                        >
                            {/* Gradient overlay on hover */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>

                            <div className="relative z-10 text-center">
                                <div className="text-4xl md:text-5xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                                    {category.icon}
                                </div>
                                <h3 className="text-white font-bold text-base md:text-lg mb-2">
                                    {category.name}
                                </h3>
                                <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    {category.courseCount}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center mt-12"
                >
                    <button className="bg-gradient-to-r from-teal-500 to-orange-500 text-white py-3 px-8 rounded-full font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300">
                        View All Courses
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default CategoryShowcase;
