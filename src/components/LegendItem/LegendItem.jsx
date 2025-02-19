function LegendItem({ color, label, isHighlighted }) {
  return (
    <div
      className={`pie-chart-legend__item ${
        isHighlighted ? "pie-chart-legend__item--focus" : ""
      }`}
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
