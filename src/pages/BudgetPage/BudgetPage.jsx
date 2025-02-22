import SummaryCardList from "../../components/SummaryCardList/SummaryCardList";
import FilterList from "../../components/FilterList/FilterList";
import { useState } from "react";
import AddBudgetModal from "../../components/AddBudgetModal/AddBudgetModal";

function BudgetPage({ reloadData }) {
  const [filters, setFilters] = useState([]);
  const [isAddBudgetModalOpen, setIsAddBudgetModalOpen] = useState(false);
  function handleAddBudgetClick(e) {
    e.preventDefault();
    setIsAddBudgetModalOpen(true);
  }

  return (
    <div className="page-content budget-page">
      <FilterList
        isAll={true}
        isIncome={false}
        setFilters={setFilters}
        filters={filters}
        includeCategory={false}
        includeSearch={false}
        includeAddBtn={true}
        handleAddBudgetClick={handleAddBudgetClick}
      />
      <SummaryCardList filters={filters} reloadData={reloadData} />
      {isAddBudgetModalOpen && (
        <AddBudgetModal
          reloadData={reloadData}
          onClose={() => setIsAddBudgetModalOpen(false)}
        />
      )}
    </div>
  );
}

export default BudgetPage;
