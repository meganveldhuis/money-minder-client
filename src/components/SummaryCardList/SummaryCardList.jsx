import "./SummaryCardList.scss";
import SummaryCard from "../SummaryCard/SummaryCard";
import { useEffect, useState } from "react";
import APIService from "../../services/APIService";

function SummaryCardList({ filters, highlightedItem }) {
  const [data, setData] = useState([]);
  // let setHighlight;
  // if (highlightedItem) {
  //   setHighlight = highlightedItem.title;
  // } else {
  //   setHighlight = "none";
  // }
  // console.log(setHighlight);
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
  }, [filters]);
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
