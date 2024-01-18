// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY, //import.meta.env.VITE_FIREBASE_API_KEY
  authDomain: 'mern-real-estate-f0bc6.firebaseapp.com',
  projectId: 'mern-real-estate-f0bc6',
  storageBucket: 'mern-real-estate-f0bc6.appspot.com',
  messagingSenderId: '683238536725',
  appId: '1:683238536725:web:026d75544d2aeec51a401c',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
