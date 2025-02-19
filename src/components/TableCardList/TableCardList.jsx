import "./TableCardList.scss";
import TableCard from "../TableCard/TableCard";
import APIService from "../../services/APIService";
import { useEffect, useState } from "react";

function TableCardList({ isIncome, filters, reloadData }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    let response = [];
    async function getTableData() {
      if (isIncome) {
        response = await APIService.getAllIncome(
          filters.search,
          filters.yearFilter,
          filters.monthFilter,
          filters.categoryFilter
        );
      } else {
        response = await APIService.getAllExpenses(
          filters.search,
          filters.yearFilter,
          filters.monthFilter,
          filters.categoryFilter
        );
      }
      if (response) {
        setData(response);
      }
    }
    getTableData();
  }, [filters, reloadData]);
  return (
    <ul className="card-list">
      {data ? (
        data.map((cardData) => (
          <TableCard key={cardData.id} record={cardData} />
        ))
      ) : (
        <>no data</>
      )}
    </ul>
  );
}
export default TableCardList;
