"use client"

import { Button } from '@/components/ui/button'
import React, { useState, useEffect, useContext } from 'react'
import { HiClipboardDocumentCheck, HiLightBulb, HiMiniSquares2X2 } from 'react-icons/hi2'
import SelectCategory from './_components/SelectCategory'
import TopicDescription from './_components/TopicDescription'
import SelectOption from './_components/SelectOption'
import { UserInputContext } from '../_context/UserInputContext'
import toast from 'react-hot-toast';

function CreateCourse() {
  const StepperOptions = [{
    id: 1,
    name: "Category",
    icon: <HiMiniSquares2X2 />
  },

  {
    id: 2,
    name: "Topic & Description",
    icon: <HiLightBulb />
  },

  {
    id: 3,
    name: "Options",
    icon: <HiClipboardDocumentCheck />
  },
  ]

  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    console.log(userCourseInput)
  }, [userCourseInput])

  const handleNextButton = () => {

    if(activeIndex === 0 && !userCourseInput?.category) {
      toast("Please select a category", {
        className: "border border-primary",
      })

      return;
    } 
    
    else if(activeIndex === 1 && (!userCourseInput?.topic || userCourseInput?.topic.trim() === "")) {
      toast("Please enter a topic", {
        className: "border border-primary",
      })
      return;
    }
    
    else if(activeIndex === 2) {

      if(!userCourseInput?.level) {
        toast("Please select a Difficulty level", {
          className: "border border-primary",
        })
        return;
      }

      if(!userCourseInput?.duration) {
        toast("Please select a Course duration", {
          className: "border border-primary",
        })
        return;
      }

      if(!userCourseInput?.displayVideo) {
        toast("Please select a display video or not", {
          className: "border border-primary",
        })
        return;
      }

      if(!userCourseInput?.noOfChapters) {
        toast("Please enter a chapter numbers", {
          className: "border border-primary",
        })
        return;
      }
    }


    setActiveIndex((prevIndex) => prevIndex + 1)
  }


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
              StepperOptions.map((option, index) => (
                <div className="flex items-center mt-10" key={index}>
                  <div className="flex flex-col w-[50px] md:w-[140px] items-center">
                    <div className={`p-3 rounded-full text-white ${activeIndex >= index ? "bg-primary " : "bg-gray-200"}`}>
                      {option.icon}
                    </div>
                    <h2 className="hidden md:block md:text-sm">{option.name}</h2>
                  </div>
                  {index != StepperOptions.length - 1 && <div className={`w-[50px] h-[3px] rounded-full lg:w-[170px] ${activeIndex - 1 >= index ? "bg-primary" : "bg-gray-200"}`}></div>}
                </div>
              ))
            }
          </div>
        </div>
      </div>
      
      <div className="px-10 md:px-20 lg:px-44 mt-10">
      {/* Component */}

      {
        activeIndex == 0 ? <SelectCategory /> : activeIndex == 1 ? <TopicDescription />: <SelectOption />
      }

      {/* Next Prev Button */}

      <div className="flex justify-between mt-10">
        <Button 
          onClick={() => setActiveIndex(activeIndex - 1)} 
          disabled={activeIndex == 0}
          variant="outline"
          >
            Previous
        </Button>

        {
          activeIndex !== StepperOptions.length - 1 && <Button onClick={() => handleNextButton()} >Next</Button>
        }

        {
          activeIndex == StepperOptions.length - 1 && <Button onClick={() =>  handleNextButton()} >Generate Course Layout</Button>
        }
      </div>

    </div>
    </div>
  )
}

export default CreateCourse