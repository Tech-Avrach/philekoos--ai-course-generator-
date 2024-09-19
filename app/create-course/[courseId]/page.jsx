"use client"

import { db } from '@/configs/db'
import { CourseList } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { and, eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import CourseBasicInfo from './_components/CourseBasicInfo'
import CourseDetail from './_components/CourseDetail'
import ChapterList from './_components/ChapterList'

// import { useRouter } from 'next/navigation'

function CourseLayout({params}) {

    const { user } = useUser();

    // const router = useRouter();

    const [course, setCourse] = useState("loading")

    useEffect(()=>{
        console.log("params", params)

        console.log("user", user)

        params && GetCourse();
    },[params, user])

    const GetCourse = async () => {
        const result = await db.select().from(CourseList).where(and(
            eq(CourseList.courseId, params.courseId),
            eq(CourseList.createdBy, user?.primaryEmailAddress?.emailAddress)
        ))

        if(result[0] && result[0] !== undefined) setCourse(result[0])
        console.log("course", result[0])
    }

  return (
    <div className="mt-2 px-7 py-5 md:px-20 lg:px-44">
        <h2 className="font-bold text-center text-2xl">Course Layout</h2>

        {/* Basic Info */}
        
        {course && <CourseBasicInfo course={course} GetCourse={GetCourse}/>}

        {/* Course Detail */}

        {course && <CourseDetail course={course} />}

        {/* List Of Lessons */}

        {course && <ChapterList course={course} GetCourse={GetCourse}/>}
    </div>
  )
}

export default CourseLayout