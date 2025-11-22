'use client'
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Calendar, User } from "lucide-react";
import { motion } from "framer-motion";

const ShowBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "blogs"));
        const blogsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogs(blogsData);
      } catch (err) {
        setError("Error fetching blogs: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
    </div>
  );

  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (blogs.length === 0) return <div className="text-center py-10 text-gray-500">No blogs available yet.</div>;

  return (
    <section className="py-16 bg-gray-50" id="blogs">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-Libre font-bold text-gray-800 mb-4">
            Latest Insights
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore our latest articles on communication, soft skills, and career growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={blog.image || "/images/blog-placeholder.jpg"}
                  alt={blog.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                  <span className="flex items-center gap-1 bg-teal-50 text-teal-700 px-2 py-1 rounded-full">
                    <Calendar size={12} />
                    {blog.createdAt?.seconds
                      ? new Date(blog.createdAt.seconds * 1000).toLocaleDateString()
                      : "Recently"}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-teal-600 transition-colors">
                  {blog.title}
                </h3>

                <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">
                  {blog.subtitle || "Click to read more about this interesting topic..."}
                </p>

                <div className="mt-auto pt-4 border-t border-gray-100">
                  <Link
                    href={`/blog-details/${blog.id}`}
                    className="inline-flex items-center gap-2 text-teal-600 font-semibold text-sm hover:gap-3 transition-all"
                  >
                    Read Article <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShowBlogs;
