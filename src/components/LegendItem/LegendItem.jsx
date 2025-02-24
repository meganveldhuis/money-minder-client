import "./LegendItem.scss";

function LegendItem({
  color,
  label,
  dataIndex,
  isHighlighted,
  setPieHighlightedItem,
  pieHighlightedItem,
  anyHighlighted,
}) {
  function onTouch() {
    if (pieHighlightedItem && pieHighlightedItem.dataIndex === dataIndex) {
      setPieHighlightedItem(null);
    } else {
      setPieHighlightedItem({
        dataIndex: dataIndex,
        seriesId: "summary",
      });
    }
  }
  return (
    <div
      className={`pie-chart-legend__item ${
        !anyHighlighted
          ? ""
          : isHighlighted
          ? "pie-chart-legend__item--focus"
          : "pie-chart-legend__item--unfocused"
      }`}
      onTouchMove={onTouch}
      onClick={onTouch}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="none"
      >
        <rect width="10" height="10" fill={color} />
      </svg>
      <p className="pie-chart-legend__label">{label}</p>
    </div>
  );
}

export default LegendItem;
