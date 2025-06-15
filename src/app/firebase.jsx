import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  // apiKey: "AIzaSyA4NpXxuDuN_KPeZ0kpAeKrey1JfJTrHY8",
  // authDomain: "tokengenerator-85ccb.firebaseapp.com",
  // projectId: "tokengenerator-85ccb",
  // storageBucket: "tokengenerator-85ccb.appspot.com",
  // messagingSenderId: "545985494948",
  // appId: "1:545985494948:web:823f54b5cfe967da2bcb31",
  // measurementId: "G-1E2W2MM9BB"

   apiKey: "AIzaSyACySoYMGC1PU2iplSU-NJKCaWXc0slbLA",
  authDomain: "nextzeni.firebaseapp.com",
  projectId: "nextzeni",
  storageBucket: "nextzeni.firebasestorage.app",
  messagingSenderId: "890024062859",
  appId: "1:890024062859:web:c99892321e1c59df31c98e",
  measurementId: "G-D5R33CV9SX"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { auth, db, storage };
  