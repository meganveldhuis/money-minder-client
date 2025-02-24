import "./PieChart.scss";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts";
import { useEffect, useState } from "react";
import APIService from "../../services/APIService";
import LegendItem from "../LegendItem/LegendItem";

function SumPieChart({
  filters,
  setHighlightedItem,
  highlightedItem,
  reloadData,
}) {
  const [pieHighlightedItem, setPieHighlightedItem] = useState(null);
  const [data, setData] = useState([]);
  const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);
  const colors = [
    "#3EBDE4",
    "#E29578",
    "#83C5BE",
    "#F1B9A5",
    "#42999B",
    "#FFDDD2",
    "#B8DEDC",
    "#F6EAE6",
    "#EDF6F9",
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
      setData(parsedData);
    } else {
      setData([]);
    }
  }

  useEffect(() => {
    getData();
  }, [filters, reloadData]);

  useEffect(() => {
    if (pieHighlightedItem) {
      setHighlightedItem(data[pieHighlightedItem.dataIndex]);
    } else {
      setHighlightedItem("");
    }
  }, [pieHighlightedItem]);

  const getArcLabel = (params) => {
    const percent = params.value / TOTAL;
    return `${params.title}: ${(percent * 100).toFixed(0)}%`;
  };

  return (
    <section className="pie-chart">
      <div className="pie-chart__legend">
        <p className="pie-chart__legend-title">
          Click on an item to highlight it:
        </p>
        {data.map((item, index) => (
          <LegendItem
            key={index}
            color={item.color}
            label={item.label}
            setPieHighlightedItem={setPieHighlightedItem}
            pieHighlightedItem={pieHighlightedItem}
            isHighlighted={item.label === highlightedItem.title}
            dataIndex={index}
          />
        ))}
      </div>
      <PieChart
        className="pie-chart__chart"
        series={[
          {
            id: "summary",
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
            highlightScope: { highlight: "item", fade: "global" },
          },
        ]}
        highlightedItem={pieHighlightedItem}
        onHighlightChange={setPieHighlightedItem}
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

export default SumPieChart;
