import { Link } from "react-router-dom";
import { Logout } from "./Logout";

export function Header() {
  return (
    <header>
      <div>
        <nav className="navbar navbar-dark bg-dark fixed-top">
          <div className="container-fluid">
            <a className="navbar-brand">
              <Link to="/" className="nav-link active" aria-current="page">
                Menu Planner
              </Link>
              <div className="account-link">
                <Link to="/login" className="nav-link active" aria-current="page">
                  <i id="account-icon" className="bi bi-person-circle"></i>
                </Link>
              </div>
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasDarkNavbar"
              aria-controls="offcanvasDarkNavbar"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="offcanvas offcanvas-end text-bg-dark"
              tabindex="-1"
              id="offcanvasDarkNavbar"
              aria-labelledby="offcanvasDarkNavbarLabel"
            >
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
                  Menu Planner
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div className="offcanvas-body">
                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3" data-bs-dismiss="offcanvas">
                  <li className="nav-item">
                    <Link to="/" className="nav-link active" aria-current="page">
                      Home
                    </Link>
                    <Link to="/recipes" className="nav-link active" aria-current="page">
                      Recipes
                    </Link>
                    <Link to="/menus" className="nav-link active" aria-current="page">
                      Menus
                    </Link>
                    <Link to="/login" className="nav-link active" aria-current="page">
                      Login
                    </Link>
                    <Logout>Logout</Logout>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/logout">
                      Logout
                    </a>
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Events
                    </a>
                    <ul className="dropdown-menu dropdown-menu-dark">
                      <li>
                        <a className="dropdown-item" href="#">
                          Breakfast
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Lunch
                        </a>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Something else here
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
                {/* <form className="d-flex mt-3" role="search">
                  <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                  <button className="btn btn-success" type="submit">
                    Search
                  </button>
                </form> */}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
