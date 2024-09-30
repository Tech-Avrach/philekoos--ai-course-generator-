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
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Button } from '@/components/ui/button';

function LoadingPopUp({ loading, setLoading}) {
  return (
    <div>
       
    <AlertDialog open={loading}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>
                    <div className="flex justify-center items-center">
                        <h2 className="font-bold text-2xl ">Payment in Process</h2>

                    </div>
                </AlertDialogTitle>
                <AlertDialogDescription>
                    <div className="flex justify-center items-center m-5 gap-2">
                        <AiOutlineLoading3Quarters  className="h-16 w-16 text-primary spin"/>
                    </div>
                    <h2 className="text-center">Please wait while we sattle the payment</h2>
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>

                {/* <div className="flex justify-center items-center w-full">
                    <Button onClick={() => setMailNotSendPopup(false)}>Claim Gift</Button>
                </div> */}


            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
</div>
  )
}

export default LoadingPopUp