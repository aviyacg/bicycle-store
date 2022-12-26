import { app } from "./app";
import {
  getFirestore,
  getDocs,
  collection,
  addDoc,
  setDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

// initialize firestore instance
const db = getFirestore(app);

// user management
async function isRegisteredUser(uid) {
  const q = query(collection(db, "users"), where("uid", "==", uid));
  const docs = await getDocs(q);
  return !(docs.docs.length === 0);
}

async function addUser(user, provider) {
  await addDoc(collection(db, "users"), {
    uid: user.uid,
    name: user.displayName,
    authProvider: provider,
    email: user.email,
  });
}

// cart management
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
    return cart;
  } catch (error) {
    console.error(error);
  }
}

export { isRegisteredUser, addUser };
export { writeItemToDB, loadCartFromDB };
