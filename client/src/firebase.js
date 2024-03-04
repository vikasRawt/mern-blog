// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-28d8d.firebaseapp.com",
  projectId: "mern-blog-28d8d",
  storageBucket: "mern-blog-28d8d.appspot.com",
  messagingSenderId: "527353989405",
  appId: "1:527353989405:web:310fc924dc29d2496df9f4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);