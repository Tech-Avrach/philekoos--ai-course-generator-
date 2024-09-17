"use client"

import { UserInputContext } from '@/app/_context/UserInputContext';
import CaregoryList from '@/app/_shared/CaregoryList'
import Image from 'next/image'
import React, { useContext } from 'react'



function SelectCategory() {

  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const handleCategoryChange = (category) => {

    setUserCourseInput((prevInput) => ({
      category
    }));
  }

  return (
    <div>
    <h2 className=" px-10 md:px-20 my-5">Select the Course Category</h2>
    <div className="grid grid-cols-3 gap-10 px-10 md:px-20">
        {
            CaregoryList.map((category, index) => (
                <div className={`flex flex-col p-5 border items-center rounded-xl hover:border-primary hover:bg-blue-100 cursor-pointer ${userCourseInput?.category === category.name ? "border-primary bg-blue-100" : "border-gray-200"}`}
                key={index}
                onClick={() => handleCategoryChange(category.name)} 
                >
                    <Image src={category.icon} alt="logo" width={50} height={50} />

                    <h2>{category.name}</h2>
                </div>
            )
        )}
    </div>
    </div>
  )
}

export default SelectCategory