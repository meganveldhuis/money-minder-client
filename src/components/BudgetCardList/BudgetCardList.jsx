import "./BudgetCardList.scss";
import APIService from "../../services/APIService";
import BudgetCard from "../BudgetCard/BudgetCard.jsx";
import { useEffect, useState } from "react";
function BudgetCardList({ filters, reloadData }) {
  const [data, setData] = useState([]);
  async function getData() {
    const response = await APIService.getAllBudget();
    setData(response);
  }
  useEffect(() => {
    getData();
    console.log(data);
  }, [filters, reloadData]);

  return (
    <div className="budget-card-list">
      {data ? (
        data.map((record, index) => (
          <BudgetCard key={index} cardData={record} />
        ))
      ) : (
        <></>
      )}
    </div>
  );
}

export default BudgetCardList;
