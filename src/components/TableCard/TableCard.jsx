import "./TableCard.scss";
import rightArrowIcon from "../../assets/icons/right-arrow.svg";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import cutleryIcon from "../../assets/icons/cutlery.svg";
import foodIcon from "../../assets/icons/eat-out.svg";
import heartIcon from "../../assets/icons/heart.svg";
import houseIcon from "../../assets/icons/house.svg";
import waterIcon from "../../assets/icons/water.svg";
import moneyIcon from "../../assets/icons/money.svg";
import briefcaseIcon from "../../assets/icons/briefcase.svg";
import cameraIcon from "../../assets/icons/camera.svg";

function TableCard({ record }) {
  const [icon, setIcon] = useState();
  const [color, setColor] = useState();
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };
  useEffect(() => {
    // future improvement: have this information in the database, and allow user to choose colour and upload icon
    if (record.category_name.includes("Groceries")) {
      setColor("orange");
      setIcon(cutleryIcon);
    } else if (record.category_name.includes("Food")) {
      setColor("rose");
      setIcon(foodIcon);
    } else if (record.category_name.includes("Rent")) {
      setColor("orange");
      setIcon(houseIcon);
    } else if (record.category_name.includes("Utilities")) {
      setColor("orange");
      setIcon(waterIcon);
    } else if (record.category_name.includes("Health")) {
      setColor("rose");
      setIcon(heartIcon);
    } else if (record.category_name.includes("Other")) {
      setColor("red");
      setIcon(moneyIcon);
    } else if (record.category_name.includes("Photography")) {
      setColor("green");
      setIcon(cameraIcon);
    } else if (record.category_name.includes("Job")) {
      setColor("green");
      setIcon(briefcaseIcon);
    }
  }, []);

  const formattedDate = formatDate(new Date(record.date));
  return (
    <Link to={`${record.id}`}>
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
          <div className={`item__chip item__chip--${color}`}>
            {icon && <img className="icon item__icon" src={icon} />}
            <p className="item__text item__text--bold">
              {record.category_name}
            </p>
          </div>

          <img className="item__icon" src={rightArrowIcon} />
        </div>
      </li>
    </Link>
  );
}

export default TableCard;
