import Image from 'next/image'
import React from 'react'
import {  HiOutlineBookOpen, HiOutlinePuzzlePiece, HiEllipsisVertical } from 'react-icons/hi2'
import DropdownOption from './DropdownOption'
import { db } from '@/configs/db'
import { eq } from 'drizzle-orm'
import { Chapters, CourseList } from '@/configs/schema'
import toast from 'react-hot-toast'



function CourseCard({ course, refreshData }) {

    const handleOnDelete = async () => {
        const courseDeleteResult = await db.delete(CourseList).where(eq(CourseList.courseId, course?.courseId)).returning({id: CourseList.id})

        const chapterDeleteResult = await db.delete(Chapters).where(eq(Chapters.courseId, course?.courseId)).returning({id: Chapters.id})

        console.log("courseDelete", courseDeleteResult)

        console.log("chapterDelete", chapterDeleteResult)

        if (courseDeleteResult[0] && courseDeleteResult[0] !== undefined && chapterDeleteResult[0] && chapterDeleteResult[0] !== undefined) {
            refreshData();
            toast.success("Course deleted successfully", {
                className: "border border-primary",
            })
        } else {
            toast.error("Something went wrong. Please try again", {
                className: "border border-primary",
            })
        }
    }

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
            <div className="flex justify-between gap-2 items-center">
            <h2 className="line-clamp-1 font-medium text-lg">{course?.courseOutput?.name}</h2>
            <div className="h-5 w-5 font-extrabold text-xl">
                <DropdownOption handleOnDelete={handleOnDelete}>
            <HiEllipsisVertical />
            </DropdownOption>
            </div>
            </div>

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