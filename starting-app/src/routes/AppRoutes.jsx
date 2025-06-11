import { useState } from "react";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Home from "../pages/Home/Home";

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
