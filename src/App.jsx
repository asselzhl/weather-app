import React, { useState, useEffect } from "react";
import axios from "axios";

import pin from "./assets/svg/pin.svg";

import CurrentWeather from "./components/CurrentWeather";
import HourlyWeather from "./components/HourlyWeather";
import DailyWeather from "./components/DailyWeather";
import Sidebar from "./components/Sidebar";

const style = {
  wrapper: `flex flex-col h-screen px-6 py-12 text-white`,
  container: `flex flex-col h-screen px-6 py-12 text-white`,
  inputContainer: `text-white flex items-center lg:pl-24`,
  city: `bg-transparent d-block p-2 font-medium text-xl focus:outline-none lg:text-2xl	capitalize`,
  errorMessageContainer: `lg:px-[60px] min-h-[64px] mb-3`,
  errorMessage: `capitalize text-xl lg:text-2x text-center bg-[#DFAE53]/80 rounded-lg lg:rounded-[40px] p-3 mt-3 font-medium`,
  detailsContainer: `lg:flex lg:gap-x-[2%] lg:justify-center lg:px-[30px]`
};

function App() {
  const [data, setData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [city, setCity] = useState("New York");
  const [labels, setLabels] = useState([]);
  const [degrees, setDegrees] = useState([]);
  const [windSpeed, setWindSpeed] = useState([]);
  const [dailyIconsId, setDailyIconsId] = useState([]);
  const [dates, setDates] = useState([]);

  const dailyIconsIndexes = [];

  const apiKey = "b94e2326dd926a1013c56922ede2651e";

  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const dailyWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  const getCurrentWeatherData = () => {
    axios
      .get(currentWeatherUrl)
      .then((response) => {
        setData(response.data);
        setErrorMessage("");
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
      });
  };

  const getDailyWeatherData = () => {
    let labelsArray = [];
    let degreesArray = [];
    let windSpeedArray = [];

    let dailyIconsArray = [];
    let datesArray = [];
    axios.get(dailyWeatherUrl).then((response) => {
      response.data.list.forEach((item, index) => {
        datesArray.push(item.dt_txt.substring(0, 10));

        if (new Date(item.dt_txt).getDate() === new Date().getDate()) {
          labelsArray.push(`${new Date(item.dt_txt).getHours()}:00`);
          degreesArray.push(item.main.temp.toFixed());
          windSpeedArray.push(`${item.wind.speed.toFixed()} km/h`);
        }

        
      });
      
      [...new Set(datesArray)].forEach((date) => {
        for (let i = 0; i < response.data.list.length; i++) {
          if (new Date(date).getDate() === new Date(response.data.list[i].dt_txt).getDate()) {
            dailyIconsIndexes.push(i);
            break;
          }
        }
        
      });
      

      dailyIconsIndexes.forEach((item) => {
        dailyIconsArray.push(response.data.list[item].weather[0].id);
      });
      setDailyIconsId(dailyIconsArray);
      setDates([...new Set(datesArray)]);

      setLabels(labelsArray);
      setDegrees(degreesArray);
      setWindSpeed(windSpeedArray);
    });
  };

  const searchCity = (event) => {
    if (event.key === "Enter") {
      getCurrentWeatherData();
      getDailyWeatherData();
    }
  };

  useEffect(() => {
    const handleLoad = () => {
      getCurrentWeatherData();
      getDailyWeatherData();
    };
    window.addEventListener("load", handleLoad);
    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <div className={style.wrapper}>
      <div className={style.inputContainer}>
        <div>
          <img src={pin} alt="" />
        </div>
        <input
          type="text"
          className={style.city}
          value={city}
          onChange={(event) => setCity(event.target.value)}
          onKeyPress={searchCity}
        />
      </div>
      <div className={style.errorMessageContainer}>
        {errorMessage && <p className={style.errorMessage}> {errorMessage} </p>}
      </div>

      <CurrentWeather data={data} />

      <div className={style.detailsContainer}>
        <Sidebar />
        <DailyWeather dates={dates} dailyIconsId={dailyIconsId} data={data} />
        <HourlyWeather
          labels={labels}
          degrees={degrees}
          windSpeed={windSpeed}
        />
      </div>
    </div>
  );
}

export default App;
