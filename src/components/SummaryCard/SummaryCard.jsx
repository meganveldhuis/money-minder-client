import "./SummaryCard.scss";
function SummaryCard({ cardData, isHighlighted }) {
  let difference = 0;
  if (cardData.is_income === 0) {
    difference = cardData.budgetAmount - cardData.total;
  } else {
    difference = Number(cardData.total);
  }
  const stringDifference =
    difference > 0 ? `+${difference.toFixed(2)}` : difference.toFixed(2);

  return (
    <div
      className={`summary-card ${isHighlighted ? "summary-card--focus" : ""}`}
    >
      <h3 className="summary-card__title">{cardData.category_name}</h3>
      <h2
        className={`summary-card__number ${
          difference === 0
            ? ""
            : difference > 0
            ? "summary-card__number--green"
            : "summary-card__number--red"
        }`}
      >
        {stringDifference}$
      </h2>
      <div className="summary-card__bottom">
        <div className="summary-card__bottom-left">
          <p className="summary-card__bottom-text">
            {cardData.is_income === 0 ? "budget" : "expected"}:
          </p>
          <p className="summary-card__bottom-text">{cardData.budgetAmount}$ </p>
        </div>
        <div className="summary-card__bottom-right">
          <p className="summary-card__bottom-text">actual: </p>
          <p className="summary-card__bottom-text">{cardData.total}$ </p>
        </div>
      </div>
    </div>
  );
}

export default SummaryCard;
