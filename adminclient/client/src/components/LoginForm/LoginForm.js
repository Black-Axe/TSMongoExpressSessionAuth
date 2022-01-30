import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";


import * as Yup from "yup";
import viewImg from "../img/view.svg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth.context";

const LoginForm = ({ setParentError }) => {
  const navigate = useNavigate();
  const { login } = useAuth();


  // for password show hide
  const [passwordShown, setPasswordShown] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };




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

  async function onSubmit(data, e) {
    console.log("dispatching login from context");
    let username = data.username;
    let password = data.password;
    let keepMeLoggedIn = rememberMe;
    let response = await login(username, password, keepMeLoggedIn);
    console.log(response);
    if (response.error) {
      setParentError(response.error);
    }
    else {
      console.log("setting current user");
      setParentError("");
      navigate("/user");

    }

  }

  function handleRemember(e) {
    setRememberMe(e.target.checked);
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
               
                <input type="checkbox" id="remember" onChange={handleRemember}/>
                
                <label htmlFor="remember">Keep me logged in</label>
               
              </div>
            </div>
            
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
