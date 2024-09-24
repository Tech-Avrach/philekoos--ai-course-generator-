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
          {text: "Explain the concept in Detail on Topic: Facebook Page Growth Strategies, Chapter: Content Creation & Optimization, in JSON Format with a list of array with fields as title, explaination on a given chapter in detail, Code Example(Code field in <precode> format) if applicable"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "```json\n[\n  {\n    \"title\": \"Content Creation & Optimization for Facebook Page Growth\",\n    \"explanation\": \"Creating engaging and optimized content is crucial for Facebook page growth. It helps attract new followers, retain existing ones, and ultimately, achieve your page goals.  This chapter explores strategies for crafting content that resonates with your target audience and effectively uses Facebook's features for optimal reach and engagement.\",\n    \"code\": \"\"\n  },\n  {\n    \"title\": \"Understanding Your Target Audience\",\n    \"explanation\": \"Before creating content, it's essential to understand who you're targeting. Analyze your existing audience demographics, interests, and behaviors. Utilize Facebook Insights to gather valuable data on audience engagement with your posts. This information will guide your content creation process and ensure you're speaking to the right people.\",\n    \"code\": \"\"\n  },\n  {\n    \"title\": \"Content Pillars and Themes\",\n    \"explanation\": \"Define clear content pillars that align with your page's overall goals and your audience's interests. For example, a fashion brand might have pillars like 'Style Inspiration,' 'New Arrivals,' and 'Behind the Scenes.'  These pillars provide a framework for content creation, ensuring consistency and relevance.\",\n    \"code\": \"\"\n  },\n  {\n    \"title\": \"Diverse Content Formats\",\n    \"explanation\": \"Variety is key to keeping your audience engaged. Experiment with different content formats: \\n\\n* **Text posts:**  Share valuable insights, news updates, or thought-provoking questions.\\n* **Images:**  Visually appealing images can capture attention and convey information quickly.\\n* **Videos:**  Short, engaging videos can educate, entertain, and build stronger connections.\\n* **Live videos:**  Real-time interaction allows for direct engagement and fosters a sense of community.\\n* **Stories:**  Ephemeral content encourages quick interactions and keeps your page top-of-mind.\",\n    \"code\": \"\"\n  },\n  {\n    \"title\": \"Writing Engaging Copy\",\n    \"explanation\": \"Compelling copy is essential for grabbing attention and encouraging interaction. Use strong headlines, keep it concise, and focus on benefits for the reader.  Ask questions, spark curiosity, and use a friendly and conversational tone.\",\n    \"code\": \"\"\n  },\n  {\n    \"title\": \"Visual Optimization\",\n    \"explanation\": \"Visually appealing content is more likely to stand out. Use high-quality images and videos, and consider using relevant graphics and text overlays.  Optimize images for Facebook's specifications to ensure clear visibility on different devices.\",\n    \"code\": \"\"\n  },\n  {\n    \"title\": \"Strategic Posting Schedule\",\n    \"explanation\": \"Understanding your audience's online behavior is crucial for determining the best times to post. Experiment with different posting times and analyze Facebook Insights to identify peak engagement periods.  Consistency is also key, so aim for a regular posting schedule.\",\n    \"code\": \"\"\n  },\n  {\n    \"title\": \"Utilizing Facebook's Features\",\n    \"explanation\": \"Leverage Facebook's features to enhance content reach and engagement.  \\n\\n* **Hashtags:** Use relevant hashtags to improve searchability and categorize your content. \\n* **Facebook Groups:** Engage with relevant Facebook groups and share valuable content. \\n* **Facebook Ads:**  Targeted ads can help reach a wider audience and promote specific content.\",\n    \"code\": \"\"\n  },\n  {\n    \"title\": \"Tracking and Analyzing Results\",\n    \"explanation\": \" Regularly monitor Facebook Insights to analyze content performance.  Track metrics like: \\n\\n* **Reach:**  How many people saw your content.\\n* **Engagement:** Likes, shares, comments, and clicks.\\n* **Website traffic:**  How much traffic your page drives to your website.\\n* **Conversions:**  Actions taken by users, such as making a purchase or signing up for a newsletter.\\n\\nUse this data to refine your content strategy and optimize for better results.\",\n    \"code\": \"\"\n  },\n  {\n    \"title\": \"Content Repurposing\",\n    \"explanation\": \"Repurpose existing content for different platforms and formats.  A blog post can be turned into an infographic, a video, or a series of social media posts.  This saves time and allows you to reach a wider audience with the same content.\",\n    \"code\": \"\"\n  }\n]\n```"},
        ],
      },
    ],
  });

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());

