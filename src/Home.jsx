import { useState, useEffect } from "react";
import Typewriter from "./Typewriter";
import { Link } from "react-router-dom";

export function Home() {
  const jwt = localStorage.getItem("jwt");
  const [complete, setComplete] = useState(false);

  const handleComplete = () => {
    setComplete(true);
  };

  useEffect(() => {
    // Set a timeout for the "Recipes" and "Menus" links
    const timeout = setTimeout(() => {
      handleComplete();
    }, 100 * 32);

    // Clean up the timeout when the component unmounts or when both links appear
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div id="home">
      <div id="welcome">
        <h1>
          <Typewriter text="   Welcome to my Menu Planner" delay={100} onComplete={handleComplete} />
        </h1>
      </div>
      {jwt ? (
        <div>
          {complete && (
            <div id="links-container">
              <h5 id="recipes">
                <Link to="/recipes" className="nav-link active" aria-current="page">
                  Recipes
                </Link>
              </h5>
              <h5 id="menus">
                <Link to="/menus" className="nav-link active" aria-current="page">
                  Menus
                </Link>
              </h5>
            </div>
          )}
        </div>
      ) : (
        <div id="home-login-container">
          <Link to="/login" className="nav-link active" aria-current="page" id="home-login">
            Login/Sign Up <i className="bi bi-arrow-right-circle"></i>
          </Link>
        </div>
      )}
    </div>
  );
}
