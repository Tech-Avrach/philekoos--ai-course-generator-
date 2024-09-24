"use client"

import { db } from '@/configs/db'
import { Chapters, CourseList } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { and, eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import CourseBasicInfo from './_components/CourseBasicInfo'
import CourseDetail from './_components/CourseDetail'
import ChapterList from './_components/ChapterList'
import { Button } from '@/components/ui/button'
import { GenerateChapterContent_AI } from '@/configs/AiModel'
import LoadingDialog from '../_components/LoadingDialog'
import service from '@/configs/service'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'


// import { useRouter } from 'next/navigation'

function CourseLayout({ params }) {

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

    const generateChapterContent = async () => {

        const chapters = course?.courseOutput?.chapters;

        let error = false;

        chapters.forEach(async (chapter, index) => {

            const PROMPT = `Explain the concept in Detail on Topic: ${course?.courseOutput?.name}, Chapter: ${chapter?.name}, in JSON Format with a list of array with fields as title, explaination on a given chapter in detail, Code Example(Code field in <precode> format) if applicable`

            console.log("prompt", PROMPT)

            // if(index === 0) {
            setLoading(true)

            try {

                let videoId = "";

                //Generate Video Url
                service.getVideos(course?.courseOutput?.name + ":" + chapter?.name).then((response) => {
                    console.log("youtube response", response)

                    videoId = response[0]?.id?.videoId;
                })

                //Generate Chapter Content
                const result = await GenerateChapterContent_AI.sendMessage(PROMPT);
                console.log("Course detail : ", result.response?.text());

                const content = JSON.parse(result.response?.text());


                //Save Chapter Content + Video Url

                await db.insert(Chapters).values({
                    chapterId: index,
                    courseId: course?.courseId,
                    content: content,
                    videoId: videoId
                })

                setLoading(false)

            } catch (error) {
                console.log("error", error)
                setLoading(false)

                toast.error("Something went wrong. Please try again", {
                    className: "border border-primary",
                });

                error = true

            } finally {
                setLoading(false)
            }
            // }

            if(!error) {
                toast.success("Course content generated successfully", {
                    className: "border border-primary",
                });

                router.replace(`/create-course/${course?.courseId}/finish`);
            }
        })

    }


    return (
        <div className="mt-2 px-7 py-5 md:px-20 lg:px-44">
            <h2 className="font-bold text-center text-2xl">Course Layout</h2>

            {/* Basic Info */}

            <LoadingDialog loading={loading} />

            {course && <CourseBasicInfo course={course} GetCourse={GetCourse} />}

            {/* Course Detail */}

            {course && <CourseDetail course={course} />}

            {/* List Of Lessons */}

            {course && <ChapterList course={course} GetCourse={GetCourse} />}

            <div className="mt-5 flex items-end justify-end">
                <Button onClick={generateChapterContent}>Generate Course Content</Button>
            </div>
        </div>
    )
}

export default CourseLayout