import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { HashLink } from "react-router-hash-link";
import { NavLink } from "react-router-dom";

// for react-scroll functioning
const scrollWithOffset = (el) => {
  const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
  const yOffset = 0;
  window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
};

const Navbar = () => {
  const [click, setClick] = React.useState(false);

  const handleClick = () => setClick(!click);

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <HashLink smooth to="/#" className="nav-logo">
            FACE RECOGNITION ATTENDANCE SYSTEM
          </HashLink>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <HashLink
                to="/#"
                smooth
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                Home
              </HashLink>
            </li>
            <li className="nav-item">
              <HashLink
                scroll={(el) => scrollWithOffset(el)}
                smooth
                to="/#about"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                About
              </HashLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/login/student"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                Student
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/login/faculty"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                Faculty
              </NavLink>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
