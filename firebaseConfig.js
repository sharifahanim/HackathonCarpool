// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuTo00v1hH6LlULVxFO7VlJKGSgt77LRY",
  authDomain: "carpool-app-d5f9a.firebaseapp.com",
  projectId: "carpool-app-d5f9a",
  storageBucket: "carpool-app-d5f9a.firebasestorage.app",
  messagingSenderId: "1040514211471",
  appId: "1:1040514211471:web:919aaf899434ab5e2c1afa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export Firebase so other files can use it
export default app;
