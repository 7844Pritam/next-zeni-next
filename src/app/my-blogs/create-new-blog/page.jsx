'use client';

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { doc, setDoc, getDoc, updateDoc, collection, addDoc } from "firebase/firestore";
import { db, auth } from '../../firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, Upload, Image as ImageIcon, Save, ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";

// Dynamically import MDEditor to avoid SSR issues
const MDEditor = dynamic(
  () => import("@uiw/react-md-editor"),
  { ssr: false }
);

import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

const AddBlogs = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const blogId = searchParams.get('id'); // Get ID from query params if editing

  const [title, setTitle] = useState("");
  const [subtitle, setSubTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(!!blogId);

  useEffect(() => {
    if (blogId) {
      const fetchBlogData = async () => {
        try {
          const blogDoc = await getDoc(doc(db, "blogs", blogId));
          if (blogDoc.exists()) {
            const blogData = blogDoc.data();
            setTitle(blogData.title);
            setSubTitle(blogData.subtitle);
            setContent(blogData.content);
            setImagePreview(blogData.image || "");
          }
        } catch (error) {
          console.error("Error fetching blog:", error);
        } finally {
          setFetching(false);
        }
      };
      fetchBlogData();
    }
  }, [blogId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleImageUpload = async (file) => {
    if (!file) return null;
    const storage = getStorage();
    const imageRef = ref(storage, `images/${file.name}-${Date.now()}`);
    const uploadTask = uploadBytesResumable(imageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        null,
        (error) => reject(error),
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
  };

  const handlePublish = async () => {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      alert("Please log in to publish a blog.");
      return;
    }

    if (!title || !content) {
      alert("Title and content are required.");
      return;
    }

    setLoading(true);
    try {
      let imageUrl = imagePreview;
      if (image instanceof File) {
        imageUrl = await handleImageUpload(image);
      }

      const blogData = {
        title,
        subtitle,
        content,
        image: imageUrl,
        userId,
        isApproved: false,
        updatedAt: new Date(),
      };

      if (blogId) {
        await updateDoc(doc(db, "blogs", blogId), blogData);
        alert("Blog updated successfully!");
      } else {
        blogData.createdAt = new Date();
        await addDoc(collection(db, "blogs"), blogData);
        alert("Blog submitted for approval!");
      }

      router.push("/my-blogs");
    } catch (error) {
      console.error("Error publishing blog: ", error);
      alert("Failed to publish blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 text-teal-600 animate-spin" />
          <p className="text-gray-500 font-medium">Loading blog details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link
              href="/my-blogs"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-teal-600 transition-colors mb-2 text-sm font-medium"
            >
              <ArrowLeft size={16} /> Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 font-Libre">
              {blogId ? "Edit Blog Post" : "Create New Blog Post"}
            </h1>
          </div>
          <button
            onClick={handlePublish}
            disabled={loading}
            className="hidden sm:flex items-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-all shadow-md hover:shadow-lg transform active:scale-95 font-medium disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
            {loading ? "Publishing..." : blogId ? "Update Blog" : "Publish Blog"}
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 sm:p-8 space-y-6">
            {/* Title Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Blog Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all text-lg font-medium placeholder-gray-400"
                placeholder="Enter an engaging title..."
              />
            </div>

            {/* Subtitle Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all placeholder-gray-400"
                placeholder="A brief summary of your post..."
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image</label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer relative overflow-hidden group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                {imagePreview ? (
                  <div className="relative w-full h-64 rounded-lg overflow-hidden">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white font-medium flex items-center gap-2">
                        <Upload size={20} /> Change Image
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="py-8">
                    <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ImageIcon size={32} />
                    </div>
                    <p className="text-gray-900 font-medium">Click or drag to upload cover image</p>
                    <p className="text-gray-500 text-sm mt-1">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                  </div>
                )}
              </div>
            </div>

            {/* Markdown Editor */}
            <div data-color-mode="light">
              <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
              <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <MDEditor
                  value={content}
                  onChange={setContent}
                  height={500}
                  preview="edit"
                  className="!border-none"
                />
              </div>
            </div>
          </div>

          {/* Mobile Action Button */}
          <div className="p-4 border-t border-gray-100 sm:hidden bg-gray-50">
            <button
              onClick={handlePublish}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-all font-medium disabled:opacity-70"
            >
              {loading ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
              {loading ? "Publishing..." : blogId ? "Update Blog" : "Publish Blog"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBlogs;
