import styles from "./login.module.css";
import LoginIllustration from "../../assets/login-illustration.svg";
import GoogleLogo from "../../assets/google-logo.svg";
import FbLogo from "../../assets/fb-logo.svg";
import AccountIcon from "../../assets/account-icon.svg";
import MailIcon from "../../assets/mail-icon.svg";
import KeyIcon from "../../assets/key-icon.svg";
import EyeIcon from "../../assets/eye-icon.svg";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLoginData } from "../../context/LoginContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    usernameErr: "",
    emailErr: "",
    passwordErr: "",
  });
  const [apiError, setApiError] = useState("");

  const loginChecks = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let errors = {
      usernameErr: "",
      emailErr: "",
      passwordErr: "",
    };

    setErrors({
      usernameErr: "",
      emailErr: "",
      passwordErr: "",
    });
    setApiError("");

    let flag = true;
    if (!username) {
      errors.usernameErr = "Username is required!";
      flag = false;
    }
    if (username && username != "emilys") {
      errors.usernameErr = "Username should be equal to 'emilys'";
      flag = false;
    }
    if (!email) {
      errors.emailErr = "Email is required!";
      flag = false;
    }
    if (email) {
      if (!emailPattern.test(email)) {
        errors.emailErr = "Invalid email!";
        flag = false;
      }
    }
    if (!password) {
      errors.passwordErr = "Password is required!";
      flag = false;
    }
    if (password && password.length < 8) {
      errors.passwordErr = "Password should be minimum 8 characters long!";
      flag = false;
    }
    if (!flag) {
      setErrors(errors);
    }
    return flag;
  };

  const { setLoginData } = useLoginData();

  const handleLogin = async (e) => {
    e.preventDefault();
    const flag = loginChecks();

    if (flag) {
      try {
        const res = await axios.post("https://dummyjson.com/auth/login", {
          username,
          password,
          email,
        });

        setLoginData(JSON.stringify(res.data));
        navigate("/home");
      } catch (error) {
        setApiError(error?.response?.data?.message);
        console.log(error);
      }
    }
  };

  return (
    <div className={styles.main_wrapper}>
      <div className={styles.left_child}>
        <img src={LoginIllustration} alt="login-illustration" />
      </div>

      <div className={styles.right_child}>
        <form className={styles.login_form} onSubmit={handleLogin}>
          <div className={styles.login_form_heading}>
            <h3>Welcome to</h3>
            <h2>Unstop</h2>
          </div>

          <div className={styles.via_login_wrapper}>
            <button className={styles.via_login_btn}>
              <img src={GoogleLogo} alt="google-logo" />
              <p>Login with Google</p>
            </button>

            <button className={styles.via_login_btn}>
              <img src={FbLogo} alt="fb-logo" />
              <p>Login with Facebook</p>
            </button>
          </div>

          <div className={styles.horizontal_or}>
            <span className={styles.line}></span>
            <div style={{ display: "inline-block", margin: "0 14px" }}>OR</div>
            <span className={styles.line}></span>
          </div>

          <div className={styles.input_container}>
            <div className={styles.input_wrapper}>
              <img src={AccountIcon} alt="" />
              <div className={styles.main_inp}>
                <label htmlFor="username">User name</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Enter your username"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  //   onBlur={loginChecks}
                />
              </div>
            </div>
            <p className={styles.errMsg}>{errors.usernameErr}</p>
            <div className={styles.input_wrapper}>
              <img src={MailIcon} alt="" />
              <div className={styles.main_inp}>
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  //   onBlur={loginChecks}
                />
              </div>
            </div>
            <p className={styles.errMsg}>{errors.emailErr}</p>
            <div className={styles.input_wrapper}>
              <img src={KeyIcon} alt="" />
              <div className={styles.main_inp}>
                <label htmlFor="password">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  //   onBlur={loginChecks}
                />
              </div>
              <div style={{ position: "relative", display: "inline-block" }}>
                <img
                  src={EyeIcon}
                  alt=""
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowPassword(!showPassword)}
                />
                {!showPassword && (
                  <div
                    style={{
                      position: "absolute",
                      top: -10,
                      left: -8,
                      width: "100%",
                      height: "100%",
                      backgroundColor: "transparent",
                      borderRight: "3px solid black",
                      transform: "rotate(45deg)",
                      pointerEvents: "none",
                    }}
                  />
                )}
              </div>
            </div>
            <p className={styles.errMsg}>{errors.passwordErr}</p>
            <p className={styles.errMsg}>{apiError}</p>
          </div>

          <div className={styles.checks}>
            <div>
              <input type="checkbox" name="rememberMe" id="rememberMe" />
              <label htmlFor="rememberMe">Remember Me</label>
            </div>

            <p>Forgot Password?</p>
          </div>

          <button className={styles.submit_btn}>Login</button>

          <p style={{ textAlign: "center", fontSize: "0.7rem" }}>
            Don&apos;t have an account?{" "}
            <span style={{ color: "var(--primary-color)", cursor: "pointer" }}>
              Register
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
