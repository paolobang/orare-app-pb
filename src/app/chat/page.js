/* "use client";
import React, { useEffect, useRef } from "react";
import Layout from "../../components/layout/Layout";
import Bubble from "../../components/bubble/Bubble";
import { useChat } from "ai/react";

const Chat = () => {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat"
  });

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Layout>
      <div className="flex flex-col h-screen">
        <div className="flex-1 p-4 pb-20 pt-16 overflow-y-auto">
          {messages.map((m) => (
            <Bubble
              key={m.id}
              message={m.content}
              isUser={m.role !== "assistant"}
              className={m.role }
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
              value={input}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isLoading && input.trim()) {
                  handleSubmit(e);
                }
              }}
            />
            <button
              className="btn btn-accent ml-2"
              onClick={(e) => {
                if (!isLoading && input.trim()) {
                  handleSubmit(e);
                }
              }}
              disabled={isLoading || !input.trim()}
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
 */


"use client";
import React, { useEffect, useRef } from "react";
import Layout from "../../components/layout/Layout";
import Bubble from "../../components/bubble/Bubble";
import { useChat } from "ai/react";

const Chat = () => {
  // Configura el hook useChat para manejar la comunicación con la API
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat" // Esta es la ruta que define la lógica en route.ts
  });

  const messagesEndRef = useRef(null);

  // Hace que el chat se desplace automáticamente al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Layout>
      <div className="flex flex-col h-screen">
        <div className="flex-1 p-4 pb-20 pt-16 overflow-y-auto">
          {messages.map((m) => (
            <Bubble
              key={m.id}
              message={m.content}
              isUser={m.role !== "assistant"}
              className={m.role}
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
              value={input}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isLoading && input.trim()) {
                  handleSubmit(e); // Envía el mensaje a la API
                }
              }}
            />
            <button
              className="btn btn-accent ml-2"
              onClick={(e) => {
                if (!isLoading && input.trim()) {
                  handleSubmit(e); // Envía el mensaje a la API
                }
              }}
              disabled={isLoading || !input.trim()}
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
