import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Title,
  Tooltip,
} from "chart.js";

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Title,
  Tooltip
);

const Chart = ({ arr = [], currency, days }) => {
  const price = [];
  const date = [];

  for (let i = 0; i < arr.length; i++) {

    if (days === "24h")  date.push(new Date(arr[i][0]).toLocaleTimeString());
    else date.push(new Date(arr[i][0]).toLocaleDateString());
    price.push(arr[i][1]);
  }

  // console.log(date);
  // console.log();

  const data = {
    labels: date,
    datasets: [
      {
        label: `Price in ${currency}`,
        data: price,
        borderColor: "aqua",
        backgroundColor: "black",
      },
    ],
  };

  return (
    <>
      <Line
        options={{
          responsive: true,
        }}
        //here if we pass on object then it print one chart if we increse the number of charts then number of charts also increse
        data={data}
      />
    </>
  );
};

export default Chart;
