"use client"

import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { and, eq } from 'drizzle-orm';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useContext } from 'react'
import CourseBasicInfo from '../_components/CourseBasicInfo';
import FinishedCourseBasic from './_components/FinishedCourseBasic';
import ConfettiShow from '@/app/_components/Confetti';
import { FaRegCopy } from "react-icons/fa";
import { UserTokenContext } from '@/app/_context/UserTokenContext';
import CourseUrl from './_components/CourseUrl';
import CourseDetail from '../_components/CourseDetail';
import FinishedChapterList from './_components/FinishedChapterList';

function FinishScreen({ params }) {
  const { user } = useUser();

  const { userToken, updateUserToken, getUserTokens } = useContext(UserTokenContext)

  const router = useRouter();

  const [course, setCourse] = useState("loading")

  const [loading, setLoading] = useState(false)

  const [copied, setCopied] = useState(false)

  const COURSE_URL = process.env.NEXT_PUBLIC_HOST_NAME + "/course/view/" + params.courseId


  useEffect(() => {
    console.log("params", params)

   if(params && user) {
    GetCourse();
   }

  }, [params, user])


  const updateToken = async () => {

    let email = user?.primaryEmailAddress?.emailAddress
    let fullName = user?.fullName

    if (email && fullName) {

      let token = await getUserTokens(email, fullName);

      if(token && token <= 0) {
        
        router.push("/dashboard")
      } else {


        let newToken = token - 1;

        console.log("token inside finish", token)

        console.log("newToken", newToken)

        updateUserToken(newToken, email, fullName)
      }
    }

  }


  // useEffect(() => {

  //   let email = user?.primaryEmailAddress?.emailAddress
  //   let fullName = user?.fullName

  //   if (email && fullName) {
     
  //     let newToken = userToken - 1;

  //     updateUserToken(newToken, email, fullName)
  //   }

  // }, [user])

  const GetCourse = async () => {
    const result = await db.select().from(CourseList).where(and(
      eq(CourseList.courseId, params.courseId),
      eq(CourseList.createdBy, user?.primaryEmailAddress?.emailAddress)
    ))

    console.log("Course result", result)

    if (result[0] && result[0] !== undefined) {
      setCourse(result[0])
    console.log("course", result[0])

    updateToken()
    }
  }
  return (
    <div className="px-10 md:px-20 lg:px-44 my-7">

      <h2 className="text-3xl font-bold my-4 text-primary text-center">Congratulations! Your course has been created</h2>

      <ConfettiShow />
      <FinishedCourseBasic course={course} />

      <CourseUrl COURSE_URL={COURSE_URL} />

      <CourseDetail course={course} />

      <FinishedChapterList course={course} />
    </div>
  )
}

export default FinishScreen