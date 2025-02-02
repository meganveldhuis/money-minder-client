import { useState } from "react";
import "./EntrySideBar.scss";

function EntrySideBar() {
  const [toggled, setToggled] = useState(false);
  const [formResponse, setFormResponse] = useState({
    cost: 0,
    category: "",
    name: "",
    date: "",
    isTrip: false,
    tripName: "",
  });

  function handleInputChange(e) {
    setFormResponse((prevFormResponse) => {
      return {
        ...prevFormResponse,
        [e.target.name]: e.target.value,
      };
    });
  }

  return (
    <aside>
      <h2>New Entry</h2>
      <div>
        <p>Expense</p>
        <button
          className={`toggle-btn ${toggled ? "toggled" : ""}`}
          onClick={() => setToggled(!toggled)}
        >
          <div className="thumb"></div>
        </button>
        <p>Income</p>
      </div>

      <form className="form">
        <div className="form__item">
          <label htmlFor="cost">Cost</label>
          <input
            id="cost"
            name="cost"
            onChange={(e) => handleInputChange(e)}
            value={formResponse.cost}
          ></input>
        </div>
        <div className="form__item">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            onChange={(e) => handleInputChange(e)}
            value={formResponse.category}
          >
            <option value=""> -- select an option -- </option>
            <option value="groceries">Groceries</option>
            <option value="rent">Rent</option>
          </select>
        </div>
        <div className="form__item">
          <label htmlFor="name">Name</label>
          <textarea
            id="name"
            name="name"
            onChange={(e) => handleInputChange(e)}
            value={formResponse.name}
          ></textarea>
        </div>
        <div className="form__item">
          <label htmlFor="isTrip">Trip Expense?</label>
          <input
            type="checkbox"
            id="isTrip"
            name="isTrip"
            onChange={(e) => handleInputChange(e)}
            value={formResponse.isTrip}
          ></input>
        </div>

        <div className="form__item">
          <label htmlFor="tripName">Trip Name</label>
          <select
            id="tripName"
            name="tripName"
            onChange={(e) => handleInputChange(e)}
            value={formResponse.tripName}
          >
            <option value=""> -- select an option -- </option>
            <option value="groceries">Banff</option>
            <option value="rent">Europe</option>
          </select>
        </div>
      </form>
    </aside>
  );
}

export default EntrySideBar;
