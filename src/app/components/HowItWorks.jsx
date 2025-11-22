'use client'
import { motion } from "framer-motion";

const HowItWorks = () => {
    const steps = [
        {
            id: 1,
            number: "01",
            title: "Browse & Choose",
            description: "Explore our diverse course catalog and find the perfect course that matches your learning goals and career aspirations.",
            icon: "🔍",
        },
        {
            id: 2,
            number: "02",
            title: "Enroll & Access",
            description: "Sign up instantly and get immediate access to all course materials, videos, and resources on any device.",
            icon: "✅",
        },
        {
            id: 3,
            number: "03",
            title: "Learn at Your Pace",
            description: "Study whenever and wherever you want. Complete lessons, practice exercises, and engage with our community.",
            icon: "📚",
        },
        {
            id: 4,
            number: "04",
            title: "Complete & Certify",
            description: "Finish your course, pass assessments, and earn a recognized certificate to showcase your new skills.",
            icon: "🎓",
        },
    ];

    return (
        <section className="py-16 md:py-24 bg-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-teal-100 rounded-full blur-3xl opacity-30"></div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-Libre font-bold text-gray-800 mb-4">
                        How It Works
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Your journey to mastering communication skills in four simple steps
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                    {/* Connection lines for desktop */}
                    <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-teal-200 via-orange-200 to-teal-200"></div>

                    {steps.map((step, index) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            className="relative"
                        >
                            {/* Step card */}
                            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-teal-300 relative z-10">
                                {/* Number badge */}
                                <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-teal-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                                    <span className="text-white font-bold text-xl">{step.number}</span>
                                </div>

                                {/* Icon */}
                                <div className="text-5xl mb-4 mt-6 text-center">
                                    {step.icon}
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600 text-center leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
