import "./SummaryCard.scss";
import ProgressBar from "../ProgressBar/ProgressBar";

function SummaryCard({
  cardData,
  isHighlighted,
  filters,
  numberOfYearsRecorded,
}) {
  const multiplier = filters.monthFilter
    ? 1
    : filters.yearFilter
    ? 12
    : 12 * numberOfYearsRecorded;
  console.log(multiplier, numberOfYearsRecorded);
  const difference =
    cardData.is_income === 0
      ? cardData.budgetAmount * multiplier - cardData.total
      : Number(cardData.total);
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
      <ProgressBar
        actualAmt={cardData.total}
        budgetAmt={cardData.budgetAmount * multiplier}
      />
      <div className="summary-card__bottom">
        <div className="summary-card__bottom-left">
          <p className="summary-card__bottom-text">actual: </p>
          <p className="summary-card__bottom-text">{cardData.total}$ </p>
        </div>
        <div className="summary-card__bottom-right">
          <p className="summary-card__bottom-text">
            {cardData.is_income === 0 ? "budget" : "expected"}:
          </p>
          <p className="summary-card__bottom-text">
            {cardData.budgetAmount * multiplier}${" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SummaryCard;
