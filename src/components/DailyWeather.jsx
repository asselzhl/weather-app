import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";


import thermometr from "../assets/svg/thermometr.svg";
import wind from "../assets/svg/wind.svg";
import drop from "../assets/svg/drop.svg";
import sun from "../assets/svg/sun.svg";

import { Navigation, EffectCoverflow } from "swiper/modules";

const style = {
  dailyWeatherContainer: `mb-[32px] lg:mb-0 lg:bg-[#DFAE53]/80 lg:rounded-[40px] lg:pt-[34px] lg:pb-[47px] lg:w-[22.5%] order-2 hills`,
  swiperContainer: `lg:mb-[34px]`,
  airConditionsContainer: `pl-[15px] hidden lg:block`
};

const DailyWeather = ({dates, dailyIconsId, data }) => {
  const dayNames = [
    "SUN",
    "MON",
    "TUE",
    "WED",
    "THU",
    "FRI",
    "SAT",
  ];

  return (
      <div className={style.dailyWeatherContainer}>
        <div className={style.swiperContainer}>
          <Swiper
            className="text-center"
            slidesPerView={3}
            navigation={true}
            centeredSlides={true}
            modules={[Navigation, EffectCoverflow]}
            effect={"coverflow"}
            coverflowEffect={{
              rotate: 0,
              scale: 0.8,
              slideShadows: false,
            }}
          >
            {dailyIconsId.map((iconId, index) => {
              return (
                <SwiperSlide key={index}>
                  <div className="text-xl">{dayNames[new Date(dates[index]).getDay()]}</div>
                  <SlideContent key={iconId} iconId={iconId} dates={dates} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div className={style.airConditionsContainer}>
          <h3 className="mb-[20px]">AIR CONDITIONS</h3>
          <div>
            <div className="flex gap-x-2 mb-[45px]">
              <img className="basis-5" src={thermometr} alt="" />
              <div>
                <h6>Real feel</h6>
                <p>{data.main ? data.main.feels_like.toFixed() : null}°</p>
              </div>
            </div>
            
            <div className="flex gap-x-2 mb-[45px]">
              <img className="basis-5" src={wind} alt="" />
              <div>
                <h6>Wind</h6>
                <p>{data.wind ? data.wind.speed.toFixed() : null} km/hr</p>
              </div>
            </div>

            <div className="flex gap-x-2 mb-[45px]">
              <img className="basis-5" src={drop} alt="" />
              <div>
                <h6>Chance of rain</h6>
                <p>{data.rain ? data.rain['1h'].toFixed() : 0}%</p>
              </div>
            </div>

            <div className="flex gap-x-2">
              <img className="basis-5" src={sun} alt="" />
              <div>
                <h6>UV Index</h6>
                <p>4</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

const SlideContent = ({ iconId }) => {
  return (
      <div>
        <i className={`owf owf-3x owf-${iconId}`}></i>
      </div>
  );
};


export default DailyWeather;
