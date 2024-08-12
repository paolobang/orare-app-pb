/**
 * @file  src/components/bubble/Bubble.js
 * @description
 * This component contains messages from user and system
 * @date 12/08/2024
 * @maintainer Orare Team
 * @inputs
 * - messages
 * @outputs
 * - messages
 * @dependencies
 * - It's linked to Chat Page
 */
import React from "react";

const Bubble = ({ message, isUser }) => {
  // We split the message at the end of .' or ,"
  const sentences = message.split(/(?<=\.'|\.")/);

  return (
    <div className={`chat ${isUser ? "chat-end" : "chat-start"}`}>
      <div className={`chat-bubble ${isUser ? "text-neutral-200" : "text-cyan-600"}`}>
        {sentences.map((sentence, index) => (
          <span key={index} style={{ display: "block", paddingBottom: "8px" }}>
            {sentence.trim()}
            <br />
            <br />
          </span>
        ))}
      </div>
    </div>
  );
};

export default Bubble;
