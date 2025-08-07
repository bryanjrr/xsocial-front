import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Tweet from "./components/Tweet/Tweet";
import Following from "./components/Following/Following";
import AppRoutes from "./routes/AppRoutes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { setAuthToken } from "./services/ConfigService";
function App() {
  return (
    <>
      <div className="container">
        <AppRoutes>
        </AppRoutes>
      </div>

    </>
  );
}

export default App;
