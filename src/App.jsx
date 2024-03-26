import React, { useState, useEffect } from "react";
import axios from "axios";

import pin from "./assets/svg/pin.svg";

import CurrentWeather from "./components/CurrentWeather";
import HourlyWeather from "./components/HourlyWeather";
import DailyWeather from "./components/DailyWeather";
import Sidebar from "./components/Sidebar";

const style = {
  container: `flex flex-col h-screen px-6 py-12 text-white`,
  inputContainer: `text-white flex items-center lg:pl-24`,
  city: `bg-transparent d-block p-2 font-medium text-xl focus:outline-none lg:text-2xl	capitalize`,
  errorMessage: `capitalize text-xl lg:text-2x text-center bg-[#DFAE53]/80 rounded-lg lg:rounded-[40px] p-3 mt-3 font-medium`
};

function App() {
  const [data, setData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [city, setCity] = useState("New York");
  const [labels, setLabels] = useState([]);
  const [degrees, setDegrees] = useState([]);
  const [windSpeed, setWindSpeed] = useState([]);
  const [dailyIconsId, setDailyIconsId] = useState([]);

  const dailyIconsIndexes = [0, 4, 8, 12, 16, 20, 24, 28, 32, 36];

  const apiKey = "b94e2326dd926a1013c56922ede2651e";

  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const dailyWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  const getCurrentWeatherData = () => {
    axios
      .get(currentWeatherUrl)
      .then((response) => {
        setData(response.data);
        setErrorMessage('');
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
    axios.get(dailyWeatherUrl).then((response) => {
      for (let i = 0; i < 4; i++) {
        labelsArray.push(
          `${new Date(response.data.list[i].dt_txt).getHours()}:00`
        );
        degreesArray.push(response.data.list[i].main.temp.toFixed());
        windSpeedArray.push(`${response.data.list[i].wind.speed}km/h`);
      }

      dailyIconsIndexes.forEach((item) =>
        dailyIconsArray.push(response.data.list[item].weather[0].id)
      );

      setDailyIconsId(dailyIconsArray);

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
    <div className="flex flex-col h-screen px-6 py-12 text-white">
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
      <div className="lg:px-[60px] min-h-[64px] mb-3">{errorMessage && <p className={style.errorMessage}> {errorMessage} </p>}</div>
      

      <CurrentWeather data={data} />

      <div className="lg:flex lg:gap-x-[2%] lg:justify-center lg:px-[30px]">
        <Sidebar />
        <DailyWeather dailyIconsId={dailyIconsId} />
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
