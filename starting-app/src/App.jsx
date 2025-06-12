import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Tweet from "./components/Tweet/Tweet";
import Following from "./components/Following/Following";
import AppRoutes from "./routes/AppRoutes";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <AppRoutes></AppRoutes>
    </>
  );
}

export default App;
