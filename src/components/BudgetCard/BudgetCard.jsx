import "./BudgetCard.scss";
function BudgetCard({ filters, reloadData, cardData }) {
  const categoryType = cardData.is_income
    ? `Income Category`
    : `Expense Category`;
  return (
    <div className="budget-card">
      <h3 className="budget-card__category">{cardData.category_name}</h3>
      <h2 className="budget-card__amount">{cardData.amount}</h2>
      <p
        className={`budget-card__category-type ${
          cardData.is_income
            ? "budget-card__category-type--green"
            : "budget-card__category-type--red"
        }`}
      >
        {categoryType}
      </p>
      <p className="budget-card__note">{cardData.note}</p>
    </div>
  );
}
export default BudgetCard;
