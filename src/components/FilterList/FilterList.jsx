import "./FilterList.scss";
import { useEffect, useState } from "react";
import APIService from "../../services/APIService.jsx";
import cancelIcon from "../../assets/icons/cancel.svg";
import searchIcon from "../../assets/icons/search.svg";
import FilterDropdown from "../FilterDropdown/FilterDropdown.jsx";

function FilterList({
  isAll,
  isIncome,
  setFilters,
  filters,
  includeSearch = true,
  includeCategory = true,
  setNumberOfYearsRecorded = () => {},
  includeHandyBtns = false,
}) {
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
      setNumberOfYearsRecorded(data.length);
      setYears(data);
    }

    getCategories();
    getYears();
  }, []);

  function handleFilterSelect(e) {
    const { name, value } = e.target;
    //if we have only changed the month filter, set year to default to the current year (for better UX)
    if (name === "monthFilter" && filters.yearFilter === "") {
      setFilters((prevState) => {
        return {
          ...prevState,
          yearFilter: new Date().getFullYear(),
        };
      });
    }
    if (name === "yearFilter" && value === "") {
      setFilters((prevState) => {
        return {
          ...prevState,
          monthFilter: "",
        };
      });
    }
    setFilters((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }

  function handleCancel(e) {
    setFilters({
      yearFilter: "",
      monthFilter: "",
      categoryFilter: "",
      search: "",
    });
  }

  function handleButtonClick(e) {
    e.preventDefault();
    if (e.target.name === "thisYear") {
      setFilters({
        yearFilter: new Date().getFullYear(),
        monthFilter: "",
        categoryFilter: filters.categoryFilter,
        search: filters.search,
      });
    } else if (e.target.name === "lastMonth") {
      const lastMonth =
        new Date().getMonth() === 0 ? 12 : new Date().getMonth() - 1;
      const year =
        new Date().getMonth() === 0
          ? new Date().getFullYear() - 1
          : new Date().getFullYear();
      setFilters({
        yearFilter: year,
        monthFilter: lastMonth,
        categoryFilter: filters.categoryFilter,
        search: filters.search,
      });
    } else if (e.target.name === "thisMonth") {
      setFilters({
        yearFilter: new Date().getFullYear(),
        monthFilter: new Date().getMonth(),
        categoryFilter: filters.categoryFilter,
        search: filters.search,
      });
    }
  }

  return (
    <>
      <form className="filter">
        <div className="filter__top">
          <FilterDropdown
            label={"year"}
            handleFilterSelect={handleFilterSelect}
            filters={filters}
            data={years}
          />
          <FilterDropdown
            label={"month"}
            handleFilterSelect={handleFilterSelect}
            filters={filters}
            data={monthNames}
          />
          {includeCategory ? (
            <FilterDropdown
              label={"category"}
              handleFilterSelect={handleFilterSelect}
              filters={filters}
              data={categories}
            />
          ) : (
            <div className="filter__cancel" onClick={(e) => handleCancel(e)}>
              <img className="icon" src={cancelIcon} />
            </div>
          )}
        </div>

        {includeSearch && (
          <div className="filter__bottom">
            <div className="filter__item filter__item--row">
              <input
                type="text"
                name="search"
                className={`filter__searchbar ${
                  filters.search ? "filter__searchbar--selected" : ""
                }`}
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
        )}
        <div className="filter__buttons">
          <button
            className="filter__btn"
            onClick={handleButtonClick}
            name="thisYear"
          >
            This Year
          </button>
          <button
            className="filter__btn"
            onClick={handleButtonClick}
            name="lastMonth"
          >
            Last Month
          </button>
          <button
            className="filter__btn"
            onClick={handleButtonClick}
            name="thisMonth"
          >
            This Month
          </button>
        </div>
      </form>
    </>
  );
}

export default FilterList;
