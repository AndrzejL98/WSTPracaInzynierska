import React from "react";

const Home = () => {
  return (
    <div>
      <div className="home-container">
        <div className="row px-3 vh-100">
          <div className="col-md-5 mx-auto align-self-center">
            <p
              style={{
                padding: 15,
                color: "black",
                fontFamily: "Roboto",
                shadow: { bottom: 5 },
                border: "3px black solid",
                fontSize: 30,
                backgroundColor: "white",
              }}
            >
              My name is Andrzej. I am the founder of the LegoBarber website.
              Our hairdressing salon is located in the center of Katowice. We
              have qualified staff and a nice atmosphere. We have hundreds of
              satisfied. If you want to test our services, please contact us by
              phone or book an appointment via the Internet.
            </p>
          </div>
        </div>
      </div>
      <div class="footer-copyright text-center py-3 mt-auto">
        © 2022 Created by: Andrzej Łęgowik
      </div>
    </div>
  );
};

export default Home;
