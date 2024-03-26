import React from "react";
import { Line } from "react-chartjs-2";

import clock from "../assets/svg/clock.svg";

import Activities from "./Activities";

const style = {
  activitiesContainer: `mb-[32px] hidden lg:block lg:bg-[#DFAE53]/80 lg:rounded-[40px] pt-[20px] pb-[35px] lg:px-[35px]`,
  lineChartContainer: `bg-[#DFAE53]/80 rounded-lg lg:rounded-[40px] h-[35vh]`,
  lineChartTitle: `flex gap-x-1.5 p-3 lg:px-[35px]`
};

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ChartDataLabels
);

const HourlyWeather = ({ labels, degrees, windSpeed }) => {
  const calculate = (i) => {
    return windSpeed[i];
  };
  const lineData = {
    labels: labels,
    datasets: [
      {
        data: degrees,
        borderColor: "#FFC355",
        pointRadius: 0,
        tension: 0.4,
      },
    ],
  };
  const options = {
    layout: {
      padding: 40,
    },
    plugins: {
      legend: true,
      datalabels: {
        labels: {
          title: {
            align: "end",
            color: "white",
            formatter: function (value, context) {
              return value + "°";
            },
          },
          value: {
            align: "bottom",
            color: "white",
            textAlign: "center",
            formatter: function (context, chart_obj) {
              return (
                calculate(chart_obj.dataIndex) +
                "\n" +
                chart_obj.chart.config._config.data.labels[chart_obj.dataIndex]
              );
            },
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        display: false,
      },
      y: {
        min: Math.min(...degrees) - 5,
        max: Math.max(...degrees) + 5,
        grid: {
          display: false,
        },
        display: false,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="order-1 lg:basis-[60%]">
      <div className={style.activitiesContainer}>
        <Activities />
      </div>
      <div className={style.lineChartContainer}>
        <div className={style.lineChartTitle}>
          <img src={clock} alt="" />
          24-hour forecast
        </div>
        <Line data={lineData} options={options} />
      </div>
    </div>
  );
};

export default HourlyWeather;
