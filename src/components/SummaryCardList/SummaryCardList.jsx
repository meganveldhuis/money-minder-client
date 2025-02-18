import "./SummaryCardList.scss";
import SummaryCard from "../SummaryCard/SummaryCard";
import { useEffect, useState } from "react";
import APIService from "../../services/APIService";

function SummaryCardList() {
  const [data, setData] = useState([]);
  async function getData() {
    const expensesByCategoryResponse = await APIService.getExpensesByCategory();
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
    console.log(mergedData);
    setData(mergedData);
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="summary-card-list">
      {data &&
        data.map((record, index) => (
          <SummaryCard key={index} cardData={record} />
        ))}
    </div>
  );
}

export default SummaryCardList;
