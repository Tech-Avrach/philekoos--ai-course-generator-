import React from 'react'

function ChapterContent({ chapter, content }) {

    console.log("chapter", chapter)
    console.log("content", content)


  return (
    <div>
        <div className="p-10">

            <h1 className="text-2xl font-medium mb-3">{chapter?.name}</h1>
            <h2 className="text-lg text-gray-500 font-medium">{chapter?.about}</h2>

            {/* Video */}
            

            {/* Content */}
        </div>

    </div>
  )
}

export default ChapterContent