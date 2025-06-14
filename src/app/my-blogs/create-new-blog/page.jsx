'use client';

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { doc, setDoc, getDoc, updateDoc, collection, addDoc } from "firebase/firestore";
import { db, auth } from '../../firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useParams } from "next/navigation";
import MDEditor from "@uiw/react-md-editor";
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

const AddBlogs = () => {
  const { blogId } = useParams();

  const [title, setTitle] = useState("");
  const [subtitle, setSubTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (blogId) {
      setLoading(true);
      const fetchBlogData = async () => {
        const blogDoc = await getDoc(doc(db, "blogs", blogId));
        if (blogDoc.exists()) {
          const blogData = blogDoc.data();
          setTitle(blogData.title);
          setSubTitle(blogData.subtitle);
          setContent(blogData.content);
          setImagePreview(blogData.image || "");
        }
        setLoading(false);
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
      alert("User not authenticated");
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
        createdAt: new Date(),
      };

      if (blogId) {
        await updateDoc(doc(db, "blogs", blogId), blogData);
        alert("Blog updated successfully!");
      } else {
        await addDoc(collection(db, "blogs"), blogData);
        alert("Blog created successfully!");
      }

      // You may need to use useRouter() instead of navigate
      // router.push("/admin/all-blogs");
    } catch (error) {
      console.error("Error publishing blog: ", error);
    }
    setLoading(false);
  };

  return (
    <div className="p-6 py-12 mx-auto text-white bg-black border border-gray-500 rounded-lg">
      <h1 className="mb-6 text-3xl font-semibold text-center">
        {blogId ? "Edit Blog Post" : "Create a New Blog Post"}
      </h1>

      <div className="mb-4">
        <label className="block text-lg font-semibold text-gray-700">Blog Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 mt-2 bg-black border border-gray-300 rounded-lg"
          placeholder="Enter the title of your blog"
        />
      </div>
      <div className="mb-4">
        <label className="block text-lg font-semibold text-gray-700">Blog short description</label>
        <input
          type="text"
          value={subtitle}
          onChange={(e) => setSubTitle(e.target.value)}
          className="w-full px-4 py-2 mt-2 bg-black border border-gray-300 rounded-lg"
          placeholder="Enter the subtitle of your blog"
        />
      </div>

      <div className="mb-4">
        <label className="block text-lg font-semibold text-gray-700">Blog Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full px-4 py-2 mt-2 bg-black border border-gray-300 rounded-lg"
        />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Blog Preview"
            className="w-full h-48 mt-2 rounded-lg object-cover"
          />
        )}
      </div>

      <div className="mb-6">
        <label className="block mb-2 text-lg font-semibold text-gray-700">Blog Content (Markdown)</label>
        <div className="bg-white text-black rounded-lg overflow-hidden">
          <MDEditor value={content} onChange={setContent} height={400} />
        </div>
      </div>

      <button
        onClick={handlePublish}
        className="px-6 py-2 mb-4 text-white transition bg-blue-500 rounded-lg hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? "Publishing..." : "Publish"}
      </button>
    </div>
  );
};

export default AddBlogs;
