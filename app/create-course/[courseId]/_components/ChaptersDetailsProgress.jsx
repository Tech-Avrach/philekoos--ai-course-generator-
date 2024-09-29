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
import { HiOutlineCheckCircle } from 'react-icons/hi2'
import { AiOutlineLoading3Quarters } from "react-icons/ai";


function ChaptersDetailsProgress({ loading, chapters }) {

    // console.log("Chapters in ChapterDetailsProgress", chapters)

    return (
        <div>
            <AlertDialog open={loading}>
                <AlertDialogContent>
                    <AlertDialogHeader>

                        <AlertDialogDescription>

                            <div className="flex flex-col items-center max-h-[35rem] overflow-auto">

                            <div className="flex justify-center flex-col items-start w-[24rem]">

                            {
                                chapters?.map((chapter, index) => (
                                    <div className="flex justify-center items-center py-2">

                                    {
                                        chapter.status === "pending" && (
                                            <>
                                                <HiOutlineCheckCircle className="text-3xl text-gray-300 mr-2" />
                                                <div>
                                                    <h2 className="font-medium text-sm">Chapter {index + 1}</h2>
                                                    <h2 className="line-clamp-1 text-xs">{chapter?.name}</h2>
                                                </div>
                                            </>
                                        )
                                    }

                                    {
                                        chapter.status === "progress" && (
                                            <>
                                                <AiOutlineLoading3Quarters className="text-2xl text-orange-600 spin mr-2" />
                                                <div>
                                                    <h2 className="font-medium text-sm text-orange-600">Chapter {index + 1}</h2>
                                                    <h2 className="line-clamp-1 text-xs text-orange-600">{chapter?.name}</h2>
                                                </div>
                                            </>
                                        )
                                    }

                                    {
                                        chapter.status === "completed" && (
                                            <>
                                                <HiOutlineCheckCircle className="text-3xl text-green-600 mr-2 " />
                                                <div>
                                                    <h2 className="font-medium text-sm text-green-600">Chapter {index + 1}</h2>
                                                    <h2 className="line-clamp-1 text-xs text-green-600">{chapter?.name}</h2>
                                                </div>
                                            </>
                                        )
                                    }
                                    </div>
                                ))
                            }
                            </div>
                            </div>
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                </AlertDialogContent>
            </AlertDialog>

        </div>
    )
}

export default ChaptersDetailsProgress