import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "search-7c613.firebaseapp.com",
  projectId: "search-7c613",
  storageBucket: "search-7c613.appspot.com",
  messagingSenderId: "4098071392",
  appId: "1:4098071392:web:6731b46d89334856a05c05",
  measurementId: "G-32NTS9Z454",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
