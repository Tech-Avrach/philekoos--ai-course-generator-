import { v2 as cloudinary } from 'cloudinary';



    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    export const POST = async (req) => {
        const formData = await req.formData();
        const image = formData.get("image");
        const folderName = formData.get("folderName");

        console.log("image", image)

        console.log("folderName", folderName)

        // return new Response(
        //     JSON.stringify({ msg: "Image uploaded successfully", url: image }),
        //     { status: 200, headers: { "Content-Type": "application/json" } }
        // );
    
        if (image) {

            const arrayBuffer = await image.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            console.log("buffer", buffer)
            
    
            // Return a promise that resolves once the upload is complete
            return new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        resource_type: "auto", // Automatically detect the file type (image/video/etc.)
                        folder: `philekoos/${folderName}`, // Folder where the image will be stored
                    },
                    (error, result) => {
                        if (error) {
                            console.error("Cloudinary upload error:", error);
                            return reject(
                                new Response(
                                    JSON.stringify({ msg: "Failed to upload image", error: error.message }),
                                    { status: 500, headers: { "Content-Type": "application/json" } }
                                )
                            );
                        }
    
                        // If successful, return the result (contains image URL, etc.)
                        resolve(
                            new Response(
                                JSON.stringify({
                                    msg: "Image uploaded successfully",
                                    url: result.secure_url, // Cloudinary secure URL
                                    public_id: result.public_id, // Cloudinary image public ID
                                    // result, // Additional data if needed
                                }),
                                {
                                    status: 200,
                                    headers: { "Content-Type": "application/json" },
                                }
                            )
                        );
                    }
                );
    
                // Write the image buffer to the upload stream
                uploadStream.end(buffer);
            });
        } else {
            return new Response(
                JSON.stringify({ msg: "No image provided" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }
    };