import "./SummaryCard.scss";
function SummaryCard({ cardData }) {
  const difference = cardData.budgetAmount - cardData.total;
  return (
    <div className="summary-card">
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
        {difference}$
      </h2>
      <div className="summary-card__bottom">
        <div className="summary-card__bottom-left">
          <p className="summary-card__bottom-text">budget: </p>
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
