import "./MUIPieChart.scss";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts";
import { useEffect, useState } from "react";
import APIService from "../../services/APIService";
import LegendItem from "../LegendItem/LegendItem";

function MUIPieChart({ filters }) {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);
  const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);
  const colors = [
    "#6D597A",
    "#915F78",
    "#B56576",
    "#CD6873",
    "#E56B6F",
    "#EAAC8B",
  ];
  const sizing = {
    margin: { right: 5 },
    legend: { hidden: true },
  };

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
          label: line.category_name,
          color: colors[index],
        };
      });
      console.log(parsedData);
      setData(parsedData);
    } else {
      setData([]);
    }
  }

  useEffect(() => {
    getData();
  }, [filters]);

  const getArcLabel = (params) => {
    const percent = params.value / TOTAL;
    return `${params.title}: ${(percent * 100).toFixed(0)}%`;
  };

  function handleClick(d) {
    setSelectedItem(d);
  }

  return (
    <section className="pie-chart">
      <div className="pie-chart__legend">
        {data.map((item, index) => (
          <LegendItem key={index} color={item.color} label={item.label} />
        ))}
      </div>

      <PieChart
        className="pie-chart__chart"
        series={[
          {
            arcLabelMinAngle: 25,
            innerRadius: "30%",
            outerRadius: "90%",
            paddingAngle: 0,
            cornerRadius: 5,
            startAngle: -45,
            cx: "50%",
            cy: "50%",
            data,
            arcLabel: getArcLabel,
          },
        ]}
        onItemClick={(event, d) => handleClick(d)}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fill: "white",
            fontSize: 14,
          },
        }}
        {...sizing}
      />
    </section>
  );
}

export default MUIPieChart;
