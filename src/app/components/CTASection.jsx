'use client'
import { motion } from "framer-motion";

const CTASection = () => {
    return (
        <section className="py-16 md:py-24 bg-gradient-to-br from-teal-600 via-teal-700 to-orange-600 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500 rounded-full blur-3xl opacity-20"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-400 rounded-full blur-3xl opacity-20"></div>

            {/* Animated circles */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute top-1/2 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl opacity-10"
            />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto text-center"
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="inline-block bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full mb-6"
                    >
                        <span className="text-white font-semibold">🎉 Limited Time Offer</span>
                    </motion.div>

                    {/* Heading */}
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-Libre font-bold text-white mb-6 leading-tight">
                        Ready to Transform Your Career?
                    </h2>

                    <p className="text-white/90 text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
                        Join thousands of successful learners who have mastered communication and soft skills. Start your journey today with a free workshop!
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white text-teal-700 py-4 px-8 rounded-full font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 w-full sm:w-auto"
                        >
                            Join Free Workshop
                            <span className="ml-2">→</span>
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-transparent border-2 border-white text-white py-4 px-8 rounded-full font-bold text-lg hover:bg-white hover:text-teal-700 transition-all duration-300 w-full sm:w-auto"
                        >
                            Browse Courses
                        </motion.button>
                    </div>

                    {/* Trust indicators */}
                    <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 text-white/80 text-sm">
                        <div className="flex items-center gap-2">
                            <span className="text-2xl">✓</span>
                            <span>No Credit Card Required</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-2xl">✓</span>
                            <span>5000+ Happy Students</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-2xl">✓</span>
                            <span>Industry Certified</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default CTASection;
