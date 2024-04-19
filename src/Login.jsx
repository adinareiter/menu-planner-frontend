import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const jwt = localStorage.getItem("jwt");
if (jwt) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
}

export function Login() {
  const [errors, setErrors] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const params = new FormData(event.target);
    axios
      .post("http://localhost:3000/sessions.json", params)
      .then((response) => {
        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
        localStorage.setItem("jwt", response.data.jwt);
        event.target.reset();
        window.location.href = "/";
      })
      .catch((error) => {
        setErrors(["Invalid email or password"]);
      });
  };

  return (
    <div>
      <section id="login" className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card bg-dark text-white">
                <div className="card-body p-5 text-center">
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                    <p className="text-white-50 mb-5">Please enter your login and password!</p>

                    <ul>
                      {errors.map((error) => (
                        <li key={error}>{error}</li>
                      ))}
                    </ul>
                    <form onSubmit={handleSubmit}>
                      <div data-mdb-input-init className="form-outline form-white mb-4">
                        <input name="email" type="email" id="typeEmailX" className="form-control form-control-lg" />
                        <label className="form-label" for="typeEmailX">
                          Email
                        </label>
                      </div>

                      <div data-mdb-input-init className="form-outline form-white mb-4">
                        <input
                          name="password"
                          type="password"
                          id="typePasswordX"
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" for="typePasswordX">
                          Password
                        </label>
                      </div>

                      <p className="small mb-5 pb-lg-2">
                        <a className="text-white-50" href="#!">
                          Forgot password?
                        </a>
                      </p>

                      <button
                        data-mdb-button-init
                        data-mdb-ripple-init
                        className="btn btn-outline-light btn-lg px-5"
                        type="submit"
                      >
                        Login
                      </button>
                    </form>

                    <div className="d-flex justify-content-center text-center mt-4 pt-1">
                      <a href="#!" className="text-white">
                        <i className="fab fa-facebook-f fa-lg"></i>
                      </a>
                      <a href="#!" className="text-white">
                        <i className="fab fa-twitter fa-lg mx-4 px-2"></i>
                      </a>
                      <a href="#!" className="text-white">
                        <i className="fab fa-google fa-lg"></i>
                      </a>
                    </div>
                  </div>

                  <div>
                    <p className="mb-0">
                      Don't have an account?{" "}
                      <Link to="/signup" className="text-white-50 fw-bold">
                        Sign Up
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
