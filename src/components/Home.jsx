import userIdContext from "../store/user-auth";
import styles from "./Home.module.css";

import { useContext } from "react";
import waveHelloImage from "../assets/wave-hello.gif";
import { useNavigate } from "react-router-dom";

const Home = () => {
  
  const { userInfo } = useContext(userIdContext);
  console.log(userInfo,userInfo.userId,userInfo.email);

  const navigate = useNavigate();

  const handleLogOut = () => {
    navigate("/");
  };
  return (
    <>
      <button
        onClick={handleLogOut}
        className={styles.customButton}
        type="button"
      >
        Log Out
      </button>
      <div className={styles.container}>
        <div>
          <img style={{ width: "200px" }} src={waveHelloImage} alt="hello" />
        </div>

        <div>
          <h1 style={{fontSize:"3.5rem", color:"black"}}>Hello {userInfo.userId}</h1>
          <p>You are perfectly logged in !!</p>
        </div>
      </div>
    </>
  );
};

export default Home;
