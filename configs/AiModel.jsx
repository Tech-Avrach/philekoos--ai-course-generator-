/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 0.75,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192, 
    responseMimeType: "application/json",
};

export const GenerateCourseLayout = model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [
        {
          role: "user",
          parts: [
            {text: "\nGenerate A Course Tutorial on Following Detail With fiels as Name, Description, a detailed prompt to generate a banner image of that course as imagePrompt, NoOfChapters, Along With Chapter Name, about, Duration.Catagory: 'programming', Topic:'Python', Level:'basic', Duration:'1 hour', NoOfChapters:5. in JSON format"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"name\": \"Python Programming for Beginners\",\n  \"description\": \"Dive into the world of Python programming with this comprehensive beginner-friendly course. Learn the fundamentals of Python syntax, data types, variables, control flow, and functions. This course is designed for anyone with zero prior programming experience, offering a practical and engaging introduction to Python.\",\n  \"imagePrompt\": \"A vibrant and colorful illustration of a computer screen displaying Python code, surrounded by playful, cartoon-like representations of data types, operators, and control flow structures. The background should be a soft gradient of blue and purple, representing a coding environment.\",\n  \"noOfChapters\": 5,\n  \"chapters\": [\n    {\n      \"name\": \"Introduction to Python\",\n      \"about\": \"This chapter introduces the fundamental concepts of Python programming, including installing Python, understanding the language syntax, and exploring different data types like integers, strings, and booleans.\",\n      \"duration\": \"20 minutes\"\n    },\n    {\n      \"name\": \"Variables and Operators\",\n      \"about\": \"Learn how to define variables to store data, use different operators for calculations and comparisons, and understand the concepts of assignment and data type conversions.\",\n      \"duration\": \"20 minutes\"\n    },\n    {\n      \"name\": \"Control Flow and Loops\",\n      \"about\": \"Master the use of conditional statements like 'if', 'else', and 'elif' to control the flow of your program. Explore different types of loops like 'for' and 'while' to repeat blocks of code.\",\n      \"duration\": \"20 minutes\"\n    },\n    {\n      \"name\": \"Lists and Dictionaries\",\n      \"about\": \"Learn how to work with lists and dictionaries, two fundamental data structures in Python.  You'll learn how to create, modify, and access elements within these structures. You'll also explore their differences and applications.\",\n      \"duration\": \"20 minutes\"\n    },\n    {\n      \"name\": \"Functions and Modules\",\n      \"about\": \"Learn how to define functions to break down your code into reusable blocks. Explore how to import and use existing modules to extend your program's functionality.\",\n      \"duration\": \"20 minutes\"\n    }\n  ],\n  \"category\": \"programming\",\n  \"topic\": \"Python\",\n  \"level\": \"basic\",\n  \"duration\": \"1 hour\"\n}\n```\n"},
          ],
        },
      ],
});

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());

