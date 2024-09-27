"use client"

import { db } from '@/configs/db'
import { CourseList } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import CourseCard from './CourseCard'

function UserCourseList() {

    const { user } = useUser();

    const [courseList, setCourseList] = useState([])

    useEffect(() => {
        user && getUserCourses()
    }, [user])

    const getUserCourses = async () => {
        const result = await db
        .select()
        .from(CourseList)
        .where(eq(CourseList.createdBy, user?.primaryEmailAddress?.emailAddress))

        setCourseList(result)

    }

  return (
    <div className="mt-5">
        <div>
            <h2 className="font-bold text-lg">
                My Courses
            </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
            {
                courseList && courseList.map((course, index) => (
                    <CourseCard key={index} course={course} />
                )
            )}
        </div>
    </div>
  )
}

export default UserCourseList