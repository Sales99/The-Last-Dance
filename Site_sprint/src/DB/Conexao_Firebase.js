// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"; // Importa o Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyABktM135Cz7a93kprhUxhz9xmFKoish5c",
    authDomain: "bdd-tcc-66f51.firebaseapp.com",
    projectId: "bdd-tcc-66f51",
    storageBucket: "bdd-tcc-66f51.appspot.com",
    messagingSenderId: "55793936883",
    appId: "1:55793936883:web:6b0da056a0d5419bae8a86",
    measurementId: "G-QCEFKTHM05"
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
