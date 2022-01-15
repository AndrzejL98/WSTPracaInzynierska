import React from "react";
import axios from "axios";

class UserDashboard extends React.Component {
  constructor() {
    super();
    this.state = {
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
  }

  componentDidMount() {
    this.displayuserpaneluser();
    this.displayuserpanelorder();
  }

  displayuserpaneluser = () => {
    const mail = JSON.parse(localStorage.getItem("user")).email;
    axios
      //.post("http://localhost:5000/api/auth/displayuser")
      .post(`${process.env.REACT_APP_BASEURL}/api/auth/displayuserpaneluser`, {
        mail,
      })
      .then((response) => {
        //const mail = JSON.parse(localStorage.getItem("user")).email;
        // console.log(mail);
        const data = response.data;
        //data.filter((user) => user.email === mail.email);
        this.setState({
          users: data,
        });
        //console.log(data);
      })
      .catch(() => {
        alert("Error");
      });
  };

  displayuserpanelorder = () => {
    const mail = JSON.parse(localStorage.getItem("user")).email;
    axios
      .post(`${process.env.REACT_APP_BASEURL}/api/auth/displayuserpanelorder`, {
        mail,
      })
      .then((response) => {
        const data = response.data;
        this.setState({
          bookings: data,
        });
        //console.log(data);
      })
      .catch(() => {
        alert("Error");
      });
  };

  onClick(index) {
    let showItems = this.state.showItems.slice(0);
    showItems[index] = !showItems[index];
    this.setState({ showItems });
  }

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
    //const mail = JSON.parse(localStorage.getItem("user"));
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

  render() {
    const displayName = () => {
      const user = JSON.parse(localStorage.getItem("user"));
      //console.log(user);
      return (
        <div>
          <h2 className="list-group-item list-group-item-primary">
            Hello {user.username}
          </h2>
        </div>
      );
    };

    const showHeader = () => (
      <div className="bg-dark text-white py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1>
                <i className="fas fa-home"> User Dashboard </i>
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
            <div className="col-md-3  mb-1">
              <button
                className="btn btn-outline-info btn-block"
                onClick={this.onClick.bind(this, 1)}
              >
                <i className="fas fa-user"> View Profile</i>
              </button>
            </div>
            <div className="col-md-3  mb-1">
              <button
                className="btn btn-outline-success btn-block"
                onClick={this.onClick.bind(this, 2)}
              >
                <i className="fas fa-money-check-alt"> View Your Orders</i>
              </button>
            </div>
            <div className="col-md-3  mb-1">
              <button
                className="btn btn-outline-warning btn-block"
                onClick={this.onClick.bind(this, 0)}
              >
                <i className="fas fa-shopping-cart"> View Avaible offers</i>
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
          {displayName()}
        </section>
        <div className="signin-container">
          <div>
            <ul onClick={this.onClick.bind(this, 0)}>
              {this.state.showItems[0] ? (
                <div>
                  <ul className="list-group">
                    <li className="list-group-item list-group-item-warning">
                      Haircut 12$
                    </li>
                    <li className="list-group-item list-group-item-warning">
                      Shaving hair 6$
                    </li>
                    <li className="list-group-item list-group-item-warning">
                      Hair dyeing 16$
                    </li>
                    <li className="list-group-item list-group-item-warning">
                      {" "}
                      Trimming the beard 11$
                    </li>
                    <li className="list-group-item list-group-item-warning">
                      {" "}
                      Beard care 7$
                    </li>
                    <li className="list-group-item list-group-item-warning">
                      {" "}
                      Combo: Haircut + Trimming the beard 18$
                    </li>
                  </ul>
                </div>
              ) : null}
            </ul>
          </div>
          <div>
            <div onClick={this.onClick.bind(this, 1)}>
              {this.state.showItems[1] ? (
                <div className="userpost">
                  {this.displayUsers(this.state.users)}
                </div>
              ) : null}
            </div>
          </div>
          <div>
            <div onClick={this.onClick.bind(this, 2)}>
              {this.state.showItems[2] ? (
                <div className="bookingpost">
                  {this.displayBookings(this.state.bookings)}
                </div>
              ) : null}
            </div>
          </div>

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

export default UserDashboard;
