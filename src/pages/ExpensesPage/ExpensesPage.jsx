import "./ExpensesPage.scss";
import FilterList from "../../components/FilterList/FilterList";
import TableCardList from "../../components/TableCardList/TableCardList";
import { useState } from "react";

function ExpensesPage({ reloadData }) {
  const [filters, setFilters] = useState({
    yearFilter: "",
    monthFilter: "",
    categoryFilter: "",
    search: "",
  });
  return (
    <div className="page-content expenses-page">
      <div className="expenses__header">
        <h1 className="expenses__main-title">Expenses</h1>
        <FilterList
          isAll={false}
          isIncome={false}
          filters={filters}
          setFilters={setFilters}
        />
        <div className="expenses__table-titles">
          <h4 className="expenses__titles">Date</h4>
          <h4 className="expenses__titles">Name</h4>
          <h4 className="expenses__titles expenses__titles--small">$</h4>
          <h4 className="expenses__titles">Category</h4>
        </div>
      </div>
      <TableCardList
        isIncome={false}
        filters={filters}
        reloadData={reloadData}
      />
    </div>
  );
}

export default ExpensesPage;
