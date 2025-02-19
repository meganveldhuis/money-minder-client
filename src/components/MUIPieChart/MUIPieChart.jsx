import "./MUIPieChart.scss";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts";
import { useEffect, useState } from "react";
import APIService from "../../services/APIService";

function MUIPieChart({ filters }) {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);
  const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);

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

  const getArcLabel = (params) => {
    const percent = params.value / TOTAL;
    return `${params.title}: ${(percent * 100).toFixed(0)}%`;
  };

  function handleClick(d) {
    setSelectedItem(d);
  }

  return (
    <section className="pie-chart">
      <PieChart
        // colors={["#AFAF11", "#C13C37", "#6A2135", "#6A2122", "#E38627"]}
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
        slotProps={{
          legend: {
            direction: "row",
            position: { vertical: "top", horizontal: "middle" },
            labelStyle: {
              fontSize: 14,
              fill: "white",
            },
          },
        }}
      />
    </section>
  );
}

export default MUIPieChart;
