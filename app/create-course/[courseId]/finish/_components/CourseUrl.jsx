import React, { useState } from 'react'
import { FaRegCopy } from 'react-icons/fa';

function CourseUrl({ COURSE_URL }) {

  const [copied, setCopied] = useState(false)

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    
        setCopied(true)
    
        setTimeout(() => {
          setCopied(false)
        }, 1000)
      };

  return (
    <div>
              <h2 className="mt-3">Course URL:</h2>
      <div className="border p-2 rounded-md flex justify-between items-center">
        <h2 className="text-cente text-gray-400">{COURSE_URL}</h2>
        <h2 className={copied ? "text-primary cursor-pointer" : "cursor-pointer text-gray-400"} onClick={() => copyToClipboard(COURSE_URL)}>
          <FaRegCopy className="cursor-pointer h-5 w-5" />
        </h2>
      </div>
    </div>
  )
}

export default CourseUrl