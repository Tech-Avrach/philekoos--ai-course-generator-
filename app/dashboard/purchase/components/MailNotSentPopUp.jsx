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
import { RxCross2 } from "react-icons/rx";
import { Button } from '@/components/ui/button';
import { HiCheckCircle } from "react-icons/hi2";

function MailNotSentPopUp({ mailNotSendPopup, setMailNotSendPopup }) {
  return (
    <div>
       
       <AlertDialog open={mailNotSendPopup}>
    <AlertDialogContent>
        <AlertDialogHeader>
            <AlertDialogDescription>
                <div className="flex flex-col justify-center items-center m-5 gap-2">
                    <HiCheckCircle className="h-24 w-24 text-green-600" />
                    <h2 className="text-green-600 text-2xl text-center w-full">
                        Payment Successful !!
                    </h2>
                </div>
            </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
            <div className="flex justify-center items-center w-full">
                <Button onClick={() => setMailNotSendPopup(false)}>Okay</Button>
            </div>
        </AlertDialogFooter>
    </AlertDialogContent>
</AlertDialog>
    </div>
  )
}

export default MailNotSentPopUp