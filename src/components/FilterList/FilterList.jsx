import { useEffect, useState } from "react";
import APIService from "../../services/APIService.jsx";

function FilterList({ isAll, isIncome }) {
  const [categories, setCategories] = useState([]);
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
        console.log("data: ", data);
        data.forEach((item) => {
          console.log(item);
        });
        setCategories(data);
      }
    }
    getCategories();
  }, []);

  return (
    <>
      <form className="filters">
        <div className="filter__item">
          <label htmlFor="yearFilter">Filter by Year</label>
          <select id="yearFilter" name="yearFilter">
            <option value={2025}>2025</option>
            <option value={2024}>2024</option>
            <option value={2023}>2023</option>
          </select>
        </div>
        <div className="filter__item">
          <label htmlFor="monthFilter">Filter by Month</label>
          <select id="monthFilter" name="monthFilter">
            <option value={"feb"}>feb</option>
            <option value={2024}>2024</option>
            <option value={2023}>2023</option>
          </select>
        </div>

        <div className="filter__item">
          <label htmlFor="categoryFilter">Filter by Category</label>
          {categories ? (
            <select id="categoryFilter" name="categoryFilter">
              {categories.map((category) => (
                <option value={category.id}>{category.category_name}</option>
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
