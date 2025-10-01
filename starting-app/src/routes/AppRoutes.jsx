import { useState } from "react";
import { BrowserRouter, Routes, Route, Router, Navigate } from "react-router-dom";
import Home from "../pages/Home/Home";
import Profile from "../pages/Profile/Profile";
import Auth from "../pages/Auth/Auth";
import Settings from "../pages/Settings/Settings";
import FeedThreads from "../pages/Feed/FeedThreads";

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/feed" element={<FeedThreads />} />
        {/*  {
    path: "*", 
    element: <NotFoundPage />
  } */}
      </Routes>
    </>
  );
}

export default AppRoutes;
