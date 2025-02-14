import "./Hamburger.scss";
function Hamburger({ hamburgerOpen }) {
  return (
    <div className="hamburger">
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
