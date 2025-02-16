import "./FilterList.scss";
import { useEffect, useState } from "react";
import APIService from "../../services/APIService.jsx";
import cancelIcon from "../../assets/icons/cancel.svg";
import searchIcon from "../../assets/icons/search.svg";

function FilterList({ isAll, isIncome, setFilters, filters }) {
  const [categories, setCategories] = useState([]);
  const [years, setYears] = useState([]);
  const monthNames = [
    "All",
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

  function handleFilterSelect(e) {
    const { name, value } = e.target;
    setFilters((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }

  function handleCancel(e) {
    console.log("called cancel");
    setFilters({
      yearFilter: "",
      monthFilter: "",
      categoryFilter: "",
      search: "",
    });
  }

  return (
    <>
      <form className="filter">
        <div className="filter__top">
          <div className="filter__item">
            <label htmlFor="yearFilter">Filter by Year</label>
            {years ? (
              <select
                className="filter__select"
                id="yearFilter"
                name="yearFilter"
                value={filters.yearFilter}
                onChange={(e) => handleFilterSelect(e)}
              >
                <option key={0} value={0}>
                  All
                </option>
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
            <select
              className="filter__select"
              id="monthFilter"
              name="monthFilter"
              value={filters.monthFilter}
              onChange={(e) => handleFilterSelect(e)}
            >
              {monthNames.map((month, index) => (
                <option key={index} value={index}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          <div className="filter__item">
            <label htmlFor="categoryFilter">Filter by Category</label>
            {categories ? (
              <select
                className="filter__select"
                id="categoryFilter"
                name="categoryFilter"
                value={filters.categoryFilter}
                onChange={(e) => handleFilterSelect(e)}
              >
                <option key={0} value={0}>
                  All
                </option>
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
        </div>
        <div className="filter__bottom">
          <div className="filter__item filter__item--row">
            <input
              type="text"
              name="search"
              className="filter__searchbar"
              placeholder="Search..."
              value={filters.search}
              onChange={(e) => handleFilterSelect(e)}
            ></input>
            <img className="icon filter__search-icon" src={searchIcon} />
          </div>

          <div className="filter__cancel" onClick={(e) => handleCancel(e)}>
            <img className="icon" src={cancelIcon} />
          </div>
        </div>
      </form>
    </>
  );
}

export default FilterList;
