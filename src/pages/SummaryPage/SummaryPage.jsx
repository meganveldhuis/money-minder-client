import "./SummaryPage.scss";
import FilterList from "../../components/FilterList/FilterList.jsx";
import { useEffect, useState } from "react";
import SummaryCardList from "../../components/SummaryCardList/SummaryCardList.jsx";
import PieChart from "../../components/PieChart/PieChart.jsx";
import APIService from "../../services/APIService.jsx";
import Markdown from "react-markdown";

function SummaryPage({ reloadData }) {
  const [filters, setFilters] = useState({
    yearFilter: new Date().getFullYear(),
    monthFilter: new Date().getMonth(),
    categoryFilter: "",
  });
  const [budgetSummary, setBudgetSummary] = useState("");
  const [highlightedItem, setHighlightedItem] = useState(null);
  const [numberOfYearsRecorded, setNumberOfYearsRecorded] = useState(1);
  const [data, setData] = useState([]);

  async function getData() {
    const expensesByCategoryResponse = await APIService.getExpensesByCategory(
      filters.yearFilter,
      filters.monthFilter
    );
    if (!expensesByCategoryResponse) {
      setData([]);
      return;
    }
    const budgetResponse = await APIService.getAllBudget();
    const mergedData = expensesByCategoryResponse.map((record) => {
      const budget = budgetResponse.find(
        (b) => b.category_id === record.category_id
      );
      return {
        ...record,
        budgetAmount: budget ? Number(budget.amount) : 0,
      };
    });
    setData(mergedData);
  }

  useEffect(() => {
    getData();
  }, [filters, reloadData]);

  useEffect(() => {
    async function getAIOverview() {
      const AIResponse = await APIService.getAIOverview(data);
      setBudgetSummary(AIResponse);
    }
    if (data) {
      getAIOverview();
    }
  }, [data, reloadData]);

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
          includeHandyBtns={true}
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
      <section
        className={`summary__overview ${
          !budgetSummary ? "summary__overview--loading" : ""
        }`}
      >
        {budgetSummary ? (
          <Markdown>{budgetSummary}</Markdown>
        ) : (
          <>
            <div className="summary__overview-content--loading"></div>
            <div className="summary__overview-content--loading"></div>
            <div className="summary__overview-content--loading"></div>
          </>
        )}
      </section>
    </div>
  );
}

export default SummaryPage;
