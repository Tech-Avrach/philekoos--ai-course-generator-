"use client"

import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { and, eq } from 'drizzle-orm';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useContext } from 'react'
import FinishedCourseBasic from '@/app/create-course/[courseId]/finish/_components/FinishedCourseBasic';
import CourseUrl from '@/app/create-course/[courseId]/finish/_components/CourseUrl';
import CourseDetail from '@/app/create-course/[courseId]/_components/CourseDetail';
import FinishedChapterList from '@/app/create-course/[courseId]/finish/_components/FinishedChapterList';
import Header from '@/app/_components/Header';



function Course({ params }) {

  const { user } = useUser();
  const router = useRouter();

  const COURSE_URL = process.env.NEXT_PUBLIC_HOST_NAME + "/course/view/" + params.courseId


  const [course, setCourse] = useState("loading")

  useEffect(() => {
    console.log("params", params)

   if(params && user) {
    GetCourse();
   }

  }, [params, user])

  const GetCourse = async () => {
    const result = await db.select().from(CourseList).where(and(
      eq(CourseList.courseId, params.courseId),
      eq(CourseList.createdBy, user?.primaryEmailAddress?.emailAddress)
    ))

    console.log("Course result", result)

    if (result[0] && result[0] !== undefined) {
      setCourse(result[0])
    console.log("course", result[0])

    // updateToken()
    }
}


  return (
    <>
    <Header showLogo={true} />
    <div className="px-10 md:px-20 lg:px-44 my-7">

      {/* <h2 className="text-3xl font-bold my-4 text-primary text-center">Congratulations! Your course has been created</h2> */}

      {/* <ConfettiShow /> */}
      <FinishedCourseBasic course={course} />

      <CourseUrl COURSE_URL={COURSE_URL} />

      <CourseDetail course={course} />

      <FinishedChapterList course={course} />
    </div>
    </>
  )
}

export default Course