import "./TableCard.scss";
import rightArrowIcon from "../../assets/icons/right-arrow.svg";
import { useEffect } from "react";

function TableCard({ record }) {
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const formattedDate = formatDate(new Date(record.date));
  return (
    <li className="item">
      <div className="item__info">
        <p className="item__text">{formattedDate}</p>
      </div>
      <div className="item__info">
        <p className="item__text">{record.name}</p>
      </div>
      <div className="item__info item__info--small">
        <p className="item__text">{record.amount}</p>
      </div>
      <div className="item__info">
        <p className="item__text">{record.category_name}</p>
        <img className="item__icon" src={rightArrowIcon} />
      </div>
    </li>
  );
}

export default TableCard;
