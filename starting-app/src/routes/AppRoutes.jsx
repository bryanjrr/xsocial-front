import { useState } from "react";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Home from "../pages/Home/Home";
import Profile from "../pages/Profile/Profile";
import Auth from "../pages/Auth/Auth";
import Settings from "../pages/Settings/Settings";

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/" element={<Auth />} />
        {/*  {
    path: "*", 
    element: <NotFoundPage />
  } */}
      </Routes>
    </>
  );
}

export default AppRoutes;
