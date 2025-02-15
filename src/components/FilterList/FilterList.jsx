import "./FilterList.scss";
import { useEffect, useState } from "react";
import APIService from "../../services/APIService.jsx";

function FilterList({ isAll, isIncome }) {
  const [categories, setCategories] = useState([]);
  const [years, setYears] = useState([]);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    async function getCategories() {
      let data;
      if (isAll) {
        data = await APIService.getAllCategories();
      } else if (isIncome) {
        data = await APIService.getAllIncomeCategories();
      } else {
        data = await APIService.getAllExpenseCategories();
      }
      if (data) {
        setCategories(data);
      }
    }

    async function getYears() {
      const data = await APIService.getAllYears();
      setYears(data);
    }

    getCategories();
    getYears();
  }, []);

  return (
    <>
      <form className="filter">
        <div className="filter__item">
          <label htmlFor="yearFilter">Filter by Year</label>
          {years ? (
            <select id="yearFilter" name="yearFilter">
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          ) : (
            <></>
          )}
        </div>

        <div className="filter__item">
          <label htmlFor="monthFilter">Filter by Month</label>
          <select id="monthFilter" name="monthFilter">
            {monthNames.map((month, index) => (
              <option key={index} value={index + 1}>
                {month}
              </option>
            ))}
          </select>
        </div>

        <div className="filter__item">
          <label htmlFor="categoryFilter">Filter by Category</label>
          {categories ? (
            <select id="categoryFilter" name="categoryFilter">
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.category_name}
                </option>
              ))}
            </select>
          ) : (
            <></>
          )}
        </div>
      </form>
    </>
  );
}

export default FilterList;
