import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import {
  auth,
  googleSignIn,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
} from "../firebase/auth";
import "./Login.css";
import { getUserName } from "../firebase/firestore";
import avatar from "./avatar.png";
function Login() {
  // input values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // input validation effect
  useEffect(() => {
    // vaidate email
    if (
      email.length > 0 &&
      (email.length < 4 ||
        !email.includes("@") ||
        !email.includes(".") ||
        email.endsWith("."))
    ) {
      return setError("invalid email");
    }
    // validate password
    if (password.length > 0 && password.length < 6) {
      return setError("password is too short");
    }
    // clear error if both inputs are valid
    else {
      setError("");
    }
  }, [email, password]);

  // switch between the login and register views
  const [register, setRegister] = useState(false);

  // user info
  // current user from auth
  const [user, loading] = useAuthState(auth);
  const [error, setError] = useState("");
  // username from the user doc in firestore
  const [username, setUsername] = useState("");

  // sync username with current user
  useEffect(() => {
    if (!user) setUsername("");
    getUserName(user?.uid).then((res) => setUsername(res));
  }, [user]);

  const clearInputs = () => {
    setEmail("");
    setPassword("");
    setName("");
  };

  // views
  if (loading) {
    return <div className="login-loading">Loading</div>;
  }
  if (user) {
    return (
      <div className="login-user small">
        {username}
        <img src={avatar} alt="profile" />
        <div className="menu">
          <button
            className="login-logout small"
            onClick={() => {
              logout();
              setRegister(false);
            }}
          >
            log out
          </button>
        </div>
      </div>
    );
  }
  if (register) {
    return (
      <>
        <div className="shade" />
        <div className="login">
          <p className="small">
            Already have an account?
            <button
              className="login-password-reset small"
              onClick={() => {
                setRegister(false);
                clearInputs();
              }}
            >
              log in
            </button>
          </p>
          <input
            type="text"
            className="login-input small"
            value={name}
            placeholder="name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            type="email"
            className="login-input small"
            value={email}
            placeholder="email address"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            className="login-input small"
            value={password}
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {error !== "" ? (
            <div className="login-error small">{error}</div>
          ) : undefined}
          <button
            className="login-register small"
            onClick={async () => {
              if (email.length === 0) return setError("enter your email");
              if (password.length === 0) return setError("enter your password");
              try {
                await registerWithEmailAndPassword(name, email, password);
                clearInputs();
              } catch (error) {
                setError(error);
              }
            }}
          >
            Register
          </button>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="shade" />
      <div className="login">
        <p className="small">
          First time at bicycle?
          <button
            className="login-register small"
            onClick={() => {
              setRegister(true);
              clearInputs();
            }}
          >
            Register
          </button>
        </p>
        <button className="login-google small" onClick={googleSignIn}>
          Sign In With Google
        </button>
        <input
          type="email"
          className="login-input small"
          value={email}
          placeholder="email address"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          className="login-input small"
          value={password}
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        {error !== "" ? (
          <div className="login-error small">{error}</div>
        ) : undefined}
        <p className="small">
          <button
            className="login-login small"
            onClick={async () => {
              if (email.length === 0) return setError("enter your email");
              if (password.length === 0) return setError("enter your password");
              try {
                await logInWithEmailAndPassword(email, password);
                clearInputs();
              } catch (error) {
                setError(error);
              }
            }}
          >
            Log In
          </button>
          Forgot your password?
          <button
            className="login-password-reset small"
            onClick={async () => {
              try {
                await sendPasswordReset(email);
              } catch (error) {
                setError(error);
              }
            }}
          >
            click here
          </button>
        </p>
      </div>
    </>
  );
}

export default Login;
