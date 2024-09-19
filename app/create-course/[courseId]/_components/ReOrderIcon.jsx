import React from 'react'
export function ReorderIcon() {
  return (
    <div className=" grid grid-cols-2 gap-1 cursor-grab">
                                                {Array.from({ length: 6 }).map((index) => (
                                                    <div key={index} className="w-2 h-2 bg-gray-300 rounded-full"></div>
                                                ))}
                                            </div>
  );
}
