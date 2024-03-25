import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";

import clock from "../assets/svg/clock.svg";

import Activities from "./Activities";

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

const HourlyWeather = ({ city }) => {
  const [data, setData] = useState({});
  const [labels, setLabels] = useState([]);
  const [degrees, setDegrees] = useState([]);
  const [windSpeed, setWindSpeed] = useState([]);

  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=4&appid=b94e2326dd926a1013c56922ede2651e&units=metric`;
  const getWeatherData = () => {
    let labelsArray = [];
    let degreesArray = [];
    let windSpeedArray = [];
    axios.get(url).then((response) => {
      setData(response.data);
      response.data.list.forEach((item) => {
        labelsArray.push(`${new Date(item.dt_txt).getHours()}:00`);
        degreesArray.push(item.main.temp.toFixed());
        windSpeedArray.push(`${item.wind.speed}km/h`);
      });

      setLabels(labelsArray);
      setDegrees(degreesArray);
      setWindSpeed(windSpeedArray);
    });
  };

  useEffect(() => {
    const handleLoad = () => {
      getWeatherData();
    };
    window.addEventListener("load", handleLoad);
    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

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
        // min: 0,
        // max: 6,
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
    <div className="order-1">
      <div className="mb-[32px] hidden lg:block lg:bg-[#DFAE53]/80 lg:rounded-[40px] pt-[20px] pb-[35px] lg:px-[35px]">
        <Activities />
      </div>
      <div className="bg-[#DFAE53]/80 rounded-lg lg:rounded-[40px] h-[30vh] lg:[50vh]">
        <div className="flex gap-x-1.5 p-3 lg:px-[35px]">
          <img src={clock} alt="" />
          24-hour forecast
        </div>
        <Line data={lineData} options={options} />
      </div>
    </div>
  );
};

export default HourlyWeather;
