import React, { Component } from "react";
import axios from "axios";

export class AdminDashboard extends Component {
  state = {
    showItems: [],
    // verified: "",
    _id: "",
    // role: "",
    username: "",
    email: "",
    name: "",
    surname: "",
    datevisit: "",
    worker: "",
    service: "",
    // password: "",
    // createdAt:'',
    // updatedAt, __v:'',
    users: [],
    bookings: [],
  };

  componentDidMount() {
    this.getBookings();
    this.getUsers();
  }

  getUsers = () => {
    const mail = "andrzejlegowik1@gmail.com";
    axios
      //.post("http://localhost:5000/api/auth/displayuser")
      .get(`http://${process.env.PORT}/api/auth/displayuser`)
      .then((response) => {
        //const mail = JSON.parse(localStorage.getItem("user")).email;
        console.log(mail);
        const data = response.data;
        //data.filter((user) => user.email === mail.email);
        this.setState({
          users: data,
        });
        console.log(data);
      })
      .catch(() => {
        alert("Error");
      });
  };

  getBookings = () => {
    //const mail = JSON.parse(localStorage.getItem("user")).email;
    axios
      .get(`http://${process.env.PORT}/api/auth/displaybooking`)
      .then((response) => {
        const data = response.data;
        this.setState({
          bookings: data,
        });
        console.log(data);
      })
      .catch(() => {
        alert("Error");
      });
  };

  displayUsers = (users) => {
    if (!users.length) return null;

    return users.map((user, index) => (
      <div key={index}>
        <ul>
          <li className="list-group-item list-group-item-info">
            ID: {user._id}
          </li>
          <li className="list-group-item list-group-item-info">
            Username: {user.username}
          </li>
          <li className="list-group-item list-group-item-info">
            Email: {user.email}
          </li>
        </ul>
      </div>
    ));
  };

  displayBookings = (bookings) => {
    const mail = JSON.parse(localStorage.getItem("user"));
    if (!bookings.length) return null;

    return bookings.map((booking, numer) => (
      <div key={numer}>
        <ul>
          <li className="list-group-item list-group-item-success">
            Name: {booking.name}
          </li>
          <li className="list-group-item list-group-item-success">
            Surname: {booking.surname}
          </li>
          <li className="list-group-item list-group-item-success">
            Email: {booking.email}
          </li>
          <li className="list-group-item list-group-item-success">
            Date of Visit: {booking.datevisit}
          </li>
          <li className="list-group-item list-group-item-success">
            Worker: {booking.worker}
          </li>
          <li className="list-group-item list-group-item-success">
            Service: {booking.service}
          </li>
        </ul>
      </div>
    ));
  };

  onClick(index) {
    let showItems = this.state.showItems.slice(0);
    showItems[index] = !showItems[index];
    this.setState({ showItems });
  }

  render() {
    const showHeader = () => (
      <div className="bg-dark text-white py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1>
                <i className="fas fa-home"> Admin Dashboard</i>
              </h1>
            </div>
          </div>
        </div>
      </div>
    );

    const showActionBtns = () => (
      <div className="bg-light my-2">
        <div className="container">
          <div className="row pb-3">
            <div className="col-md-6  mb-1">
              <button
                className="btn btn-outline-success btn-block"
                onClick={this.onClick.bind(this, 1)}
              >
                <i className="fas fa-money-check-alt"> View Orders</i>
              </button>
            </div>
            <div className="col-md-6  mb-1">
              <button
                className="btn btn-outline-info btn-block"
                onClick={this.onClick.bind(this, 0)}
              >
                <i className="fas fa-user-alt"> View Users</i>
              </button>
            </div>
          </div>
        </div>
      </div>
    );

    return (
      <div>
        <section>
          {showHeader()}
          {showActionBtns()}
        </section>

        <div className="signin-container">
          <section>
            <div>
              <div onClick={this.onClick.bind(this, 0)}>
                {this.state.showItems[0] ? (
                  <div className="userpost">
                    {this.displayUsers(this.state.users)}
                  </div>
                ) : null}
              </div>
            </div>
            <div>
              <div onClick={this.onClick.bind(this, 1)}>
                {this.state.showItems[1] ? (
                  <div className="bookingpost">
                    {this.displayBookings(this.state.bookings)}
                  </div>
                ) : null}
              </div>
            </div>
          </section>
          <div className="container">
            <div className="vh-100"></div>
          </div>
        </div>
        <div className="footer-copyright text-center py-3 mt-auto">
          © 2022 Created by: Andrzej Łęgowik
        </div>
      </div>
    );
  }
}

export default AdminDashboard;
