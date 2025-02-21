import SummaryCardList from "../../components/SummaryCardList/SummaryCardList";
import FilterList from "../../components/FilterList/FilterList";
import { useState } from "react";

function BudgetPage({ reloadData }) {
  const [filters, setFilters] = useState([]);
  return (
    <div className="page-content budget-page">
      <FilterList
        isAll={true}
        isIncome={false}
        setFilters={setFilters}
        filters={filters}
        includeCategory={false}
        includeSearch={false}
      />
      <SummaryCardList filters={filters} reloadData={reloadData} />
    </div>
  );
}

export default BudgetPage;
