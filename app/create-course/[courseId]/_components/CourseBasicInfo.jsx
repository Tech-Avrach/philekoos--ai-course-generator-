import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

import { HiOutlinePuzzlePiece } from 'react-icons/hi2'

function CourseBasicInfo({ course }) {

    console.log("course in basic info", course)

    // console.log("course in basic info", course)

    if(course === "loading") {
        return (
            <div className="p-10 border rounded-xl shadow-sm mt-10 animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="flex flex-col justify-between">
                    <div>
                    <div className="w-full h-10 bg-blue-200 rounded-xl"></div>
                    <div className="w-full h-5 bg-blue-200 rounded-md mt-5"></div>
                    <div className="w-full h-5 bg-blue-200 rounded-md mt-2"></div>
                    <div className="w-full h-5 bg-blue-200 rounded-md mt-2"></div>
                    <div className="w-full h-5 bg-blue-200 rounded-md mt-2"></div>
    
                    <div className="p-2 border h-10 w-44 mt-5 rounded-full bg-blue-200 "></div>
                    </div>
    
                    <div className="p-2 border h-10 w-full mt-5 rounded-xl bg-blue-200 "></div>
    
                </div>
                <div className="w-full h-[350px] bg-blue-200 rounded-xl"></div>
            </div>
        </div>
        )
    } else {
        return (
            <div className="p-10 border rounded-xl shadow-sm mt-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="flex flex-col justify-between">
                        <div>
                        <h2 className="text-2xl font-bold">{course?.courseOutput?.course?.name}</h2>
                        <p className="text-md text-gray-500 mt-3">{course?.courseOutput?.course?.description}</p>
        
                        <div className="p-2 border border-primary mt-5 w-fit rounded-full bg-blue-50">
                            <h2 className="font-medium flex gap-2 items-center text-primary">
                                <HiOutlinePuzzlePiece />
                                {course?.category}
                            </h2>
                        </div>
                        </div>
        
                        <Button className="w-full mt-5">Start Course</Button>
                    </div>
                    <div>
                        <Image src={'/courseImagePlaceholder.png'} width={350} height={350} className="rounded-xl w-full object-cover h-[350px]" alt="course image"/>
                    </div>
                </div>
            </div>
          )
    }
}

export default CourseBasicInfo