import { UserInputContext } from '@/app/_context/UserInputContext';
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React, { useContext, useEffect, useState } from 'react'
import CaregoryList from '@/app/_shared/CaregoryList'

function TopicDescription() {

  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const [exampleLable, SetExampleLable] = useState("")

  const handleInputChange = (fieldName, value) => {
    setUserCourseInput((prevInput) => ({
      ...prevInput,
      [fieldName]: value
    }))
  }

  useEffect(() => {
    if (userCourseInput?.category) {
      // Find the category in CategoryList
      const selectedCategory = CaregoryList.find(
        (category) => category.name === userCourseInput.category
      );

      // If category is found, set the exampleLabel
      if (selectedCategory) {
        SetExampleLable(selectedCategory.example);
      } else {
        SetExampleLable(""); // Clear if no matching category
      }
    }


  },[userCourseInput])
  return (
    <div>
      {/* Input Topic */}
        <div className="mx-20 lg:mx-32 ">
          <div className="mb-2">
            Write the topic for which you want to generate the course  
            <span className="text-sm text-gray-500"> {exampleLable} </span> 
            <span className="text-red-500"> *</span>
          </div>
          <Input id="Topic" placeholder="Topic" onChange={(e) => handleInputChange("topic", e.target.value)} value={userCourseInput?.topic}/>
        </div>

      {/* Text Area Desc */}
      <div className="mx-20 lg:mx-32 mt-6">
          <div className="mb-2">
            Tell us more about your course, what you want to include in the course
            <span className="text-sm text-gray-500"> (optional) </span> 
          </div>
          <Textarea placeholder="Course Description" className="min-h-[100px] max-h-[300px] overflow-scroll" onChange={(e) => handleInputChange("description", e.target.value)} value={userCourseInput?.description}/>
        </div>

    </div>
  )
}

export default TopicDescription