import React, { useState } from "react";
import isEmpty from "validator/lib/isEmpty";
import isEmail from "validator/lib/isEmail";
import { showErrorMessage, showSuccessMessage } from "../helpers/messages";
import { showLoading } from "../helpers/loading";
//import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { sendbookingform } from "../api/auth";

const BookingVisit = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    datevisit: "",
  });
  const { name, surname, email, datevisit, successMsg, errorMsg, loading } =
    formData;

  //event handlers
  // const [selectedDate, setSelectedDate] = useState(null);
  // const handleDataChange = (date) => setSelectedDate(date);

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

    //client side validationand

    if (
      isEmpty(name) ||
      isEmpty(surname) ||
      isEmpty(email) ||
      isEmpty(datevisit)
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
    } else {
      const { name, surname, email, datevisit } = formData;

      const data = {
        name,
        surname,
        email,
        datevisit,
      };

      setFormData({ ...formData, loading: true });

      console.log(datevisit);

      sendbookingform(data)
        .then((response) => {
          console.log("Axios sendbookingform success: ", response);
          setFormData({
            name: "",
            surname: "",
            email: "",
            datevisit: "",
            successMsg: response.data.successMessage,
          });
        })
        .catch((err) => {
          console.log("Axios sendbookingform error: ", err);
          setFormData({
            ...formData,
            loading: false,
            errorMsg: err.response.data.errorMessage,
          });
        });
    }
  };

  const ShowBookingForm = () => {
    // let handleColor = (time) => {
    //   return time.getHours() > 12 ? "text-success" : "text-error";
    // };
    return (
      <form className="signup-form" onSubmit={handleSubmit} noValidate>
        <div className="form-group input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fa-solid fa-user"></i>
            </span>
          </div>

          <input
            name="name"
            value={name}
            className="form-control"
            placeholder="Name"
            type="text"
            onChange={handleChange}
          />
        </div>
        <div className="form-group input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fa-solid fa-user"></i>
            </span>
          </div>
          <input
            name="surname"
            value={surname}
            className="form-control"
            placeholder="Surname"
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
            placeholder="Email"
            type="email"
            onChange={handleChange}
          />
        </div>
        <div className="form-group input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i class="fa-solid fa-calendar"></i>
            </span>
          </div>
          <div>
            <input
              name="datevisit"
              value={datevisit}
              className="form-control"
              placeholder="date"
              type="datetime-local"
              onChange={handleChange}
            />
            {/* <input
              type="datetime-local"
              value={datevisit}
              onChange={handleDataChange}
              format="yyyy-MM-dd"
            /> */}
          </div>
        </div>
        <div className="form-group input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i class="fa-solid fa-calendar"></i>
            </span>
          </div>
          <div>
            {/* <select className="form-control"
            onChange={handleChange}>


            </select>
            */}
          </div>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary btn-block">
            Wyślij
          </button>
        </div>
      </form>
    );
  };

  //render
  return (
    <div>
      <div className="about-container">
        <div className="row px-3 vh-100">
          <div className="col-md-5 mx-auto align-self-center">
            {successMsg && showSuccessMessage(successMsg)}
            {errorMsg && showErrorMessage(errorMsg)}
            {loading && (
              <div className="text-center pb-4">{showLoading(loading)}</div>
            )}
            {ShowBookingForm()}
          </div>
        </div>
      </div>
      <div class="footer-copyright text-center py-3 mt-auto">
        © 2022 Created by: Andrzej Łęgowik
      </div>
    </div>
  );
};

export default BookingVisit;
