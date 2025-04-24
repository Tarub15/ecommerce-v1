// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-trip-planner-12b63.firebaseapp.com",
  projectId: "ai-trip-planner-12b63",
  storageBucket: "ai-trip-planner-12b63.firebasestorage.app",
  messagingSenderId: "263865567663",
  appId: "1:263865567663:web:db444accbc24cd36e8875a",
  measurementId: "G-M1XRZLECWF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app);