import "./TableCardList.scss";
import TableCard from "../TableCard/TableCard";
import APIService from "../../services/APIService";
import { useEffect, useState } from "react";

function TableCardList({ isIncome }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    let data = [];
    async function getTableData() {
      if (isIncome) {
        data = await APIService.getAllIncome();
        console.log(data);
      } else {
        data = await APIService.getAllExpenses();
        console.log(data);
      }
      if (data) {
        setData(data);
      }
    }
    getTableData();
  }, []);
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
