'use client';

import React, { useState } from 'react';

const FreeResourcesPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  // Dummy data for network-related resources
  const resources = [
    {
      title: 'Networking Fundamentals PDF',
      description: 'A comprehensive guide to understanding computer networks, including TCP/IP, LAN, and WAN.',
      link: '/downloads/networking-fundamentals.pdf',
      type: 'PDF',
      image: 'https://images.unsplash.com/photo-1516321318423-8f7a5057e6f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      featured: true,
    },
    {
      title: 'Cybersecurity Essentials E-Book',
      description: 'Learn key cybersecurity concepts to protect networks and systems from threats.',
      link: '/downloads/cybersecurity-essentials.pdf',
      type: 'E-Book',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      featured: true,
    },
    {
      title: 'Network Setup Cheat Sheet',
      description: 'Quick reference for configuring routers and switches in a network.',
      link: '/downloads/network-setup-cheat-sheet.pdf',
      type: 'PDF',
      image: 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Introduction to Network Security Video',
      description: 'Video tutorial on securing networks against common vulnerabilities.',
      link: 'https://www.youtube.com/watch?v=example123',
      type: 'Video',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Advanced Routing Protocols PDF',
      description: 'Deep dive into OSPF, BGP, and other routing protocols for network engineers.',
      link: '/downloads/routing-protocols.pdf',
      type: 'PDF',
      image: 'https://images.unsplash.com/photo-1506399558188-acca6f8cbf41?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Cloud Networking E-Book',
      description: 'Explore networking in cloud environments like AWS and Azure.',
      link: '/downloads/cloud-networking.pdf',
      type: 'E-Book',
      image: 'https://images.unsplash.com/photo-1516321318423-8f7a5057e6f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Troubleshooting Networks Cheat Sheet',
      description: 'Essential tips for diagnosing and resolving network issues.',
      link: '/downloads/network-troubleshooting.pdf',
      type: 'PDF',
      image: 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Wireless Networking Video',
      description: 'Learn to set up and optimize Wi-Fi networks in this video guide.',
      link: 'https://www.youtube.com/watch?v=example456',
      type: 'Video',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      featured: true,
    },
    {
      title: 'Subnetting Made Easy PDF',
      description: 'Master IP subnetting with this step-by-step guide.',
      link: '/downloads/subnetting-guide.pdf',
      type: 'PDF',
      image: 'https://images.unsplash.com/photo-1506399558188-acca6f8cbf41?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Network Automation E-Book',
      description: 'Introduction to automating network tasks with Python and Ansible.',
      link: '/downloads/network-automation.pdf',
      type: 'E-Book',
      image: 'https://images.unsplash.com/photo-1516321318423-8f7a5057e6f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
  ];

  // Unique categories for filtering
  const categories = ['all', ...new Set(resources.map((res) => res.type))];

  // Filter resources based on active category
  const filteredResources =
    activeCategory === 'all'
      ? resources
      : resources.filter((res) => res.type === activeCategory);

  return (
    <section className="min-h-screen bg-gray-50 py-24 px-4 md:px-10 font-sans">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-teal-700 text-center mb-6 animate-fade-in-down">
          📚 Free Networking Resources
        </h1>
        <p className="text-center mb-10 text-lg text-gray-600 max-w-2xl mx-auto animate-fade-in-up">
          Dive into our collection of free PDFs, e-books, and videos to master networking skills. Filter by category to explore!
        </p>

        {/* Category Filter */}
        <div className="mb-8 flex justify-center gap-4 flex-wrap animate-fade-in">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full font-medium transition transform hover:scale-105 ${
                activeCategory === category
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Resources Grid */}
        {filteredResources.length === 0 ? (
          <p className="text-center text-gray-500 animate-fade-in">
            No resources found for this category.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((res, index) => (
              <div
                key={index}
                className={`bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1 animate-fade-in-up ${
                  res.featured ? 'lg:col-span-2' : ''
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col md:flex-row">
                  <img
                    src={res.image}
                    alt={res.title}
                    className="w-full md:w-1/3 h-48 object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                  />
                  <div className="p-6 flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {res.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                      {res.description}
                    </p>
                    <div className="flex items-center gap-4">
                      <span
                        className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800"
                      >
                        {res.type}
                      </span>
                      <a
                        href={res.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition transform hover:scale-105"
                      >
                        {res.type === 'Video' ? 'Watch Now' : 'Download'}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FreeResourcesPage;