import React, { useState, useEffect, useContext } from 'react';
import styles from "./UpdatePassword.module.css";
import userIdContext from '../store/user-auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const UpdatePassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const { userInfo } = useContext(userIdContext);
  console.log(userInfo);


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!password ||!confirmPassword) {
      setPasswordError('Please fill in all the fields');
      return;
    }
 
   else if (password !== confirmPassword) {
      setPasswordError(`Password don't match`);
      return;
    } 
   else if (password.length < 6) {
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
    setPasswordError('');

    try {
      const res = await axios.put(`http://localhost:3002/auth/reset_password`,{
        email : userInfo.email,
        password : password,
        confirmPassword : confirmPassword
      });
      console.log(res);
      navigate("/");
    }
    catch(error) {
      alert(error);
    }
    
  };

  return (
    <div>
      <div className={styles.background}>
        <div className={styles.shape}></div>
        <div className={styles.shape}></div>
      </div>
      <form onSubmit={handleSubmit}>
        <h3>Change Password</h3>

        <label htmlFor="Password">Password</label>
        <input
          type="password"
          placeholder="NEW PASSWORD"
          id="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <label htmlFor="confirmpassword"> Confirm Password </label>
        <input
          type="password"
          placeholder="CONFIRM NEW PASSWORD"
          id="confirmpassword"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />

        {passwordError && <h1 className="error">{passwordError}</h1>}

        <button>Change Password</button>
      </form>
    </div>
  );
};

export default UpdatePassword;