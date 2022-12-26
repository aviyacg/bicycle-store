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
          <button className="login-logout small" onClick={logout}>
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
          <div className="small">Give us your personal information!</div>
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
              if (password.length >= 6)
                registerWithEmailAndPassword(email, password);
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
              // setRegister(true)
              alert(
                "register is currently not working, please sign in with a google account"
              );
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
            onClick={() => logInWithEmailAndPassword(email, password)}
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
