import { useState, useEffect } from "react";
import "./NewEntryModal.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import APIService from "../../services/APIService";
import errorIcon from "../../assets/icons/error.svg";

function NewEntryModal({ onClose, setReloadData }) {
  const [isIncome, setIsIncome] = useState(false);
  const [categories, setCategories] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [trips, setTrips] = useState([]);
  const [errors, setErrors] = useState({});
  const [formResponse, setFormResponse] = useState({
    date: new Date(),
    amount: 0,
    currency_id: 1,
    category_id: 0,
    name: "",
    isTrip: false,
    trip_id: 0,
  });
  function handleOverlayClick(e) {
    if (e.target.className === "entry-modal-overlay") {
      onClose();
    }
  }

  useEffect(() => {
    async function getCategories() {
      let data;
      if (isIncome) {
        data = await APIService.getAllIncomeCategories();
      } else {
        data = await APIService.getAllExpenseCategories();
      }
      if (data) {
        setCategories(data);
      }
    }

    getCategories();
  }, [isIncome]);

  useEffect(() => {
    async function getCurrencies() {
      const data = await APIService.getAllCurrency();
      if (data) {
        setCurrencies(data);
      }
    }

    getCurrencies();
  }, []);

  useEffect(() => {
    async function getTrips() {
      const data = await APIService.getAllTrips();
      if (data) {
        setTrips(data);
      }
    }

    getTrips();
  }, []);

  function validateForm() {
    let newErrors = {};
    if (!formResponse.date) newErrors.date = "Date is required";

    if (!formResponse.amount) newErrors.amount = "Amount is required";

    if (isIncome) {
      setFormResponse((prevState) => {
        return {
          ...prevState,
          name: "",
        };
      });
    } else {
      if (!formResponse.name.trim()) newErrors.name = "Name is required";
    }

    if (!formResponse.category_id)
      newErrors.category_id = "Category is required";

    if (!formResponse.currency_id)
      newErrors.currency_id = "Currency is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleInputChange(e) {
    const { name, value, type, checked } = e.target;
    setFormResponse((prevState) => {
      return {
        ...prevState,
        [name]: type === "checkbox" ? checked : value,
      };
    });
    if (value.length > 0) {
      if (errors[name]) {
        setErrors((prev) => {
          return {
            ...prev,
            [name]: "",
          };
        });
      }
    }
    if (name === "amount") {
      if (Number(value) > 0) {
        if (errors.amount) {
          setErrors((prev) => {
            return {
              ...prev,
              amount: "",
            };
          });
        }
      } else {
        setErrors((prev) => {
          return {
            ...prev,
            amount: "Non-zero amount is required",
          };
        });
      }
    }
  }

  async function addEntry(newEntry) {
    if (isIncome) {
      const response = await APIService.postIncome(newEntry);
      if (response) {
        return true;
      }
    } else {
      const response = await APIService.postExpense(newEntry);
      if (response) {
        return true;
      }
    }
    return false;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm()) return;
    if (await addEntry(formResponse)) {
      setReloadData((prev) => !prev);
      onClose();
    }
  }

  return (
    <div className="entry-modal-overlay" onClick={(e) => handleOverlayClick(e)}>
      <section className="entry-modal">
        <h2 className="entry-modal__title">Add New Entry</h2>
        <div className="entry-modal__toggle-div">
          <h3>Expense</h3>
          <button
            className={`toggle-btn ${isIncome ? "toggled" : ""}`}
            onClick={() => setIsIncome((prev) => !prev)}
          >
            <div className="thumb"></div>
          </button>
          <h3>Income</h3>
        </div>
        <div className="entry-modal__form">
          <form className="form">
            <div className="form__item">
              <label className="form__label" htmlFor="date">
                Date
              </label>
              <DatePicker
                className="form__input form__input--right-padding"
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
              {errors.date && (
                <div className="error__container">
                  <img className="error__icon" src={errorIcon} alt="Error" />
                  <p className="error__text">{errors.date}</p>
                </div>
              )}
            </div>
            <div className="form__row">
              <div className="form__item">
                <label className="form__label" htmlFor="amount">
                  Amount
                </label>
                <input
                  className="form__input"
                  id="amount"
                  name="amount"
                  type="number"
                  onChange={(e) => handleInputChange(e)}
                  value={formResponse.amount}
                ></input>
                {errors.amount && (
                  <div className="error__container">
                    <img className="error__icon" src={errorIcon} alt="Error" />
                    <p className="error__text">{errors.amount}</p>
                  </div>
                )}
              </div>
              <div className="form__item">
                <label className="form__label" htmlFor="category_id">
                  Currency
                </label>
                <select
                  className="form__input"
                  id="currency_id"
                  name="currency_id"
                  onChange={(e) => handleInputChange(e)}
                  value={formResponse.currency_id}
                >
                  {currencies.map((currency) => (
                    <option key={currency.id} value={currency.id}>
                      {currency.code}
                    </option>
                  ))}
                </select>
                {errors.currency_id && (
                  <div className="error__container">
                    <img className="error__icon" src={errorIcon} alt="Error" />
                    <p className="error__text">{errors.currency_id}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="form__item">
              <label className="form__label" htmlFor="name">
                {isIncome ? "Income" : "Expense"} Name
              </label>
              <input
                className="form__input"
                id="name"
                name="name"
                onChange={(e) => handleInputChange(e)}
                value={formResponse.name}
              ></input>
              {errors.name && (
                <div className="error__container">
                  <img className="error__icon" src={errorIcon} alt="Error" />
                  <p className="error__text">{errors.name}</p>
                </div>
              )}
            </div>

            <div className="form__item">
              <label className="form__label" htmlFor="category_id">
                Category
              </label>
              <select
                className="form__input"
                id="category_id"
                name="category_id"
                onChange={(e) => handleInputChange(e)}
                value={formResponse.category_id}
              >
                <option key={0} value={0}>
                  --Select Category--
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.category_name}
                  </option>
                ))}
              </select>
              {errors.category_id && (
                <div className="error__container">
                  <img className="error__icon" src={errorIcon} alt="Error" />
                  <p className="error__text">{errors.category_id}</p>
                </div>
              )}
            </div>

            <div
              className={`form__item form__item--row ${
                isIncome ? "form__item--hidden" : ""
              }`}
            >
              <label className="form__label" htmlFor="isTrip">
                Trip Expense?
              </label>
              <input
                className="form__checkbox"
                type="checkbox"
                id="isTrip"
                name="isTrip"
                onChange={(e) => handleInputChange(e)}
                checked={formResponse.isTrip}
              ></input>
              {errors.isTrip && (
                <div className="error__container">
                  <img className="error__icon" src={errorIcon} alt="Error" />
                  <p className="error__text">{errors.isTrip}</p>
                </div>
              )}
            </div>
            {formResponse.isTrip && (
              <div
                className={`form__item form__item--row ${
                  isIncome && "form__item--hidden"
                }`}
              >
                <label className="form__label" htmlFor="trip_id">
                  Trip Name
                </label>
                <select
                  className="form__input"
                  id="trip_id"
                  name="trip_id"
                  onChange={(e) => handleInputChange(e)}
                  value={formResponse.trip_id}
                >
                  <option value=""> -- select an option -- </option>
                  {trips.map((trip) => (
                    <option key={trip.id} value={trip.id}>
                      {trip.trip_name}
                    </option>
                  ))}
                </select>
                {errors.trip_id && (
                  <div className="error__container">
                    <img className="error__icon" src={errorIcon} alt="Error" />
                    <p className="error__text">{errors.trip_id}</p>
                  </div>
                )}
              </div>
            )}

            <div className="form__btns">
              <button
                className="form__button form__button--cancel"
                type="reset"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className={`form__button ${
                  isIncome ? "form__button--green" : "form__button--red"
                }`}
                type="submit"
                onClick={handleSubmit}
              >
                Submit {isIncome ? "Income" : "Expense"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default NewEntryModal;
