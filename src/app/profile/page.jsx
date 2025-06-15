'use client';

import { useEffect, useState } from 'react';
import { auth, db, storage } from '../firebase';
import {
  doc,
  getDoc,
  updateDoc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useRouter } from 'next/navigation';
import { PencilIcon, PlusIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [firestoreUser, setFirestoreUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [writerRequest, setWriterRequest] = useState(null);
  const [mobileNumber, setMobileNumber] = useState('');
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setLoading(false);
        router.push('/loginscreen');
        return;
      }

      setUser(firebaseUser);

      try {
        const userRef = doc(db, 'users', firebaseUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          setFirestoreUser(userData);
          setProfileData(userData);
        }

        const requestQuery = query(
          collection(db, 'writerRequests'),
          where('userId', '==', firebaseUser.uid)
        );
        const requestSnap = await getDocs(requestQuery);
        if (!requestSnap.empty) {
          setWriterRequest(requestSnap.docs[0].data());
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const userRef = doc(db, 'users', user.uid);
      let imageUrl = firestoreUser?.profileImage;

      if (profileImage) {
        const storageRef = ref(storage, `profileImages/${user.uid}`);
        await uploadBytes(storageRef, profileImage);
        imageUrl = await getDownloadURL(storageRef);
      }

      const updatedData = {
        ...profileData,
        profileImage: imageUrl,
        updatedAt: new Date(),
      };

      await updateDoc(userRef, updatedData);
      setFirestoreUser(updatedData);
      setEditMode(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile.');
    }
  };

  const handleWriterRequest = async (e) => {
    e.preventDefault();
    try {
      const requestRef = doc(collection(db, 'writerRequests'));
      const requestData = {
        userId: user.uid,
        name: firestoreUser?.name || user.displayName || 'Unknown',
        email: user.email,
        mobileNumber,
        status: 'pending',
        createdAt: new Date(),
      };
      await setDoc(requestRef, requestData);
      setWriterRequest(requestData);
      setShowPopup(false);
      alert('Writer request submitted successfully!');
    } catch (error) {
      console.error('Error submitting writer request:', error);
      alert('Failed to submit writer request.');
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const formatTimestamp = (timestamp) => {
    if (timestamp?.toDate) {
      return timestamp.toDate().toLocaleString();
    } else if (timestamp?.seconds) {
      return new Date(timestamp.seconds * 1000).toLocaleString();
    }
    return 'Unknown';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-teal-50">
        <p className="text-teal-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-teal-50 p-6">
      {/* Profile Section */}
      <section id="profile" className="mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-teal-500">Profile</h2>
          {editMode ? (
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div className="flex justify-center">
                <label htmlFor="profileImage" className="cursor-pointer">
                  <Image
                    src={
                      profileImage
                        ? URL.createObjectURL(profileImage)
                        : firestoreUser?.profileImage || '/default-profile.png'
                    }
                    alt="Profile"
                    width={100}
                    height={100}
                    className="rounded-full"
                  />
                  <input
                    id="profileImage"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
              <div>
                <label className="text-gray-600 font-medium">Name:</label>
                <input
                  type="text"
                  value={profileData.name || ''}
                  onChange={(e) =>
                    setProfileData({ ...profileData, name: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="text-gray-600 font-medium">Bio:</label>
                <textarea
                  value={profileData.bio || ''}
                  onChange={(e) =>
                    setProfileData({ ...profileData, bio: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-center">
                <Image
                  src={firestoreUser?.profileImage || '/default-profile.png'}
                  alt="Profile"
                  width={100}
                  height={100}
                  className="rounded-full"
                />
              </div>
              <div>
                <p className="text-gray-600 font-medium">Email:</p>
                <p className="text-lg">{user.email}</p>
              </div>
              <div>
                <p className="text-gray-600 font-medium">Name:</p>
                <p className="text-lg">{firestoreUser?.name || 'Not set'}</p>
              </div>
              <div>
                <p className="text-gray-600 font-medium">Bio:</p>
                <p className="text-lg">
                  {firestoreUser?.bio || 'No bio provided'}
                </p>
              </div>
              <div>
                <p className="text-gray-600 font-medium">Role:</p>
                <p className="text-lg">{firestoreUser?.whoIs || 'Student'}</p>
              </div>
              <div>
                <p className="text-gray-600 font-medium">Account Created:</p>
                <p className="text-lg">
                  {formatTimestamp(firestoreUser?.createdAt)}
                </p>
                <button
                  onClick={() => setEditMode(true)}
                  className="mt-2 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 flex items-center"
                >
                  <PencilIcon className="h-4 w-4 mr-2" /> Edit Profile
                </button>
              </div>
              {firestoreUser?.whoIs !== 'Blog Writer' && !writerRequest && (
                <button
                  onClick={() => router.push('/my-blogs')}
                  className="mt-4 bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 flex items-center"
                >
                  <PlusIcon className="h-5 w-5 mr-2" /> Become a Blog Writer
                </button>
              )}
              {writerRequest && writerRequest.status === 'pending' && (
                <p className="mt-4 text-orange-500 font-medium">
                  Your request to become a blog writer is pending.
                </p>
              )}

              {writerRequest && writerRequest.status === 'confirmed' && (
                <button
                  onClick={() => router.push('/my-blogs')}
                  className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Create Blog
                </button>
              )}

            </div>
          )}
        </div>
      </section>

      {/* Popup for Writer Request */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-md max-w-md w-full">
            <h2 className="text-xl font-bold mb-4 text-teal-500">
              Become a Blog Writer
            </h2>
            <form onSubmit={handleWriterRequest} className="space-y-4">
              <div>
                <label className="text-gray-600 font-medium">Name:</label>
                <input
                  type="text"
                  value={firestoreUser?.name || user.displayName || ''}
                  disabled
                  className="w-full p-2 border rounded bg-gray-100"
                />
              </div>
              <div>
                <label className="text-gray-600 font-medium">Email:</label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full p-2 border rounded bg-gray-100"
                />
              </div>
              <div>
                <label className="text-gray-600 font-medium">
                  Mobile Number:
                </label>
                <input
                  type="tel"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  required
                  className="w-full p-2 border rounded"
                  placeholder="Enter your mobile number"
                />
              </div>
              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                >
                  Request
                </button>
                <button
                  type="button"
                  onClick={() => setShowPopup(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
