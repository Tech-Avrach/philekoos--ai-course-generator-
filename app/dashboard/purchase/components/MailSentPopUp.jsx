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
import { IoMailOpenOutline } from "react-icons/io5";

function MailSentPopUp({ mailSendPopup, setMailSendPopup, email }) {
  return (
    <div>
       
    <AlertDialog open={mailSendPopup}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>
                    <div className="flex justify-center items-center w-full gap-2">
                        <h2 className="font-bold text-4xl text-green-600"><HiCheckCircle/> </h2>
                        <span className="text-green-600 text-2xl">
                            Payment Successful !!</span>

                    </div>
                </AlertDialogTitle>
                <AlertDialogDescription>
                    <div className="flex justify-center items-center m-5 gap-2">
                       
                        <IoMailOpenOutline  className="h-16 w-16 text-primary"/>
                        
                    </div>
                    <h2 className="text-center">Check your mail : <span className="text-black font-bold">{email}</span> for more details</h2>
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>

                <div className="flex justify-center items-center w-full">
                    <Button onClick={() => setMailSendPopup(false)}>Okay</Button>
                </div>


            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
</div>
  )
}

export default MailSentPopUp