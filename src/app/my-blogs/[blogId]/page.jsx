
'use client'
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
    FaFacebookF,
    FaTwitter,
    FaWhatsapp,
    FaLinkedinIn,
    FaInstagram,
    FaLink
} from "react-icons/fa";

const BlogPage = () => {
    const { blogId } = useParams();
    const [blog, setBlog] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [copied, setCopied] = useState(false);
    const [currentUrl, setCurrentUrl] = useState(""); // Manage URL state

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
                    setBlog(blogDoc.data());
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

        fetchBlogData();
    }, [blogId]);

    // Tooltip behavior for links inside blog content
    useEffect(() => {
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
        instagram: `https://www.instagram.com/`, // Instagram doesn't support direct share
    };

    const formatTimestamp = (timestamp) => {
        if (!timestamp) return "N/A";
        const date = timestamp?.seconds ? new Date(timestamp.seconds * 1000) : new Date(timestamp);
        return date.toLocaleString();
    };

    if (loading) return <div className="text-center py-8">Loading blog...</div>;
    if (error) return <div className="text-center text-red-500 py-8">{error}</div>;

    return (
        <div className="flex flex-col lg:flex-row max-w-7xl mx-auto px-4 pt-8 text-black">
            {/* Blog Main Section */}
            <div className="flex-1 lg:pr-8">
                <h1 className="mb-4 text-3xl font-bold text-primary">{blog.title}</h1>
                <div className="mb-3 text-xl bg-slate-300 rounded-sm p-4 font-serif text-black">
                    {blog.subtitle}
                </div>

                {/* Timestamps */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-white border rounded-xl p-4 shadow-sm mb-4">

                    {/* Time Info */}
                    <div className="text-gray-500 flex-col text-sm space-y-1 flex items-start gap-2">
                        <div className="flex items-center gap-1">
                            <span className="font-semibold">🗓 Published:</span>
                            <span>{formatTimestamp(blog.createdAt)}</span>
                        </div>
                    </div>

                    {/* Social Icons */}
                    <div className="flex flex-wrap items-center gap-3 mt-3 md:mt-0">
                        <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" title="Share on Facebook"
                            className="rounded-full bg-blue-100 hover:bg-blue-200 p-2 transition">
                            <FaFacebookF className="text-blue-600 text-lg" />
                        </a>
                        <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" title="Share on Twitter"
                            className="rounded-full bg-blue-100 hover:bg-blue-200 p-2 transition">
                            <FaTwitter className="text-blue-400 text-lg" />
                        </a>
                        <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer" title="Share on WhatsApp"
                            className="rounded-full bg-green-100 hover:bg-green-200 p-2 transition">
                            <FaWhatsapp className="text-green-500 text-lg" />
                        </a>
                        <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" title="Share on LinkedIn"
                            className="rounded-full bg-blue-100 hover:bg-blue-200 p-2 transition">
                            <FaLinkedinIn className="text-blue-700 text-lg" />
                        </a>
                        <a href={shareLinks.instagram} target="_blank" rel="noopener noreferrer" title="Share on Instagram"
                            className="rounded-full bg-pink-100 hover:bg-pink-200 p-2 transition">
                            <FaInstagram className="text-pink-500 text-lg" />
                        </a>
                        <button onClick={handleCopyLink} title="Copy Link"
                            className="rounded-full bg-gray-200 hover:bg-gray-300 p-2 transition">
                            <FaLink className="text-gray-600 text-lg" />
                        </button>
                        {copied && <span className="text-sm text-green-600 ml-2">Link copied!</span>}
                    </div>
                </div>

                {/* Blog Image */}
                <div className="mb-4">
                    <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-auto rounded-lg object-contain max-h-[400px]"
                    />
                </div>

                {/* Blog Content */}
                <div
                    className="content-container prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                {/* Bullets Section */}
                {Array.isArray(blog.bullets) && blog.bullets.length > 0 && (
                    <div className="mt-8">
                        <h3 className="text-xl font-semibold mb-2">Key Points</h3>
                        <ul className="list-disc pl-6 space-y-1">
                            {blog.bullets.map((point, idx) => (
                                <li key={idx}>{point}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Follow Us Section */}
                <div className="mt-10 border-t border-gray-400 pt-6">
                    <h3 className="text-2xl font-semibold mb-4">Follow Us On</h3>
                    <div className="flex flex-wrap gap-4">
                        <a
                            href="https://facebook.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                        >
                            <FaFacebookF />
                            <span>Facebook</span>
                        </a>
                        <a
                            href="https://twitter.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition"
                        >
                            <FaTwitter />
                            <span>Twitter</span>
                        </a>
                        <a
                            href="https://www.linkedin.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition"
                        >
                            <FaLinkedinIn />
                            <span>LinkedIn</span>
                        </a>
                        <a
                            href="https://www.instagram.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-yellow-500 text-white rounded-full hover:opacity-90 transition"
                        >
                            <FaInstagram />
                            <span>Instagram</span>
                        </a>
                        <a
                            href="https://wa.me/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
                        >
                            <FaWhatsapp />
                            <span>WhatsApp</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Sidebar for Other Blogs */}
            <div className="lg:w-1/4 overflow-y-auto sticky top-0 h-screen bg-white shadow-md p-4">
                <div className="bg-gray-100 p-4 rounded-md shadow">
                    <h2 className="text-lg font-semibold mb-3">Other Blogs</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        {blogs
                            .filter(b => b.id !== blogId)
                            .map(b => (
                                <li key={b.id}>
                                    <Link href={`/blog/${b.id}`} className="text-blue-700 hover:underline text-sm">
                                        {b.title}
                                    </Link>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default BlogPage;
