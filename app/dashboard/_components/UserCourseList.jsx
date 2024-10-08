"use client"

import { db } from '@/configs/db'
import { CourseList } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import CourseCard from './CourseCard'
import CourseCardSkleton from './CourseCardSkleton'

function UserCourseList() {

    const { user } = useUser();

    const [courseList, setCourseList] = useState([])

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        user && getUserCourses()
    }, [user])

    const getUserCourses = async () => {

        setLoading(true)
       try {

        const result = await db
        .select()
        .from(CourseList)
        .where(eq(CourseList.createdBy, user?.primaryEmailAddress?.emailAddress))

        setCourseList(result)
        
       } catch (error) {

        console.log("error while fetching courses", error)
        
       }

        setLoading(false)

    }

    if(loading) {
        return (
            <div className="mt-5">
        <div>
            <h2 className="font-bold text-lg">
                My Courses
            </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
            {
                Array.from({ length: 6 }).map((index) => (
                    <CourseCardSkleton key={index} />
                )
            )}
        </div>
    </div>
        )
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
                    <CourseCard key={index} course={course} refreshData={getUserCourses}/>
                )
            )}
        </div>
    </div>
  )
}

export default UserCourseList