import { app } from "./app";
import {
  getFirestore,
  getDocs,
  collection,
  addDoc,
  query,
  where,
  limit,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { auth } from "./auth";

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

async function getUserName(uid) {
  if (!uid) return "";
  const q = query(collection(db, "users"), where("uid", "==", uid));
  const docs = await getDocs(q);
  return docs.docs[0]?.get("name");
}

// cart management
async function getCurrentUserCartRef() {
  if (auth.currentUser === null) return Promise.reject("no logged in user");
  const uid = auth.currentUser.uid;
  const q = query(collection(db, "users"), where("uid", "==", uid), limit(1));
  const snapshot = await getDocs(q);
  const doc = snapshot.docs[0];
  const cartRef = collection(db, "users", doc.id, "cart");
  return cartRef;
}

async function getCart() {
  const cart = {};
  try {
    const cartRef = await getCurrentUserCartRef();
    const snapshot = await getDocs(cartRef);
    snapshot.docs.forEach((doc) => {
      const itemData = doc.data();
      const { name, description, image, price, quantity } = itemData;
      cart[name] = {
        item: { name, description, image, price },
        quantity,
      };
    });
  } catch (error) {
    if (error === "no logged in user") return cart;
    console.log("getCart: " + error.code, { error });
  }
  return cart;
}

async function addItemToCart(item) {
  try {
    const cartRef = await getCurrentUserCartRef();
    const q = query(cartRef, where("name", "==", item.name), limit(1));
    const snapshot = await getDocs(q);
    const itemDoc = snapshot.docs[0];
    if (itemDoc) {
      const prevQuantity = itemDoc.data().quantity;
      await updateDoc(itemDoc.ref, { quantity: prevQuantity + 1 });
    } else {
      await addDoc(cartRef, { ...item, quantity: 1 });
    }
  } catch (error) {
    console.log("addItemToCart: " + error.code, { error });
  }
}

async function removeItemFromCart(item) {
  try {
    const cartRef = await getCurrentUserCartRef();
    const q = query(cartRef, where("name", "==", item.name), limit(1));
    const snapshot = await getDocs(q);
    const itemDoc = snapshot.docs[0];
    if (itemDoc) {
      const prevQuantity = itemDoc.data().quantity;
      if (prevQuantity === 1) {
        await deleteDoc(itemDoc.ref);
        return;
      }
      await updateDoc(itemDoc.ref, { quantity: prevQuantity - 1 });
    } else {
      console.log("removeItemFromCart: item not found");
    }
  } catch (error) {
    console.log("removeItemFromCart: " + error.code, { error });
  }
}

export { isRegisteredUser, addUser, getUserName };
export { getCart, addItemToCart, removeItemFromCart };
