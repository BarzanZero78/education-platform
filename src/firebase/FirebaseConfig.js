import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDkkGej3ldAM9aiItbF5YOdgKnl7TmbXu8",
  authDomain: "education-platform-d7694.firebaseapp.com",
  projectId: "education-platform-d7694",
  storageBucket: "education-platform-d7694.appspot.com",
  messagingSenderId: "605755828383",
  appId: "1:605755828383:web:63c91be87255144bc61aaa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);