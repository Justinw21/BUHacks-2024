// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0RgcquIQ-OlDLT3gYu3qkgC-bYRXdhVI",
  authDomain: "bostonhacks-ec6e9.firebaseapp.com",
  projectId: "bostonhacks-ec6e9",
  storageBucket: "bostonhacks-ec6e9.firebasestorage.app",
  messagingSenderId: "853001084404",
  appId: "1:853001084404:web:49b7c39db7acd6c62f2da1",
  measurementId: "G-Y39NVKQP88"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);