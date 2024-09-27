// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYdvgk_Z3pYP-Lt_xpSwsvRyNghsSlS-4",
  authDomain: "teste-tcc-f1317.firebaseapp.com",
  projectId: "teste-tcc-f1317",
  storageBucket: "teste-tcc-f1317.appspot.com",
  messagingSenderId: "174564069294",
  appId: "1:174564069294:web:045933f5e77bc0fd0a423f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Storage
const auth = getAuth(app);
const storage = getStorage(app);

// Export the instances for use in other files
export { auth, storage };
