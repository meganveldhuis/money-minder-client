import "./SummaryPage.scss";
import FilterList from "../../components/FilterList/FilterList.jsx";
import { useState } from "react";
function SummaryPage() {
  const [filters, setFilters] = useState({
    yearFilter: "",
    monthFilter: "",
    categoryFilter: "",
  });
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
        />
      </div>
    </div>
  );
}

export default SummaryPage;
