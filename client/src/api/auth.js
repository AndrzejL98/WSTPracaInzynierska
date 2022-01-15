import axios from "axios";

export const signup = async (data) => {
  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };

  const response = await axios.post("/api/auth/signup", data, config);

  return response;
};
export const signin = async (data) => {
  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };

  const response = await axios.post("/api/auth/signin", data, config);

  return response;
};
export const sendbookingform = async (data) => {
  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };

  const response = await axios.post("/api/auth/bookingvisit", data, config);

  return response;
};
export const displayuserpaneluser = async (data) => {
  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };

  const response = await axios.post("/api/auth/displayuser", data, config);

  return response;
};
export const displayuserpanelorder = async (data) => {
  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };

  const response = await axios.post("/api/auth/displaybooking", data, config);

  return response;
};
// export const sendlocalmail = async (data) => {
//   const config = {
//     header: {
//       "Content-Type": "application/json",
//     },
//   };

//   const response = await axios.post("/api/auth/localmail", data, config);

//   return response;
// };
