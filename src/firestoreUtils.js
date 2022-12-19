// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  getDocs,
  collection,
  setDoc,
  doc,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const db = getFirestore(app);

async function writeItemToDB(item, quantity) {
  await setDoc(doc(db, "cart", item.name), { ...item, quantity });
}

async function loadCartFromDB() {
  try {
    const cart = {};

    const querySnapshot = await getDocs(collection(db, "cart"));
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const { name, description, image, price, quantity } = data;
      cart[name] = {
        item: { name, description, image, price },
        quantity,
      };
    });
    console.log(cart);
    return cart;
  } catch (error) {
    console.error(error);
  }
}

export { writeItemToDB, loadCartFromDB };
