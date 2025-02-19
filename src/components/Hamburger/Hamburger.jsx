import "./Hamburger.scss";
function Hamburger({ hamburgerOpen, toggleHamburger }) {
  return (
    <div className="hamburger" onClick={toggleHamburger}>
      <div
        className={`hamburger__burger ${
          hamburgerOpen ? "hamburger__burger1--open" : ""
        } `}
      ></div>
      <div
        className={`hamburger__burger ${
          hamburgerOpen ? "hamburger__burger2--open" : ""
        }`}
      ></div>
      <div
        className={`hamburger__burger ${
          hamburgerOpen ? "hamburger__burger3--open" : ""
        }`}
      ></div>
    </div>
  );
}

export default Hamburger;
