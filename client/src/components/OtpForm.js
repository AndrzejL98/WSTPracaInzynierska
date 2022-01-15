import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import PasswordForm from "./PasswordForm";

const OtpForm = () => {
  const emailRef = useRef();
  const [otpForm, showForm] = useState(true);
  const sendOtp = async () => {
    try {
      let url = `${process.env.REACT_APP_BASEURL}/api/auth/email-send`;
      let options = {
        method: "POST",
        url: url,
        data: { email: emailRef.current.value },
      };
      let response = await axios(options);
      let record = response.data;

      if (record.statusText === "Success") {
        toast.success(record.message);
        showForm(false);
      } else {
        toast.error(record.message);
      }
    } catch (e) {
      toast.error("Something Went Wrong!");
    }
  };
  return (
    <div className="Otp-container">
      <div className="row px-3 vh-100">
        <div className="col-md-5 mx-auto align-self-center">
          <ToastContainer />
          {otpForm ? (
            <form autoComplete="off" id="otpForm" method="post">
              <div className="mb-3">
                <div className="form-group input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa fa-envelope"></i>
                    </span>
                  </div>
                  <input
                    name="email"
                    className="form-control"
                    placeholder="Email address"
                    type="email"
                    ref={emailRef}
                  />
                </div>
              </div>
              <div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={sendOtp}
                >
                  Send OTP
                </button>
                &nbsp;
                <Link to="/signin">
                  <button type="button" className="btn btn-danger">
                    Back
                  </button>
                </Link>
              </div>
            </form>
          ) : (
            <PasswordForm email={emailRef.current.value} />
          )}
        </div>
      </div>
      <div className="footer-copyright text-center py-3 mt-auto">
        © 2022 Created by: Andrzej Łęgowik
      </div>
    </div>
  );
};

export default OtpForm;
