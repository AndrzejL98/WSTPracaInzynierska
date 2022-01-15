import React, { useState } from "react";
import isEmpty from "validator/lib/isEmpty";
import isEmail from "validator/lib/isEmail";
import { showErrorMessage, showSuccessMessage } from "../helpers/messages";
import { showLoading } from "../helpers/loading";
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
  //  const [selectedDate, setSelectedDate] = useState(null);
  //  const handleDataChange = (date) => setSelectedDate(date);

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
      // console.log(data);
      // console.log(worker.value);
      // console.log(service.value);

      sendbookingform(data)
        .then((response) => {
          //console.log("Axios sendbookingform success: ", response);
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
          // console.log("Axios sendbookingform error: ", err);
          setFormData({
            ...formData,
            loading: false,
            errorMsg: err.response.data.errorMessage,
          });
        });
    }
  };

  // let picker = document.getElementById("startDate");
  // picker.addEventListener("input", function (e) {
  //   var day = new Date(this.value).getUTCDay();
  //   if ([6, 0].includes(day)) {
  //     e.preventDefault();
  //     this.value = "";
  //     alert("Weekends are not allowed");
  //   }
  // });

  const ShowBookingForm = () => {
    // let handleColor = (time) => {
    //   return time.getHours() > 12 ? "text-success" : "text-error";
    // };

    // const getName = (e) => {
    //   return this.setState({ datevisit: e.target.getAttribute("name") });
    // };

    // const validate = (e) => {
    //   const inputName = this.state.currentName;
    // };
    //const inputName = this.state.currentName
    // const minHour = (value) => {
    //   let curval = value.replace("T", " ").slice(11);
    //   console.log(curval);
    //   let hours = curval.slice(0, -3).toString();
    //   if (parseInt(hours) < 8 || parseInt(hours) > 20) {
    //     setFormData({
    //       ...formData,
    //       errorMsg: "Salon otwarty od 8:00 do 20:00",
    //     });
    //   }
    // };

    //console.log(dateInput);
    // let minDate = new Date().toLocaleString();
    // minDate = Date.now();
    // console.log(minDate);
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
              input={true}
              name="datevisit"
              //selected={selectedDate}
              //onFocus={getName.bind(this)}
              value={datevisit}
              min={new Date().toISOString().slice(0, -8)}
              max="2137-02-20T20:20"
              //default={Date.now()}
              className="form-control"
              name="datevisit"
              value={datevisit}
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
              <option value="Denis">Denis</option>
              <option value="Carlos">Carlos</option>
              <option value="Ricardo-Milos">Ricardo</option>
              <option value="Dima">Dima</option>
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
              <option value="Haircut 12$">Haircut 12$</option>
              <option value="Shaving hair 6$">Shaving hair 6$</option>
              <option value="Hair dyeing 16$">Hair dyeing 16$</option>
              <option value="Trimming the beard 11$">
                Trimming the beard 11$
              </option>
              <option value="Beard care 7$">Beard care 7$</option>
              <option value="Combo: Haircut + Trimming the beard 18$">
                Combo: Haircut + Trimming the beard 18$
              </option>
              <option value="Sznur 5$">
                Combo: Haircut + Trimming the beard 18$
              </option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary btn-block">
            Send
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
      <div className="footer-copyright text-center py-3 mt-auto">
        © 2022 Created by: Andrzej Łęgowik
      </div>
    </div>
  );
};

export default BookingVisit;
