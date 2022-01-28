// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1bDmfT1SewDfQlezMBguLTfCEdy_IGfs",
  authDomain: "crosses-9bd04.firebaseapp.com",
  projectId: "crosses-9bd04",
  storageBucket: "crosses-9bd04.appspot.com",
  messagingSenderId: "455095463849",
  appId: "1:455095463849:web:7694fd7d344224d8281eb8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
