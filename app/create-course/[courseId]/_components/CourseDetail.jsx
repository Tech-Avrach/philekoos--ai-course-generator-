import React from 'react'

import { HiOutlineChartBar, HiOutlineClock, HiOutlineBookOpen, HiOutlineVideoCamera } from 'react-icons/hi2'

function CourseDetail({ course }) {


    if(course === "loading") {
        return (
            <div className="border p-6 rounded-lg shadow-sm mt-3">
                <div className="grid grid-cols-2 md:grid-cols-4">
                    <div className="flex items-center md:justify-center gap-3 m-2 md:m-0">
                        <div className="w-10 h-10 bg-blue-200 rounded-xl animate-pulse"></div>
                        <div>
                            <div className="w-20 h-3 bg-blue-200 rounded-sm mb-2"></div>
                            <div className="w-28 h-5 bg-blue-200 rounded-sm "></div>
                            
                        </div>
                    </div>
    
                    <div className="flex items-center md:justify-center gap-3 m-2 md:m-0">
                        <div className="w-10 h-10 bg-blue-200 rounded-xl animate-pulse"></div>
                        <div>
                            <div className="w-20 h-3 bg-blue-200 rounded-sm mb-2"></div>
                            <div className="w-28 h-5 bg-blue-200 rounded-sm "></div>
                            
                        </div>
                    </div>
    
                    <div className="flex items-center md:justify-center gap-3 m-2 md:m-0">
                        <div className="w-10 h-10 bg-blue-200 rounded-xl animate-pulse"></div>
                        <div>
                            <div className="w-20 h-3 bg-blue-200 rounded-sm mb-2"></div>
                            <div className="w-28 h-5 bg-blue-200 rounded-sm "></div>
                            
                        </div>
                    </div>
    
                    <div className="flex items-center md:justify-center gap-3 m-2 md:m-0">
                        <div className="w-10 h-10 bg-blue-200 rounded-xl animate-pulse"></div>
                        <div>
                            <div className="w-20 h-3 bg-blue-200 rounded-sm mb-2"></div>
                            <div className="w-28 h-5 bg-blue-200 rounded-sm "></div>
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
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
                            {course?.courseOutput?.duration}
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
                            {course?.courseOutput?.chapters?.length}
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
}

export default CourseDetail