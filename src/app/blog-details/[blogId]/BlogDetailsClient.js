'use client';

import React, { useEffect, useState } from "react";
import { db } from "../../../app/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Link as LinkIcon,
  Calendar,
  Clock,
  Share2,
  ArrowLeft,
  CheckCircle
} from "lucide-react";
import Link from "next/link";
import MarkdownPreview from '@uiw/react-markdown-preview';
import { motion } from "framer-motion";

const formatTimestamp = (timestamp) => {
  if (!timestamp) return "N/A";
  const date = timestamp.seconds
    ? new Date(timestamp.seconds * 1000)
    : new Date(timestamp);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const BlogDetailsClient = ({ blogId }) => {
  const [blog, setBlog] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const blogDoc = await getDoc(doc(db, "blogs", blogId));
        const blogsSnapshot = await getDocs(collection(db, "blogs"));

        if (blogDoc.exists()) {
          const data = blogDoc.data();
          setBlog({
            title: data.title || "Untitled",
            subtitle: data.subtitle || "",
            content: data.content || "",
            image: data.image || "",
            bullets: Array.isArray(data.bullets) ? data.bullets : [],
            createdAt: data.createdAt || null,
          });
        } else {
          setError("Blog not found");
        }

        const blogsList = blogsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogs(blogsList);
      } catch (err) {
        setError("Error fetching blog: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    if (blogId) fetchBlogData();
  }, [blogId]);

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const contentContainer = document.querySelector(".content-container");
      if (!contentContainer) return;

      const totalHeight = contentContainer.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;
      const progressPercentage = Math.min((scrollPosition / totalHeight) * 100, 100);
      setProgress(progressPercentage);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [blog]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(blog?.title || "Check this out!")}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
    </div>
  );

  if (error) return <div className="text-center text-red-500 py-20 text-xl">{error}</div>;

  return (
    <div className="bg-white pt-18 min-h-screen font-sans">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-50 bg-gray-100">
        <div
          className="h-full bg-gradient-to-r from-teal-500 to-orange-500 transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Hero Section */}
      <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh]">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img
          src={blog.image || "/images/blog-placeholder.jpg"}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-end py-12 md:pb-20 container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >


            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight font-Libre">
              {blog.title}
            </h1>

            {blog.subtitle && (
              <p className="text-lg md:text-xl text-gray-200 mb-6 max-w-2xl font-light leading-relaxed">
                {blog.subtitle}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-6 text-white/90 text-sm font-medium">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                {formatTimestamp(blog.createdAt)}
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                5 min read
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12 flex flex-col lg:flex-row gap-12">
        {/* Main Content */}
        <main className="flex-1 max-w-4xl">
          {/* Share Bar */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-6 mb-8">
            <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
              <Share2 size={16} /> Share this article
            </div>
            <div className="flex gap-3">
              <SocialShareButton icon={<Facebook size={18} />} url={shareLinks.facebook} color="hover:text-blue-600" />
              <SocialShareButton icon={<Twitter size={18} />} url={shareLinks.twitter} color="hover:text-sky-500" />
              <SocialShareButton icon={<Linkedin size={18} />} url={shareLinks.linkedin} color="hover:text-blue-700" />
              <button
                onClick={handleCopyLink}
                className="p-2 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors relative"
                title="Copy Link"
              >
                <LinkIcon size={18} />
                {copied && (
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded">
                    Copied!
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Markdown Content */}
          <div className="prose prose-lg prose-teal max-w-none content-container font-serif text-gray-800 leading-loose">
            <MarkdownPreview
              source={blog.content}
              wrapperElement={{ 'data-color-mode': 'light' }}
              style={{
                backgroundColor: 'transparent',
                color: '#1f2937',
                fontSize: '1.125rem',
                lineHeight: '1.8',
              }}
            />
          </div>

          {/* Key Points */}
          {blog.bullets?.length > 0 && (
            <div className="mt-12 bg-teal-50 rounded-2xl p-8 border border-teal-100">
              <h3 className="text-xl font-bold text-teal-900 mb-6 flex items-center gap-2">
                <CheckCircle className="text-teal-600" /> Key Takeaways
              </h3>
              <ul className="space-y-4">
                {blog.bullets.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-teal-800">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-teal-500 flex-shrink-0" />
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </main>

        {/* Sidebar */}
        <aside className="lg:w-80 space-y-8">
          <div className="sticky top-24">
            <h3 className="text-lg font-bold text-gray-900 mb-6 border-l-4 border-teal-500 pl-3">
              More to Read
            </h3>
            <div className="flex flex-col gap-6">
              {blogs
                .filter((b) => b.id !== blogId)
                .slice(0, 4)
                .map((b) => (
                  <Link
                    key={b.id}
                    href={`/blog-details/${b.id}`}
                    className="group flex gap-4 items-start"
                  >
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                      <img
                        src={b.image || "/images/blog-placeholder.jpg"}
                        alt={b.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 group-hover:text-teal-600 transition-colors line-clamp-2 text-sm mb-1">
                        {b.title}
                      </h4>
                      <span className="text-xs text-gray-500">
                        {b.createdAt?.seconds
                          ? new Date(b.createdAt.seconds * 1000).toLocaleDateString()
                          : "Recently"}
                      </span>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

const SocialShareButton = ({ icon, url, color }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className={`p-2 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors ${color}`}
  >
    {icon}
  </a>
);

export default BlogDetailsClient;