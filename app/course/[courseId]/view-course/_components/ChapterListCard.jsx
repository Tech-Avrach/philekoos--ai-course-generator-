import React from 'react'
import { HiOutlineClock } from 'react-icons/hi2'

function ChapterListCard({ chapter, index }) {
  return (
    <div className="grid grid-cols-5 p-3 h-[5.5rem] items-center border-b">
        <div>
            <h2 className="p-1 bg-primary w-8 h-8 text-white rounded-full text-center">{index + 1}</h2>
        </div>

        <div className="col-span-4">
            <h2 className="font-medium line-clamp-2">{chapter?.name}</h2>
            <h2 className="flex items-center gap-1 text-sm text-primary"><HiOutlineClock/>{chapter?.duration}</h2>
        </div>
    </div>
  )
}

export default ChapterListCard