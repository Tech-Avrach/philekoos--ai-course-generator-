import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { LuBrain, LuRefreshCcw } from 'react-icons/lu'
import Image from 'next/image'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { DialogClose } from '@radix-ui/react-dialog';
import { v4 as uuidv4 } from 'uuid';

function GenerateImage({ imagePrompt, name, setCourseImage, setCourseImageFile }) {

    const [loading, setLoading] = useState(true);
    const [imageUrl, setImageUrl] = useState('');
    const [imageFile, setImageFile] = useState(null);

    // useEffect(() => {
    //     HandleGenerateImage()
    // }, [])


    function blobToFile(blob, fileName) {
        return new File([blob], fileName, { type: blob.type });
      }

    const HandleGenerateImage = async () => {
        setLoading(true);

        const seedNumber = Math.floor(Math.random() * 1000);

        const subsitudePrompt = `a creative image showing ${name}`

        let prompt;

        if (imagePrompt) {
            prompt = imagePrompt !== "empty" ? imagePrompt : subsitudePrompt;
        } else {
            prompt = subsitudePrompt; 
        }

        console.log("final image prompt", prompt)


        try {
            const response = await axios.get(`https://image.pollinations.ai/prompt/${prompt}?model=flux&width=1280&height=720&seed=${seedNumber}&nologo=true&enhance=true`, {
                responseType: 'arraybuffer',
            });

            console.log("response", response)

            const imageBuffer = Buffer.from(response.data);

            console.log("imageBuffer", imageBuffer)

            const blob = new Blob([response.data], { type: 'image/jpeg' });

            const fileName = uuidv4();

            const file = blobToFile(blob, fileName);

            console.log("file", file)

            setImageFile(file);

            const url = URL.createObjectURL(blob);
            setImageUrl(url); 

            // const formDate = new FormData();

            // formDate.append("image", file);

            // const uploadResponse = await axios.post("/api/image-upload", formDate);

            // const data = await uploadResponse.data;

            // console.log("data", JSON.stringify(data))

            

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setImageUrl(null);
        setImageFile(null);
        setLoading(true);
    }

    const handleUpdate = () => {
        setCourseImage(imageUrl);
        setCourseImageFile(imageFile);
        setLoading(true);
    }

    return (
        <div>


            <Dialog>
                <DialogTrigger>
                    <div onClick={HandleGenerateImage} className="flex justify-center items-center bg-primary text-white rounded-full h-12 w-12 border-white border-2">
                        <LuBrain className="font-medium h-5 w-5" />
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            <div className="flex flex-col items-center">
                                Generating Image
                            </div>
                        </DialogTitle>
                        <DialogDescription>
                            {
                                loading ? (
                                    <div className="flex flex-col items-center py-10">
                                        <div className="w-full h-72 mb-2 bg-blue-200 rounded-xl animate-pulse">

                                        </div>
                                        <h2>Please wait....</h2>
                                        <p>Image is being generated</p>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center py-10">
                                        <div className="w-full h-72 mb-2 rounded-xl overflow-hidden">
                                            <Image
                                                src={imageUrl}
                                                alt="loader"
                                                layout="responsive"
                                                width={100}
                                                height={100}
                                                className="w-full h-full object-cover rounded-xl"
                                            />
                                        </div>
                                        <h2 onClick={HandleGenerateImage}><LuRefreshCcw className="font-extrabold h-6 w-6 m-2 cursor-pointer text-primary" /></h2>
                                        <p>Regenerate Image</p>
                                    </div>
                                )
                            }
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose>
                            <Button variant="outline"  className="mr-3" onClick={handleCancel}>Cancel</Button>

                            <Button onClick={handleUpdate}>Update</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default GenerateImage