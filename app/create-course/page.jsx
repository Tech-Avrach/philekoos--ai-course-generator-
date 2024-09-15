"use client"

import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { HiClipboardDocumentCheck, HiLightBulb, HiMiniSquares2X2 } from 'react-icons/hi2'

function CreateCourse() {
  const StepperOptions=[{
    id:1,
    name: "Category",
    icon: <HiMiniSquares2X2 />
  },

  {
    id:2,
    name: "Topic & Description",
    icon: <HiLightBulb />
  },

  {
    id:3,
    name: "Options",
    icon: <HiClipboardDocumentCheck />
  }
  ]

  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div>

    {/* Stepper */}

    <div>
      <div className="flex flex-col justify-center items-center mt-10">
        <h2 className="text-2xl text-primary font-medium">
          Create Courese
        </h2>
        <div className="flex">

        {
          StepperOptions.map((option, index)=>(
              <div className="flex items-center mt-10" key={index}>
                <div className="flex flex-col w-[50px] md:w-[140px] items-center">
                  <div className={`p-3 rounded-full text-white ${activeIndex >= index ? "bg-primary " : "bg-gray-200"}`}>
                    {option.icon}
                  </div>
                  <h2 className="hidden md:block md:text-sm">{option.name}</h2>
                </div>
                {index != StepperOptions.length - 1   && <div className={`w-[50px] h-[3px] rounded-full lg:w-[170px] ${activeIndex -1 >= index ? "bg-primary" : "bg-gray-200"}`}></div>}
              </div>
          ))
        }
        </div>
      </div>
    </div>

    {/* Component */}

    {/* Next Prev Button */}

    <div>
      <Button onClick={() => setActiveIndex(activeIndex + 1)} >Next</Button>
    </div>

    </div>
  )
}

export default CreateCourse