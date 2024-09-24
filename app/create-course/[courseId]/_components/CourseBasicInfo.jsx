import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useState } from 'react'

import { HiOutlinePuzzlePiece } from 'react-icons/hi2'
import EditCoursebasicInfo from './EditCoursebasicInfo'
import { LuBrain } from "react-icons/lu";

import toast from 'react-hot-toast';
import axios from 'axios'
import GenerateImage from './GenerateImage'


function CourseBasicInfo({ course, GetCourse }) {

    const [courseImage, setCourseImage] = useState(null);

    const [courseImageFile, setCourseImageFile] = useState(null);

    // console.log("course in basic info", course)

    // console.log("course in basic info", course)


    const handleStartCourse = async() => {

        if(courseImageFile === null) {
            toast.error("Please select an image", {
                className: "border border-primary",
            })
            return
        }

        try {

            const formData = new FormData();
            formData.append("image", courseImageFile);
            formData.append("folderName", course.courseId);

            const response = await axios.post("/api/image-upload", formData);

            const data = await response.data;

            console.log("data", JSON.stringify(data));
                
            } catch (error) {
                
                console.error("Error uploading image:", error);
            }
    }

    const onFileChange = async (event) => {
        const file = event.target.files[0];

        // Check if the selected file is an image
        if (file && file.type.startsWith("image/")) {
            console.log("Valid image file", file);
            setCourseImage(URL.createObjectURL(file));

            setCourseImageFile(file);

            // try {

            // const formDate = new FormData();
            // formDate.append("image", file);

            // const response = await axios.post("/api/image-upload", formDate);

            // const data = await response.data;

            // console.log("data", JSON.stringify(data));
                
            // } catch (error) {
                
            //     console.error("Error uploading image:", error);
            // }

        } else {
            console.log("Invalid file type. Please select an image.");
            toast.error("Please select an image", {
                className: "border border-primary",
            })
            event.target.value = '';
        }
    };

    if (course === "loading") {
        return (
            <div className="p-10 border rounded-xl shadow-sm mt-10 animate-pulse">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="flex flex-col justify-between">
                        <div>
                            <div className="w-full h-10 bg-blue-200 rounded-xl"></div>
                            <div className="w-full h-5 bg-blue-200 rounded-md mt-5"></div>
                            <div className="w-full h-5 bg-blue-200 rounded-md mt-2"></div>
                            <div className="w-full h-5 bg-blue-200 rounded-md mt-2"></div>
                            <div className="w-full h-5 bg-blue-200 rounded-md mt-2"></div>

                            <div className="p-2 border h-10 w-44 mt-5 rounded-full bg-blue-200 "></div>
                        </div>

                        <div className="p-2 border h-10 w-full mt-5 rounded-xl bg-blue-200 "></div>

                    </div>
                    <div className="w-full h-[350px] bg-blue-200 rounded-xl"></div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="p-10 border rounded-xl shadow-sm mt-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="flex flex-col justify-between">
                        <div>
                            <div className="flex gap-3">
                                <h2 className="text-2xl font-bold">{course?.courseOutput?.name}</h2>
                                <h2 className="text-2xl font-bold text-gray-500">
                                    <EditCoursebasicInfo course={course} GetCourse={GetCourse} />
                                </h2>
                            </div>
                            <p className="text-md text-gray-500 mt-3">{course?.courseOutput?.description}</p>

                            <div className="p-2 border border-primary mt-5 w-fit rounded-full bg-blue-50">
                                <h2 className="font-medium flex gap-2 items-center text-primary">
                                    <HiOutlinePuzzlePiece />
                                    {course?.category}
                                </h2>
                            </div>
                        </div>

                        <Button className="w-full mt-5" onClick={handleStartCourse}>Start Course</Button>
                    </div>
                    {
                        courseImage ? (
                            <div className="relative">
                                <label htmlFor="upload-image" className="group">
                                    <div className="relative cursor-copy">
                                        <Image
                                            src={courseImage}
                                            width={350}
                                            height={350}
                                            className="rounded-xl w-full object-cover h-[350px] transition duration-300 ease-in-out group-hover:brightness-50"
                                            alt="course image"
                                        />

                                    </div>
                                </label>

                                <div className="absolute bottom-10 left-3 cursor-pointer flex">
                                    {/* LuBrain Icon Div - Hover to Show the Button */}
                                    <div className="peer">
                                        <GenerateImage 
                                            imagePrompt={course?.courseOutput?.imagePrompt} 
                                            name={course?.name} 
                                            setCourseImage={setCourseImage} 
                                            setCourseImageFile={setCourseImageFile}
                                        />
                                    </div>

                                    {/* AI Image Generation Button - Initially Hidden, Shown on Hover of LuBrain Div */}
                                    <div className="hidden peer-hover:flex justify-center items-center bg-primary text-white rounded-full px-4 border-white border-2 ml-2 transition-all duration-300 ease-in-out opacity-0 peer-hover:opacity-100">
                                        <p className="text-white text-center">Generate Image with AI</p>
                                    </div>
                                </div>

                                <input type="file" id="upload-image" className="opacity-0" onChange={onFileChange} />
                            </div>
                        ) : (

                            <div className="relative">
                                <label htmlFor="upload-image" className="group">
                                    <div className="relative cursor-copy">
                                        <Image
                                            src={'/courseImagePlaceholder.png'}
                                            width={350}
                                            height={350}
                                            className="rounded-xl w-full object-cover h-[350px] transition duration-300 ease-in-out group-hover:brightness-50"
                                            alt="course image"
                                        />

                                    </div>
                                </label>

                                <div className="absolute bottom-10 left-3 cursor-pointer flex">
                                    {/* LuBrain Icon Div - Hover to Show the Button */}
                                    <div className="peer">
                                        <GenerateImage 
                                            imagePrompt={course?.courseOutput?.imagePrompt} 
                                            name={course?.name} 
                                            setCourseImage={setCourseImage} 
                                            setCourseImageFile={setCourseImageFile}
                                        />
                                    </div>

                                    {/* AI Image Generation Button - Initially Hidden, Shown on Hover of LuBrain Div */}
                                    <div className="hidden peer-hover:flex justify-center items-center bg-primary text-white rounded-full px-4 border-white border-2 ml-2 transition-all duration-300 ease-in-out opacity-0 peer-hover:opacity-100">
                                        <p className="text-white text-center">Generate Image with AI</p>
                                    </div>
                                </div>

                                <input type="file" id="upload-image" className="opacity-0" onChange={onFileChange} />
                            </div>



                        )
                    }
                </div>
            </div>
        )
    }
}

export default CourseBasicInfo
