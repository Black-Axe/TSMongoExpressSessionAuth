import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import viewImg from "../img/view.svg";
import {signup} from "../../services/AuthService";

const AdminSignup = ({setParentError}) => {

  // for password show hide
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  // for Re password show hide
  const [rePasswordShown, setRePasswordShown] = useState(false);
  const toggleRePasswordVisiblity = () => {
    setRePasswordShown(rePasswordShown ? false : true);
  };

  // for validation
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Entered value does not match email format"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    acceptTerms: Yup.bool().oneOf(
      [true],
      "Accept Terms and Conditions is required"
    ),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  async function onSubmit(data, e) {
    // display form data on success
    let email = data.email;
    let password = data.password;
    let username = data.username;
    let confirmPassword = data.confirmPassword;
    let response = await signup(email, password, username, confirmPassword);
    if(response.error){
      setParentError(response.message);
    }else{
      console.log(response);
    }
  }

  return (
    <>
      <form className="user-data-form " onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-12">
            <div className="input-group-meta mb-50">
              <label>Username</label>
              {<p className="form-error">{errors.username?.message}</p>}
              <input
                type="text"
                placeholder="Enter username"
                {...register("username")}
                className={` ${errors.name ? "is-invalid" : ""}`}
              />

            </div>
          </div>
          <div className="col-12">
            <div className="input-group-meta mb-50">
              <label>Email</label>
              {<p className="form-error">{errors.email?.message}</p>}
              <input
                placeholder="Enter Your Email"
                type="text"
                {...register("email")}
                className={` ${errors.email ? "is-invalid" : ""}`}
              />
            </div>
          </div>
          <div className="col-12">
            <div className="input-group-meta mb-50">
              <label>Password</label>
              {<p className="form-error">{errors.password?.message}</p>}
              <input
                placeholder="Enter Password"
                name="password"
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
                  <img src={viewImg} alt="" />
                </span>
              </span>
              {/* End placeholder icon */}
            </div>
          </div>
          <div className="col-12">
            <div className="input-group-meta mb-25">
              <label>Re-type Password</label>
              {<p className="form-error">{errors.confirmPassword?.message}</p>}
              <input
                placeholder="Enter Password"
                type={rePasswordShown ? "text" : "password"}
                {...register("confirmPassword")}
                className={` ${errors.confirmPassword ? "is-invalid" : ""}`}
              />
              <span
                className="placeholder_icon"
                onClick={toggleRePasswordVisiblity}
              >
                <span
                  className={
                    rePasswordShown ? "passVicon eye-slash" : "passVicon"
                  }
                >
                  <img src={viewImg} alt="" />
                </span>
              </span>
              {/* End placeholder icon */}
            </div>
          </div>
          <div className="col-12">
            <div className="agreement-checkbox d-flex justify-content-between align-items-center sm-mt-10">
              <div className="position-relative">
                <input
                  type="checkbox"
                  {...register("acceptTerms")}
                  id="acceptTerms"
                  className={` ${errors.acceptTerms ? "is-invalid" : ""}`}
                />

                <label htmlFor="acceptTerms greenme">
                  By clicking "SIGN UP" I agree to the Terms and Conditions and
                  Privacy Policy.
                </label>
                <p className="form-error">{errors.acceptTerms?.message}</p>
              </div>
            </div>
            {/* /.agreement-checkbox */}
          </div>
          <div className="col-12">
            <button type="submit" className="theme-btn-one mt-30 mb-50">
              Sign Up
            </button>
          </div>
          {/* End .col */}
        </div>
      </form>
    </>
  );
};

export default AdminSignup;
