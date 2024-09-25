"use client"

import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { and, eq } from 'drizzle-orm';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react'
import CourseBasicInfo from '../_components/CourseBasicInfo';
import FinishedCourseBasic from './_components/FinishedCourseBasic';
import ConfettiShow from '@/app/_components/Confetti';

function FinishScreen({ params }) {
  const { user } = useUser();

  const router = useRouter();

  const [course, setCourse] = useState("loading")

  const [loading, setLoading] = useState(false)

  useEffect(() => {
      console.log("params", params)

      console.log("user", user)

      params && GetCourse();
  }, [params, user])

  const GetCourse = async () => {
      const result = await db.select().from(CourseList).where(and(
          eq(CourseList.courseId, params.courseId),
          eq(CourseList.createdBy, user?.primaryEmailAddress?.emailAddress)
      ))

      if (result[0] && result[0] !== undefined) setCourse(result[0])
      console.log("course", result[0])
  }
  return (
    <div className="px-10 md:px-20 lg:px-44 my-7">
      <ConfettiShow />
      <FinishedCourseBasic course={course} />
    </div>
  )
}

export default FinishScreen