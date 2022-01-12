import React, { Component } from "react";

class UserDashboard extends React.Component {
  constructor() {
    super();
    this.state = { showItems: [] };
  }

  onClick(index) {
    let showItems = this.state.showItems.slice(0);
    showItems[index] = !showItems[index];
    this.setState({ showItems });
  }
  render() {
    const displayName = () => {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log(user);
      return (
        <div>
          <p>Hi {user.username}</p>
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
              <button className="btn btn-outline-info btn-block">
                <i className="fas fa-user"> View Profile</i>
              </button>
            </div>
            <div className="col-md-3  mb-1">
              <button className="btn btn-outline-success btn-block">
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
        <div>
          <ul onClick={this.onClick.bind(this, 0)}>
            {this.state.showItems[0] ? (
              <div>
                <li>Strzyżenie włosów 45PLN</li>
                <li>Golenie włosów 20PLN</li>
                <li>Farbowanie włosów 60PLN</li>
                <li> Trymowanie brody 40PLN</li>
                <li> Pielęgnacja brody 25PLN</li>
                <li> Combo: Strzyżenie włosów + Trymowanie bordy 70PLN</li>
              </div>
            ) : null}
          </ul>
        </div>
      </div>
    );
  }
}

export default UserDashboard;
