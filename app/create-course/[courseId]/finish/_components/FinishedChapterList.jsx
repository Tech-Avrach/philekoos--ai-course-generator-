import React, { useState, useEffect } from 'react';
import { HiOutlineCheckCircle, HiOutlineClock } from 'react-icons/hi2';

function FinishedChapterList({ course }) {
    const [chapters, setChapters] = useState([]);

    useEffect(() => {
      if (course && course !== 'loading') {
        setChapters(course?.courseOutput?.chapters || []);
      }
    }, [course]);
  
    if (course === "loading" && chapters?.length === 0) {
      return (
        <div className="mt-3">
          <h2 className="text-xl font-medium">Chapters</h2>
          <div className="mt-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="border p-5 rounded-lg shadow-sm mt-3 flex items-center">
                <div className="flex gap-4 w-full items-center">
                  <div className="w-12 h-12">
                    <div className="h-10 w-10 rounded-full bg-blue-200 animate-pulse"></div>
                  </div>
  
                  <div className="w-full">
                    <div className="w-full h-5 bg-blue-200 rounded-sm mb-2 animate-pulse"></div>
                    <div className="w-full h-3 bg-blue-200 rounded-sm mb-2 animate-pulse"></div>
                    <div className="w-1/2 h-3 bg-blue-200 rounded-sm mb-5 animate-pulse"></div>
  
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-blue-200 rounded-full mb-2 animate-pulse"></div>
                      <div className="w-[100px] h-3 bg-blue-200 rounded-sm mb-2 animate-pulse"></div>
                    </div>
                  </div>
                </div>
                <div className="h-10 w-10 rounded-full ml-5 bg-blue-200 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <div className="mt-3">
          <h2 className="text-xl font-medium">Chapters</h2>
          <div className="mt-2">
            {chapters?.map((chapter, index) => (
              <div key={index} className="border p-5 rounded-lg shadow-sm mt-3 flex justify-between items-center bg-white">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 flex items-center">
                    <h2 className="bg-primary h-10 w-10 text-white rounded-full text-center flex items-center justify-center">
                      {index + 1}
                    </h2>
                  </div>
                  <div>
                    <h2 className="font-medium text-lg">{chapter?.name}</h2>
                    <p className="text-sm text-gray-500">{chapter?.about}</p>
                    <p className="flex gap-2 text-primary items-center mt-2">
                      <HiOutlineClock />{chapter?.duration}
                    </p>
                  </div>
                </div>
                <HiOutlineCheckCircle className="text-5xl text-gray-300 md:ml-5" />
              </div>
            ))}
          </div>
        </div>
      );
    }
}

export default FinishedChapterList