import "./SummaryCardList.scss";
import SummaryCard from "../SummaryCard/SummaryCard";
import { useEffect, useState } from "react";
import APIService from "../../services/APIService";

function SummaryCardList({
  filters,
  highlightedItem = { title: "" },
  reloadData,
}) {
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
    console.log("merged data: ", mergedData);
    setData(mergedData);
  }
  useEffect(() => {
    getData();
  }, [filters, reloadData]);

  return (
    <section className="summary-card-list">
      {data ? (
        data.map((record, index) => (
          <SummaryCard
            key={index}
            cardData={record}
            isHighlighted={highlightedItem.title === record.category_name}
          />
        ))
      ) : (
        <></>
      )}
    </section>
  );
}

export default SummaryCardList;
