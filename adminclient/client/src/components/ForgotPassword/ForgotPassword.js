import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";


import * as Yup from "yup";
import viewImg from "../img/view.svg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth.context";

let FORGOTLINK = process.env.REACT_APP_API_FORGOT_PASSWORD;

const ForgotPassword = ({ setParentError }) => {
      const navigate = useNavigate();
      const { login } = useAuth();
      const [message, setMessage] = useState("");
      const [loading, setLoading] = useState(false);




      // for validation we check if its either a username string or email string
      const validationSchema = Yup.object().shape({
            'username': Yup.string()
                  .when('email', {
                        is: (email) => !email || email.length === 0,
                        then: Yup.string().required('At least one of the fields is required'),
                  }),
            'email': Yup.string()
                  .when('username', {
                        is: (username) => !username || username.length === 0,
                        then: Yup.string().email('Invalid email address').required('Email is required'),
                  })
      }, ['username', 'email']) // <-- HERE!!!!!!!!

      const formOptions = { resolver: yupResolver(validationSchema) };
      // get functions to build form with useForm() hook
      const { register, handleSubmit, formState } = useForm(formOptions);
      const { errors } = formState;

      async function onSubmit(data, e) {
            console.log("dispatching password reset request");
            console.log(data);
            setLoading(true);

            const response = await fetch(FORGOTLINK, {
                  method: "POST",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  body: JSON.stringify(data),
            });
            const json = await response.json();
            console.log(json);
            setLoading(false);
            setMessage(json.message);



      }
      return loading ?
            <>
                  <h1>Loading...</h1>
            </>
            :
            message ?
            <>
                  <h5 className="redify">{message}</h5>
                  <br />
                  <br />
            </>
            :
            (
                  <>

                        <form onSubmit={handleSubmit(onSubmit)} className="user-data-form ">
                              <div className="row">
                                    <div className="col-12">

                                          <div className="input-group-meta mb-80 sm-mb-70">
                                                <label>Email</label>
                                                {<p className="form-error">{errors.email?.message}</p>}
                                                <input
                                                      placeholder="Enter Your email"
                                                      type="text"
                                                      {...register("email")}
                                                      className={` ${errors.email ? "is-invalid" : ""}`}
                                                />
                                          </div>
                                    </div>

                                    <div className="col-12">
                                          <div className="input-group-meta mb-80 sm-mb-70">

                                                <h2 className="blueify">OR</h2>
                                          </div>
                                    </div>
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
                                          <button className="theme-btn-one mt-50 mb-50">Email Reset link</button>
                                    </div>
                              </div>
                        </form>
                  </>
            );
};

export default ForgotPassword;
