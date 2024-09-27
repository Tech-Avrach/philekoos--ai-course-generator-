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
import { FaRegCopy } from "react-icons/fa";

function FinishScreen({ params }) {
  const { user } = useUser();

  const router = useRouter();

  const [course, setCourse] = useState("loading")

  const [loading, setLoading] = useState(false)

  const [copied, setCopied] = useState(false)

  const COURSE_URL = process.env.NEXT_PUBLIC_HOST_NAME + "/course/view/" + params.courseId

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);

    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 1000)
  };

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

      <h2 className="text-3xl font-bold my-4 text-primary text-center">Congratulations! Your course has been created</h2>

      <ConfettiShow />
      <FinishedCourseBasic course={course} />

      <h2 className="mt-3">Course URL:</h2>
      <div className="border p-2 rounded-md flex justify-between items-center">
        <h2 className="text-cente text-gray-400">{COURSE_URL}</h2>
        <h2 className={copied ? "text-primary cursor-pointer" : "cursor-pointer text-gray-400"} onClick={() => copyToClipboard(COURSE_URL)}>
          <FaRegCopy className="cursor-pointer h-5 w-5" />
        </h2>
      </div>
    </div>
  )
}

export default FinishScreen