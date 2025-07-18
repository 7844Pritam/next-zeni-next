'use client';
import React, { useState, useEffect } from 'react';
import { db, storage } from '../../../../firebase';
import { doc, getDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { useParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

// Dynamically import MDEditor to prevent SSR issues
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

const EditBlog = () => {
  const { blogId } = useParams();
  const router = useRouter();

  const [blog, setBlog] = useState({
    title: '',
    subtitle: '',
    content: '',
    image: '',
    updatedAt: null,
  });

  const [newImage, setNewImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const blogDoc = await getDoc(doc(db, 'blogs', blogId));
        if (blogDoc.exists()) {
          const blogData = blogDoc.data();
          setBlog(blogData);
          setImagePreview(blogData.image || '');
        }
      } catch (error) {
        console.error('Error fetching blog: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [blogId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleImageUpload = async (file) => {
    const imageRef = ref(storage, `images/${uuidv4()}_${file.name}`);
    const uploadTask = uploadBytesResumable(imageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        null,
        (error) => reject(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(resolve).catch(reject);
        }
      );
    });
  };

  const handlePublish = async () => {
    try {
      setLoading(true);
      let imageUrl = blog.image;

      if (newImage instanceof File) {
        imageUrl = await handleImageUpload(newImage);
      }

      const updatedBlog = {
        ...blog,
        image: imageUrl,
        updatedAt: Timestamp.now(),
      };

      await updateDoc(doc(db, 'blogs', blogId), updatedBlog);
      alert('Blog updated successfully!');
      router.push('/admin');
    } catch (error) {
      console.error('Error updating blog: ', error);
      alert('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 mx-auto text-black bg-white min-h-screen">
      {loading ? (
        <p>Loading blog...</p>
      ) : (
        <div>
          <h1 className="mb-6 text-3xl font-semibold text-center">Edit Blog</h1>

          <div className="mb-6">
            <label className="block text-lg">Title</label>
            <input
              type="text"
              value={blog.title}
              onChange={(e) => setBlog({ ...blog, title: e.target.value })}
              className="w-full p-2 mt-2 bg-white border border-gray-300 rounded-lg"
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg">Subtitle</label>
            <input
              type="text"
              value={blog.subtitle}
              onChange={(e) => setBlog({ ...blog, subtitle: e.target.value })}
              className="w-full p-2 mt-2 bg-white border border-gray-300 rounded-lg"
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 mt-2 bg-white border border-gray-300 rounded-lg"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Blog Preview"
                className="w-full h-48 mt-4 rounded-lg object-cover"
              />
            )}
          </div>

          <div className="mb-6">
            <label className="block text-lg mb-2">Content (Markdown)</label>
            <div data-color-mode="dark">
              <MDEditor
                value={blog.content}
                onChange={(value) => setBlog({ ...blog, content: value || '' })}
                height={400}
              />
            </div>
          </div>

          {blog.updatedAt && (
            <div className="mb-4 text-sm text-gray-400">
              Last updated:{" "}
              {new Date(blog.updatedAt?.seconds * 1000).toLocaleString()}
            </div>
          )}

          <button
            onClick={handlePublish}
            className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      )}
    </div>
  );
};

export default EditBlog;
