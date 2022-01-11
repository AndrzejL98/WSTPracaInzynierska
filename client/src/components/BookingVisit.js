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
    worker: "",
    service: "",
  });
  const {
    name,
    surname,
    email,
    datevisit,
    worker,
    service,
    successMsg,
    errorMsg,
    loading,
  } = formData;

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
      isEmpty(datevisit) ||
      isEmpty(worker) ||
      isEmpty(service)
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
      const { name, surname, email, datevisit, worker, service } = formData;

      const data = {
        name,
        surname,
        email,
        datevisit,
        worker,
        service,
      };

      setFormData({ ...formData, loading: true });
      console.log(data);
      console.log(worker.value);
      console.log(service.value);

      sendbookingform(data)
        .then((response) => {
          console.log("Axios sendbookingform success: ", response);
          setFormData({
            name: "",
            surname: "",
            email: "",
            datevisit: "",
            worker: "",
            service: "",
            successMsg: response.data.successmessage,
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
              default={Date.now()}
              className="form-control"
              placeholder="date"
              type="datetime-local"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i class="fa-solid fa-calendar"></i>
            </span>
          </div>
          <div>
            <select
              className="form-control"
              name="worker"
              default={null}
              value={worker}
              aria-label="Default select example"
              onChange={handleChange}
            >
              <option value={null}></option>
              <option value="Tom">Tom</option>
              <option value="Lukas">Lukas</option>
              <option value="Chris">Chris</option>
              <option value="Pablo">Pablo</option>
            </select>
          </div>
        </div>
        <div className="form-group input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i class="fa-solid fa-calendar"></i>
            </span>
          </div>
          <div>
            <select
              className="form-control"
              name="service"
              default={null}
              value={service}
              aria-label="Default select example"
              onChange={handleChange}
            >
              <option value={null}></option>
              <option value="Strzyżenie włosów 45PLN">
                Strzyżenie włosów 45PLN
              </option>
              <option value="Golenie włosów 20PLN">Golenie włosów 20PLN</option>
              <option value="Farbowanie włosów 60PLN">
                Farbowanie włosów 60PLN
              </option>
              <option value="Trymowanie brody 40PLN">
                Trymowanie brody 40PLN
              </option>
              <option value="Pielęgnacja brody 25PLN">
                Pielęgnacja brody 25PLN
              </option>
              <option value="Combo: Strzyżenie włosów + Trymowanie bordy 70PLN">
                Combo: Strzyżenie włosów + Trymowanie bordy 70PLN
              </option>
            </select>
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
          <div className="col-md-6 mx-auto align-self-center">
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
