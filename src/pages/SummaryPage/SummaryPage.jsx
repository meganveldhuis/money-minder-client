import "./SummaryPage.scss";
import FilterList from "../../components/FilterList/FilterList.jsx";
import { useState } from "react";
function SummaryPage() {
  const [filters, setFilters] = useState({
    yearFilter: "",
    monthFilter: "",
    categoryFilter: "",
    search: "",
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
        />
        <div className="summary__table-titles">
          <h4 className="summary__titles">Date</h4>
          <h4 className="summary__titles">Name</h4>
          <h4 className="summary__titles summary__titles--small">$</h4>
          <h4 className="summary__titles">Category</h4>
        </div>
      </div>
    </div>
  );
}

export default SummaryPage;
