import "./Navbar.scss";
import Hamburger from "../Hamburger/Hamburger";
import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const toggleHamburger = () => {
    setHamburgerOpen((prev) => !prev);
  };
  return (
    <nav className={`navbar ${hamburgerOpen ? "navbar--open" : ""}`}>
      <div className="navbar__hamburger" onClick={toggleHamburger}>
        <Hamburger hamburgerOpen={hamburgerOpen} />
      </div>
      {/* <div className={`navbar ${hamburgerOpen ? "navbar--open" : ""}`}> */}
      <ul
        className={`navbar__list ${hamburgerOpen ? "navbar__list--open" : ""}`}
      >
        <li className={`navbar__item`}>
          <Link to={`/`}>Summary</Link>
        </li>
        <li className={`navbar__item`}>
          <Link to={`/new`}>+ Add New Entry</Link>
        </li>
        <li className={`navbar__item`}>
          <Link to={`/expenses`}>Expenses</Link>
        </li>
        <li className={`navbar__item`}>
          <Link to={`/income`}>Income</Link>
        </li>
        <li className={`navbar__item`}>
          <Link to={`/budget`}>Budget</Link>
        </li>
      </ul>
      {/* </div> */}
    </nav>
  );
}

export default Navbar;
