import React from "react";

const Loading = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {[...Array(2)].map((_, index) => (
        <div
          key={index}
          className="bg-gray-400 h-32 w-full rounded-xl animate-pulse"
        ></div>
      ))}
    </div>
  );
};

export default Loading;