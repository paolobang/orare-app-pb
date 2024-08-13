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

  const blocks = message.split('---'); // Utiliza '---' como delimitador entre bloques
  const backgroundStyle = isUser ?{backgroundColor: '#a18fc9'}: { backgroundColor: '#d4f4e4' }  ;


  return (
    <div className={`chat ${isUser ? "chat-end" : "chat-start"}`} >
      <div className={`chat-bubble ${isUser ? "text-neutral-200" : "text-cyan-600"}`} style={backgroundStyle}>
        {blocks.map((block, index) => (
          <div key={index} style={{ marginBottom: "16px" }}>
            {block.trim().split('\n').map((line, lineIndex) => (
              <span key={lineIndex} style={{ display: "block" }}>
                {line}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bubble;
