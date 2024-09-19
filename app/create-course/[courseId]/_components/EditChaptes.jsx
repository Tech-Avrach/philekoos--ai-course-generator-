import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { HiPencilSquare } from 'react-icons/hi2'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import toast from 'react-hot-toast';
import { DialogClose } from '@radix-ui/react-dialog'
import { Button } from '@/components/ui/button'
import { db } from '@/configs/db'
import { CourseList } from '@/configs/schema'
import { eq } from 'drizzle-orm'

  

function EditChaptes({ course, chapter, index, GetCourse }) {

    const [name, setName] = useState(chapter?.name)
    const [description, setDescription] = useState(chapter?.about)

    const onUpdateHandler = async () => {
        course.courseOutput.course.chapters[index].name = name;
        course.courseOutput.course.chapters[index].about = description;
    
        console.log("course", course) 

        console.log("name", course.courseOutput.course.chapters[index].name)

        console.log("description", course.courseOutput.course.chapters[index].about)
    
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
      <DialogTitle>Edit Chapter {index + 1}</DialogTitle>
      <DialogDescription>
      <div className="mt-3">
          <label htmlFor="Course Title">Chapter Name</label>
          <Textarea id="Course Title" className="font-medium text-black max-h-20 mb-3" defaultValue={chapter?.name} onChange={(e) => setName(e.target.value)}/>
        </div>

        <div>
          <label htmlFor="Description">Chapter Details</label>
          <Textarea id="Description" className=" max-h-52 h-40" defaultValue={chapter?.about} onChange={(e) => setDescription(e.target.value)}/>
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

export default EditChaptes