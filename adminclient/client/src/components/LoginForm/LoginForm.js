import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {login} from "../../services/AuthService";
import * as Yup from "yup";
import viewImg from "../img/view.svg";


const LoginForm =  ({setParentError}) => {


  // for password show hide
  const [passwordShown, setPasswordShown] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  useEffect(() => {
    console.log("useEffect");
    console.log(login);
    console.log(setParentError);
   


    
  }
  , [])



  // for validation
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  console.log(errors);

  async function onSubmit(data, e) {
    // display form data on success
    
    console.log("Message submited: " + JSON.stringify(data));
    console.log("dispatching signIn action");
    let username = data.username;
    let password = data.password;
    console.log(username, password);
  //  login(name, email, password);
  let response = await login(username, password);
  console.log(response);
  console.log(response.error);
  if(response.error){
    setParentError(response.error);
  }
  else{
    setParentError("");
  }
  
  }

  return (
    <>
    
      <form onSubmit={handleSubmit(onSubmit)} className="user-data-form ">
        <div className="row">
          <div className="col-12">
            <div className="input-group-meta mb-80 sm-mb-70">
              <label>Username</label>
              {<p className="form-error">{errors.username?.message}</p>}
              <input
                placeholder="Enter Your Username"
                type="text"
                {...register("username")}
                className={` ${errors.username ? "is-invalid" : ""}`}
              />
            </div>
          </div>
          <div className="col-12">
            <div className="input-group-meta mb-25">
              <label>Password</label>
              {<p className="form-error">{errors.password?.message}</p>}
              <input
                placeholder="Enter Password"
                type={passwordShown ? "text" : "password"}
                {...register("password")}
                className={` ${errors.password ? "is-invalid" : ""}`}
              />
              <span
                className="placeholder_icon"
                onClick={togglePasswordVisiblity}
              >
                <span
                  className={
                    passwordShown ? "passVicon eye-slash" : "passVicon"
                  }
                >
                  <img src={viewImg} alt="ico" />
                </span>
              </span>
            </div>
          </div>
          <div className="col-12">
            <div className="agreement-checkbox d-flex justify-content-between align-items-center">
              <div>
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Keep me logged in</label>
              </div>
            </div>
            {/*  /.agreement-checkbox */}
          </div>
          <div className="col-12">
            <button className="theme-btn-one mt-50 mb-50">Login</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
