// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAEfIoytehV7jc2Y8tpwbXhwGndBFM4I5M",
  authDomain: "carpool-5d3fb.firebaseapp.com",
  projectId: "carpool-5d3fb",
  storageBucket: "carpool-5d3fb.appspot.com",
  messagingSenderId: "6602452009",
  appId: "1:6602452009:web:aa3aa5239afd94b3ec8038",
  measurementId: "G-PCVEPP39FV"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
