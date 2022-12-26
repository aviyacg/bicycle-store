import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAAbcMbpUiSLko3xKQPzPgHDr7KN53D5jE",
  authDomain: "bicycle-9a163.firebaseapp.com",
  projectId: "bicycle-9a163",
  storageBucket: "bicycle-9a163.appspot.com",
  messagingSenderId: "622950139921",
  appId: "1:622950139921:web:ca535a015e5cab1c3f89b0",
  measurementId: "G-GTL3GCE4Y4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app, firebaseConfig };
