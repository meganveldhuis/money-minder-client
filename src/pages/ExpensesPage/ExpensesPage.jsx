import "./ExpensesPage.scss";
import FilterList from "../../components/FilterList/FilterList";

function ExpensesPage() {
  return (
    <>
      <div className="expenses__header">
        <h1>Expenses</h1>
        <FilterList isAll={false} isIncome={false} />
        {/* table titles */}
        {/* scrollable table cards */}
      </div>
    </>
  );
}

export default ExpensesPage;
