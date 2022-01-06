import React from "react";

const AdminDashboard = () => {
  //views
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
          <div className="col-md-3  mb-1">
            <button className="btn btn-outline-info btn-block">
              <i className="fas fa-plus"> Add Service</i>
            </button>
          </div>
          <div className="col-md-3  mb-1">
            <button className="btn btn-outline-warning btn-block">
              <i className="fas fa-plus"> Add Worker role</i>
            </button>
          </div>
          <div className="col-md-3  mb-1">
            <button className="btn btn-outline-success btn-block">
              <i className="fas fa-money-check-alt"> View Orders</i>
            </button>
          </div>
          <div className="col-md-3  mb-1">
            <button className="btn btn-outline-info btn-block">
              <i className="fas fa-user-alt"> View Users</i>
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
      <div class="footer-copyright text-center py-3 mt-auto">
        © 2022 Created by: Andrzej Łęgowik
      </div>
    </section>
  );
};

export default AdminDashboard;
