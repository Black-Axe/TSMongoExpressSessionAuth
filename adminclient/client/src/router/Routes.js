import React, {useEffect, useState} from "react";

import Login from "../views/Login";
import Home from "../views/Home";

import SignUp from "../views/SignUp";

import UserPage from "../views/UserPage";
import ResetPage from "../views/ResetPage";
import ForgotPassword from "../views/ForgotPassword";
import { useAuth } from "../context/Auth.context";
 

import { BrowserRouter, BrowserRouter as Router, Route, Routes, Navigate , Link} from "react-router-dom";
//import RequireAuth from "../Private/RequireAuth";


const AllRoutes = () => {
  const {isAuthenticated} = useAuth();

  function RequireAuth({children}) {
    console.log("user is requiring an authenticed route with an auth state of " + isAuthenticated);
    return isAuthenticated ? children : <Navigate to="/login"  replace/>;
  }

  function LoggedIn({children}) {
    console.log("checking if user is already logged in, if so will redirect to profile, is user logged in ? " + isAuthenticated);
    return isAuthenticated ? <Navigate to="/user" replace/> : children;
    
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
                <Route path="/signup" element={
                <LoggedIn><SignUp /></LoggedIn>
                        } />
                <Route path="/register" element={<LoggedIn><SignUp /></LoggedIn>} />
                <Route path="/user" element={
                        <RequireAuth children={<UserPage />} />
                } />
                <Route path="/profile" element={
                        <RequireAuth children={<UserPage />} />
                } />

                <Route path="forgotpassword" element={<ForgotPassword />} />

                <Route path="/reset/:resettoken" element={<ResetPage />} />
                <Route path ="/passwordSuccess" element={
                  <>
                        <h2>Succesfully reset password</h2>
                        <Link to="/">Login</Link>
                  </>
                } />
                <Route path="/*" element={<Home />} />

            </Routes>
        </BrowserRouter>
    </>
  );
}

export default AllRoutes;

 