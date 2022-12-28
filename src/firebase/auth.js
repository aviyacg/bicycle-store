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

// This function logs in a user using Google Sign-In
async function googleSignIn() {
  try {
    // Sign in the user using Google Sign-In
    const result = await signInWithPopup(auth, googleProvider);

    // Get a reference to the signed-in user
    const user = result.user;

    // If the user is not registered, add them to the "users" collection
    !(await isRegisteredUser(user.uid)) && (await addUser(user, "google"));
  } catch (error) {
    // If there is an error, log it
    console.log("googleSignIn error: ", { error });
  }
}

// This function logs in an existing user with the provided email and password
async function logInWithEmailAndPassword(email, password) {
  try {
    // Sign in the user with the provided email and password
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    // If there is an error, log it and reject the Promise with a modified version of the error code
    console.log("logInWithEmailAndPassword error: ", error);
    return Promise.reject(error.code.replace("auth/", "").replaceAll("-", " "));
  }
}

// This function registers a new user with the provided name, email, and password
async function registerWithEmailAndPassword(name, email, password) {
  try {
    // Create the new user with the provided email and password
    const result = await createUserWithEmailAndPassword(auth, email, password);

    // Get a reference to the newly created user
    const user = result.user;

    // Set the display name for the user
    user.displayName = name;

    // Add the user to the "users" collection
    await addUser(user, "local");
  } catch (error) {
    // If there is an error, log it and reject the Promise with a modified version of the error code
    console.log("registerWithEmailAndPassword error: ", error);
    return Promise.reject(error.code.replace("auth/", "").replaceAll("-", " "));
  }
}

// This function sends a password reset email to the provided email address
async function sendPasswordReset(email) {
  try {
    // Send the password reset email
    await sendPasswordResetEmail(auth, email);

    // Alert the user that the password reset email has been sent
    alert(
      "Password reset link sent to this email address: " +
        email +
        "check out your mail box\n Your mail box may classify this as spam so check there too"
    );
  } catch (error) {
    // If there is an error, log it and reject the Promise with a modified version of the error code
    console.log("sendPasswordReset error: ", { error });
    return Promise.reject(error.code.replace("auth/", "").replaceAll("-", " "));
  }
}

// This function logs out the currently signed-in user
function logout() {
  // Sign out the user
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
