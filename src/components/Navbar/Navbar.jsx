import "./Navbar.scss";
import Hamburger from "../Hamburger/Hamburger";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar({ setIsModalOpen }) {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const toggleHamburger = () => {
    setHamburgerOpen((prev) => !prev);
  };
  const [selectedTab, setSelectedTab] = useState("");
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname.includes("/expenses")) {
      setSelectedTab("Expenses");
    } else if (pathname.includes("/income")) {
      setSelectedTab("Income");
    } else if (pathname.includes("/budget")) {
      setSelectedTab("Budget");
    } else if (pathname.includes("/")) {
      setSelectedTab("Summary");
    }
  }, [pathname]);
  return (
    <div className="top-bar">
      <nav className={`navbar ${hamburgerOpen ? "navbar--open" : ""}`}>
        <div className="navbar__hamburger">
          <Hamburger
            hamburgerOpen={hamburgerOpen}
            toggleHamburger={toggleHamburger}
          />
        </div>
        <ul
          className={`navbar__list ${
            hamburgerOpen ? "navbar__list--open" : ""
          }`}
        >
          <li
            className={`navbar__item ${
              selectedTab === "Summary" ? "navbar__item--selected" : ""
            }`}
          >
            <Link to={`/`} onClick={() => setHamburgerOpen(false)}>
              <p className="navbar__text">Summary</p>
            </Link>
          </li>
          <li className={`navbar__item`}>
            <Link
              onClick={() => {
                setIsModalOpen(true);
                setHamburgerOpen(false);
              }}
            >
              <p className="navbar__text">+ Add New Entry</p>
            </Link>
          </li>
          <li
            className={`navbar__item ${
              selectedTab === "Expenses" ? "navbar__item--selected" : ""
            }`}
          >
            <Link to={`/expenses`} onClick={() => setHamburgerOpen(false)}>
              <p className="navbar__text">Expenses</p>
            </Link>
          </li>
          <li
            className={`navbar__item ${
              selectedTab === "Income" ? "navbar__item--selected" : ""
            }`}
          >
            <Link to={`/income`} onClick={() => setHamburgerOpen(false)}>
              <p className="navbar__text">Income</p>
            </Link>
          </li>
          <li
            className={`navbar__item ${
              selectedTab === "Budget" ? "navbar__item--selected" : ""
            }`}
          >
            <Link to={`/budget`} onClick={() => setHamburgerOpen(false)}>
              <p className="navbar__text">Budget</p>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
