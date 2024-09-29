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

function TokenGiftPopUp() {
    return (
        <div>
            <AlertDialog open={true}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            <div className="flex justify-center items-center">
                                <h2 className="font-bold text-3xl ">Welcome to <span className="text-primary text-3xl">
                                    Philekoos</span></h2>

                            </div>
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            <div className="flex justify-center items-center m-5 gap-2">
                                <Image src="/token.webp" alt="token" width={80} height={80} />
                                <RxCross2  className="h-16 w-16 text-primary"/>
                                <h2 className="text-center text-7xl text-primary">2</h2>
                            </div>
                            <h2 className="text-center">Here is small gift for you !</h2>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>

                        <div className="flex justify-center items-center w-full">
                            <Button>Claim Gift</Button>
                        </div>


                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default TokenGiftPopUp