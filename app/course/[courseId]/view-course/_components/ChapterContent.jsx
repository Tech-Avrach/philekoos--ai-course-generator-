import React from 'react';
import YouTube from 'react-youtube';
import ReactMarkdown from 'react-markdown';

const opts = {
  width: '100%',
  height: '440',
  playerVars: {
    autoplay: 0,
    controls: 1,
    rel: 0,
    showinfo: 0,
    fs: 0,
    playsinline: 1,
  },
};

function ChapterContent({ chapter, content, includeVideo }) {
  console.log('includeVideo', includeVideo);

  const cleanCode = (code) => {
    // Remove <precode> tags and the '>>>' symbols
    return code.replace(/<\/?precode>/g, '') // Remove <precode> and </precode>
      .replace(/^>>>/gm, '') // Remove leading '>>>' on each line
      .trim();
  };

  return (
    <div className="p-10">
      {/* Container using grid */}
      {includeVideo === "Yes" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Left Side: Course Name and Description */}
          <div className="flex flex-col">
            <h1 className="text-5xl font-medium mb-4">{chapter?.name}</h1>
            <h2 className="text-xl text-gray-500 font-medium mb-3">{chapter?.about}</h2>
          </div>

          {/* Right Side: YouTube Video */}
          <div className="w-full h-full">
            <YouTube videoId={content?.videoId} opts={opts} />
          </div>
        </div>
      ) : (
        <div className="flex flex-col">
          <h1 className="text-5xl font-medium mb-4">{chapter?.name}</h1>
          <h2 className="text-xl text-gray-500 font-medium mb-3">{chapter?.about}</h2>
        </div>
      )}

      {/* Content Section */}
      <div className="mt-5">
        {content?.content.map((item, index) => (
          <div key={index} className="p-5 bg-blue-100 mb-3 rounded-lg">
            <h2 className="font-medium text-lg mb-2">{item.title}</h2>
            <ReactMarkdown className="text-gray-800 mb-2">{item.explanation}</ReactMarkdown>

            {item.code && (
              <div className="p-4 bg-black text-white overflow-auto">
                <pre className="whitespace-pre-wrap break-words">
                  <code>{cleanCode(item.code)}</code>
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChapterContent;
