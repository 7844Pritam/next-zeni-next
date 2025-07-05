import React from "react";

const AboutNew = () => {
  return (
    <section className="bg-white text-gray-800 py-26 px-4 md:px-12" id="about">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center text-orange-600">
          About NextZeni
        </h2>
        <p className="text-center text-lg text-gray-600 italic mb-10">
          <strong>Next Step, Next Zenith.</strong>
        </p>

        <p className="text-lg leading-relaxed text-gray-700 mb-8 text-center">
          Welcome to <strong>NextZeni</strong>, a platform built on the belief that education is not just about textbooks—it's about transformation.
        </p>
        <p className="text-lg leading-relaxed text-gray-700 mb-8 text-center">
          We began as a humble coaching initiative to empower students in communication, personality development, and public speaking. Today, we’re evolving into an <strong>educational content powerhouse</strong>—a dynamic space for learners, dreamers, and doers of all ages.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Mission */}
          <div>
            <h3 className="text-2xl font-semibold text-orange-500 mb-3">Our Mission</h3>
            <p className="text-gray-700 leading-relaxed">
              To make knowledge <strong>accessible</strong>, <strong>engaging</strong>, and <strong>inspiring</strong> across a wide range of subjects—from science and economics to psychology, law, and life skills.  
              We aim to nurture not just academic minds but <strong>aware, articulate, and confident individuals</strong> who can thrive in the real world.
            </p>
          </div>

          {/* Offerings */}
          <div>
            <h3 className="text-2xl font-semibold text-orange-500 mb-3">What We Offer</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li><strong>🎙 Communication & Personality Development:</strong> Speak better. Think deeper. Grow stronger.</li>
              <li><strong>📚 Curated Learning:</strong> Explore content across disciplines—Mathematics, History, Technology, Design, Philosophy, and more.</li>
              <li><strong>🧠 Life-Ready Learning:</strong> Beyond exams, we focus on skills that matter—confidence, expression, strategy, and growth.</li>
              <li><strong>🌱 Community & Growth:</strong> Join a community of learners who support, uplift, and challenge each other to rise.</li>
            </ul>
          </div>
        </div>

        {/* Why NextZeni */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-semibold text-orange-500 mb-3">Why NextZeni?</h3>
          <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
            Because you deserve an education that moves with you, grows with you, and pushes you towards your next zenith.  
            Whether you're a student preparing for life, a curious mind exploring new subjects, or someone rediscovering the joy of learning—<strong>you belong here</strong>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutNew;
