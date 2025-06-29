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
  setDoc,
  deleteDoc,
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useRouter } from 'next/navigation';
import {
  PencilIcon,
  PlusIcon,
  EnvelopeIcon,
  UserIcon,
  InformationCircleIcon,
  ClockIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/solid';
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

  const dummyProfile = {
    name: 'John Doe',
    bio: 'Aspiring blog writer.',
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

  const migrateUserDocsToUID = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'users'));

      const migrationTasks = snapshot.docs.map(async (docSnap) => {
        const data = docSnap.data();

        if (!data.uid || docSnap.id === data.uid) return;

        const newDocRef = doc(db, 'users', data.uid);
        await setDoc(newDocRef, data, { merge: true });
        await deleteDoc(doc(db, 'users', docSnap.id));
        console.log(`Migrated user ${data.email} to UID-based doc.`);
      });

      await Promise.all(migrationTasks);
      console.log('User document migration completed.');
    } catch (err) {
      console.error('Migration failed:', err.message);
    }
  };

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
      return timestamp.toDate().toLocaleString();
    } else if (timestamp?.seconds) {
      return new Date(timestamp.seconds * 1000).toLocaleString();
    } else if (timestamp instanceof Date) {
      return timestamp.toLocaleString();
    }
    return 'Unknown';
  };

  const finalProfile = profile || dummyProfile;
  const currentUser = user || dummyUser;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-50">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-600"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <UserIcon className="h-8 w-8 text-teal-600 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-50 py-22 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <section
        id="profile"
        className="w-full max-w-md sm:max-w-lg bg-white rounded-2xl shadow-2xl p-8 transform transition-all duration-500 hover:shadow-3xl"
      >
        <h2 className="text-3xl font-extrabold text-teal-700 mb-8 text-center flex items-center justify-center gap-2">
          <UserIcon className="h-8 w-8 text-teal-600" />
          Your Profile
        </h2>
        {editMode ? (
          <form onSubmit={handleProfileUpdate} className="space-y-6">
            <div className="flex justify-center">
              <label
                htmlFor="profileImage"
                className="relative cursor-pointer group"
                aria-label="Upload profile image"
              >
                <Image
                  src={profileImage ? URL.createObjectURL(profileImage) : finalProfile.profileImage}
                  alt="Profile picture"
                  width={120}
                  height={120}
                  className="rounded-full border-4 border-teal-200 object-cover group-hover:opacity-75 transition-opacity duration-300"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <PencilIcon className="h-8 w-8 text-white bg-teal-500 rounded-full p-2 shadow-md" />
                </div>
                <input
                  id="profileImage"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  aria-hidden="true"
                />
              </label>
            </div>
            <div>
              <label className="text-gray-700 font-semibold flex items-center gap-2">
                <UserIcon className="h-5 w-5 text-teal-600" />
                Name
              </label>
              <input
                type="text"
                value={finalProfile.name}
                onChange={(e) =>
                  dispatch(updateUserProfile(currentUser.uid, { name: e.target.value }))
                }
                className="w-full mt-2 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none transition-all duration-300 bg-gray-50"
                required
                aria-label="Full name"
              />
            </div>
            <div>
              <label className="text-gray-700 font-semibold flex items-center gap-2">
                <InformationCircleIcon className="h-5 w-5 text-teal-600" />
                Bio
              </label>
              <textarea
                value={finalProfile.bio}
                onChange={(e) =>
                  dispatch(updateUserProfile(currentUser.uid, { bio: e.target.value }))
                }
                className="w-full mt-2 p-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-teal-400 focus:outline-none transition-all duration-300 bg-gray-50"
                rows={4}
                aria-label="User bio"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="submit"
                className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 flex items-center gap-2 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-400"
                aria-label="Save profile changes"
              >
                <CheckCircleIcon className="h-5 w-5" />
                Save
              </button>
              <button
                type="button"
                onClick={() => dispatch(setEditMode(false))}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 flex items-center gap-2 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400"
                aria-label="Cancel profile editing"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-center">
              <img
                src={finalProfile.profileImage}
                alt="Profile picture"
                width={120}
                height={120}
                className="rounded-full border-4 border-teal-200 object-cover"
              />
            </div>
            <div className="flex items-start gap-3">
              <EnvelopeIcon className="h-6 w-6 text-teal-600 mt-1" />
              <div>
                <p className="text-gray-600 font-semibold">Email</p>
                <p className="text-lg text-gray-800">{currentUser.email}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <UserIcon className="h-6 w-6 text-teal-600 mt-1" />
              <div>
                <p className="text-gray-600 font-semibold">Name</p>
                <p className="text-lg text-gray-800">{finalProfile.name}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <InformationCircleIcon className="h-6 w-6 text-teal-600 mt-1" />
              <div>
                <p className="text-gray-600 font-semibold">Bio</p>
                <p className="text-lg text-gray-800">{finalProfile.bio}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ClockIcon className="h-6 w-6 text-teal-600 mt-1" />
              <div>
                <p className="text-gray-600 font-semibold">Account Created</p>
                <p className="text-lg text-gray-800">{formatTimestamp(finalProfile.createdAt)}</p>
              </div>
            </div>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => dispatch(setEditMode(true))}
                className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 flex items-center gap-2 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-400"
                aria-label="Edit profile"
              >
                <PencilIcon className="h-5 w-5" />
                Edit Profile
              </button>
              {finalProfile.whoIs !== 'Blog Writer' && !writerRequest && (
                <button
                  onClick={() => dispatch(setShowPopup(true))}
                  className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 flex items-center gap-2 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  aria-label="Become a blog writer"
                >
                  <PlusIcon className="h-5 w-5" />
                  Become a Blog Writer
                </button>
              )}
            </div>
            {writerRequest && writerRequest.status === 'pending' && (
              <p className="text-center text-orange-500 font-semibold flex items-center justify-center gap-2">
                <ClockIcon className="h-5 w-5" />
                Your request to become a blog writer is pending.
              </p>
            )}
            {writerRequest && writerRequest.status === 'confirmed' && (
              <div className="flex justify-center">
                <button
                  onClick={() => router.push('/my-blogs')}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400"
                  aria-label="Create a blog"
                >
                  <PlusIcon className="h-5 w-5" />
                  Create Blog
                </button>
              </div>
            )}
          </div>
        )}
      </section>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-opacity duration-300">
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100">
            <h2 className="text-2xl font-extrabold mb-6 text-teal-700 flex items-center gap-2">
              <PlusIcon className="h-6 w-6 text-teal-600" />
              Become a Blog Writer
            </h2>
            <form onSubmit={handleWriterRequest} className="space-y-6">
              <div>
                <label className="text-gray-700 font-semibold flex items-center gap-2">
                  <UserIcon className="h-5 w-5 text-teal-600" />
                  Name
                </label>
                <input
                  type="text"
                  value={finalProfile.name || currentUser.displayName}
                  disabled
                  className="w-full mt-2 p-3 border border-gray-200 rounded-lg bg-gray-100"
                  aria-label="User name (disabled)"
                />
              </div>
              <div>
                <label className="text-gray-700 font-semibold flex items-center gap-2">
                  <EnvelopeIcon className="h-5 w-5 text-teal-600" />
                  Email
                </label>
                <input
                  type="email"
                  value={currentUser.email}
                  disabled
                  className="w-full mt-2 p-3 border border-gray-200 rounded-lg bg-gray-100"
                  aria-label="User email (disabled)"
                />
              </div>
              <div>
                <label className="text-gray-700 font-semibold flex items-center gap-2">
                  <PhoneIcon className="h-5 w-5 text-teal-600" />
                  Mobile Number
                </label>
                <input
                  type="tel"
                  value={mobileNumber || ''}
                  onChange={(e) => dispatch(setMobileNumber(e.target.value))}
                  required
                  className="w-full mt-2 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none transition-all duration-300 bg-gray-50"
                  placeholder="Enter your mobile number"
                  aria-label="Mobile number"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="submit"
                  className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 flex items-center gap-2 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  aria-label="Submit writer request"
                >
                  <CheckCircleIcon className="h-5 w-5" />
                  Submit Request
                </button>
                <button
                  type="button"
                  onClick={() => dispatch(setShowPopup(false))}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 flex items-center gap-2 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  aria-label="Cancel writer request"
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