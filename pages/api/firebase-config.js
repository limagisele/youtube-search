import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "nextjs-fcd5d.firebaseapp.com",
  projectId: "nextjs-fcd5d",
  storageBucket: "nextjs-fcd5d.appspot.com",
  messagingSenderId: "56297671587",
  appId: "1:56297671587:web:7981eea4d89b9bd454a816",
  measurementId: "G-4QWKMBP01Z",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
