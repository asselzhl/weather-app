import React from 'react'

import heart from "../assets/svg/heart.svg";
import activities from "../helpers/activitiesList";

const Activities = () => {
  return (
    <div>
        <div className='flex gap-x-1.5 p-3 text-2xl pb-[36px]'>
            <img src={heart} alt="" />
            Activities in your area
        </div>
        <div className='flex gap-x-[22px] justify-center'>
            {activities.map((activity, index) => {
                return (
                    <div>
                        <img src={activity.img} alt="" />
                        <h6 className='text-[#2B261D] text-xs'>{`${activity.distance} away`}</h6>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default Activities