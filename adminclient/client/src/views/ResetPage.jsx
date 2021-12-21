import React, {useState, useEffect} from "react";
import useDocumentTitle from "../components/useDocumentTitle/useDocumentTitle.js";
import { Link, useNavigate } from "react-router-dom";
import ResetForm from "../components/ResetPassForm/ResetForm.js";
import genericLogo from "./images/logo/genericLogo.png";
import {useParams} from "react-router-dom";

let APIURL = process.env.REACT_APP_API_VERIFY_RESET;

const ResetPage = () => {
      const [loading, setLoading] = useState(true);
      let {resettoken} = useParams();
      const navigate = useNavigate();
      const [parentError, setParentError] = useState("");
      useEffect(() => {
        //validate the token from the server
        async function validateToken() {
          const response = await fetch(`${APIURL}/${resettoken}`);
          const data = await response.json();
          if (data.error) {
            console.log(data.error);
            navigate("/");
          }
          console.log(data);
          setLoading(false);
          
        }
        validateToken();

      } , [resettoken]);

  useDocumentTitle("Reset Password");
  return loading ? (
    <>
    <h2>loading</h2>
    </>
    ) 
    : (
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
              Forgot Password?
            </h2>
            <p className="header-info pt-30 pb-50">
              
              Password Reset Form
              
            </p>
            <p className="login-err">{parentError? parentError : ""}</p>
          </div>

          <ResetForm setParentError={setParentError} resetToken={resettoken}/>
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
