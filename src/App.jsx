import React, { useState, useEffect } from "react";
import axios from "axios";

import pin from "./assets/svg/pin.svg";


import SearchField from "./components/SearchField";
import CurrentWeather from "./components/CurrentWeather";
import HourlyWeather from "./components/HourlyWeather";
import DailyWeather from "./components/DailyWeather";
import Sidebar from "./components/Sidebar";

function App() {
  const [data, setData] = useState({});
  const [city, setCity] = useState("London");
  const [day, setDay] = useState("");

  const apiKey = "b94e2326dd926a1013c56922ede2651e";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${
    city ? city : "london"
  }&appid=${apiKey}&units=metric`;

  const getWeatherData = () => {
    axios.get(url).then((response) => {
      setData(response.data);
    });
  };

  const getDate = () => {
    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const day = new Date().getDay();

    const date = new Date().toDateString().slice(4);

    setDay(`${dayNames[day]} | ${date}`);
  };

  const searchCity = (event) => {
    if (event.key === "Enter") {
      getWeatherData();
    }
  };

  useEffect(() => {
    const handleLoad = () => {
      getWeatherData();
      getDate();
    };
    window.addEventListener("load", handleLoad);
    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <div className='flex flex-col h-screen px-6 py-12 text-white'>
      <SearchField />

      <CurrentWeather />

      <div className="lg:flex lg:gap-x-[2%] lg:justify-center lg:px-[30px]">
        <Sidebar />
        <DailyWeather city={city} />
        <HourlyWeather city={city} />
      </div>
        
    </div>
  );
}

export default App;
