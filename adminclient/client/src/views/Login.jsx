import React, {useState} from "react";
import useDocumentTitle from "../components/useDocumentTitle/useDocumentTitle.js";
import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm/LoginForm.js";
import genericLogo from "./images/logo/genericLogo.png";
import { useSelector } from 'react-redux';

const Login = () => {
  const [parentError, setParentError] = useState("");

  useDocumentTitle("Login");
  return (
    <div className="main-page-wrapper p0">
      <div className="user-data-page clearfix d-lg-flex">
        <div className="illustration-wrapper d-flex align-items-center justify-content-between flex-column">
          <h3 className="font-rubik">
            Welcome back, {
              
              
            }
            
            
          </h3>
          <div className="illustration-holder">
           
          </div>
        </div>
        {/* /.illustration-wrapper */}

        <div className="form-wrapper">
          <div className="d-flex justify-content-between">
            <div className="logo">
   
              <Link to="/">
                <img src={genericLogo} alt="logo" />
              </Link>
            </div>
            
            <Link
              className="font-rubik go-back-button"
              to="/"
            >
              Go to home
            </Link>
          </div>
          <div className="mt-80 md-mt-40">
            <h2 className="blueify">
              Company
            </h2>
            <p className="header-info pt-30 pb-50">
              
               <Link to="/signup">Sign Up</Link>
              
            </p>
            <p className="login-err">{parentError? parentError : ""}</p>
          </div>

          <LoginForm setParentError={setParentError}/>
          {/* Login Form End */}
          <p className="text-center font-rubik copyright-text">
            Copyright @{new Date().getFullYear()}{" "}
           
              Company
           
            
          </p>
        </div>
        {/* /.form-wrapper */}
      </div>
      {/* /.user-data-page */}
    </div>
  );
};

export default Login;
