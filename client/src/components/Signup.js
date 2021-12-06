import React, { useState } from "react";
import isEmpty from "validator/lib/isEmpty";
import isEmail from "validator/lib/isEmail";
import equals from "validator/lib/equals";
import { showErrorMessage, showSuccessMessage } from "../helpers/messages";
import { showLoading } from "../helpers/loading";
import { Link } from "react-router-dom";
import "./Signup.css";
import { signup } from "../api/auth";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    successMsg: false,
    errorMsg: false,
    loading: false,
  });
  const {
    username,
    email,
    password,
    password2,
    successMsg,
    errorMsg,
    loading,
  } = formData;

  //event handlers
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      successMsg: "",
      errorMsg: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //client-side validation
    if (
      isEmpty(username) ||
      isEmpty(email) ||
      isEmpty(password) ||
      isEmpty(password2)
    ) {
      setFormData({
        ...formData,
        errorMsg: "All fields are required",
      });
    } else if (!isEmail(email)) {
      setFormData({
        ...formData,
        errorMsg: "Invalid email",
      });
    } else if (!equals(password, password2)) {
      setFormData({
        ...formData,
        errorMsg: "Passwords do not match",
      });
    } else {
      const { username, email, password } = formData;
      const data = { username, email, password };

      setFormData({ ...formData, loading: true });

      signup(data)
        .then((response) => {
          console.log("Axios signup success: ", response);
          setFormData({
            username: "",
            email: "",
            password: "",
            password2: "",
            loading: false,
            successMsg: response.data.successMessage,
          });
        })
        .catch((err) => {
          console.log("Axios signup error: ", err);
          setFormData({
            ...formData,
            loading: false,
            errorMsg: err.response.data.errorMessage,
          });
        });
    }
  };

  //vievs
  const showSignUpForm = () => {
    return (
      <form className="signup-form" onSubmit={handleSubmit} noValidate>
        <div className="form-group input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fa fa-user"></i>
            </span>
          </div>
          <input
            name="username"
            value={username}
            className="form-control"
            placeholder="Username"
            type="text"
            onChange={handleChange}
          />
        </div>
        <div className="form-group input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fa fa-envelope"></i>
            </span>
          </div>
          <input
            name="email"
            value={email}
            className="form-control"
            placeholder="Email address"
            type="email"
            onChange={handleChange}
          />
        </div>
        <div className="form-group input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fa fa-lock"></i>
            </span>
          </div>
          <input
            name="password"
            value={password}
            className="form-control"
            placeholder="Create password"
            type="password"
            onChange={handleChange}
          />
        </div>
        <div className="form-group input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fa fa-lock"></i>
            </span>
          </div>
          <input
            name="password2"
            value={password2}
            className="form-control"
            placeholder="Confirm password"
            type="password"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary btn-block">
            Signup
          </button>
        </div>
        <p className="text-center text-white">
          Have an account? <Link to="/signin">Log In</Link>
        </p>
      </form>
    );
  };

  //render
  return (
    <div className="signup-container">
      <div className="row px-2 vh-100">
        <div className="col-md-5 mx-auto align-self-center">
          {successMsg && showSuccessMessage(successMsg)}
          {errorMsg && showErrorMessage(errorMsg)}
          {loading && (
            <div className="text-center pb-4">{showLoading(loading)}</div>
          )}
          {showSignUpForm()}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
