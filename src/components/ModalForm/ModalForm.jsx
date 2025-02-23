import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import "./ModalForm.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import APIService from "../../services/APIService";
import errorIcon from "../../assets/icons/error.svg";
import FormInput from "../FormInput/FormInput";

function ModalForm({ onClose, setReloadData, isEditing = false }) {
  const { id } = useParams();
  const { pathname } = useLocation();
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
    setIsIncome(pathname.includes("/income"));
  }, []);

  useEffect(() => {
    async function getCurrencies() {
      const data = await APIService.getAllCurrency();
      if (data) {
        setCurrencies(data);
      }
    }
    async function getRecord() {
      const data = pathname.includes("/income")
        ? await APIService.getSingleIncome(id)
        : await APIService.getSingleExpense(id);

      const isTripData = data.trip_id !== null;
      setFormResponse({
        date: data.date,
        amount: data.amount,
        currency_id: data.currency_id,
        category_id: data.category_id,
        name: data.name,
        isTrip: isTripData,
        trip_id: isTripData ? data.trip_id : 0,
      });
    }

    getCurrencies();
    if (isEditing) {
      getRecord();
    }
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
    const newErrors = {};
    if (!formResponse.date) newErrors.date = "Date is required";
    if (!formResponse.amount) newErrors.amount = "Amount is required";
    if (!isIncome) {
      if (!formResponse.name.trim()) newErrors.name = "Name is required";
    }
    if (formResponse.isTrip) {
      if (!formResponse.trip_id) {
        newErrors.trip_id = "Trip is required";
      }
    } else {
      setFormResponse((prevState) => {
        return {
          ...prevState,
          trip_id: 0,
        };
      });
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
      console.log(`${name} pressed and inputted at ${Number(value)}`);
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
    if (name === "isTrip" && checked === false) {
      setFormResponse((prevState) => {
        return {
          ...prevState,
          trip_id: 0,
        };
      });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm()) return;
    let response = [];
    if (isEditing) {
      if (isIncome) {
        response = await APIService.editIncome(formResponse, id);
      } else {
        response = await APIService.editExpense(formResponse, id);
      }
    } else {
      if (isIncome) {
        response = await APIService.postIncome(formResponse);
      } else {
        response = await APIService.postExpense(formResponse);
      }
    }
    if (response) {
      setReloadData((prev) => !prev);
      onClose();
    }
  }

  return (
    <div className="entry-modal-overlay" onClick={(e) => handleOverlayClick(e)}>
      <section className="entry-modal">
        <h2 className="entry-modal__title">
          {isEditing ? "Edit Entry" : "Add New Entry"}
        </h2>
        <div className="entry-modal__toggle-div">
          <h3>Expense</h3>
          <button
            className={`toggle-btn ${isIncome ? "toggle-btn--toggled" : ""} ${
              isEditing ? "toggle-btn--disabled" : ""
            } `}
            disabled={isEditing ? true : false}
            onClick={() => setIsIncome((prev) => !prev)}
          >
            <div className="toggle-btn__thumb"></div>
          </button>

          <h3>Income</h3>
        </div>
        <div className="entry-modal__form">
          <form className="form">
            <FormInput
              modifier="mobile"
              label="date"
              id="date"
              type="date"
              inputFormResponse={formResponse.date}
              errors={errors}
              setFormResponse={setFormResponse}
            />
            <div className="form__row">
              <FormInput
                modifier="tablet"
                label="date"
                id="date"
                type="date"
                inputFormResponse={formResponse.date}
                errors={errors}
                setFormResponse={setFormResponse}
                handleInputChange={() => {}}
              />
              <FormInput
                label="amount"
                id="amount"
                type="number"
                inputFormResponse={formResponse.amount}
                errors={errors}
                setFormResponse={setFormResponse}
                handleInputChange={handleInputChange}
              />
              <FormInput
                label="currency"
                id="currency_id"
                type="select"
                inputFormResponse={formResponse.currency_id}
                errors={errors}
                setFormResponse={setFormResponse}
                handleInputChange={handleInputChange}
                options={currencies}
              />
            </div>
            <FormInput
              label={`${isIncome ? "Income" : "Expense"} Name`}
              id="name"
              type="text"
              inputFormResponse={formResponse.name}
              errors={errors}
              setFormResponse={setFormResponse}
              handleInputChange={handleInputChange}
              options={currencies}
            />

            <FormInput
              label="category"
              id="category_id"
              type="select"
              inputFormResponse={formResponse.category_id}
              errors={errors}
              setFormResponse={setFormResponse}
              handleInputChange={handleInputChange}
              options={categories}
            />
            {!isIncome && (
              <FormInput
                modifier="row"
                label="Trip Expense ?"
                id="isTrip"
                type="checkbox"
                inputFormResponse={formResponse.isTrip}
                errors={errors}
                setFormResponse={setFormResponse}
                handleInputChange={handleInputChange}
              />
            )}

            {formResponse.isTrip && (
              <FormInput
                modifier="row"
                label="Trip Name"
                id="trip_id"
                type="select"
                inputFormResponse={formResponse.trip_id}
                errors={errors}
                setFormResponse={setFormResponse}
                handleInputChange={handleInputChange}
                options={trips}
              />
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
                {isEditing
                  ? "Save"
                  : isIncome
                  ? "Submit Income"
                  : "Submit Expense"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default ModalForm;
