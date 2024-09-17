import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

function TopicDescription() {
  return (
    <div>
      {/* Input Topic */}
        <div className="mx-20 lg:mx-32 ">
          <div className="mb-2">
            Write the topic for which you want to generate the course  
            <span className="text-sm text-gray-500"> (e.g., Python Course, Yoga, etc.) </span> 
            <span className="text-red-500"> *</span>
          </div>
          <Input id="Topic" placeholder="Topic" />
        </div>

      {/* Text Area Desc */}
      <div className="mx-20 lg:mx-32 mt-6">
          <div className="mb-2">
            Tell us more about your course, what you want to include in the course
            <span className="text-sm text-gray-500"> (optional) </span> 
          </div>
          <Textarea placeholder="Course Description" className="min-h-[100px] max-h-[300px] overflow-scroll"/>
        </div>

    </div>
  )
}

export default TopicDescription