import React, { useState, useEffect } from "react";
import axios from "axios";

// const DisplayUsers = () => {
//   const [users, setUsers] = useState([
//     {
//       username: [],
//     },
//   ]);

//   useEffect(() => {
//     fetch("/displayuser")
//       .then((res) => {
//         if (res.ok) {
//           return res.json();
//         }
//       })
//       .then((jsonRes) => setUsers(jsonRes));
//   });
//   return (
//     <div className="container">
//       <h1>Users</h1>
//       {users.map((users) => (
//         <p key={users._id}>{users.username}</p>
//       ))}
//     </div>
//   );
// };

// class DisplayUsers extends React.Component {
//   loadUsers() {
//     axios.get("http://localhost:5000/displayuser/").then((response) => {
//       if (response.data.length > 0) {
//         this.setState({
//           users: response.data.map((user) => user.username),
//           username: response.data[0].username
//         });
//       }
//     });
//   }
// }

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
    <div>
      <section>
        {showHeader()}
        {showActionBtns()}
      </section>
      <div className="signin-container">
        <div className="vh-100"></div>
      </div>
      <div class="footer-copyright text-center py-3 mt-auto">
        © 2022 Created by: Andrzej Łęgowik
      </div>
    </div>
  );
};

export default AdminDashboard;
// import React, { Component } from "react";
// import axios from "axios";

// export class AdminDashboard extends Component {
//   constaractor(state) {
//     state = {
//       users: [],
//     };
//   }

//   componentDidMount() {
//     axios
//       .get("/displayuser")
//       .then(({ data }) => this.setState({ users: data })) // <-- set state
//       .catch((e) => console.log(e));
//   }
//   render() {
//     const users = this.state.users.map((data) => (
//       <div key={data._id}>
//         <h1>{data.username}</h1>
//         <p>{data.email}</p>
//         <h1>User</h1>
//       </div>
//     ));

//     return <div className="Users">{users}</div>;
//   }
// }

// export default AdminDashboard;
