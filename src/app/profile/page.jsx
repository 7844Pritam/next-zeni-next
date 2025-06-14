'use client';

import { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [firestoreUser, setFirestoreUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const userRef = doc(db, 'users', firebaseUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setFirestoreUser(userSnap.data());
        }
        console.log(firebaseUser);
      } else {
        router.push('/loginscreen');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Profile</h2>

        {user && (
          <div className="space-y-4">
            <div>
              <p className="text-gray-600 font-medium">Email:</p>
              <p className="text-lg">{user.email}</p>
            </div>
            <div>
              <p className="text-gray-600 font-medium">Name:</p>
              <p className="text-lg">{firestoreUser?.name || 'Not set'}</p>
            </div>
            <div>
              <p className="text-gray-600 font-medium">Role:</p>
              <p className="text-lg">{firestoreUser?.whoIs || 'Unknown'}</p>
            </div>
            <div>
              <p className="text-gray-600 font-medium">Account Created:</p>
              <p className="text-lg">{firestoreUser?.createdAt?.toDate?.().toLocaleString() || 'Unknown'}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
