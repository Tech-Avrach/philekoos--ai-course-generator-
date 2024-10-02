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
import { CorrectJsonFormat_AI, GenerateChapterContent_AI } from '@/configs/AiModel'
import LoadingDialog from '../../_components/LoadingDialog'
import { useRouter } from 'next/navigation'
import ChaptersDetailsProgress from './ChaptersDetailsProgress'
import { useMistralAi } from '@/configs/MistralAiModel'



function CourseBasicInfo({ course, GetCourse }) {

    const [courseImage, setCourseImage] = useState(null);

    const [courseImageFile, setCourseImageFile] = useState(null);

    const [loading, setLoading] = useState(false);

    const [chaptersDetailsToGenerate, setChaptersDetailsToGenerate] = useState([]);

    const router = useRouter();

    // console.log("course in basic info", course)

    // console.log("course in basic info", course)

    useEffect(() => {

        if (course?.courseBanner) {
            setCourseImage(course?.courseBanner)
        }

        let chapterStatus = course?.courseOutput?.chapters?.map((chapter) => {
            return {
                ...chapter,
                status: "pending"
            }
        })

        setChaptersDetailsToGenerate(chapterStatus || [])

    }, [course])


    useEffect(() => {

        if (courseImageFile) {
            uploadImageToCloudinary();
        }
    }, [courseImage, courseImageFile])


    // const handleStartCourse = async () => {

    //     useMistralAi();
    // }

    const uploadImageToCloudinary = async () => {
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


    const getChapterDetailPrompt = (courseName, chapter) => {

        return `Explain the concept in detail on Topic: ${courseName}, Chapter: ${chapter}. Provide the response strictly in JSON format, ensuring it is syntactically correct. The JSON should be an array of objects, where each object contains the following fields:
                - "title": A string representing the title of the section.
                - "explanation": A detailed explanation of the section.
                - "code": A string with a code example enclosed in <precode> tags if applicable. If no code is applicable, use an empty string ("").

                Important requirements:
                1. Ensure the JSON is valid and properly formatted.
                2. Use commas correctly to separate fields and objects.
                3. Do not include any trailing commas.
                4. Enclose all keys and string values in double quotes.
                5. Do not provide any additional text, explanations, or commentary outside the JSON structure.

                Before providing the response, validate that the JSON is complete and error-free.`;
    }


    const getCorrectJsonPrompt = (contentText) => {
        return `Given the following JSON data, identify and correct any syntax issues to ensure it is properly formatted and can be parsed using JSON.parse. Make sure to:
                        1. Enclose all keys and string values in double quotes.
                        2. Correct any instances where embedded double quotes are not escaped (e.g., use \\" inside strings).
                        3. Validate that the JSON structure is an array of objects, with fields such as "title", "explanation", and "code".
                        4. Ensure all commas, brackets, and braces are correctly placed.
                        5. Return only the corrected JSON without any additional commentary or explanation.

                        JSON data to correct:
                        ${contentText}
                        `;
    }


    const getVideoUrlId = async(courseName, chapter) => {

                    let videoResponse = await service.getVideos(`${courseName}:${chapter}`);
                    let id = videoResponse[0]?.id?.videoId || "";

                    console.log("video id inside getVideoUrlId", id)
                    
                    return id
    }


    const handleStartCourse = async () => {
        if (courseImageFile === null && courseImage === null) {
            toast.error("Please select an image", {
                className: "border border-primary",
            });
            return;
        }

        try {

            //add new field to chapters as status and make first chapter as progress
            let editedChapterStatus = chaptersDetailsToGenerate;

            editedChapterStatus = editedChapterStatus.map((chapter) => {
                return {
                    ...chapter,
                    status: "pending",
                }
            })

            // editedChapterStatus[0].status = "progress";


            // setChaptersDetailsToGenerate(editedChapterStatus);

            setLoading(true);



            // Upload image

            if (courseImage?.startsWith("https://res.cloudinary.com/")) {

                console.log("The image is from Cloudinary!");

            } 
            // else {
                
            //     await uploadImageToCloudinary()
            // }

            const chapters = course?.courseOutput?.chapters;
            let errorOccurred = false;

            let chapterInfoArray = [];


            // Using `for...of` to wait for each async iteration
            for (const [index, chapter] of chapters.entries()) {


                let editedChapterStatus = [...chaptersDetailsToGenerate];

                editedChapterStatus[index].status = "progress";

                let courseName = course?.courseOutput?.name;

                let chapterName = chapter?.name;


                setChaptersDetailsToGenerate(editedChapterStatus);

                let prompt = getChapterDetailPrompt(courseName, chapterName);

                let correctJsonPrompt;


                console.log("Prompt:", prompt);

                let contentResult = null;

                let contentText = null;

                try {
                    // Generate video URL
                    let videoId = await getVideoUrlId(course?.courseOutput?.name, chapter?.name)

                    console.log("videoId in handleStartCourse", videoId)



                    // Generate chapter content
                    try {

                        contentResult = await GenerateChapterContent_AI.sendMessage(prompt);

                        contentText = contentResult.response?.text();

                    } catch (error) {

                        console.log("Generate Chapter Content Gemini", error)
                        
                        try {

                            contentResult = await useMistralAi(prompt);

                            if (contentResult.startsWith("```json") && contentResult.endsWith("```")) {
                                // Extract the JSON content
                                contentResult = contentResult.slice(7, -3).trim(); // Removes ```JSON at the start and ``` at the end
                            }

                            contentText = contentResult


                        } catch (error) {

                            console.log("Mistral course detail generate", error)

                            toast.error("Something went wrong. Please try again", {
                                className: "border border-primary",
                            });

                            errorOccurred=true;

                            break;
                        }
                    }

                    // Validate JSON
                    let content;
                    try {
                        content = JSON.parse(contentText);
                    } catch (jsonError) {
                        console.error("Invalid JSON format received:", jsonError);

                        console.log("contentText", contentText)


                       try {

                        correctJsonPrompt = getCorrectJsonPrompt(contentText);

                        const CorrectJsonResult = await CorrectJsonFormat_AI.sendMessage(correctJsonPrompt);


                        content = JSON.parse(CorrectJsonResult.response?.text());
                        
                       } catch (error) {

                        console.error("Error parsing JSON Gemini:", error);

                        

                        try {
                            
                            let result = await useMistralAi(correctJsonPrompt);

                            if (result.startsWith("```json") && result.endsWith("```")) {
                                // Extract the JSON content
                                result = result.slice(7, -3).trim(); // Removes ```JSON at the start and ``` at the end
                            }

                            content = JSON.parse(result);

                        } catch (error) {

                            console.log("Mistral correct json", error)
                            
                            toast.error("Something went wrong. Please try again", {
                                className: "border border-primary",
                            });

                            errorOccurred = true;
                            setLoading(false);
                            break; // Exit the loop if an error occurs
                        }
                        
                       }
                    }

                    const oneChapter = {
                        chapterId: index,
                        name: chapter?.name,
                        content: content,
                        videoId: videoId
                    }

                    chapterInfoArray.push(oneChapter);


                    console.log("Chapter Array inside function : ", chapterInfoArray)


                } catch (error) {
                    console.error("Error generating chapter content:", error);
                    toast.error("Something went wrong. Please try again", {
                        className: "border border-primary",
                    });
                    errorOccurred = true;
                    setLoading(false);
                    break; // Exit the loop if an error occurs
                }

                editedChapterStatus[index].status = "completed";

                setChaptersDetailsToGenerate(editedChapterStatus);
            }

            if (!errorOccurred) {

                // Save Chapter Content + Video URL
                try {

                    await db.insert(Chapters).values({
                        courseId: course?.courseId,
                        chapter: chapterInfoArray,
                    });

                    toast.success("Course content generated successfully", {
                        className: "border border-primary",
                    });

                    console.log("chapterInfoArray", chapterInfoArray)

                    await db.update(CourseList).set({ publish: true }).where(eq(CourseList.courseId, course?.courseId)).returning({ id: CourseList.id });


                    router.replace(`/create-course/${course?.courseId}/finish`);

                } catch (error) {

                    console.log("error in Course Basic", error)

                    setChaptersDetailsToGenerate([]);

                    toast.error("Something went wrong. Please try again", {
                        className: "border border-primary",
                    });
                    setLoading(false);
                }
            } 

        } catch (error) {
            setLoading(false);

            setChaptersDetailsToGenerate([]);

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
                <ChaptersDetailsProgress loading={loading} chapters={chaptersDetailsToGenerate} />
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
