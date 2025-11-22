'use client'
import { motion } from "framer-motion";
import { useState } from "react";

const TestimonialsCarousel = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const testimonials = [
        {
            id: 1,
            name: "Pritam Sharma",
            role: "App Developer",
            company: "Tech Solutions Inc.",
            image: "./images/testo/t1.jpeg",
            rating: 5,
            text: "NextZeni's communication classes completely transformed my confidence. I went from struggling in meetings to leading presentations with ease. The practical approach and expert guidance made all the difference in my career growth.",
        },
        {
            id: 2,
            name: "Aman Kumar",
            role: "Web Developer",
            company: "Digital Innovations",
            image: "./images/testo/t1.jpeg",
            rating: 5,
            text: "The soft skills training at NextZeni helped me land my dream job. The mock interviews and group discussion sessions were incredibly valuable. I now communicate with clarity and confidence in every professional setting.",
        },
        {
            id: 3,
            name: "Dinesh Kumar",
            role: "Software Engineer",
            company: "Global Tech Corp",
            image: "./images/testo/t1.jpeg",
            rating: 5,
            text: "I've taken multiple courses at NextZeni and each one exceeded my expectations. The instructors are knowledgeable, the content is practical, and the community support is amazing. Highly recommended for career advancement!",
        },
    ];

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevSlide = () => {
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <section className="py-16 md:py-24 bg-gradient-to-br from-teal-50 via-white to-orange-50">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-5xl font-Libre font-bold text-gray-800 mb-4">
                        Success Stories
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Hear from our students who transformed their careers with NextZeni
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto relative">
                    {/* Testimonial Card */}
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl"
                    >
                        {/* Quote icon */}
                        <div className="text-6xl text-teal-500 opacity-20 mb-4">"</div>

                        {/* Rating */}
                        <div className="flex gap-1 mb-6">
                            {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                                <span key={i} className="text-yellow-400 text-2xl">★</span>
                            ))}
                        </div>

                        {/* Testimonial text */}
                        <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-8 italic">
                            {testimonials[activeIndex].text}
                        </p>

                        {/* Author info */}
                        <div className="flex items-center gap-4">
                            <img
                                src={testimonials[activeIndex].image}
                                alt={testimonials[activeIndex].name}
                                className="w-16 h-16 rounded-full object-cover border-4 border-teal-500"
                            />
                            <div>
                                <h4 className="font-bold text-gray-800 text-lg">
                                    {testimonials[activeIndex].name}
                                </h4>
                                <p className="text-gray-600">
                                    {testimonials[activeIndex].role} at {testimonials[activeIndex].company}
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Navigation buttons */}
                    <div className="flex justify-center gap-4 mt-8">
                        <button
                            onClick={prevSlide}
                            className="bg-white hover:bg-teal-500 text-gray-800 hover:text-white w-12 h-12 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center font-bold"
                            aria-label="Previous testimonial"
                        >
                            ←
                        </button>

                        {/* Dots indicator */}
                        <div className="flex items-center gap-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveIndex(index)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeIndex
                                            ? "bg-teal-500 w-8"
                                            : "bg-gray-300 hover:bg-gray-400"
                                        }`}
                                    aria-label={`Go to testimonial ${index + 1}`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={nextSlide}
                            className="bg-white hover:bg-teal-500 text-gray-800 hover:text-white w-12 h-12 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center font-bold"
                            aria-label="Next testimonial"
                        >
                            →
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsCarousel;
