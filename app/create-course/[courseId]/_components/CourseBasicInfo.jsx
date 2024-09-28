import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'

import { HiOutlinePuzzlePiece } from 'react-icons/hi2'
import EditCoursebasicInfo from './EditCoursebasicInfo'
import { LuBrain } from "react-icons/lu";

import toast from 'react-hot-toast';
import axios from 'axios'
import GenerateImage from './GenerateImage'

import { db } from '@/configs/db'
import { eq } from 'drizzle-orm'
import { Chapters, CourseList } from '@/configs/schema'
import service from '@/configs/service'
import { GenerateChapterContent_AI } from '@/configs/AiModel'
import LoadingDialog from '../../_components/LoadingDialog'
import { useRouter } from 'next/navigation'



function CourseBasicInfo({ course, GetCourse }) {

    const [courseImage, setCourseImage] = useState(null);

    const [courseImageFile, setCourseImageFile] = useState(null);

    const [loading, setLoading] = useState(false);

    const router = useRouter();

    // console.log("course in basic info", course)

    // console.log("course in basic info", course)

    useEffect(() => {

        if (course?.courseBanner) {
            setCourseImage(course?.courseBanner)
        }
    }, [course])


    // const handleStartCourse = async () => {

    //     if (courseImageFile === null && courseImage === null) {
    //         toast.error("Please select an image", {
    //             className: "border border-primary",
    //         })
    //         return
    //     }

    //     try {

    //         const formData = new FormData();
    //         formData.append("image", courseImageFile);
    //         formData.append("folderName", course.courseId);

    //         const response = await axios.post("/api/image-upload", formData);

    //         const data = await response.data;

    //         const imageUrl = await response.data.url;

    //         console.log("data", JSON.stringify(data));


    //         try {

    //             const result = await db.update(CourseList).set({
    //                 courseBanner: imageUrl
    //             })
    //                 .where(eq(CourseList.courseId, course?.courseId))
    //                 .returning({ id: CourseList.id })

    //             console.log("result", result)

    //             if (result[0] && result[0] !== undefined) {

    //                 GetCourse();

    //                 toast.success("Course updated successfully", {
    //                     className: "border border-primary",
    //                 })

    //                 const chapters = course?.courseOutput?.chapters;

    //                 let error = false;

    //                 chapters.forEach(async (chapter, index) => {

    //                     const PROMPT = `Explain the concept in Detail on Topic: ${course?.courseOutput?.name}, Chapter: ${chapter?.name}, in JSON Format with a list of array with fields as title, explaination on a given chapter in detail, Code Example(Code field in <precode> format) if applicable`

    //                     console.log("prompt", PROMPT)

    //                     // if(index === 0) {
    //                     setLoading(true)

    //                     try {

    //                         let videoId = "";

    //                         //Generate Video Url
    //                         service.getVideos(course?.courseOutput?.name + ":" + chapter?.name).then((response) => {
    //                             console.log("youtube response", response)

    //                             videoId = response[0]?.id?.videoId;
    //                         })

    //                         //Generate Chapter Content
    //                         const result = await GenerateChapterContent_AI.sendMessage(PROMPT);
    //                         console.log("Course detail : ", result.response?.text());

    //                         const content = JSON.parse(result.response?.text());


    //                         //Save Chapter Content + Video Url

    //                         await db.insert(Chapters).values({
    //                             chapterId: index,
    //                             courseId: course?.courseId,
    //                             content: content,
    //                             videoId: videoId
    //                         })

    //                         setLoading(false)

    //                     } catch (error) {
    //                         console.log("error", error)
    //                         setLoading(false)

    //                         toast.error("Something went wrong. Please try again", {
    //                             className: "border border-primary",
    //                         });

    //                         error = true

    //                     } finally {
    //                         setLoading(false)
    //                     }
    //                     // }
    //                 })

    //                 if (!error) {
    //                     toast.success("Course content generated successfully", {
    //                         className: "border border-primary",
    //                     });

    //                     await db.update(CourseList).set({
    //                         publish: true
    //                     })

    //                     router.replace(`/create-course/${course?.courseId}/finish`);
    //                 }

    //             } else {

    //                 toast.error("Something went wrong. Please try again", {
    //                     className: "border border-primary",
    //                 })
    //             }

    //             console.log("result", result)

    //         } catch (error) {

    //             console.log("error", error)

    //             toast.error("Something went wrong. Please try again", {
    //                 className: "border border-primary",
    //             })
    //         }

    //     } catch (error) {

    //         console.error("Error uploading image:", error);
    //     }
    // }

    const handleStartCourse = async () => {
        if (courseImageFile === null && courseImage === null) {
            toast.error("Please select an image", {
                className: "border border-primary",
            });
            return;
        }

        try {

            setLoading(true);



            // Upload image

            if (courseImage?.startsWith("https://res.cloudinary.com/")) {
                
                console.log("The image is from Cloudinary!");
                
            } else {
                const formData = new FormData();
            formData.append("image", courseImageFile);
            formData.append("folderName", course.courseId);

            const response = await axios.post("/api/image-upload", formData);
            const imageUrl = response.data.url;

            console.log("Uploaded image URL:", imageUrl);

            // Update course banner in the database
            const result = await db.update(CourseList)
                .set({ courseBanner: imageUrl })
                .where(eq(CourseList.courseId, course?.courseId))
                .returning({ id: CourseList.id });

            if (!result[0]) {
                toast.error("Something went wrong. Please try again", {
                    className: "border border-primary",
                });
                return;
            }

            GetCourse();
            toast.success("Course Image updated successfully", {
                className: "border border-primary",
            });
            }

            const chapters = course?.courseOutput?.chapters;
            let errorOccurred = false;

            let chapterInfoArray = [];

            // Using `for...of` to wait for each async iteration
            for (const [index, chapter] of chapters.entries()) {
                const prompt = `Explain the concept in detail on Topic: ${course?.courseOutput?.name}, Chapter: ${chapter?.name}. Provide the response strictly in JSON format with an array of objects. Each object should contain the following fields:
                - "title": A string representing the title of the section.
                - "explanation": A detailed explanation of the section.
                - "code": A string with a code example enclosed in <precode> tags if applicable. If no code is applicable, use an empty string ("").
                
                Ensure that the JSON is properly formatted with commas separating fields, no trailing commas, and all keys enclosed in double quotes. The response should not contain any additional commentary or explanation outside the JSON structure.`;


                console.log("Prompt:", prompt);

                try {
                    // Generate video URL
                    const videoResponse = await service.getVideos(`${course?.courseOutput?.name}:${chapter?.name}`);
                    const videoId = videoResponse[0]?.id?.videoId || "";

                    // Generate chapter content
                    const contentResult = await GenerateChapterContent_AI.sendMessage(prompt);
                    const contentText = contentResult.response?.text();

                    // Validate JSON
                    let content;
                    try {
                        content = JSON.parse(contentText);
                    } catch (jsonError) {
                        console.error("Invalid JSON format received:", contentText);
                        toast.error("Invalid content received. Please try again.", {
                            className: "border border-primary",
                        });
                        errorOccurred = true;
                        break; // Exit the loop on JSON parsing error
                    }

                    const oneChapter = {
                        chapterId: index,
                        name: chapter?.name,
                        content: content,
                        videoId: videoId
                    }

                    chapterInfoArray.push(oneChapter);


                    console.log("Chapter Array inside function : ", chapterInfoArray)


                    // Save Chapter Content + Video URL
                    await db.insert(Chapters).values({
                        chapterId: index,
                        courseId: course?.courseId,
                        content: content,
                        videoId: videoId
                    });

                } catch (error) {
                    console.error("Error generating chapter content:", error);
                    toast.error("Something went wrong. Please try again", {
                        className: "border border-primary",
                    });
                    errorOccurred = true;
                    setLoading(false);
                    break; // Exit the loop if an error occurs
                }
            }

            if (!errorOccurred) {
                toast.success("Course content generated successfully", {
                    className: "border border-primary",
                });

                console.log("chapterInfoArray", chapterInfoArray)

                await db.update(CourseList).set({ publish: true });
                router.replace(`/create-course/${course?.courseId}/finish`);
            } else {
                const chapterDeleteResult = await db.delete(Chapters).where(eq(Chapters.courseId, course?.courseId)).returning({ id: Chapters.id })

                console.log("chapterDelete", chapterDeleteResult)
            }

        } catch (error) {
            setLoading(false);
            console.error("Error:", error);
            toast.error("Something went wrong. Please try again", {
                className: "border border-primary",
            });
        }
    };


    const onFileChange = async (event) => {
        const file = event.target.files[0];

        // Check if the selected file is an image
        if (file && file.type.startsWith("image/")) {
            console.log("Valid image file", file);
            setCourseImage(URL.createObjectURL(file));

            setCourseImageFile(file);

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
                <LoadingDialog loading={loading} />
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
