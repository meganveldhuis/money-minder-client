import "./Navbar.scss";
import Hamburger from "../Hamburger/Hamburger";
import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar({ setIsModalOpen }) {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const toggleHamburger = () => {
    setHamburgerOpen((prev) => !prev);
  };
  return (
    <nav className={`navbar ${hamburgerOpen ? "navbar--open" : ""}`}>
      <div className="navbar__hamburger">
        <Hamburger
          hamburgerOpen={hamburgerOpen}
          toggleHamburger={toggleHamburger}
        />
      </div>
      <ul
        className={`navbar__list ${hamburgerOpen ? "navbar__list--open" : ""}`}
      >
        <li className={`navbar__item`}>
          <Link to={`/`} onClick={toggleHamburger}>
            <p className="navbar__text">Summary</p>
          </Link>
        </li>
        <li className={`navbar__item`}>
          <Link
            onClick={() => {
              setIsModalOpen(true);
              toggleHamburger();
            }}
          >
            <p className="navbar__text">+ Add New Entry</p>
          </Link>
        </li>
        <li className={`navbar__item`}>
          <Link to={`/expenses`} onClick={toggleHamburger}>
            <p className="navbar__text">Expenses</p>
          </Link>
        </li>
        <li className={`navbar__item`}>
          <Link to={`/income`} onClick={toggleHamburger}>
            <p className="navbar__text">Income</p>
          </Link>
        </li>
        <li className={`navbar__item`}>
          <Link to={`/budget`} onClick={toggleHamburger}>
            <p className="navbar__text">Budget</p>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
