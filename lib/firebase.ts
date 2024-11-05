import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyARjb3hXFJYj5VVVcFTBgB3eoG0_x2NT78",
  authDomain: "promptenhancer-4bc04.firebaseapp.com",
  projectId: "promptenhancer-4bc04",
  storageBucket: "promptenhancer-4bc04.firebasestorage.app",
  messagingSenderId: "441721297685",
  appId: "1:441721297685:web:cb07e48443ebae9ca8e71c",
  measurementId: "G-4Y1QH0W30B",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
