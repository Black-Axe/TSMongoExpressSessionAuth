import React, {useState, useEffect} from "react";
import useDocumentTitle from "../components/useDocumentTitle/useDocumentTitle.js";
import { Link } from "react-router-dom";
import ResetForm from "../components/ResetPassForm/ResetForm.js";
import genericLogo from "./images/logo/genericLogo.png";
import {useParams} from "react-router-dom";

const ResetPage = () => {
      let {resettoken} = useParams();
      console.log(resettoken);
  const [parentError, setParentError] = useState("");

  useDocumentTitle("Reset Password");
  return (
    <div className="main-page-wrapper p0">
      <div className="user-data-page clearfix d-lg-flex">
        <div className="illustration-wrapper d-flex align-items-center justify-content-between flex-column">
          <h3 className="font-rubik">
            Reset Password {
              
              
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
              
              Password Reset Form
              
            </p>
            <p className="login-err">{parentError? parentError : ""}</p>
          </div>

          <ResetForm setParentError={setParentError}/>
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

export default ResetPage;
