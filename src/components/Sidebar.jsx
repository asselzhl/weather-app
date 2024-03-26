import React from 'react'

import user from "../assets/svg/user.svg";
import weather from "../assets/svg/weather.svg";
import explore from "../assets/svg/explore.svg";
import pin from "../assets/svg/pinBig.svg";
import settings from "../assets/svg/settings.svg";


const Sidebar = () => {
  return (
    <div className="hidden lg:flex lg:flex-col lg:justify-between items-center lg:bg-[#DFAE53]/80 lg:rounded-[40px] lg:p-[20px]">
        <button>
            <img src={user} alt="" />
        </button>
        <div className='flex flex-col justify-between items-center gap-y-[22px]'>
            <button className='flex gap-y-[2px] flex-col items-center justify-center font-semibold'>
                <img src={weather} alt="" />
                weather
            </button>
            <button className='flex gap-y-[2px] flex-col items-center justify-center font-semibold'>
                <img src={explore} alt="" />
                explore
            </button>
            <button className='flex gap-y-[2px] flex-col items-center justify-center font-semibold'>
                <img src={pin} alt="" />
                cities
            </button>
            <button className='flex gap-y-[2px] flex-col items-center justify-center font-semibold'>
                <img src={settings} alt="" />
                settings
            </button>
        </div>
    </div>
  )
}

export default Sidebar