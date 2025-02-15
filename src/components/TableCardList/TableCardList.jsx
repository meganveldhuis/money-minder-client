import "./TableCardList.scss";
import TableCard from "../TableCard/TableCard";
import APIService from "../../services/APIService";
import { useEffect, useState } from "react";

function TableCardList({ isIncome, filters }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    let data = [];
    async function getTableData() {
      if (isIncome) {
        data = await APIService.getAllIncome(
          "",
          filters.yearFilter,
          filters.monthFilter,
          filters.categoryFilter
        );
      } else {
        data = await APIService.getAllExpenses(
          "",
          filters.yearFilter,
          filters.monthFilter,
          filters.categoryFilter
        );
        console.log("year: ", filters.yearFilter);
      }
      if (data) {
        setData(data);
      }
    }
    getTableData();
  }, [filters]);
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
// {data.map((cardData) => <TableCard data={cardData} />)}

export default TableCardList;
