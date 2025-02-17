function FilterDropdown({ label, handleFilterSelect, filters, data }) {
  const capitalizedLabel = label[0].toUpperCase() + label;
  return (
    <div className="filter__item">
      <label htmlFor="yearFilter">Filter by {capitalizedLabel}</label>
      {data ? (
        <select
          className={`filter__select ${
            filters.yearFilter ? "filter__select--selected" : ""
          }`}
          id="yearFilter"
          name="yearFilter"
          value={filters.yearFilter}
          onChange={(e) => handleFilterSelect(e)}
        >
          <option key={0} value={0}>
            All
          </option>
          {data.map((year) => (
            <option key={data} value={data}>
              {data}
            </option>
          ))}
        </select>
      ) : (
        <></>
      )}
    </div>
  );
}

export default FilterDropdown;
