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
                opacity: 0.8,
              }}
            >
              Lego barber is in the first 24-hour hairdressing salon in Poland.
              It has many services tailored to each person. The grand opening of
              the showroom took place on January 1, 2022. Our hairdressing salon
              has modern equipment and qualified hairdressers.If you want to
              test our services, please contact us by phone or book an
              appointment via the Internet.
            </p>
          </div>
        </div>
      </div>
      <div className="footer-copyright text-center py-3 mt-auto">
        © 2022 Created by: Andrzej Łęgowik
      </div>
    </div>
  );
};

export default Home;
