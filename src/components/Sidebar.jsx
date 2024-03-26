import React from "react";

import user from "../assets/svg/user.svg";
import weather from "../assets/svg/weather.svg";
import explore from "../assets/svg/explore.svg";
import cities from "../assets/svg/pinBig.svg";
import settings from "../assets/svg/settings.svg";

const Sidebar = () => {
  return (
    <div className="hidden lg:flex lg:flex-col lg:justify-between items-center lg:bg-[#DFAE53]/80 lg:rounded-[40px] lg:p-[20px]">
      <button>
        <img src={user} alt="" />
      </button>
      <div className="flex flex-col justify-between items-center gap-y-[22px]">
        <SidebarItem text="weather" imgSrc={weather} />
        <SidebarItem text="explore" imgSrc={explore} />
        <SidebarItem text="cities" imgSrc={cities} />
        <SidebarItem text="settings" imgSrc={settings} />
      </div>
    </div>
  );
};

const SidebarItem = ({ text, imgSrc }) => {
  return (
    <button className="flex gap-y-[2px] flex-col items-center justify-center font-semibold">
      <img src={imgSrc} alt={text} />
      {text}
    </button>
  );
};

export default Sidebar;
