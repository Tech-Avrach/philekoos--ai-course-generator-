import React from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input'

function SelectOption() {
  return (
    <div className="px-10 md:px-20 lg:px-44">
      <div className="grid grid-cols-2 gap-10">
        <div>
          <label htmlFor="Select Difficulty" className="text-sm">Difficulty Level</label>
          <Select>
            <SelectTrigger className="">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advance">Advance</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="Courese Duration" className="text-sm">Course Duration</label>
          <Select>
            <SelectTrigger className="">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1 Hours">1 Hours</SelectItem>
              <SelectItem value="2 Hours">2 Hours</SelectItem>
              <SelectItem value="More than 3 Hours">More than 3 Hours</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="Display Video" className="text-sm">Display Video</label>
          <Select>
            <SelectTrigger className="">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="Number of Chapters" className="text-sm">Number of Chapters</label>
          <Input id="chapterNumber" type="number" placeholder="Chapter Number" min="1"/>
        </div>
      </div>
    </div>
  )
}

export default SelectOption