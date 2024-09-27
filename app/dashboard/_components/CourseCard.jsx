import Image from 'next/image'
import React from 'react'
import {  HiOutlineBookOpen, HiOutlinePuzzlePiece } from 'react-icons/hi2'


function CourseCard({ course }) {

  return (
    <div className="shadow-sm border rounded-lg p-2 hover:scale-105 transition-all cursor-pointer">
        <div className="relative">
        <Image src={course.courseBanner} alt={course.name} width={300} height={300}  className="w-full h-[200px] rounded-sm"/>

        <div className="absolute top-2 left-2 p-1 px-2 border border-primary w-fit rounded-full bg-blue-100">
                                <h2 className="text-sm flex gap-1 items-center text-primary">
                                    <HiOutlinePuzzlePiece />
                                    {course?.category}
                                </h2>
                            </div>
        </div>
        <div className="p-3">
            <h2 className="font-medium text-lg line-clamp-1">{course?.courseOutput?.name}</h2>

            <p className="text-sm text-gray-500 line-clamp-4 my-4">{course?.courseOutput?.description}</p>
            
            <div className="flex justify-between items-center border-t-2 border-primary pt-3">
                <h2 className="flex items-center gap-2 p-1 px-2 rounded-sm bg-blue-100 text-primary text-sm">
                    <HiOutlineBookOpen />
                    {course?.courseOutput?.noOfChapters} Chapters
                </h2>
                <h2 className="text-sm bg-blue-100 text-primary p-1 px-2 rounded-sm">
                    {course?.level}
                </h2>
            </div>
        </div>
    </div>
  )
}

export default CourseCard