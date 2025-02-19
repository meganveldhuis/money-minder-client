import SummaryCard from "../SummaryCard/SummaryCard";
import { useEffect, useState } from "react";
import APIService from "../../services/APIService";

function SummaryCardList({ filters, highlightedItem, reloadData }) {
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
    const mergedData = expensesByCategoryResponse.map((expense) => {
      const budget = budgetResponse.find(
        (b) => b.category_id === expense.category_id
      );
      return {
        ...expense,
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
    <>
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
    </>
  );
}

export default SummaryCardList;
