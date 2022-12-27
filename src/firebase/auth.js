import { app } from "./app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { isRegisteredUser, addUser } from "./firestore";

// initalize auth instance
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

async function googleSignIn() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    // add new users to the users collection
    !(await isRegisteredUser(user.uid)) && (await addUser(user, "google"));
  } catch (error) {
    console.log("googleSignIn error: ", { error });
  }
}

async function logInWithEmailAndPassword(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log("logInWithEmailAndPassword error: ", error);
  }
}

async function registerWithEmailAndPassword(name, email, password) {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;
    user.displayName = name;
    await addUser(user, "local");
  } catch (error) {
    console.log("registerWithEmailAndPassword error: ", error);
  }
}

async function sendPasswordReset(email) {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent to " + email);
  } catch (error) {
    console.log("sendPasswordReset error: ", { error });
    return Promise.reject(error.code.replace("auth/", "").replaceAll("-", " "));
  }
}

function logout() {
  signOut(auth);
}

export {
  auth,
  googleSignIn,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
