'use client';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApprovedResources, addResource } from '../redux/resources/resourceActions';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ExternalLink, Plus, X, Search, FileText, Video, BookOpen } from 'lucide-react';

const FreeResourcesPage = () => {
  const dispatch = useDispatch();
  const { resources, loading } = useSelector((state) => state.resources);
  const { user } = useSelector((state) => state.auth);

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    link: '',
    type: 'PDF',
    category: 'Networking',
    image: '',
  });

  useEffect(() => {
    dispatch(fetchApprovedResources());
  }, [dispatch]);

  const categories = ['all', 'PDF', 'E-Book', 'Video', 'Article'];
  const resourceTypes = ['PDF', 'E-Book', 'Video', 'Article'];
  const resourceCategories = ['Networking', 'Cybersecurity', 'Cloud Computing', 'Programming', 'Soft Skills', 'Other'];

  const filteredResources = resources.filter((res) => {
    const matchesCategory = activeCategory === 'all' || res.type === activeCategory;
    const matchesSearch = res.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addResource({
        ...formData,
        createdBy: user.uid,
        authorName: user.displayName || 'Anonymous',
      }));
      setIsModalOpen(false);
      setFormData({
        title: '',
        description: '',
        link: '',
        type: 'PDF',
        category: 'Networking',
        image: '',
      });
      alert('Resource submitted successfully! It will appear after admin approval.');
    } catch (error) {
      alert('Failed to submit resource: ' + error.message);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'PDF': return <FileText size={20} />;
      case 'Video': return <Video size={20} />;
      case 'E-Book': return <BookOpen size={20} />;
      default: return <ExternalLink size={20} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-teal-800 font-Libre mb-4">
            Free Learning Resources
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Access our curated collection of free PDFs, e-books, and videos to boost your skills.
          </p>

          {user && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-6 inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-full font-medium hover:bg-orange-600 transition-colors shadow-md"
            >
              <Plus size={20} /> Add Resource
            </button>
          )}
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === category
                    ? 'bg-teal-600 text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all"
            />
          </div>
        </div>

        {/* Resources Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
          </div>
        ) : filteredResources.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
            <p className="text-gray-500 text-lg">No resources found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.map((res, index) => (
              <motion.div
                key={res.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full group"
              >
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  {res.image ? (
                    <img
                      src={res.image}
                      alt={res.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-teal-50 text-teal-200">
                      <BookOpen size={64} />
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-teal-800 text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                      {getIcon(res.type)} {res.type}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">
                    {res.category}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-teal-600 transition-colors">
                    {res.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">
                    {res.description}
                  </p>

                  <div className="pt-4 mt-auto border-t border-gray-100">
                    <a
                      href={res.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 bg-gray-50 text-gray-700 py-2.5 rounded-lg font-medium hover:bg-teal-600 hover:text-white transition-all duration-300"
                    >
                      {res.type === 'Video' ? 'Watch Now' : 'Download / View'}
                      {res.type === 'Video' ? <Video size={16} /> : <Download size={16} />}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Add Resource Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h2 className="text-xl font-bold text-gray-800">Add New Resource</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                    placeholder="e.g., Networking Fundamentals"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    required
                    rows="3"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Brief description of the resource..."
                  ></textarea>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                    >
                      {resourceTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                    >
                      {resourceCategories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Resource Link</label>
                  <input
                    type="url"
                    name="link"
                    required
                    value={formData.link}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL (Optional)</label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                    placeholder="https://..."
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-teal-600 text-white font-semibold py-3 rounded-lg hover:bg-teal-700 transition-colors shadow-md"
                  >
                    Submit Resource
                  </button>
                  <p className="text-xs text-gray-500 text-center mt-2">
                    Your resource will be reviewed by an admin before appearing on the page.
                  </p>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FreeResourcesPage;