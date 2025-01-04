import { useLoginData } from "../../context/LoginContext";
import styles from "./homepage.module.css";
import UserImg from "../../assets/user-img.svg";

const Homepage = () => {
  const { loginData, setLoginData } = useLoginData();
  const parsedLoginData = loginData ? JSON.parse(loginData) : null;

  const handleLogout = () => {
    setLoginData(null);
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.main_heading}>
        <h3>Welcome to</h3>
        <h2>Unstop</h2>
      </div>

      <div className={styles.card}>
        <img src={UserImg} alt="" />

        <div className={styles.user_info}>
          <p className={styles.user_info_name}>
            {parsedLoginData.firstName} {parsedLoginData.lastName}
          </p>
          <p className={styles.user_info_email}>{parsedLoginData.email}</p>
          <p className={styles.user_info_gender}>{parsedLoginData.gender}</p>
        </div>

        <button className={styles.logout_btn} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Homepage;
