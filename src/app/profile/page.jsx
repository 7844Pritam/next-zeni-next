'use client';

export const dynamic = 'force-dynamic';

import { useEffect } from 'react';
import { auth, db, storage } from '../firebase';
import {
  doc,
  updateDoc,
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

  // Dummy fallback data
  const dummyProfile = {
    name: 'John Doe',
    bio: 'Aspiring blog writer.',
    whoIs: 'Student',
    isCreatePermission: false,
    isCourseContentCreatePermission: false,
    isCourseWithVideoCreatePermission: false,
    isVlogCreatePermission: false,
    createdAt: new Date(),
    profileImage: '/default-profile.png',
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

      await doc(collection(db, 'writerRequests')).set(requestData);
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
      return timestamp.toDate().toLocaleString();
    } else if (timestamp?.seconds) {
      return new Date(timestamp.seconds * 1000).toLocaleString();
    } else if (timestamp instanceof Date) {
      return timestamp.toLocaleString();
    }
    return 'Unknown';
  };

  // Use dummy data if profile or user is not available
  const finalProfile = profile || dummyProfile;
  const currentUser = user || dummyUser;

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-teal-50">
        <p className="text-teal-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-teal-50 p-6">
      <section id="profile" className="mb-8">
        <div className="border border-teal-200 bg-white mt-24 p-6 rounded-xl max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-teal-500">Profile</h2>
          {editMode ? (
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div className="flex justify-center">
                <label htmlFor="profileImage" className="cursor-pointer">
                  <Image
                    src={
                      profileImage
                        ? URL.createObjectURL(profileImage)
                        : finalProfile.profileImage
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
                  value={finalProfile.name}
                  onChange={(e) =>
                    dispatch(
                      updateUserProfile(currentUser.uid, {
                        name: e.target.value,
                      })
                    )
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="text-gray-600 font-medium">Bio:</label>
                <textarea
                  value={finalProfile.bio}
                  onChange={(e) =>
                    dispatch(
                      updateUserProfile(currentUser.uid, {
                        bio: e.target.value,
                      })
                    )
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
                  onClick={() => dispatch(setEditMode(false))}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div>
                <p className="text-gray-600 font-medium">Email:</p>
                <p className="text-lg">{currentUser.email}</p>
              </div>
              <div>
                <p className="text-gray-600 font-medium">Name:</p>
                <p className="text-lg">{finalProfile.name}</p>
              </div>
              <div>
                <p className="text-gray-600 font-medium">Bio:</p>
                <p className="text-lg">{finalProfile.bio}</p>
              </div>
              <div>
                <p className="text-gray-600 font-medium">Role:</p>
                <p className="text-lg">{finalProfile.whoIs}</p>
              </div>
              <div>
                <p className="text-gray-600 font-medium">Create Blog Permission:</p>
                <p className="text-lg">
                  {finalProfile.isCreatePermission ? 'Yes' : 'No'}
                </p>
              </div>
              <div>
                <p className="text-gray-600 font-medium">Course Content Permission:</p>
                <p className="text-lg">
                  {finalProfile.isCourseContentCreatePermission ? 'Yes' : 'No'}
                </p>
              </div>
              <div>
                <p className="text-gray-600 font-medium">Course with Video Permission:</p>
                <p className="text-lg">
                  {finalProfile.isCourseWithVideoCreatePermission ? 'Yes' : 'No'}
                </p>
              </div>
              <div>
                <p className="text-gray-600 font-medium">Vlog Creation Permission:</p>
                <p className="text-lg">
                  {finalProfile.isVlogCreatePermission ? 'Yes' : 'No'}
                </p>
              </div>
              <div>
                <p className="text-gray-600 font-medium">Account Created:</p>
                <p className="text-lg">{formatTimestamp(finalProfile.createdAt)}</p>
              </div>
              <button
                onClick={() => dispatch(setEditMode(true))}
                className="mt-2 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 flex items-center"
              >
                <PencilIcon className="h-4 w-4 mr-2" /> Edit Profile
              </button>
              {finalProfile.whoIs !== 'Blog Writer' && !writerRequest && (
                <button
                  onClick={() => dispatch(setShowPopup(true))}
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
                  value={finalProfile.name || currentUser.displayName}
                  disabled
                  className="w-full p-2 border rounded bg-gray-100"
                />
              </div>
              <div>
                <label className="text-gray-600 font-medium">Email:</label>
                <input
                  type="email"
                  value={currentUser.email}
                  disabled
                  className="w-full p-2 border rounded bg-gray-100"
                />
              </div>
              <div>
                <label className="text-gray-600 font-medium">Mobile Number:</label>
                <input
                  type="tel"
                  value={mobileNumber || ''}
                  onChange={(e) => dispatch(setMobileNumber(e.target.value))}
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
                  onClick={() => dispatch(setShowPopup(false))}
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