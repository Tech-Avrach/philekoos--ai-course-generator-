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

export const GenerateChapterContent_AI = model.startChat({
    generationConfig,
 // safetySettings: Adjust safety settings
 // See https://ai.google.dev/gemini-api/docs/safety-settings
 history: [
  {
    role: "user",
    parts: [
      {text: "Explain the concept in detail on Topic: Python zero to hero Chapter: Functions in python . Provide the response strictly in JSON format, ensuring it is syntactically correct and directly parsable using JSON.parse. The JSON should be an array of objects, where each object contains the following fields:\n- \"title\": A string representing the title of the section.\n- \"explanation\": A detailed explanation of the section.\n- \"code\": A string with a code example enclosed in <precode> tags if applicable. If no code is applicable, use an empty string (\"\").\n\nImportant requirements:\n1. Ensure the JSON is valid, properly formatted, and suitable for parsing with JSON.parse.\n2. Use commas correctly to separate fields and objects.\n3. Do not include any trailing commas.\n4. Enclose all keys and string values in double quotes.\n5. Avoid including any extra characters like line breaks or non-JSON content outside of the JSON structure.\n\nBefore finalizing the response, validate that the JSON is complete, syntactically correct, and can be parsed without errors. Provide only the JSON response without any additional text or commentary.\n"},
    ],
  },
  {
    role: "model",
    parts: [
      {text: "[{\"title\": \"What are Functions?\", \"explanation\": \"Functions are reusable blocks of code that perform specific tasks. They allow you to organize your code, make it more readable, and avoid repetition. Think of them like mini-programs within your main program.\", \"code\": \"\"}, {\"title\": \"Defining Functions\", \"explanation\": \"You define a function using the 'def' keyword followed by the function name, parentheses, and a colon. Inside the function's block, you write the code that will be executed when the function is called.  \", \"code\": \"<precode>def greet(name):\\n  print(f\\\"Hello, {name}!\\\")\\n</precode>\"}, {\"title\": \"Calling Functions\", \"explanation\": \"To use a function, you 'call' it by writing its name followed by parentheses. You can pass arguments (data) to the function within the parentheses.  \", \"code\": \"<precode>greet(\\\"Alice\\\") # Output: Hello, Alice!\\n</precode>\"}, {\"title\": \"Arguments and Parameters\", \"explanation\": \"Arguments are the values you pass to a function when you call it. Parameters are the variables defined within the function's definition that receive these values.  \", \"code\": \"<precode>def add(x, y):\\n  return x + y\\n\\nresult = add(5, 3)\\nprint(result) # Output: 8\\n</precode>\"}, {\"title\": \"Return Values\", \"explanation\": \"Functions can return values using the 'return' keyword. This allows you to use the results of the function in your code.\", \"code\": \"<precode>def square(number):\\n  return number * number\\n\\nsquared_value = square(4)\\nprint(squared_value) # Output: 16\\n</precode>\"}, {\"title\": \"Scope of Variables\", \"explanation\": \"Variables defined inside a function have local scope, meaning they are only accessible within the function. Variables defined outside functions have global scope and are accessible from anywhere in the program.\", \"code\": \"<precode>global_var = 10\\n\\ndef my_func():\\n  local_var = 5\\n  print(f\\\"Inside function: global_var = {global_var}, local_var = {local_var}\\\")\\n\\nmy_func()\\nprint(f\\\"Outside function: global_var = {global_var}\\\") # Output: global_var = 10\\n</precode>\"}, {\"title\": \"Function Types\", \"explanation\": \"Python supports various types of functions:\\n\\n* **Built-in Functions:** Functions provided by Python itself (e.g., print(), len(), input(), etc.).\\n* **User-defined Functions:** Functions you create yourself to perform specific tasks.\\n* **Anonymous Functions (Lambda Functions):** Small, nameless functions defined using the 'lambda' keyword.  \", \"code\": \"\"}]"},
    ],
  },
],
  });


