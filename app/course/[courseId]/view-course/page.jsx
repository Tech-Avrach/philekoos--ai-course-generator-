"use client"

import { db } from '@/configs/db';
import { Chapters, CourseList } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { and, eq } from 'drizzle-orm';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useContext } from 'react'
import FinishedCourseBasic from '@/app/create-course/[courseId]/finish/_components/FinishedCourseBasic';
import CourseUrl from '@/app/create-course/[courseId]/finish/_components/CourseUrl';
import CourseDetail from '@/app/create-course/[courseId]/_components/CourseDetail';
import FinishedChapterList from '@/app/create-course/[courseId]/finish/_components/FinishedChapterList';
import Header from '@/app/_components/Header';
import Image from 'next/image';
import ChapterListCard from './_components/ChapterListCard';
import ChapterContent from './_components/ChapterContent';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

function ViewCourse({ params }) {

  const { user } = useUser();

  const [course, setCourse] = useState("loading")

  const [chapter, setChapter] = useState("loading")

  const [selectedChapter, setSelectedChapter] = useState(0);

  useEffect(() => {
    console.log("params", params)

    if (params && user) {
      GetCourse();
    }

  }, [params, user])


  const GetCourse = async () => {
    const CourseResult = await db.select().from(CourseList).where(and(
      eq(CourseList.courseId, params.courseId),
      eq(CourseList.createdBy, user?.primaryEmailAddress?.emailAddress)
    ))

    const ChapterResult = await db.select().from(Chapters).where(and(
      eq(Chapters.courseId, params.courseId)
    ))

    console.log("Course CourseResult", CourseResult)

    console.log("Course ChapterResult", ChapterResult)

    if (CourseResult[0] && CourseResult[0] !== undefined && ChapterResult[0] && ChapterResult[0] !== undefined) {
      setCourse(CourseResult[0])
      setChapter(ChapterResult[0])
      console.log("course", CourseResult[0])

      // updateToken()
    }
  }

  return (
    <div className="flex">

{course === "loading" && chapter === "loading" ? (
  <div className="md:w-72 hidden md:block h-screen border-r shadow-sm">
    <div className="flex gap-3 items-center justify-center h-20 bg-white">
      <Image src="/logo.svg" alt="logo" width={40} height={40} />
      <h1 className="text-2xl text-primary font-bold mt-1">Philekoos</h1>
    </div>
    <hr className="mt-[0.18rem]" />

    <div className="flex flex-col gap-2 p-3">
      {Array.from({ length: 12 }).map((_, index) => (
        <div key={index} className="h-20 w-full bg-blue-200 animate-pulse"></div>
      ))}
    </div>
  </div>
) : (
  // Chapter List Side Bar
  <div className="md:w-72 hidden md:block h-screen border-r shadow-sm">
    <div className="flex gap-3 items-center justify-center h-20 bg-white">
      <Image src="/logo.svg" alt="logo" width={40} height={40} />
      <h1 className="text-2xl text-primary font-bold mt-1">Philekoos</h1>
    </div>
    <hr className="mt-[0.18rem]" />

    <h2 className="font-medium text-lg bg-primary text-white p-3 line-clamp-2">
      {course?.courseOutput?.name}
    </h2>

    <div>
      {course?.courseOutput?.chapters?.map((chapter, index) => (
        <div
          key={index}
          className={`cursor-pointer ${
            selectedChapter === index ? "bg-blue-200 hover:bg-blue-200" : "hover:bg-blue-100"
          }`}
          onClick={() => setSelectedChapter(index)}
        >
          <ChapterListCard chapter={chapter} index={index} />
        </div>
      ))}
    </div>
  </div>
)}






{/* Course Details */ }
<div className="flex-1">
  <Header />
  {/* Your page content */}
  <div>
    {course?.courseOutput?.chapters?.[selectedChapter] && chapter?.chapter?.[selectedChapter] ? (
      <ChapterContent
        chapter={course.courseOutput.chapters[selectedChapter]}
        content={chapter.chapter[selectedChapter]}
      />
    ) : (
      <div className="flex items-center justify-center h-[80vh]">
        <AiOutlineLoading3Quarters className="text-6xl animate-spin" />
      </div>
    )}
  </div>
</div>
</div >
  )
}

export default ViewCourse