import React from 'react'

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

function EditCoursebasicInfo({ course }) {
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
          <Input id="Course Title" defaultValue={course?.courseOutput?.course?.name}/>
        </div>

        <div>
          <label htmlFor="Description">Description</label>
          <Textarea id="Description" />
        </div>
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose>
        <Button>Update</Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>
    </div>
  )
}

export default EditCoursebasicInfo