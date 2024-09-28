import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { HiOutlineTrash } from 'react-icons/hi2'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

function DropdownOption({ children, handleOnDelete }) {


  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <AlertDialogDelete handleOnDelete={handleOnDelete}>
            <div className="flex items-center text-red-700 gap-3">
              <HiOutlineTrash className="text-red-700" />
              Delete
            </div>
            </AlertDialogDelete>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

    </div>
  )
}

export default DropdownOption


export const AlertDialogDelete = ({children, handleOnDelete }) => {

  const handleTriggerClick = (e) => {
    // Prevent the click event from propagating to the parent DropdownMenu
    e.stopPropagation();
  };

  return (
    <AlertDialog>
  <AlertDialogTrigger onClick={handleTriggerClick}>{children}</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your course
        and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={handleOnDelete}>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
  )}