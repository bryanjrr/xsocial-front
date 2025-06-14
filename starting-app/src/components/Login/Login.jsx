import { useState } from "react";
import "./Login.css";
import * as React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

function Login({ auth, setAuth, setValue }) {
  const [count, setCount] = useState(0);

  const [visible, isVisible] = useState(1);
  const [type, setType] = useState("");

  function handleVisible() {
    if (type == "password") {
      setType("text");
      isVisible(true);
    } else {
      setType("password");
      isVisible(false);
    }
  }

  return (
    <>
      <section className="follow-container">
        <div className="title-container">
          <h2>Login</h2>
          <p>Welcome back! please enter your credentials. </p>
        </div>
        <div className="register-container">
          <div className="regiser-flex-input">
            <p>Email</p>
            <input type="email" placeholder="Email" />
          </div>

          <div className="regiser-flex-input">
            <p>Password</p>
            <input type={type} placeholder="Password" />
            {visible ? (
              <RemoveRedEyeIcon
                className="regiser-flex-input-icon"
                onClick={handleVisible}
              />
            ) : (
              <VisibilityOffIcon
                className="regiser-flex-input-icon"
                onClick={handleVisible}
              />
            )}
          </div>
        </div>
        <div className="forgot-container">
          <p>
            Dont have an account?{" "}
            <a className="SignIn" onClick={() => setAuth(true) & setValue(0)}>
              Sign Up
            </a>
          </p>
        </div>
        <Button
          className="register-button"
          variant="contained"
          disableElevation
        >
          LogIn
        </Button>{" "}
      </section>
    </>
  );
}

export default Login;
