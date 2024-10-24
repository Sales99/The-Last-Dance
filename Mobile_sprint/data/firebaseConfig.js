// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyColq8nh741FW-DeAVRdc77ZcC9FP-Blp8",
  authDomain: "teste-denovo-1d43c.firebaseapp.com",
  projectId: "teste-denovo-1d43c",
  storageBucket: "teste-denovo-1d43c.appspot.com",
  messagingSenderId: "384646857934",
  appId: "1:384646857934:web:70f54a0c677d602d03fc9f",
  measurementId: "G-E9FET4BYVZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);