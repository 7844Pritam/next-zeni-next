'use client'
import { motion } from "framer-motion";
import {
    GraduationCap,
    Clock,
    ScrollText,
    Infinity,
    Users,
    Rocket
} from "lucide-react";

const Features = () => {
    const features = [
        {
            id: 1,
            icon: <GraduationCap size={48} strokeWidth={1.5} />,
            title: "Expert-Led Courses",
            description: "Learn from industry professionals with years of real-world experience in communication and soft skills training.",
        },
        {
            id: 2,
            icon: <Clock size={48} strokeWidth={1.5} />,
            title: "Flexible Learning",
            description: "Study at your own pace with 24/7 access to course materials. Learn whenever and wherever suits you best.",
        },
        {
            id: 3,
            icon: <ScrollText size={48} strokeWidth={1.5} />,
            title: "Certified Programs",
            description: "Earn industry-recognized certificates that boost your resume and open doors to new career opportunities.",
        },
        {
            id: 4,
            icon: <Infinity size={48} strokeWidth={1.5} />,
            title: "Lifetime Access",
            description: "Get unlimited access to all course materials, updates, and resources even after course completion.",
        },
        {
            id: 5,
            icon: <Users size={48} strokeWidth={1.5} />,
            title: "Community Support",
            description: "Join a vibrant community of learners, share experiences, and grow together with peer support.",
        },
        {
            id: 6,
            icon: <Rocket size={48} strokeWidth={1.5} />,
            title: "Career Growth",
            description: "Develop skills that employers value most. Advance your career with confidence and competence.",
        },
    ];

    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-5xl font-Libre font-bold text-gray-800 mb-4">
                        Why Choose NextZeni?
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        We provide everything you need to master communication and soft skills
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-teal-200"
                        >
                            {/* Hover gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-orange-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                            <div className="relative z-10">
                                <div className="text-teal-600 mb-4 transform group-hover:scale-110 transition-transform duration-300 group-hover:text-orange-500">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-teal-600 transition-colors duration-300">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
