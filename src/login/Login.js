import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";
import {
  auth,
  googleSignIn,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
} from "../firebase/auth";
import "./Login.css";
function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const [register, setRegister] = useState(false);

  const clearInputs = () => {
    setEmail("");
    setPassword("");
    setName("");
  };

  if (error) {
    return <div className="login-error">Error: {error}</div>;
  }
  if (loading) {
    return <div className="login-loading">Loading</div>;
  }
  if (user) {
    return (
      <div className="login-user small">
        {user.displayName}
        <img src={user.photoURL} alt="profile" />
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
          <button
            className="login-register small"
            onClick={() => {
              if (password.length >= 6) {
                registerWithEmailAndPassword(name, email, password);
                clearInputs();
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
        <p className="small">
          <button
            className="login-login small"
            onClick={async () => {
              await logInWithEmailAndPassword(email, password);
              clearInputs();
            }}
          >
            Log In
          </button>
          Forgot your password?
          <button
            className="login-password-reset small"
            onClick={() => sendPasswordReset(email)}
          >
            click here
          </button>
        </p>
      </div>
    </>
  );
}

export default Login;
