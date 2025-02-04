import "./Navbar.scss";
function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar__list">
        <li className="navbar__item">Expenses</li>
        <li className="navbar__item">Income</li>
        <li className="navbar__item">Budget</li>
      </ul>
    </nav>
  );
}

export default Navbar;
