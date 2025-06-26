'use client';

import React, { useEffect, useState } from "react";
import { db } from "../../../app/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import {
  FaFacebookF,
  FaTwitter,
  FaWhatsapp,
  FaLinkedinIn,
  FaInstagram,
  FaLink,
  FaBook // Added for progress bar icon
} from "react-icons/fa";
import Link from "next/link";
import MarkdownPreview from '@uiw/react-markdown-preview';

const formatTimestamp = (timestamp) => {
  if (!timestamp) return "N/A";
  const date = timestamp.seconds
    ? new Date(timestamp.seconds * 1000)
    : new Date(timestamp);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
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
  const [progress, setProgress] = useState(0); // State for reading progress

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

  useEffect(() => {
    if (!blog) return;
    const contentContainer = document.querySelector(".content-container");
    if (!contentContainer) return;

    const links = contentContainer.querySelectorAll("a");
    links.forEach((link) => {
      if (link.closest(".tooltip-wrapper")) return;
      link.classList.add("text-blue-600", "hover:text-red-600");

      let tooltipText = link.getAttribute("title")?.trim() || link.textContent.trim();
      tooltipText = tooltipText.length > 50 ? tooltipText.slice(0, 50) + "..." : tooltipText;

      const tooltip = document.createElement("div");
      tooltip.textContent = tooltipText;
      tooltip.className =
        "tooltip-box absolute z-10 bg-white border border-gray-300 text-gray-800 p-2 rounded shadow text-sm hidden group-hover:block";
      tooltip.style.top = "100%";
      tooltip.style.left = "0";
      tooltip.style.minWidth = "200px";
      tooltip.style.maxWidth = "300px";

      const wrapper = document.createElement("span");
      wrapper.className = "tooltip-wrapper group relative inline-block";

      link.parentNode.insertBefore(wrapper, link);
      wrapper.appendChild(link);
      wrapper.appendChild(tooltip);
    });
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
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(blog?.title + " " + currentUrl)}`,
    instagram: `https://www.instagram.com/`,
  };

  if (loading) return <div className="text-center py-8">Loading blog...</div>;
  if (error) return <div className="text-center text-red-500 py-8">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pt-30 text-black flex flex-col-reverse lg:flex-row gap-10">
      <div
        className="fixed top-20 left-0 right-0 z-50 h-1 bg-gray-200 flex items-center"
        style={{
          marginLeft: "14px",
          marginRight: "18px",
          display: progress === 0 ? "none" : "flex",
        }}
      >
        <div
          className="bg-orange-400 rounded-full h-full relative transition-all duration-300"
          style={{
            width: `${progress}%`,
          }}
        >
          <div className="absolute -top-2 left-full transform -translate-x-1/2 flex flex-col items-center">
            <div className="w-5 h-5 rounded-full bg-orange-300 blur-sm absolute animate-ping" />
<div className="w-4 h-4 rounded-full z-10 shadow-glow" style={{
  background: 'linear-gradient(to bottom, orange 50%, teal 50%)'
}} />
            <div className="mt-1 text-xs text-white bg-teal-500 px-2 py-0.5 rounded select-none whitespace-nowrap">
              {Math.round(progress)}%
            </div>
          </div>
        </div>
      </div>






      {/* Main Blog Section */}
      <main className="flex-1">
        <h1 className="mb-3 text-3xl font-bold text-primary leading-tight">{blog.title}</h1>
        {blog.subtitle && (
          <div className="mb-4 text-lg border border-gray-300 bg-gray-100 p-3 rounded-md font-serif">
            {blog.subtitle}
          </div>
        )}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 bg-white border rounded-md p-4 shadow-sm">
          <div className="text-sm text-gray-500">
            <span className="font-semibold">🗓 Published:</span> {formatTimestamp(blog.createdAt)}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" title="Facebook" className="bg-blue-100 hover:bg-blue-200 p-2 rounded-full">
              <FaFacebookF className="text-blue-600" />
            </a>
            <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" title="Twitter" className="bg-blue-100 hover:bg-blue-200 p-2 rounded-full">
              <FaTwitter className="text-sky-500" />
            </a>
            <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer" title="WhatsApp" className="bg-green-100 hover:bg-green-200 p-2 rounded-full">
              <FaWhatsapp className="text-green-500" />
            </a>
            <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn" className="bg-blue-100 hover:bg-blue-200 p-2 rounded-full">
              <FaLinkedinIn className="text-blue-700" />
            </a>
            <a href={shareLinks.instagram} target="_blank" rel="noopener noreferrer" title="Instagram" className="bg-pink-100 hover:bg-pink-200 p-2 rounded-full">
              <FaInstagram className="text-pink-500" />
            </a>
            <button onClick={handleCopyLink} title="Copy Link" className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full">
              <FaLink className="text-gray-600" />
            </button>
            {copied && <span className="text-sm text-green-600 ml-2">Copied!</span>}
          </div>
        </div>
        {blog.image && (
          <div className="mb-6">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-auto max-h-[400px] object-cover rounded-lg shadow-sm"
            />
          </div>
        )}
        <div className="prose prose-lg max-w-none content-container">
          <MarkdownPreview
            source={blog.content}
            wrapperElement={{ 'data-color-mode': 'light' }}
            style={{
              backgroundColor: 'white',
              color: 'black',
              padding: '1rem',
              borderRadius: '0.5rem',
            }}
          />
        </div>
        {blog.bullets?.length > 0 && (
          <section className="mt-8">
            <h3 className="text-xl font-semibold mb-2">Key Points</h3>
            <ul className="list-disc list-inside space-y-1">
              {blog.bullets.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </section>
        )}
        <section className="mt-10 border-t border-gray-300 pt-6">
          <h3 className="text-2xl font-semibold mb-4">Follow Us</h3>
          <div className="flex flex-wrap gap-4">
            <SocialButton icon={<FaFacebookF />} label="Facebook" url="https://facebook.com/" color="bg-blue-600" />
            <SocialButton icon={<FaTwitter />} label="Twitter" url="https://twitter.com/" color="bg-sky-500" />
            <SocialButton icon={<FaLinkedinIn />} label="LinkedIn" url="https://www.linkedin.com/" color="bg-blue-700" />
            <SocialButton icon={<FaInstagram />} label="Instagram" url="https://www.instagram.com/" color="bg-gradient-to-r from-pink-500 to-yellow-500" />
            <SocialButton icon={<FaWhatsapp />} label="WhatsApp" url="https://wa.me/" color="bg-green-500" />
          </div>
        </section>
      </main>

      <aside className="hidden lg:block lg:w-1/4">
        <div className="sticky top-24 bg-teal-100 p-4 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-3 text-center">Other Blogs</h2>
          <ul className="list-disc list-inside space-y-2">
            {blogs
              .filter((b) => b.id !== blogId)
              .map((b) => (
                <li key={b.id}>
                  <Link href={`/blog-details/${b.id}`} className="text-blue-700 hover:underline text-sm">
                    {b.title}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </aside>

    </div>
  );
};

const SocialButton = ({ icon, label, url, color }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className={`flex items-center gap-2 px-4 py-2 ${color} text-white rounded-full hover:opacity-90 transition`}
  >
    {icon}
    <span>{label}</span>
  </a>
);

export default BlogDetailsClient;