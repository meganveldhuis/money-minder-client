import "./DeleteModal.scss";
import { useNavigate } from "react-router-dom";
import APIService from "../../services/APIService";

function DeleteModal({ onClose, isIncome, details }) {
  const navigate = useNavigate();
  async function handleDelete() {
    const response = isIncome
      ? await APIService.deleteIncome(details.id)
      : await APIService.deleteExpense(details.id);
    if (response) {
      navigate(-1);
    } else {
      console.log("Error occurred deleting record");
    }
  }
  return (
    <div className="delete-modal-overlay">
      <div className="delete-modal">
        <h2 className="delete-modal__title">
          Delete {isIncome ? "Income Record" : "Expense Record"}?
        </h2>
        <div className="delete-modal__paragraph">
          <p className="delete-modal__text">
            <span className="delete-modal__text--italic">name: </span>
            {details.name}
          </p>
          <p className="delete-modal__text">
            <span className="delete-modal__text--italic">category: </span>
            {details.category_name}
          </p>
          <p className="delete-modal__text">
            <span className="delete-modal__text--italic">amount: </span>
            {details.amount}
          </p>
          <p className="delete-modal__text delete-modal__text--warning">
            NOTE: THIS CANNOT BE UNDONE
          </p>
        </div>

        <div className="delete-modal__buttons">
          <button
            onClick={() => onClose()}
            className="delete-modal__btn delete-modal__btn--cancel"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="delete-modal__btn delete-modal__btn--delete"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
export default DeleteModal;
