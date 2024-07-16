"use client";
import React, { useState, useEffect, useRef } from "react";
import Layout from "../components/layout/Layout";
import Bubble from "../components/bubble/Bubble";

const Chat = () => {
  const [messages, setMessages] = useState([
    { text: "It's over Anakin,\nI have the high ground.", isUser: false },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);
  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { text: inputValue, isUser: true }]);
      setInputValue("");
    }
  };
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Layout>
      <div className="flex flex-col h-screen ">
        <div className="flex-1  p-4" style={{ paddingBottom: "5.5rem" }}>
          {messages.map((message, index) => (
            <Bubble
              key={index}
              message={message.text}
              isUser={message.isUser}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="fixed bottom-0 w-full p-4 bg-white left-0">
          <div className="flex justify-center max-w-lg mx-auto w-full">
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage();
                }
              }}
            />
            <button
              className="btn btn-accent ml-2 "
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Chat;
