import "./Header.scss";
import Navbar from "../Navbar/Navbar";
function Header() {
  return (
    <header className="header">
      <img src="https://placedog.net/20x20"></img>
      <Navbar />
    </header>
  );
}

export default Header;
