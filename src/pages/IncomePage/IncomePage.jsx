import "./IncomePage.scss";
import FilterList from "../../components/FilterList/FilterList";
import TableCardList from "../../components/TableCardList/TableCardList";
import { useState } from "react";

function IncomePage() {
  const [filters, setFilters] = useState({
    yearFilter: "",
    monthFilter: "",
    categoryFilter: "",
    search: "",
  });
  return (
    <div className="page-content income-page">
      <div className="income__header">
        <h1 className="income__main-title">Income</h1>
        <FilterList
          isAll={false}
          isIncome={true}
          filters={filters}
          setFilters={setFilters}
        />
        <div className="income__table-titles">
          <h4 className="income__titles">Date</h4>
          <h4 className="income__titles">Name</h4>
          <h4 className="income__titles income__titles--small">$</h4>
          <h4 className="income__titles">Category</h4>
        </div>
      </div>
      <TableCardList isIncome={true} filters={filters} />
    </div>
  );
}

export default IncomePage;
