const About = () => {
  return (
    <div>
      <div className="about-container">
        <div className="row px-3 vh-100">
          <div className="col-md-5 mx-auto  align-self-center">
            <p
              style={{
                padding: 15,
                color: "black",
                fontFamily: "Roboto",
                shadow: { bottom: 5 },
                border: "3px black solid",
                fontSize: 35,
                backgroundColor: "white",
                opacity: 0.8,
              }}
            >
              My name is Andrzej. I am the founder of the LegoBarber website.
              Our hairdressing salon is located in the center of Katowice. We
              have qualified staff and a nice atmosphere. We have hundreds of
              satisfied.
            </p>
          </div>
        </div>
      </div>
      <div className="footer-copyright text-center py-3 mt-auto">
        © 2020 Created by: Andrzej Łęgowik
      </div>
    </div>
  );
};

export default About;
