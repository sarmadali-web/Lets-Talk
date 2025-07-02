// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzAWl-9fZX66hD2t3YDhUw5s3CRJ0mL5I",
  authDomain: "lets-talk-9030a.firebaseapp.com",
  projectId: "lets-talk-9030a",
  storageBucket: "lets-talk-9030a.appspot.com", // ✅ fixed this line
  messagingSenderId: "549585393767",
  appId: "1:549585393767:web:e87de72c466d9dcb4f9cc2",
  measurementId: "G-PNCSNXPMPC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export Firebase services
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { app, analytics, auth, provider, db };
