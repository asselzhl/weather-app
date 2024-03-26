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


const DailyWeather = ({ dailyIconsId }) => {
  return (
      <div className="mb-[32px] lg:mb-0 lg:bg-[#DFAE53]/80 lg:rounded-[40px] lg:pt-[34px] lg:pb-[47px] lg:w-[22.5%] order-2 hills">
        <div className="lg:mb-[34px]">
          <Swiper
            className="text-center"
            slidesPerView={5}
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
                  <SlideContent key={iconId} iconId={iconId} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div className="pl-[15px] hidden lg:block">
          <h3 className="mb-[20px]">AIR CONDITIONS</h3>
          <div>
            <div className="flex gap-x-2 mb-[45px]">
              <img className="basis-5" src={thermometr} alt="" />
              <div>
                <h6>Real feel</h6>
                <p>30°</p>
              </div>
            </div>
            
            <div className="flex gap-x-2 mb-[45px]">
              <img className="basis-5" src={wind} alt="" />
              <div>
                <h6>Wind</h6>
                <p>0.8 km/hr</p>
              </div>
            </div>

            <div className="flex gap-x-2 mb-[45px]">
              <img className="basis-5" src={drop} alt="" />
              <div>
                <h6>Chance of rain</h6>
                <p>2%</p>
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
      <div></div>
      <div>
        <i className={`owf owf-3x owf-${iconId}`}></i>
      </div>
    </div>
  );
};

export default DailyWeather;
