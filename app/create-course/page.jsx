"use client"

import { Button } from '@/components/ui/button'
import React, { useState, useEffect, useContext } from 'react'
import { HiClipboardDocumentCheck, HiLightBulb, HiMiniSquares2X2 } from 'react-icons/hi2'
import SelectCategory from './_components/SelectCategory'
import TopicDescription from './_components/TopicDescription'
import SelectOption from './_components/SelectOption'
import { UserInputContext } from '../_context/UserInputContext'
import toast from 'react-hot-toast';
import { GenerateCourseLayout } from '@/configs/AiModel'
import LoadingDialog from './_components/LoadingDialog'
import { db } from '@/configs/db'

import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs'
import { CourseList } from '@/configs/schema'
import { useRouter } from 'next/navigation'

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

  const [loading, setLoading] = useState(false)

  const { user } = useUser();

  const router = useRouter();


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
    setActiveIndex((prevIndex) => prevIndex + 1)
  }

  const HandleGenerateCourseLayout = async () => {
    if(activeIndex === 2) {

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


    try {

      setLoading(true)

      const BASIC_PROMPT = "Generate A Course Tutorial on Following Detail With fiels as Name, Description, a detailed prompt to generate a banner image of that course as imagePrompt, NoOfChapters, Along With Chapter Name, about, Duration."

      const USER_INPUT_PROMPT = `Category: ${userCourseInput?.category}, Topic: ${userCourseInput?.topic}, Level: ${userCourseInput?.level}, Duration: ${userCourseInput?.duration}, NoOfChapters: ${userCourseInput?.noOfChapters}`
  
      const FINAL_PROMPT = `${BASIC_PROMPT} ${USER_INPUT_PROMPT} In JSON Format.`
  
      console.log("FINAL_PROMPT", FINAL_PROMPT)
  
  
      const result = await GenerateCourseLayout.sendMessage(FINAL_PROMPT)
      console.log(result.response?.text());
  
      console.log("result", JSON.parse(result.response?.text()))

      SaveCourseLayoutInDb(JSON.parse(result.response?.text()));

    } catch (error) {
      
      setLoading(false)
      toast.error("Something went wrong. Please try again", {
        className: "border border-primary",
      })
      
    }

  }

  const SaveCourseLayoutInDb = async (courseLayout) => {
    
    try {
      setLoading(true)

      var id = uuidv4();
      const result = await db.insert(CourseList).values({
        courseId: id,
        name: userCourseInput?.topic,
        category: userCourseInput?.category,
        level: userCourseInput?.level,
        imagePrompt: userCourseInput?.imagePrompt,
        courseOutput: courseLayout,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
        userProfileImage: user?.imageUrl
      })
      
      router.replace(`/create-course/${id}`)

    } catch (error) {
      console.log("Storing Layout to database : ", error)

      toast.error("Something went wrong. Please try again", {
        className: "border border-primary",
      })

      setLoading(false)


    }
    

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
          activeIndex == StepperOptions.length - 1 && <Button onClick={() =>  HandleGenerateCourseLayout()} >Generate Course Layout</Button>
        }
      </div>

    </div>
    <LoadingDialog loading={loading} />
    </div>
  )
}

export default CreateCourse