import "./SummaryPage.scss";
import FilterList from "../../components/FilterList/FilterList.jsx";
import { useState } from "react";
import SummaryCardList from "../../components/SummaryCardList/SummaryCardList.jsx";
import PieChart from "../../components/PieChart/PieChart.jsx";

function SummaryPage({ reloadData }) {
  const [filters, setFilters] = useState({
    yearFilter: "",
    monthFilter: "",
    categoryFilter: "",
  });
  const [highlightedItem, setHighlightedItem] = useState(null);
  return (
    <div className="page-content summary-page">
      <div className="summary__header">
        <h1 className="summary__main-title">Summary</h1>
        <FilterList
          isAll={false}
          isIncome={false}
          filters={filters}
          setFilters={setFilters}
          includeSearch={false}
          includeCategory={false}
        />
      </div>
      <div className="summary__content">
        <PieChart
          filters={filters}
          highlightedItem={highlightedItem}
          setHighlightedItem={setHighlightedItem}
          reloadData={reloadData}
        />
        <section className="summary-card-list">
          <SummaryCardList
            filters={filters}
            highlightedItem={highlightedItem}
            reloadData={reloadData}
          />
        </section>
      </div>
    </div>
  );
}

export default SummaryPage;
