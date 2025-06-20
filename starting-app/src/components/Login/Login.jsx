import { useState } from "react";
import "./Login.css";
import * as React from "react";
import Button from "@mui/material/Button";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useForm } from "react-hook-form";
import { loginUser } from "../../services/UserService";
import { CircularProgress, Alert, AlertTitle } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Login({ auth, setAuth, setValue }) {

  const [visible, isVisible] = useState(false);
  const [type, setType] = useState("password");
  const [loading, isLoading] = useState(false);
  const [Authenticated, setAuthenticated] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    const response = await loginUser(data);
    if (response.status == "success") {
      localStorage.setItem("token", response.token);
      showMessage(response.message, response.status);
      setTimeout(function () {
        navigate('/home');
      }, 3000)
    } else {
      showMessage(response.message, response.status);
    }
  }

  function showMessage(message, type) {
    if (type == "success") {
      isLoading(false);
      setAuthenticated(type);
      setMessage(message);
      setTimeout(function () {
        setValue(1);
        setAuth(false);
      }, 3000)
    } else if (type == "error") {
      isLoading(false);
      setAuthenticated(type);
      setMessage(message);
    }
  }

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
      <form onSubmit={handleSubmit(onSubmit)} className="follow-container">
        <div className="title-container">
          <h2>Login</h2>
          <p>Welcome back! please enter your credentials. </p>
        </div>
        <div className="register-container">
          <div className="regiser-flex-input">
            <p>Email</p>
            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email Address is required",

              })}
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && <p role="alert">{errors.email.message}</p>}
          </div>

          <div className="regiser-flex-input">
            <p>Password</p>
            <input
              type={type}
              placeholder="Password"
              {...register("password", {
                pattern: "(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}",
                required: "Password is required",
                minLength: { value: 8, message: "Password must be at least 8 characters" },
              })}
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password && <p role="alert">{errors.password.message}</p>}
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
              SignUp
            </a>
          </p>
        </div>
        <Button
          className="register-button"
          variant="contained"
          type="submit"
          disabled={loading}
        >
          {loading ? <CircularProgress color="inherit" size={24} /> : "Sign In"}
        </Button>{" "}

      </form>

      {
        Authenticated == "success" && message.length > 0 && <Alert className="alert-success" variant="standard" color={Authenticated} severity="success">
          {message}</Alert>
      }
      {
        Authenticated == "error" && message.length > 0 && <Alert className="alert-success" variant="standard" color={Authenticated} severity="error">
          {message}
        </Alert>
      }
    </>
  );
}

export default Login;
