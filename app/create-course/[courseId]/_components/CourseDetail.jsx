import React from 'react'

import { HiOutlineChartBar, HiOutlineClock, HiOutlineBookOpen, HiOutlineVideoCamera } from 'react-icons/hi2'

function CourseDetail({ course }) {
    return (
        <div className="border p-6 rounded-lg shadow-sm mt-3">
            <div className="grid grid-cols-2 md:grid-cols-4">
                <div className="flex items-center md:justify-center gap-3 m-2 md:m-0">
                    <HiOutlineChartBar className="text-4xl text-primary" />
                    <div>
                        <h2 className="text-sm text-gray-500">
                            Skill Level
                        </h2>
                        <h2 className="font-medium text-lg">
                            {course?.level}
                        </h2>
                    </div>
                </div>

                <div className="flex items-center md:justify-center gap-3">
                    <HiOutlineClock className="text-4xl text-primary" />
                    <div>
                        <h2 className="text-sm text-gray-500">
                            Duration
                        </h2>
                        <h2 className="font-medium text-lg">
                            {course?.courseOutput?.course?.duration}
                        </h2>
                    </div>
                </div>

                <div className="flex items-center md:justify-center gap-3">
                    <HiOutlineBookOpen className="text-4xl text-primary" />
                    <div>
                        <h2 className="text-sm text-gray-500">
                            No of Chapters
                        </h2>
                        <h2 className="font-medium text-lg">
                            {course?.courseOutput?.course?.chapters.length}
                        </h2>
                    </div>
                </div>

                <div className="flex items-center md:justify-center gap-3">
                    <HiOutlineVideoCamera className="text-4xl text-primary" />
                    <div>
                        <h2 className="text-sm text-gray-500">
                            Video Included
                        </h2>
                        <h2 className="font-medium text-lg">
                            {course?.includeVideo}
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseDetail