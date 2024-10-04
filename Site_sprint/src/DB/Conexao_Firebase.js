// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"; // Importa o Firestore

// Your web app's Firebase configuration
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

// Initialize Firebase Authentication and Storage
const auth = getAuth(app);
const storage = getStorage(app);


// Inicializa o Firestore
const db = getFirestore(app);

// Export the instances for use in other files
export { auth, storage, db };