export const CorrectJsonFormat_AI = model.startChat({
    generationConfig,

    history: [
      {
        role: "user",
        parts: [
          {text: "Given the following JSON data, identify and correct any syntax issues to ensure it is properly formatted and can be parsed using JSON.parse. Make sure to:\n1. Enclose all keys and string values in double quotes.\n2. Correct any instances where embedded double quotes are not escaped (e.g., use \\\\\" inside strings).\n3. Validate that the JSON structure is an array of objects, with fields such as \"title\", \"explanation\", and \"code\".\n4. Ensure all commas, brackets, and braces are correctly placed.\n5. Return only the corrected JSON without any additional commentary or explanation.\n\nJSON data to correct:\n[{\"title\": \"What are Functions?\", \"explanation\": \"Functions are reusable blocks of code that perform specific tasks. They allow you to organize your code, make it more readable, and avoid repetition. Think of them like mini-programs within your main program.\", \"code\": \"\"}, {\"title\": \"Defining Functions\", \"explanation\": \"You define a function using the 'def' keyword followed by the function name, parentheses, and a colon. Inside the function's block, you write the code that will be executed when the function is called. \", \"code\": \"<precode>def greet(name):\\n print(f\"Hello, {name}!\")\\n</precode>\"}, {\"title\": \"Calling Functions\", \"explanation\": \"To use a function, you 'call' it by writing its name followed by parentheses. You can pass arguments (data) to the function within the parentheses. \", \"code\": \"<precode>greet(\"Alice\") # Output: Hello, Alice!\\n</precode>\"}, {\"title\": \"Arguments and Parameters\", \"explanation\": \"Arguments are the values you pass to a function when you call it. Parameters are the variables defined within the function's definition that receive these values. \", \"code\": \"<precode>def add(x, y):\\n return x + y\\n\\nresult = add(5, 3)\\nprint(result) # Output: 8\\n</precode>\"}, {\"title\": \"Return Values\", \"explanation\": \"Functions can return values using the 'return' keyword. This allows you to use the results of the function in your code.\", \"code\": \"<precode>def square(number):\\n return number * number\\n\\nsquared_value = square(4)\\nprint(squared_value) # Output: 16\\n</precode>\"}, {\"title\": \"Scope of Variables\", \"explanation\": \"Variables defined inside a function have local scope, meaning they are only accessible within the function. Variables defined outside functions have global scope and are accessible from anywhere in the program.\", \"code\": \"<precode>global_var = 10\\n\\ndef my_func():\\n local_var = 5\\n print(f\"Inside function: global_var = {global_var}, local_var = {local_var}\")\\n\\nmy_func()\\nprint(f\"Outside function: global_var = {global_var}\") # Output: global_var = 10\\n</precode>\"}, {\"title\": \"Function Types\", \"explanation\": \"Python supports various types of functions:\\n\\n* Built-in Functions: Functions provided by Python itself (e.g., print(), len(), input(), etc.).\\n* User-defined Functions: Functions you create yourself to perform specific tasks.\\n* Anonymous Functions (Lambda Functions): Small, nameless functions defined using the 'lambda' keyword. \", \"code\": \"\"}]\n\n\n"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "```json\n[\n  {\n    \"title\": \"What are Functions?\",\n    \"explanation\": \"Functions are reusable blocks of code that perform specific tasks. They allow you to organize your code, make it more readable, and avoid repetition. Think of them like mini-programs within your main program.\",\n    \"code\": \"\"\n  },\n  {\n    \"title\": \"Defining Functions\",\n    \"explanation\": \"You define a function using the 'def' keyword followed by the function name, parentheses, and a colon. Inside the function's block, you write the code that will be executed when the function is called. \",\n    \"code\": \"<precode>def greet(name):\\n print(f\\\"Hello, {name}!\\\")\\n</precode>\"\n  },\n  {\n    \"title\": \"Calling Functions\",\n    \"explanation\": \"To use a function, you 'call' it by writing its name followed by parentheses. You can pass arguments (data) to the function within the parentheses. \",\n    \"code\": \"<precode>greet(\\\"Alice\\\") # Output: Hello, Alice!\\n</precode>\"\n  },\n  {\n    \"title\": \"Arguments and Parameters\",\n    \"explanation\": \"Arguments are the values you pass to a function when you call it. Parameters are the variables defined within the function's definition that receive these values. \",\n    \"code\": \"<precode>def add(x, y):\\n return x + y\\n\\nresult = add(5, 3)\\nprint(result) # Output: 8\\n</precode>\"\n  },\n  {\n    \"title\": \"Return Values\",\n    \"explanation\": \"Functions can return values using the 'return' keyword. This allows you to use the results of the function in your code.\",\n    \"code\": \"<precode>def square(number):\\n return number * number\\n\\nsquared_value = square(4)\\nprint(squared_value) # Output: 16\\n</precode>\"\n  },\n  {\n    \"title\": \"Scope of Variables\",\n    \"explanation\": \"Variables defined inside a function have local scope, meaning they are only accessible within the function. Variables defined outside functions have global scope and are accessible from anywhere in the program.\",\n    \"code\": \"<precode>global_var = 10\\n\\ndef my_func():\\n local_var = 5\\n print(f\\\"Inside function: global_var = {global_var}, local_var = {local_var}\\\")\\n\\nmy_func()\\nprint(f\\\"Outside function: global_var = {global_var}\\\") # Output: global_var = 10\\n</precode>\"\n  },\n  {\n    \"title\": \"Function Types\",\n    \"explanation\": \"Python supports various types of functions:\\n\\n* Built-in Functions: Functions provided by Python itself (e.g., print(), len(), input(), etc.).\\n* User-defined Functions: Functions you create yourself to perform specific tasks.\\n* Anonymous Functions (Lambda Functions): Small, nameless functions defined using the 'lambda' keyword. \",\n    \"code\": \"\"\n  }\n]\n```"},
        ],
      },
    ],
  
  })


// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());

