import "./MinimalPieChart.scss";
import { useCallback, useEffect, useState } from "react";
import { PieChart } from "react-minimal-pie-chart";
import APIService from "../../services/APIService";

function MinimalPieChart({ filters }) {
  const [piData, setData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const colours = ["#AFAF11", "#C13C37", "#6A2135", "#6A2122", "#E38627"];

  async function getData() {
    const response = await APIService.getExpensesByCategory(
      filters.yearFilter,
      filters.monthFilter
    );
    if (response) {
      const parsedData = response.map((line, index) => {
        return {
          title: line.category_name,
          value: Number(line.total),
          color: colours[index],
        };
      });
      setData(parsedData);
    } else {
      setData([]);
    }
  }

  useEffect(() => {
    getData();
  }, [filters]);

  return (
    <>
      {piData.length !== 0 ? (
        <PieChart
          className="min-pie-chart"
          data={piData}
          label={({ dataEntry }) => dataEntry.value}
          lineWidth={65}
        />
      ) : (
        <p className="pie-chart__warning">
          No data to display within these filters
        </p>
      )}
    </>
  );
}

export default MinimalPieChart;
