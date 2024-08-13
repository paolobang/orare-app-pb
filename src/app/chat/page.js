/**
 * @file  src/app/chat/page.js
 * @description
 * This module contains Diario Component and capture all messages
 * from user and show system response
 * @date 12/08/2024
 * @maintainer Orare Team
 * @inputs
 * - message: Last user's message from Diario Component
 * @outputs
 * - Returns a response genenerated
 * @dependencies
 * - useChat for the Hook
 * @logs
 * - Added a new feature for input text called textarea
 */

"use client";
import React, { useEffect, useRef, useState } from "react";
import Layout from "../../components/layout/Layout";
import Bubble from "../../components/bubble/Bubble";
import { useChat } from "ai/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Message } from "ai"


const Chat = ({chatId}) => {

  // Mensaje de bienvenida del sistema
  const welcomeMessage =`
Hola! Te damos la bienvenida a Orare! 🙏

Creemos en el poder de la oración y la reflexión personal. Para empezar, te invitamos a compartir una oración con nosotros. Puede ser una oración de gratitud, una petición, o cualquier pensamiento que quieras expresar.
---
**Ejemplo:**

"Querido Dios, te agradezco por la salud y el amor que tengo en mi vida. Por favor, guía a mi familia y amigos en estos tiempos difíciles y dales paz y fortaleza."
---
¡Tu oración puede ser tan simple o detallada como desees! Solo escríbela en el campo de abajo y haz clic en "Enviar". Estamos aquí para escuchar y apoyarte en tu viaje espiritual.
---
¡Esperamos escuchar tus pensamientos y oraciones!
`;


  // Set the useChat hook to handle comunication with our API Chat
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/chat-pry/", // Our API path
      body: {
        chatId,
      },
      initialMessages:  [],

      onResponse: (response) => {
        console.log("Respuesta de nuestro API Pry:", response);
      },
    });
    

      // Combina el mensaje de bienvenida con los mensajes posteriores
      const allMessages = [
        { role: "assistant", content: welcomeMessage },
        ...messages
      ];


  // It scrolls automaticly to last message
  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessages]);

  // Ref for the textarea
  const textAreaRef = useRef(null);

  // Adjust the textarea height based on the content
  useEffect(() => {
    const textArea = textAreaRef.current;
    if (textArea) {
      textArea.style.height = "auto"; // Reset height to auto to recalculate
      textArea.style.height = `${textArea.scrollHeight}px`; // Set height based on scroll height
    }
  }, [input]);

  return (
    <Layout>
      <div className="flex flex-col h-screen">
        <div className="flex-1 p-4 pb-20 pt-16 overflow-y-auto">
          {allMessages.map((m) => (
            <Bubble
              key={m.id}
              message={m.content}
              isUser={m.role !== "assistant"}
              className={m.role}
              chatId = {chatId}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="fixed bottom-0 w-full p-4 bg-white left-0">
          <div className="flex justify-center max-w-screen-lg mx-auto w-full">
          <textarea
              ref={textAreaRef}
              placeholder="Escribe tu oración aquí"
              className="textarea textarea-bordered w-full resize-none"
              value={input}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isLoading && input.trim()) {
                  handleSubmit(e); // Send message to our API
                }
              }}
              rows={1} // Start with a single row
            />
            <button
              className="btn btn-accent ml-2"
              onClick={(e) => {
                if (!isLoading && input.trim()) {
                  handleSubmit(e); // Send message to our API
                }
              }}
              disabled={isLoading || !input.trim()}
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Chat;
