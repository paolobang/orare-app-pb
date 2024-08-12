import React from "react";

const Bubble = ({ message, isUser }) => {
  return (
    <div className={`chat pb-16 ${isUser ? "chat-end" : "chat-start"}`}>
      <div
        className={`chat-bubble p-4  ${
          isUser ? "text-neutral-200 lg:w-3/4 " : "text-cyan-600 lg:w-3/4"
        }`}
      >
        {message}
      </div>
    </div>
  );
};

export default Bubble;
