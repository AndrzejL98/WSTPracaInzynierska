import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useHistory } from "react-router-dom";

function PasswordForm(props) {
  const [inputField, setInputField] = useState({
    otpCode: "",
    password: "",
    cpassword: "",
  });
  const history = useHistory();
  const [errField, setErrField] = useState({
    otpCodeErr: "",
    passwordErr: "",
    cpasswordErr: "",
  });
  const validForm = () => {
    let formValid = true;
    setErrField({
      otpCodeErr: "",
      passwordErr: "",
      cpasswordErr: "",
    });
    if (inputField.otpCode === "") {
      formValid = false;
      setErrField((prevState) => ({
        ...prevState,
        otpCodeErr: "Please Enter Email",
      }));
    }
    if (inputField.password === "") {
      formValid = false;
      setErrField((prevState) => ({
        ...prevState,
        passwordErr: "Please Enter Password",
      }));
    }
    if (inputField.cpassword === "") {
      formValid = false;
      setErrField((prevState) => ({
        ...prevState,
        cpasswordErr: "Please Enter Confirm Password",
      }));
    }
    if (
      inputField.cpassword !== "" &&
      inputField.password !== inputField.cpassword
    ) {
      formValid = false;
      setErrField((prevState) => ({
        ...prevState,
        emailErr: "Password are not matched",
      }));
    }
    return formValid;
  };
  const inputHandler = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };
  const submitButton = async () => {
    if (validForm()) {
      Object.assign(inputField, props);
      let url = `${process.env.REACT_APP_BASEURL}/api/auth/change-password`;
      let options = {
        method: "POST",
        url: url,
        data: inputField,
      };
      try {
        let response = await axios(options);
        //console.log(response);
        if (response.data.statusText === "Success") {
          toast.success(response.data.message);
          //history.push("/signin");
        } else {
          toast.error(response.data.message);
        }
      } catch (e) {
        toast.error("Something Went Wrong");
      }
    } else {
      toast.error("Form Invalid!");
    }
  };
  const changePassword = async () => {
    history.push("/reset-password");
  };
  return (
    <div className="row px-5 py-6  vh-100">
      <div className="col-md-5  mx-auto align-self-center">
        <form className="signup-form" noValidate>
          <div className="form-group input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i class="fa-solid fa-key"></i>
              </span>
            </div>

            <input
              type="email"
              name="otpCode"
              maxLength="4"
              className="form-control"
              placeholder="OtpCode"
              autoComplete="off"
              value={inputField.otpCode}
              onChange={inputHandler}
            />
            {errField.otpCodeErr.length > 0 && (
              <span className="error" style={{ color: "red" }}>
                {errField.otpCodeErr}
              </span>
            )}
          </div>
          <div className="form-group input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fa fa-lock"></i>
              </span>
            </div>

            <input
              name="password"
              className="form-control"
              placeholder="Password"
              type="password"
              autoComplete="off"
              value={inputField.password}
              onChange={inputHandler}
            />
            {errField.passwordErr.length > 0 && (
              <span className="error" style={{ color: "red" }}>
                {errField.passwordErr}
              </span>
            )}
          </div>
          <div className="form-group input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fa fa-lock"></i>
              </span>
            </div>
            <input
              name="cpassword"
              className="form-control"
              placeholder="Confirm Password"
              type="password"
              autoComplete="off"
              value={inputField.cpassword}
              onChange={inputHandler}
            />
            {errField.cpasswordErr.length > 0 && (
              <span className="error" style={{ color: "red" }}>
                {errField.cpasswordErr}
              </span>
            )}
          </div>
          <div className="form-group">
            <button
              type="button"
              className="btn btn-primary btn-block"
              onClick={submitButton}
            >
              Change Password
            </button>
            &nbsp;
            <Link to="/signin">
              <button type="button" className="btn btn-success">
                Back
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PasswordForm;
