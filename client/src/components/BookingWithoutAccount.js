import { Link } from "react-router-dom";

const BookingWithoutAccount = () => {
  return (
    <div>
      <div className="booking-container">
        <div className="row px-3 vh-100">
          <div className="col-md-5 mx-auto align-self-center">
            <form className="signup-form" noValidate>
              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa-solid fa-user"></i>
                  </span>
                </div>

                <input
                  name="name"
                  className="form-control"
                  placeholder="Name"
                  type="text"
                />
              </div>
              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa-solid fa-user"></i>
                  </span>
                </div>
                <input
                  name="surname"
                  className="form-control"
                  placeholder="Surname"
                  type="text"
                />
              </div>
              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i class="fa-solid fa-calendar"></i>
                  </span>
                </div>

                <input
                  name="Date of the visit"
                  className="form-control"
                  placeholder="Date of the visit"
                  type="Date"
                />
              </div>
              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i class="fa-solid fa-clock"></i>
                  </span>
                </div>

                <input
                  name="Time of the visit"
                  className="form-control"
                  placeholder="Time of the visit"
                  type="Time"
                />
              </div>
              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i class="fa-solid fa-scissors"></i>
                  </span>
                </div>
                <select>
                  <option value="Wojtek">Wojtek</option>
                  <option value="Maciek">Maciek</option>
                  <option value="Lukas">Lukas</option>
                  <option value="Mateusz">Mateusz</option>
                </select>
              </div>
              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i class="fa-solid fa-money-bill"></i>
                  </span>
                </div>
                <select>
                  <option value="Strzyżenie włosów 30PLN">
                    Strzyżenie włosów 30PLN
                  </option>
                  <option value="Strzyżenie brody 40PLN">
                    Strzyżenie brody 40PLN
                  </option>
                  <option value="Golenie włosów 30PLN">
                    Golenie włosów 30PLN
                  </option>
                  <option value="Golenie brody 20PLN">
                    Golenie brody 20PLN
                  </option>
                  <option value="Trymowanie brody 30PLN">
                    Trymowanie brody 30PLN
                  </option>
                  <option value="Farbowanie włosów 40PLN">
                    Farbowanie włosów 40PLN
                  </option>
                  <option value="Combo: Strzyżenie włosów i brody: 90PLN">
                    Combo: Strzyżenie włosów i brody: 90PLN
                  </option>
                </select>
              </div>

              <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block">
                  Wyślij
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="footer-copyright text-center py-3 mt-auto">
        © 2022 Created by: Andrzej Łęgowik
      </div>
    </div>
  );
};

export default BookingWithoutAccount;
