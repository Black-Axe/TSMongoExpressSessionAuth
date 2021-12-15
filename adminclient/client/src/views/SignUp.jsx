import React from "react";
import useDocumentTitle from "../components/useDocumentTitle/useDocumentTitle.js";
import { Link } from "react-router-dom";
import SignUpForm from "../components/SignUpForm/SignUpForm.jsx";
import genericLogo from "./images/logo/genericLogo.png";

const SignUp = () => {
  useDocumentTitle("Sign Up");
  return (
    <div className="main-page-wrapper p0">
      <div className="user-data-page clearfix d-lg-flex">
        <div className="illustration-wrapper d-flex align-items-center justify-content-between flex-column">
          <h3 className="font-rubik">
            We have a “strategic” plan its <br /> called doing things.
          </h3>
          <div className="illustration-holder">
           
          </div>
        </div>
        {/* /.illustration-wrapper  */}

        <div className="form-wrapper">
          <div className="d-flex justify-content-between">
            <div className="logo">
              <Link to="/">
                <img src={genericLogo} alt="logo" />
              </Link>
            </div>
            <Link className="font-rubik go-back-button" to="/">
              Go to home
            </Link>
          </div>
          {/* End d-flex */}
          <div className="mt-30">
            <h2 className="greenme">Join.</h2>
            <p className="header-info pt-30 pb-50 greenme">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
          <SignUpForm />
          {/* End Signup Form */}
          <p className="text-center font-rubik copyright-text">
            Copyright @{new Date().getFullYear()}{" "}
           Copmany
          </p>
          {/* End .copyright */}
        </div>
        {/* /.form-wrapper */}
      </div>
      {/* /.user-data-page */}
    </div>
  );
};

export default SignUp;
