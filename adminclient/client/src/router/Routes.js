import React, {useEffect, useState} from "react";

import Login from "../views/Login";
import Home from "../views/Home";

import SignUp from "../views/SignUp";

import UserPage from "../views/UserPage";
import {profile} from "../services/AuthService";
import { useAuth } from "../context/Auth";
 

import { BrowserRouter, BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
//import RequireAuth from "../Private/RequireAuth";


const AllRoutes = () => {
  const {isAuthenticated} = useAuth();

  function RequireAuth({children}) {
    return isAuthenticated ? children : <Navigate to="/login"  replace/>;
  }

  function LoggedIn({children}) {
    return isAuthenticated ? <Navigate to="/user"/> : children;
  }
  
 

  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={
                          
                          <LoggedIn>
                            <Login />
                          </LoggedIn>
                          
                          } />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/user" element={
                        <RequireAuth children={<UserPage />} />
                } />
                <Route path="/profile" element={
                        <RequireAuth children={<UserPage />} />
                } />
            </Routes>
        </BrowserRouter>
    </>
  );
}

export default AllRoutes;

 