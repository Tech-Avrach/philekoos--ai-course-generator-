import React from 'react'

function CourseCardSkleton() {
   
    return (
        <div className="shadow-sm rounded-lg p-2 bg-blue-100">
            <div className="relative">
                <div className="w-full h-[200px] rounded-sm bg-blue-300 animate-pulse"></div>

                <div className="absolute top-2 left-2 p-1 px-2  w-24 h-10 rounded-full bg-blue-200 animate-pulse">
                    
                </div>
            </div>
            <div className="p-3">
                <div className="flex justify-between gap-2 items-center">
                    <div className="w-full h-8 rounded-sm bg-blue-300 animate-pulse"></div>
                    <div className="h-5 w-5 font-extrabold text-xl">
                      
                    </div>
                </div>

                <div className="w-full h-4 mt-4 mb-2 rounded-sm bg-blue-300 animate-pulse"></div>
                <div className="w-full h-4  mb-2 rounded-sm bg-blue-300 animate-pulse"></div>
                <div className="w-full h-4  mb-2 rounded-sm bg-blue-300 animate-pulse"></div>
                <div className="w-full h-4  mb-4 rounded-sm bg-blue-300 animate-pulse"></div>

                <div className="w-full h-1  mb-2 rounded-sm bg-blue-300 animate-pulse"></div>
                

                <div className="flex justify-between items-center ">

                    <div className="w-28 h-8 mt-1 rounded-sm bg-blue-300 animate-pulse"></div>
                    <div className="w-28 h-8 mt-1 rounded-sm bg-blue-300 animate-pulse"></div>
                </div>
            </div>
        </div>
    )
}

export default CourseCardSkleton