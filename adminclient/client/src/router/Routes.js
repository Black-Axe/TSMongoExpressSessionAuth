import React from "react";

import Login from "../views/Login";

import SignUp from "../views/SignUp";

import { BrowserRouter, BrowserRouter as Router, Route, Routes } from "react-router-dom";

const AllRoutes = () => {
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
            </Routes>
        </BrowserRouter>
    </>
  );
}

export default AllRoutes;