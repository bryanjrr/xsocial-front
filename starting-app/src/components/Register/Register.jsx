import { useState } from "react";
import "./Register.css";
import * as React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useForm } from "react-hook-form";

function Register({ setAuth, setValue }) {
  const [visible, isVisible] = useState(0);
  const [type, setType] = useState("password");

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

  const onSubmit = (data) => {
    /* Hacer consulta a backend */
    alert(JSON.stringify(data));
  };

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
                  pattern: /^[A-Za-z]+$/i,
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
          disableElevation
          type="submit"
        >
          SignUp
        </Button>{" "}
      </form>
    </>
  );
}

export default Register;
