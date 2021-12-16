import React from "react";

const UserDashboard = () => {
  //views
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
            <button className="btn btn-outline-warning btn-block">
              <i className="fas fa-shopping-cart"> View Avaible offers</i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  //render
  return (
    <section>
      {showHeader()}
      {showActionBtns()}
    </section>
  );
};

export default UserDashboard;
