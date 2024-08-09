import React from "react";

const Bubble = ({ message, isUser }) => {
  return (
    <div className={`chat ${isUser ? "chat-end" : "chat-start"}`}>
      <div className={`chat-bubble ${isUser ? "text-neutral-200	" : "text-cyan-600"}`}>{message}</div>
    </div>
  );
};

export default Bubble;
