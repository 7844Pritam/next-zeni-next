'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { auth, db, storage } from '../firebase';
import {
  doc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useRouter } from 'next/navigation';
import {
  User,
  Mail,
  Phone,
  Calendar,
  Edit2,
  Camera,
  LogOut,
  CheckCircle,
  X,
  PenTool,
  Loader2,
  Shield
} from 'lucide-react';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import {
  setEditMode,
  setProfileImage,
  setShowPopup,
  setMobileNumber,
  setWriterRequest,
  getUserProfile,
  updateUserProfile,
} from '../redux/user/userActions';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProfilePage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    profile,
    loading,
    editMode,
    profileImage,
    showPopup,
    mobileNumber,
    writerRequest,
  } = useSelector((state) => state.user);

  const user = useSelector((state) => state.auth.user);

  const dummyProfile = {
    name: 'John Doe',
    bio: 'Aspiring blog writer.',
    createdAt: new Date(),
    profileImage: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  };

  const dummyUser = {
    email: 'noemail@example.com',
    uid: 'dummyuid',
    displayName: 'Guest',
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        router.push('/auth/login');
        return;
      }

      dispatch(getUserProfile(firebaseUser.uid));

      try {
        const requestQuery = query(
          collection(db, 'writerRequests'),
          where('userId', '==', firebaseUser.uid)
        );
        const requestSnap = await getDocs(requestQuery);
        if (!requestSnap.empty) {
          dispatch(setWriterRequest(requestSnap.docs[0].data()));
        }
      } catch (error) {
        console.error('Error fetching writer request:', error);
      }
    });

    return () => unsubscribe();
  }, [dispatch, router]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = profile?.profileImage || dummyProfile.profileImage;

      if (profileImage && user?.uid) {
        const storageRef = ref(storage, `profileImages/${user.uid}`);
        await uploadBytes(storageRef, profileImage);
        imageUrl = await getDownloadURL(storageRef);
      }

      const updatedData = {
        ...(profile || dummyProfile),
        profileImage: imageUrl,
        updatedAt: new Date(),
      };

      if (user?.uid) {
        await updateDoc(doc(db, 'users', user.uid), updatedData);
        dispatch(updateUserProfile(user.uid, updatedData));
        dispatch(setEditMode(false));
        alert('Profile updated successfully!');
      } else {
        throw new Error('User not authenticated');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile.');
    }
  };

  const handleWriterRequest = async (e) => {
    e.preventDefault();
    try {
      const requestData = {
        userId: user?.uid || dummyUser.uid,
        name: profile?.name || user?.displayName || dummyProfile.name,
        email: user?.email || dummyUser.email,
        mobileNumber,
        status: 'pending',
        createdAt: new Date(),
      };

      const docRef = doc(collection(db, 'writerRequests'));
      await setDoc(docRef, requestData);

      dispatch(setWriterRequest(requestData));
      dispatch(setShowPopup(false));
      alert('Writer request submitted successfully!');
    } catch (error) {
      console.error('Error submitting writer request:', error);
      alert('Failed to submit writer request.');
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      dispatch(setProfileImage(e.target.files[0]));
    }
  };

  const formatTimestamp = (timestamp) => {
    if (timestamp?.toDate) {
      return timestamp.toDate().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    } else if (timestamp?.seconds) {
      return new Date(timestamp.seconds * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    } else if (timestamp instanceof Date) {
      return timestamp.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    }
    return 'Unknown';
  };

  const finalProfile = profile || dummyProfile;
  const currentUser = user || dummyUser;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 text-teal-600 animate-spin" />
          <p className="text-gray-500 font-medium">Loading Profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 font-Libre">My Profile</h1>
          <p className="text-gray-500 mt-1">Manage your account settings and preferences.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-teal-500 to-teal-700"></div>

              <div className="relative mt-8 mb-4">
                <div className="relative inline-block">
                  <div className="w-32 h-32 rounded-full border-4 border-white shadow-md overflow-hidden mx-auto bg-gray-100">
                    <Image
                      src={editMode && profileImage ? URL.createObjectURL(profileImage) : finalProfile.profileImage || dummyProfile.profileImage}
                      alt="Profile"
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {editMode && (
                    <label className="absolute bottom-0 right-0 bg-teal-600 text-white p-2 rounded-full cursor-pointer hover:bg-teal-700 transition-colors shadow-sm">
                      <Camera size={16} />
                      <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                    </label>
                  )}
                </div>
              </div>

              <h2 className="text-xl font-bold text-gray-900">{finalProfile.name}</h2>
              <p className="text-gray-500 text-sm mb-6">{currentUser.email}</p>

              <div className="flex justify-center gap-3 mb-6">
                {!editMode ? (
                  <button
                    onClick={() => dispatch(setEditMode(true))}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                  >
                    <Edit2 size={16} /> Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleProfileUpdate}
                      className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium"
                    >
                      <CheckCircle size={16} /> Save
                    </button>
                    <button
                      onClick={() => {
                        dispatch(setEditMode(false));
                        dispatch(setProfileImage(null));
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                    >
                      <X size={16} /> Cancel
                    </button>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-100 pt-6 text-left">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                  <span className="flex items-center gap-2"><Calendar size={16} /> Joined</span>
                  <span className="font-medium text-gray-900">{formatTimestamp(finalProfile.createdAt)}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span className="flex items-center gap-2"><Shield size={16} /> Role</span>
                  <span className="font-medium text-teal-600 bg-teal-50 px-2 py-0.5 rounded text-xs">
                    {finalProfile.whoIs || 'Student'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Details & Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bio Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <User size={20} className="text-teal-600" /> About Me
              </h3>
              {editMode ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={finalProfile.name}
                      onChange={(e) => dispatch(updateUserProfile(currentUser.uid, { name: e.target.value }))}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                    <textarea
                      value={finalProfile.bio}
                      onChange={(e) => dispatch(updateUserProfile(currentUser.uid, { bio: e.target.value }))}
                      rows="4"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all resize-none"
                    ></textarea>
                  </div>
                </div>
              ) : (
                <p className="text-gray-600 leading-relaxed">
                  {finalProfile.bio || "No bio added yet. Click edit to tell us about yourself!"}
                </p>
              )}
            </div>

            {/* Writer Status / Request */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <PenTool size={20} className="text-teal-600" /> Content Creation
              </h3>

              {finalProfile.whoIs === 'Blog Writer' || (writerRequest && writerRequest.status === 'confirmed') ? (
                <div className="flex items-center justify-between bg-green-50 p-4 rounded-xl border border-green-100">
                  <div>
                    <h4 className="font-bold text-green-800">You are a Verified Writer</h4>
                    <p className="text-sm text-green-600">Start sharing your knowledge with the world.</p>
                  </div>
                  <button
                    onClick={() => router.push('/my-blogs')}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium shadow-sm"
                  >
                    Go to Dashboard
                  </button>
                </div>
              ) : writerRequest && writerRequest.status === 'pending' ? (
                <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 flex items-center gap-3">
                  <Loader2 className="text-orange-500 animate-spin" size={24} />
                  <div>
                    <h4 className="font-bold text-orange-800">Request Pending</h4>
                    <p className="text-sm text-orange-600">Your request to become a writer is under review.</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <div>
                    <h4 className="font-bold text-gray-800">Become a Writer</h4>
                    <p className="text-sm text-gray-600">Share your expertise and grow your audience.</p>
                  </div>
                  <button
                    onClick={() => dispatch(setShowPopup(true))}
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium shadow-sm"
                  >
                    Apply Now
                  </button>
                </div>
              )}
            </div>

            {/* Account Actions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Shield size={20} className="text-teal-600" /> Account Settings
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><Mail size={18} /></div>
                    <div>
                      <p className="font-medium text-gray-900">Email Address</p>
                      <p className="text-xs text-gray-500">{currentUser.email}</p>
                    </div>
                  </div>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">Verified</span>
                </div>

                <button
                  onClick={() => auth.signOut().then(() => router.push('/'))}
                  className="w-full flex items-center gap-3 p-3 hover:bg-red-50 rounded-lg transition-colors text-left group"
                >
                  <div className="bg-red-100 p-2 rounded-lg text-red-600 group-hover:bg-red-200 transition-colors"><LogOut size={18} /></div>
                  <div>
                    <p className="font-medium text-red-600">Sign Out</p>
                    <p className="text-xs text-red-400">Securely log out of your account</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Writer Request Modal */}
      <AnimatePresence>
        {showPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Become a Writer</h2>
                <button
                  onClick={() => dispatch(setShowPopup(false))}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleWriterRequest} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={finalProfile.name || currentUser.displayName}
                    disabled
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={currentUser.email}
                    disabled
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    value={mobileNumber || ''}
                    onChange={(e) => dispatch(setMobileNumber(e.target.value))}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-teal-600 text-white font-semibold py-2.5 rounded-lg hover:bg-teal-700 transition-colors shadow-sm"
                  >
                    Submit Request
                  </button>
                  <button
                    type="button"
                    onClick={() => dispatch(setShowPopup(false))}
                    className="flex-1 bg-gray-100 text-gray-700 font-semibold py-2.5 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}