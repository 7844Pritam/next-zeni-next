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
  FaLink
} from "react-icons/fa";
import Link from "next/link";
import MarkdownPreview from '@uiw/react-markdown-preview';
 const formatTimestamp = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = timestamp?.seconds ? new Date(timestamp.seconds * 1000) : new Date(timestamp);
    return date.toLocaleString();
  };
const BlogDetailsClient = ({ blogId }) => {
  const [blog, setBlog] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

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
const formatTimestamp = (timestamp) => {
  if (!timestamp) return "N/A";
  const date = timestamp.seconds
    ? new Date(timestamp.seconds * 1000) // Firestore Timestamp
    : new Date(timestamp);               // Fallback for string or Date
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
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
   <div className="max-w-7xl mx-auto px-4 py-8 text-black flex flex-col-reverse lg:flex-row gap-10">
  {/* Sidebar for Other Blogs */}
 

  {/* Main Blog Section */}
  <main className="flex-1">
    {/* Blog Title */}
    <h1 className="mb-3 text-3xl font-bold text-primary leading-tight">{blog.title}</h1>
    
    {/* Subtitle */}
    {blog.subtitle && (
      <div className="mb-4 text-lg border border-gray-300 bg-gray-100 p-3 rounded-md font-serif">
        {blog.subtitle}
      </div>
    )}

    {/* Publish Info + Socials */}
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 bg-white border rounded-md p-4 shadow-sm">
    <div className="text-sm text-gray-500">
  <span className="font-semibold">🗓 Published:</span> 12 April, 2025
</div>


      <div className="flex flex-wrap items-center gap-3">
        {/* Social Share Buttons */}
        <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" title="Facebook"
          className="bg-blue-100 hover:bg-blue-200 p-2 rounded-full">
          <FaFacebookF className="text-blue-600" />
        </a>
        <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" title="Twitter"
          className="bg-blue-100 hover:bg-blue-200 p-2 rounded-full">
          <FaTwitter className="text-sky-500" />
        </a>
        <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer" title="WhatsApp"
          className="bg-green-100 hover:bg-green-200 p-2 rounded-full">
          <FaWhatsapp className="text-green-500" />
        </a>
        <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn"
          className="bg-blue-100 hover:bg-blue-200 p-2 rounded-full">
          <FaLinkedinIn className="text-blue-700" />
        </a>
        <a href={shareLinks.instagram} target="_blank" rel="noopener noreferrer" title="Instagram"
          className="bg-pink-100 hover:bg-pink-200 p-2 rounded-full">
          <FaInstagram className="text-pink-500" />
        </a>
        <button onClick={handleCopyLink} title="Copy Link"
          className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full">
          <FaLink className="text-gray-600" />
        </button>
        {copied && <span className="text-sm text-green-600 ml-2">Copied!</span>}
      </div>
    </div>

    {/* Blog Image */}
    {blog.image && (
      <div className="mb-6">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-auto max-h-[400px] object-cover rounded-lg shadow-sm"
        />
      </div>
    )}

    {/* Blog Markdown Content */}
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

    {/* Bullet Points */}
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

    {/* Follow Us Section */}
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
        .filter(b => b.id !== blogId)
        .map(b => (
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

export default BlogDetailsClient;



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
