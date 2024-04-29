import styles from "./Login.module.css";

import { useNavigate } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import userIdContext from "../store/user-auth";
import axios from "axios";


const Login = () => {
  const navigate = useNavigate();

  const emailRef = useRef();

  const passwordRef = useRef();
  const [passwordError, setPasswordError] = useState('');

  const handleNavigate = () => {
    navigate("/generate-otp");
  };

  const { updateUserId } = useContext(userIdContext);

  const handleLogin = async (event) => {
    event.preventDefault();

    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value;

    if (email === "") {
      setPasswordError("Please enter a valid email");
      return;
    } else if (!isValidEmail(email)) {
      setPasswordError("Please enter a valid email");
      return;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      return;
    } else if (!/(?=.*[a-z])/.test(password)) {
      setPasswordError("Password must contain at least one lowercase letter.");
      return;
    } else if (!/(?=.*[A-Z])/.test(password)) {
      setPasswordError("Password must contain at least one uppercase letter.");
      return;
    } else if (!/(?=.*\d)/.test(password)) {
      setPasswordError("Password must contain at least one digit.");
      return;
    } else if (!/(?=.*[@$!%*?&])/.test(password)) {
      setPasswordError("Password must contain at least one special character.");
      return;
    }

    // console.log(email);
    updateUserId(email);
    try {
    const res = await axios.post(`http://localhost:3002/auth/login`,{
      email : email,
      password : password
    });
    console.log(res);
    navigate("/dashboard");
  }
  catch(error) {
    alert(`USER WITH THIS CREDENTIAL DO NOT  EXIST`);
  }

   
    // console.log(password);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  return (
    <>
      <div className={styles.background}>
        <div className={styles.shape}></div>
        <div className={styles.shape}></div>
      </div>
      <form onSubmit={handleLogin}>
        <h3>Login Here</h3>

        <label htmlFor="username">Username</label>
        <input
          ref={emailRef}
          type="text"
          placeholder="Email or Phone"
          id="username"
        />

        <label htmlFor="password">Password</label>
        <input
          ref={passwordRef}
          type="password"
          placeholder="Password"
          id="password"
        />
         {passwordError && <h5 style={{textAlign:'left !important' }} className="error">{passwordError}</h5>}

        <button type="submit" className={styles.custombutton}>
          Log In
        </button>

        <button
          type="button"
          onClick={handleNavigate}
          className={styles.socialButton}
        >
          <span style={{ fontSize: "14px" }}>Forget Password</span>
        </button>
      </form>
    </>
  );
};

export default Login;
