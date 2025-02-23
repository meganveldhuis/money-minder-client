import { useState, useEffect } from "react";
import APIService from "../../services/APIService";
import "./BudgetModal.scss";
import FormInput from "../FormInput/FormInput";

function AddBudgetModal({ onClose, reloadData, setReloadData }) {
  const [errors, setErrors] = useState({});
  const [formResponse, setFormResponse] = useState({
    note: "",
    amount: 0,
    category_name: "",
    description: "",
    is_income: false,
    is_per_year: false,
  });

  function handleOverlayClick(e) {
    if (e.target.className === "budget-modal-overlay") {
      onClose();
    }
  }
  function validateForm() {
    const newErrors = {};
    if (!formResponse.amount) newErrors.amount = "Budget Amount is required";
    if (!formResponse.category_name)
      newErrors.category_name = "Category Name is required";
    if (!formResponse.description)
      newErrors.description = "Category Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleInputChange(e) {
    const { name, value, type, checked } = e.target;
    console.log(`${name} pressed as ${value} ${checked} : ${type}`);
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
    response = await APIService.addBudgetAndCategory(formResponse);
    if (response) {
      setReloadData((prev) => !prev);
      onClose();
    }
  }
  return (
    <div
      className="budget-modal-overlay"
      onClick={(e) => handleOverlayClick(e)}
    >
      <div className="budget-modal">
        <h2 className="budget-modal__title">Add New Budget Line</h2>
        <form className="budget-form">
          <section className="form__section">
            <h3 className="form__section-header">Budget Info</h3>
            <FormInput
              label="Budget Note"
              id="note"
              type="text"
              inputFormResponse={formResponse.note}
              errors={errors}
              setFormResponse={setFormResponse}
              handleInputChange={handleInputChange}
            />
            <FormInput
              label="amount *"
              id="amount"
              type="number"
              inputFormResponse={formResponse.amount}
              errors={errors}
              setFormResponse={setFormResponse}
              handleInputChange={handleInputChange}
            />
            <FormInput
              modifier="row"
              label="Is Per Year? (WIP)"
              id="is_per_year"
              type="checkbox"
              inputFormResponse={formResponse.is_per_year}
              errors={errors}
              setFormResponse={setFormResponse}
              handleInputChange={handleInputChange}
            />
          </section>
          <section className="form__section">
            <h3 className="form__section-header">Category Info</h3>
            <FormInput
              label="category *"
              id="category_name"
              type="text"
              inputFormResponse={formResponse.category_name}
              errors={errors}
              setFormResponse={setFormResponse}
              handleInputChange={handleInputChange}
            />
            <FormInput
              label="category Description *"
              id="description"
              type="text"
              inputFormResponse={formResponse.description}
              errors={errors}
              setFormResponse={setFormResponse}
              handleInputChange={handleInputChange}
            />
            <FormInput
              modifier="row"
              label="Income Category?"
              id="is_income"
              type="checkbox"
              inputFormResponse={formResponse.is_income}
              errors={errors}
              setFormResponse={setFormResponse}
              handleInputChange={handleInputChange}
            />
          </section>
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
      </div>
    </div>
  );
}

export default AddBudgetModal;
