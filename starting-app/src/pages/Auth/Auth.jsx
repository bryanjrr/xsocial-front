import * as React from "react";
import { useState } from "react";
import viteLogo from "/vite.svg";
import "./Auth.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Register from "../../components/Register/Register";
import Login from "../../components/Login/Login";

function Auth() {
  const [count, setCount] = useState(0);
  const [value, setValue] = React.useState(0);
  const [auth, setAuth] = useState(true);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <section className="container">
        <article className="Auth-container">
          <div className="Logo-container">
            <h2>
              <span>X</span>sociaL
            </h2>
          </div>
          <nav>
            <Box sx={{ width: "100%" }} className="buttons-container">
              <Tabs
                onChange={handleChange}
                value={value}
                aria-label="Tabs where selection follows focus"
                selectionFollowsFocus
                className="custom-tabs"
              >
                <Tab
                  label="Register"
                  className="custom-tab"
                  onClick={() => setAuth(true)}
                />
                <Tab
                  label="Login"
                  className="custom-tab"
                  onClick={() => setAuth(false)}
                />
              </Tabs>
            </Box>
          </nav>
          <div className="formContainer">
            {auth ? (
              <Register setValue={setValue} setAuth={setAuth}></Register>
            ) : (
              <Login setValue={setValue} setAuth={setAuth}></Login>
            )}
          </div>
        </article>
        <div className="Logo-container"></div>
      </section>
    </>
  );
}

export default Auth;
