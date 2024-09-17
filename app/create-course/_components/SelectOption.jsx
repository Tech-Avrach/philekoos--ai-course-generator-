import React,{ useContext } from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input'
import { UserInputContext } from '@/app/_context/UserInputContext';

function SelectOption() {

  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const handleInputChange = (fieldName, value) => {
    setUserCourseInput((prevInput) => ({
      ...prevInput,
      [fieldName]: value
    }))
  }


  return (
    <div className="px-10 md:px-20 lg:px-44">
      <div className="grid grid-cols-2 gap-10">
        <div>
          <label htmlFor="Select Difficulty" className="text-sm">Difficulty Level</label>
          <Select onValueChange={(value) => handleInputChange("level", value)} value={userCourseInput?.level}>
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
          <Select onValueChange={(value) => handleInputChange("duration", value)} value={userCourseInput?.duration}>
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
          <Select onValueChange={(value) => handleInputChange("displayVideo", value)} value={userCourseInput?.displayVideo}>
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
          <Input id="chapterNumber" type="number" placeholder="Chapter Number" min="1"
            onChange={(e) => handleInputChange("noOfChapters", e.target.value)}
            value={userCourseInput?.noOfChapters}
          />
        </div>
      </div>
    </div>
  )
}

export default SelectOption