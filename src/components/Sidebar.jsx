import React from "react";

import user from "../assets/svg/user.svg";
import weather from "../assets/svg/weather.svg";
import explore from "../assets/svg/explore.svg";
import cities from "../assets/svg/pinBig.svg";
import settings from "../assets/svg/settings.svg";

const style = {
  sidebarContainer: `hidden lg:flex lg:flex-col lg:justify-between items-center lg:bg-[#DFAE53]/80 lg:rounded-[40px] lg:p-[20px]`,
  sidebarNavigation: `flex flex-col justify-between items-center gap-y-[22px]`,
  navigationItem: `flex gap-y-[2px] flex-col items-center justify-center font-semibold`
};

const Sidebar = () => {
  return (
    <div className={style.sidebarContainer}>
      <button>
        <img src={user} alt="" />
      </button>
      <nav className={style.sidebarNavigation}>
        <SidebarItem text="weather" imgSrc={weather} />
        <SidebarItem text="explore" imgSrc={explore} />
        <SidebarItem text="cities" imgSrc={cities} />
        <SidebarItem text="settings" imgSrc={settings} />
      </nav>
    </div>
  );
};

const SidebarItem = ({ text, imgSrc }) => {
  return (
    <button className={style.navigationItem}>
      <img src={imgSrc} alt={text} />
      {text}
    </button>
  );
};

export default Sidebar;
