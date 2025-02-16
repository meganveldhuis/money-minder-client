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
          filters.search,
          filters.yearFilter,
          filters.monthFilter,
          filters.categoryFilter
        );
      } else {
        data = await APIService.getAllExpenses(
          filters.search,
          filters.yearFilter,
          filters.monthFilter,
          filters.categoryFilter
        );
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
