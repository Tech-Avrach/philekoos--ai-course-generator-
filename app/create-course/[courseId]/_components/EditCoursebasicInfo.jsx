import React, { useState } from 'react'

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { HiPencilSquare } from 'react-icons/hi2'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { db } from '@/configs/db'
import { eq } from 'drizzle-orm'
import { CourseList } from '@/configs/schema'
import toast from 'react-hot-toast';

function EditCoursebasicInfo({ course, GetCourse }) {

  const [name, setName] = useState(course?.courseOutput?.name)
  const [description, setDescription] = useState(course?.courseOutput?.description)

  const onUpdateHandler = async () => {
    course.courseOutput.name = name;
    course.courseOutput.description = description;

    console.log("course", course) 

    try {

      const result = await db.update(CourseList).set({
        courseOutput: course?.courseOutput
      })
      .where(eq(CourseList.courseId, course?.courseId))
      .returning({id: CourseList.id})

      if(result[0] && result[0] !== undefined) {

        GetCourse();

        toast.success("Course updated successfully", {
          className: "border border-primary",
        })

      } else {

        toast.error("Something went wrong. Please try again", {
          className: "border border-primary",
        })
      }

      console.log("result", result)
      
    } catch (error) {
      toast.error("Something went wrong. Please try again", {
        className: "border border-primary",
      })
    }

  }

  return (
    <div>
        <Dialog>
  <DialogTrigger><HiPencilSquare /></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit Course Title & Description</DialogTitle>
      <DialogDescription>
        <div className="mt-3">
          <label htmlFor="Course Title">Course Title</label>
          <Input id="Course Title" className="font-medium text-black mb-3 " defaultValue={course?.courseOutput?.name} onChange={(e) => setName(e.target.value)}/>
        </div>

        <div>
          <label htmlFor="Description">Description</label>
          <Textarea id="Description" className=" max-h-52 h-40" defaultValue={course?.courseOutput?.description} onChange={(e) => setDescription(e.target.value)}/>
        </div>
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose>
        <Button onClick={onUpdateHandler}>Update</Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>
    </div>
  )
}

export default EditCoursebasicInfo