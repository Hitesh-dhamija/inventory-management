import { useState, useEffect, useContext } from "react";
import styles from "./GenerateOtp.module.css";
import { useNavigate } from "react-router-dom";
import { url } from "../crud";
import userIdContext from "../store/user-auth";

import { useRef } from "react";
import axios from "axios";

const GenerateOtp = () => {
  const [otpStatus, setOtpStatus] = useState(false);
  const [timer, setTimer] = useState(0);

  const navigate = useNavigate();
  const emailRef = useRef();
  const otpref = useRef();

  const { updateUserId } = useContext(userIdContext);

  const handleClick = async () => {
    console.log(emailRef.current.value);

    const email = emailRef.current.value.trim();

    if (email === "") {
      alert("Please enter a valid email");
      return;
    } else if (!isValidEmail(email)) {
      alert("Please enter a valid email");
      return;
    } else {
    

      
      
    
      try {
        const res = await axios.post(`http://localhost:3002/auth/forget_password`,{
          email : email
        });
        console.log(res);
        setTimer(120);
        setOtpStatus(true);
      }
      catch(error) {
        alert("EMAIL DO NOT EXIST!!");
      }
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    const email = emailRef.current.value.trim();

    try {
    const res = await axios.post(`http://localhost:3002/auth/otp_verification`,{
      email : email,
      otp : otpref.current.value
    });
    updateUserId(email);
    setOtpStatus(false);
    console.log(res);
    navigate("/forget-password");
   
  }
  catch(error) {
    alert("INCORRECT OTP");
  }

    
    
  };

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setOtpStatus(false);
    }

    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
   
    
  };

  return (
    <>
      <div className={styles.background}>
        <div className={styles.shape}></div>
        <div className={styles.shape}></div>
      </div>
      <form onSubmit={handleSubmit}>
        <h3>Verification</h3>

        <label htmlFor="emailId">Email Id</label>
        <input ref={emailRef} type="text" placeholder="Email " id="emailId" />

        <div className={styles.social}>
          {timer > 0 && (
            <div className={styles.timer}>
             
              <h6 style={{ color: "red", fontWeight: "bold" }}>
                {formatTime(timer)}
              </h6>
            </div>
          )}
          <button
            type="button"
            onClick={handleClick}
            style={{ fontSize: "14px" }}
            className="go"
            disabled={timer > 0}
          >
            <h4>Get OTP</h4>
          </button>
        </div>

        {otpStatus && (
          <div>
            <label htmlFor="otp">Enter OTP</label>
            <input type="password" placeholder="OTP" id="otp" ref={otpref}/>

            <div className={styles.social}>
              <button type="submit" style={{ fontSize: "14px" }} className="go">
                Submit OTP
              </button>
            </div>
          </div>
        )}
      </form>
    </>
  );
};

export default GenerateOtp;
