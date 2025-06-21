import { useState } from "react";
import "./Register.css";
import * as React from "react";
import Button from "@mui/material/Button";
import { Link, Navigate, useNavigate } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useForm } from "react-hook-form";
import { registerUser } from "../../services/UserService";
import { CircularProgress, Alert, AlertTitle } from "@mui/material";


function Register({ setAuth, setValue }) {
  const [visible, isVisible] = useState(false);
  const [type, setType] = useState("password");
  const [loading, isLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [Authenticated, setAuthenticated] = useState("");
  const navigate = useNavigate()


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  function handleVisible() {
    if (type == "password") {
      setType("text");
      isVisible(true);
    } else {
      setType("password");
      isVisible(false);
    }
  }

  async function onSubmit(data) {
    /* Hacer consulta a backend */
    isLoading(true);
    let response = await registerUser(data);
    if (response.status == "success") {
      showMessage(response.message, response.status);
    } else if (response.status == "error") {
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

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="follow-container">
        <div className="title-container">
          <h2>Create an Account</h2>
          <p>Sign up now and start connecting with others! </p>
        </div>
        <div className="register-container">
          <div className="regiser-flex">
            <div className="regiser-flex-input">
              <p>Name</p>
              <input
                type="text"
                placeholder="Name"
                {...register("name", {
                  required: "Name is required",
                  pattern: /^[A-Za-z]+$/i,
                })}
                aria-invalid={errors.name ? "true" : "false"}
              />
              {errors.name && <p role="alert">{errors.name.message}</p>}
            </div>

            <div className="regiser-flex-input">
              <p>Surname</p>
              <input
                type="text"
                placeholder="Surname"
                {...register("surname", {
                  required: "Surname is required",
                })}
                aria-invalid={errors.surname ? "true" : "false"}
              />
              {errors.surname && <p role="alert">{errors.surname.message}</p>}
            </div>
          </div>

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
            <p>Username</p>
            <input
              type="text"
              placeholder="Username"
              {...register("username", {
                pattern: { value: /^[A-Za-z]+$/i, message: "Username must not contain special characters" },
                required: "Username is required",
                minLength: { value: 4, message: "Username must be at least 4 characters" },
              })}
              aria-invalid={errors.username ? "true" : "false"}
            />
            {errors.username && <p role="alert">{errors.username.message}</p>}
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
            Alredy have an account?{" "}
            <a className="SignIn" onClick={() => setAuth(false) & setValue(1)}>
              Sign In
            </a>
          </p>
        </div>
        <Button
          className="register-button"
          variant="contained"
          type="submit"
          disabled={loading}
        >
          {loading ? <CircularProgress color="inherit" size={24} /> : "Sign Up"}
        </Button>{" "}
      </form>
      {Authenticated == "success" && message.length > 0 && <Alert className="alert-success" variant="standard" color={Authenticated} severity="success">
        {message}</Alert>}
      {Authenticated == "error" && message.length > 0 && <Alert className="alert-success" variant="standard" color={Authenticated} severity="error">
        {message}
      </Alert>}


    </>
  );

}
export default Register;
