import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { HiPencilSquare } from 'react-icons/hi2'
  

function EditChaptes({ course, chapter, index, GetCourse }) {
  return (
    <div>
        <Dialog>
  <DialogTrigger><HiPencilSquare /></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit Chapter {index + 1}</DialogTitle>
      <DialogDescription>
        
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

    </div>
  )
}

export default EditChaptes