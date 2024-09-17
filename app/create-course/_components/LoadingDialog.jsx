import React from 'react'
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
import Image from 'next/image'
  

function LoadingDialog({ loading }) {
  return (
    <div>
        <AlertDialog open={loading}>
  <AlertDialogContent>
    <AlertDialogHeader>
     
      <AlertDialogDescription>
        <div className="flex flex-col items-center py-10">
            <Image src="/LoadingLogo.gif" alt="loader" width={100} height={100} />
            <h2>Please wait....</h2>
            <p>Course is being generated</p>
        </div>
      </AlertDialogDescription>
    </AlertDialogHeader>
   
  </AlertDialogContent>
</AlertDialog>

    </div>
  )
}

export default LoadingDialog