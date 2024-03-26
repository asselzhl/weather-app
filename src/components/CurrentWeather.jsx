import React, { useState, useEffect } from "react";

const style = {
  currentWeatherContainer: `mb-9 grid place-content-center lg:grid-cols-2 lg:gap-y-24 lg:px-24`,
  currentWeatherTitle: `text-2xl font-medium mb-3 lg:text-5xl text-center lg:text-left`,
  currentWeatherIcon: `mb-3 lg:row-start-1 lg:row-end-3 lg:col-start-2 lg:text-right lg:place-self-end`,
  currentWeatherTemp: `text-6xl font-medium mb-4`,
  currentWeatherDate: `text-lg`,
};

const CurrentWeather = ({data}) => {
  const [day, setDay] = useState("");

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

  useEffect(() => {
    const handleLoad = () => {
      getDate();
    };
    window.addEventListener("load", handleLoad);
    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <div className={style.currentWeatherContainer}>
      <div className={style.currentWeatherTitle}>
        {data.weather ? data.weather[0].main : null}
      </div>
      <div className={style.currentWeatherIcon}>
        <i
          className={`owf owf-13x owf-${
            data.weather ? data.weather[0].id : ""
          }`}
        ></i>
      </div>
      <div className="text-center lg:text-left">
        <div className={style.currentWeatherTemp}>
          {data.main ? data.main.temp.toFixed() : null}°C
        </div>
        <h5 className={style.currentWeatherDate}>{day}</h5>
      </div>
    </div>
  );
};

export default CurrentWeather;
