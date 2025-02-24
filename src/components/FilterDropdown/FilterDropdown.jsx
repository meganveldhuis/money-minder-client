function FilterDropdown({ label, handleFilterSelect, filters, data }) {
  const capitalizedLabel = label[0].toUpperCase() + label.slice(1);
  const filterKey = label + "Filter";
  return (
    <div className="filter__item">
      <label htmlFor={filterKey}>Filter by {capitalizedLabel}</label>
      {data && (
        <select
          className={`filter__select ${
            filters[filterKey] ? "filter__select--selected" : ""
          }`}
          id={filterKey}
          name={filterKey}
          value={filters[filterKey]}
          onChange={(e) => handleFilterSelect(e)}
        >
          <option key={0} value={""}>
            All
          </option>
          {data.map((option, index) => (
            <option
              key={label === "category" ? option.id : index}
              value={
                label === "year"
                  ? option
                  : label === "category"
                  ? option.id
                  : index
              }
            >
              {label === "category" ? option.category_name : option}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

export default FilterDropdown;
