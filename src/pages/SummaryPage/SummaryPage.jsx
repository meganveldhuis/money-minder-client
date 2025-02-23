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
  const [numberOfYearsRecorded, setNumberOfYearsRecorded] = useState(1);
  return (
    <div className="page-content summary-page">
      <div className="summary__header">
        <h1 className="summary__main-title">Summary</h1>
        <FilterList
          setNumberOfYearsRecorded={setNumberOfYearsRecorded}
          isAll={false}
          isIncome={false}
          filters={filters}
          setFilters={setFilters}
          includeSearch={false}
          includeCategory={false}
        />
      </div>
      <h2 className="summary__expenses-header">Expenses To Date</h2>
      <div className="summary__content">
        <PieChart
          filters={filters}
          highlightedItem={highlightedItem}
          setHighlightedItem={setHighlightedItem}
          reloadData={reloadData}
        />
        <SummaryCardList
          numberOfYearsRecorded={numberOfYearsRecorded}
          filters={filters}
          highlightedItem={highlightedItem}
          reloadData={reloadData}
        />
      </div>
    </div>
  );
}

export default SummaryPage;
