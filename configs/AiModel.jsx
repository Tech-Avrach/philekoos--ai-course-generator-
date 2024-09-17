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
                { text: "Generate a course tutorial on the following details with fields as course name, description, along with chapter name, about, duration: Catagory: 'programming', Topic:'Python', Level:'basic', Duration:'1 hour', NoOfChapters:5. in JSON format" },
            ],
        },
        {
            role: "model",
            parts: [
                { text: "```json\n{\n  \"course\": {\n    \"name\": \"Python Programming Fundamentals\",\n    \"description\": \"This course provides a comprehensive introduction to Python programming for beginners. You will learn the fundamental concepts of Python syntax, data types, variables, operators, control flow, functions, and more. By the end of the course, you will be able to write simple Python programs and have a solid foundation for further exploration.\",\n    \"category\": \"programming\",\n    \"topic\": \"Python\",\n    \"level\": \"basic\",\n    \"duration\": \"1 hour\",\n    \"chapters\": [\n      {\n        \"name\": \"Introduction to Python\",\n        \"about\": \"This chapter introduces the Python programming language, its history, and its applications. We will also cover how to set up Python on your computer and run your first Python program.\",\n        \"duration\": \"15 minutes\"\n      },\n      {\n        \"name\": \"Basic Data Types and Variables\",\n        \"about\": \"This chapter explores the fundamental data types in Python, including integers, floats, strings, and booleans. You will learn how to declare variables, assign values, and perform basic operations on these data types.\",\n        \"duration\": \"20 minutes\"\n      },\n      {\n        \"name\": \"Operators and Expressions\",\n        \"about\": \"This chapter covers the various operators in Python, such as arithmetic, comparison, logical, and assignment operators. You will learn how to build expressions and evaluate them using these operators.\",\n        \"duration\": \"15 minutes\"\n      },\n      {\n        \"name\": \"Control Flow\",\n        \"about\": \"This chapter introduces the concepts of control flow in Python, including conditional statements (if, elif, else) and loops (for, while). You will learn how to write code that executes different blocks based on specific conditions.\",\n        \"duration\": \"15 minutes\"\n      },\n      {\n        \"name\": \"Functions\",\n        \"about\": \"This chapter explores the concept of functions in Python. You will learn how to define functions, pass arguments, return values, and use functions to organize and reuse code.\",\n        \"duration\": \"15 minutes\"\n      }\n    ]\n  }\n}\n```\n" },
            ],
        },
    ],
});

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());

