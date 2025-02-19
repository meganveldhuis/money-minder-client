import { useState } from "react";
import "./NewEntryModal.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function NewEntryModal({ onClose }) {
  const [isIncome, setIsIncome] = useState(false);
  const [formResponse, setFormResponse] = useState({
    date: new Date(),
    amount: 0,
    currency: "CAD",
    category: "",
    note: "",
    isTrip: false,
    tripName: "",
  });

  function handleInputChange(e) {
    const { name, value, type, checked } = e.target;
    setFormResponse((prevState) => {
      return {
        ...prevState,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }
  function handleOverlayClick(e) {
    console.log(e.target.className === "entry-modal-overlay");
    if (e.target.className === "entry-modal-overlay") {
      onClose();
    }
    //Close Modal
  }

  return (
    <div className="entry-modal-overlay" onClick={(e) => handleOverlayClick(e)}>
      <section className="entry-modal">
        <h2>New Entry</h2>
        <div>
          <p>Expense</p>
          <button
            className={`toggle-btn ${isIncome ? "toggled" : ""}`}
            onClick={() => setIsIncome((prev) => !prev)}
          >
            <div className="thumb"></div>
          </button>
          <p>Income</p>
        </div>

        <form className="form">
          <div className="form__item">
            <label htmlFor="date">Date</label>
            <DatePicker
              todayButton="TODAY"
              showIcon
              name="date"
              id="date"
              selected={formResponse.date}
              onChange={(chosenDate) =>
                setFormResponse((prevState) => {
                  return {
                    ...prevState,
                    date: chosenDate,
                  };
                })
              }
            />
          </div>
          <div className="form__item">
            <label htmlFor="amount">Amount</label>
            <input
              id="amount"
              name="amount"
              onChange={(e) => handleInputChange(e)}
              value={formResponse.amount}
            ></input>
          </div>
          <div className="form__item">
            <label htmlFor="category">Currency</label>
            <select
              id="currency"
              name="currency"
              onChange={(e) => handleInputChange(e)}
              value={formResponse.currency}
            >
              <option value="cad">CAD</option>
              <option value="usd">USD</option>
            </select>
          </div>
          <div className="form__item">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              onChange={(e) => handleInputChange(e)}
              value={formResponse.category}
            >
              {isIncome ? (
                <>
                  <option value=""> -- select an option -- </option>
                  <option value="job">Job</option>
                </>
              ) : (
                <>
                  <option value=""> -- select an option -- </option>
                  <option value="groceries">Groceries</option>
                  <option value="rent">Rent</option>
                </>
              )}
            </select>
          </div>
          <div className="form__item">
            <label htmlFor="note">Note</label>
            <textarea
              id="note"
              name="note"
              onChange={(e) => handleInputChange(e)}
              value={formResponse.note}
            ></textarea>
          </div>
          {!isIncome ? (
            <>
              <div className="form__item">
                <label htmlFor="isTrip">Trip Expense?</label>
                <input
                  type="checkbox"
                  id="isTrip"
                  name="isTrip"
                  onChange={(e) => handleInputChange(e)}
                  checked={formResponse.isTrip}
                ></input>
              </div>
              {formResponse.isTrip && (
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
              )}{" "}
            </>
          ) : (
            <></>
          )}
          <button>Submit</button>
        </form>
      </section>
    </div>
  );
}

export default NewEntryModal;
