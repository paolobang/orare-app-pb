import React from "react";

const Bubble = ({ message, isUser }) => {
  return (
    <div className={`chat ${isUser ? "chat-end" : "chat-start"}`}>
      <div className="chat-bubble">{message}</div>
    </div>
  );
};

export default Bubble;
