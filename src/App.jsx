import React, { useState, useEffect } from 'react';
import axios from 'axios';


import pin from './assets/svg/pin.svg';


const style = {
  container: `bg-[#D69E36] flex flex-col h-screen px-6 py-12 text-white`,
  inputContainer: `text-white flex items-center lg:pl-24`,
  city: `bg-transparent d-block p-2 font-medium text-xl focus:outline-none lg:text-2xl	`,

  weatherToday: `my-9 grid place-content-center lg:grid-cols-2 lg:gap-y-24 lg:px-24`,
  weatherTodayTitle: `text-2xl font-medium mb-3 lg:text-5xl text-center lg:text-left`,
  weatherTodayIcon: `mb-3`,
  weatherTodayTemp: `text-6xl font-medium mb-4`,
  weatherTodayDate: `text-lg` 
}

const hourly = 'https://api.openweathermap.org/data/2.5/forecast?q=london&appid=b94e2326dd926a1013c56922ede2651e'


function App() {
  const [data, setData] = useState({});
  const [city, setCity] = useState('London');
  const [day, setDay] = useState('');

  const apiKey = 'b94e2326dd926a1013c56922ede2651e';

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city ? city : 'london'}&appid=${apiKey}&units=metric`;

  const getWeatherData = () => {
    axios.get(url).then((response) => {
      setData(response.data);
    })
  };

  const getDate = () => {
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day = new Date().getDay();

    const date = new Date().toDateString().slice(4);
    
    setDay(`${dayNames[day]} | ${date}`);
  }

  const searchCity = (event) => {
    if (event.key === 'Enter') {
      getWeatherData();
    }
  }

  useEffect(() => {
    const handleLoad = () => {
      getWeatherData();
      getDate();
    };
    window.addEventListener('load', handleLoad);
    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  

  return (
    <div className={style.container}>
      <div className={style.inputContainer}>
        <div><img src={pin} alt="" /></div>
        <input type="text" className={style.city} value={city} onChange={event => setCity(event.target.value)} onKeyPress={searchCity} />
      </div>

      <div className={style.weatherToday}>
        <div className={style.weatherTodayTitle}>{data.weather ? data.weather[0].main : null}</div>
        <div className='lg:row-start-1 lg:row-end-3 lg:col-start-2 lg:text-right lg:place-self-end'>
          <i className={`${style.weatherTodayIcon} owf owf-13x owf-${data.weather ? data.weather[0].id : ''}`}></i>
        </div>
        <div className='text-center lg:text-left'>
          <div className={style.weatherTodayTemp}>{data.main ? Math.round(data.main.temp) : null}°C</div>
          <h5 className={style.weatherTodayDate}>{day}</h5>
        </div>
      </div>
      <div>
      
      </div>
    </div>
  )
}

export default App
