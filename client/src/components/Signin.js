import React, { useState, useEffect } from "react";
import isEmpty from "validator/lib/isEmpty";
import isEmail from "validator/lib/isEmail";
import { Link, useHistory } from "react-router-dom";
import { showErrorMessage } from "../helpers/messages";
import { showLoading } from "../helpers/loading";
import { setAuthentication, isAuthenticated } from "../helpers/auth";
import { signin } from "../api/auth";

const Signin = () => {
  let history = useHistory();

  useEffect(() => {
    if (isAuthenticated() && isAuthenticated().role === 1) {
      console.log("Redirect to Admin dashboard");
      history.push("/admin/dashboard");
    } else if (isAuthenticated() && isAuthenticated().role === 0) {
      console.log("Redirecting to user dashboard");
      history.push("/user/dashboard");
    }
  }, [history]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    errorMsg: false,
    loading: false,
  });
  const { email, password, errorMsg, loading } = formData;

  //eventHandlers
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      errorMsg: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEmpty(email) || isEmpty(password)) {
      setFormData({
        ...formData,
        errorMsg: "All fields are required",
      });
    } else if (!isEmail(email)) {
      setFormData({
        ...formData,
        errorMsg: "Invalid email",
      });
    } else {
      const { email, password } = formData;
      const data = { email, password };

      setFormData({ ...formData, loading: true });

      signin(data)
        .then((response) => {
          setAuthentication(response.data.token, response.data.user);

          if (isAuthenticated() && isAuthenticated().role === 1) {
            console.log("Redirect to Admin dashboard");
            history.push("/admin/dashboard");
          } else {
            console.log("Redirecting to user dashboard");
            history.push("/user/dashboard");
          }
        })
        .catch((err) => {
          console.log("signin api function error: ", err);
          setFormData({
            ...formData,
            loading: false,
            errorMsg: err.response.data.errorMessage,
          });
        });
    }
  };
  //vievs
  const showSignInForm = () => {
    return (
      <form className="signup-form" onSubmit={handleSubmit} noValidate>
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
            placeholder="Password"
            type="password"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary btn-block">
            Signin
          </button>
        </div>
        <p className="text-center text-white">
          Dom't have an account? <Link to="/signup">Register here</Link>
        </p>
      </form>
    );
  };

  //render
  return (
    <div className="signin-container">
      <div className="row px-3 vh-100">
        <div className="col-md-5 mx-auto align-self-center">
          {errorMsg && showErrorMessage(errorMsg)}
          {loading && (
            <div className="text-center pb-4">{showLoading(loading)}</div>
          )}
          {showSignInForm()}
        </div>
      </div>
    </div>
  );
};

export default Signin;
