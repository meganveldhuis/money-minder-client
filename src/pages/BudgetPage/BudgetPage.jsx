import "./BudgetPage.scss";
import { useState } from "react";
import BudgetModal from "../../components/BudgetModal/BudgetModal";
import BudgetCardList from "../../components/BudgetCardList/BudgetCardList";

function BudgetPage() {
  const [reloadData, setReloadData] = useState(true);
  const [filters, setFilters] = useState([]);
  const [isAddBudgetModalOpen, setIsAddBudgetModalOpen] = useState(false);
  function handleAddBudgetClick(e) {
    e.preventDefault();
    setIsAddBudgetModalOpen(true);
  }

  return (
    <div className="page-content budget-page">
      <button onClick={handleAddBudgetClick} className="budget-page__btn">
        Add Budget
      </button>
      <BudgetCardList filters={filters} reloadData={reloadData} />
      {isAddBudgetModalOpen && (
        <BudgetModal
          reloadData={reloadData}
          setReloadData={setReloadData}
          onClose={() => setIsAddBudgetModalOpen(false)}
        />
      )}
    </div>
  );
}

export default BudgetPage;
