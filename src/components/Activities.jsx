import React from 'react'

import heart from "../assets/svg/heart.svg";
import activities from "../helpers/activitiesList";

const style = {
    activitiesText: `flex gap-x-1.5 p-3 text-2xl pb-[36px]`,
    activitiesCard: `flex gap-x-[22px] justify-center`,
    cardDesc: `text-[#2B261D] text-xs`
};

const Activities = () => {
  return (
    <div>
        <div className={style.activitiesText}>
            <img src={heart} alt="" />
            Activities in your area
        </div>
        <div className={style.activitiesCard}>
            {activities.map((activity, index) => {
                return (
                    <div key={index}>
                        <img src={activity.img} alt="" />
                        <h6 className={style.cardDesc}>{`${activity.distance} away`}</h6>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default Activities