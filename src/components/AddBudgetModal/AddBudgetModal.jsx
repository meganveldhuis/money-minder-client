import { useState, useEffect } from "react";
import APIService from "../../services/APIService";

import "./AddBudgetModal.scss";
function AddBudgetModal({ onClose, reloadData }) {
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const [formResponse, setFormResponse] = useState({
    note: "",
    amount: 0,
    category_name: "",
    description: "",
    is_income: false,
    is_per_year: false,
  });

  useEffect(() => {
    async function getCategories() {
      const data = await APIService.getAllCategories();
      if (data) {
        setCategories(data);
      }
    }

    getCategories();
  }, []);
  function handleOverlayClick(e) {
    if (e.target.className === "add-budget-modal-overlay") {
      onClose();
    }
  }
  function validateForm() {
    const newErrors = {};
    if (!formResponse.amount) newErrors.amount = "Budget Amount is required";
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
    <div
      className="add-budget-modal-overlay"
      onClick={(e) => handleOverlayClick(e)}
    >
      <section className="add-budget-modal">
        <h2 className="add-budget-modal__title">Add New Budget Line</h2>
        <form className="form">
          {/* note: "",
            amount: 0,
            category_name: "",
            description: "",
            is_income: false,
            is_per_year: false, */}
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
        </form>
        <div className="form__btns">
          <button
            className="form__button form__button--cancel"
            type="reset"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className={`form__button form__button--green `}
            type="submit"
            onClick={handleSubmit}
          >
            Add Budget Line
          </button>
        </div>
      </section>
    </div>
  );
}

export default AddBudgetModal;
