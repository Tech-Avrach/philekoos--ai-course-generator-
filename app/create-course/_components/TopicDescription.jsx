import { Input } from '@/components/ui/input'
import React from 'react'

function TopicDescription() {
  return (
    <div>
      {/* Input Topic */}
        <div className="mx-20 lg:mx-32 ">
          <div className="mb-2">
            Write the topic for which you want to generate the course  
            <span className="text-sm text-gray-500"> (e.g., Python Course, Yoga, etc.)</span>:
          </div>
          <Input id="Topic" placeholder="Topic" />
        </div>
      {/* Text Area Desc */}


    </div>
  )
}

export default TopicDescription