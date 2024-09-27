import Image from 'next/image'
import React from 'react'

function CourseCard({ course }) {
  return (
    <div className="shadow-md rounded-lg">
        <Image src={course.courseBanner} alt={course.name} width={300} height={300}  className="w-full h-[200px]"/>

        <div className="p-3">
            <h2 className="font-medium text-lg">{course?.courseOutput?.name}</h2>
        </div>
    </div>
  )
}

export default CourseCard