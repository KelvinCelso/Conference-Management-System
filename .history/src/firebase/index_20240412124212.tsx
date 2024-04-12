// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
import "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmnr8TXbQ38MT00c73y1nHJfOP2fwXZ-0",
  authDomain: "conference-app-e0b01.firebaseapp.com",
  projectId: "conference-app-e0b01",
  storageBucket: "conference-app-e0b01.appspot.com",
  messagingSenderId: "11992326492",
  appId: "1:11992326492:web:c93eefd3cf1d7c8e44a199",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export const db = getFirestore(app);

export const projectsCollection = collection(db, "projects");
