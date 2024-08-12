/**
 * @file  src/app/api/chat-pry/route.ts
 * @description
 * This module handles POST requests from User messages for the chat API.
 * It receives user messages, performs a comparison in Pinecone with bible previously
 * vectorized, select the best result and create a generative response using the GPT-4 model.
 * @date 08/08/2024
 * @maintainer Orare Team
 * @inputs
 * - messages: An array of objects containing user messages and take the last one (messages-1).
 *   Each message must have at least a 'content' field.
 * @outputs
 * - Returns a JSON response with the message generated by GPT-4.
 * @dependencies
 * - openai-edge for integration with the OpenAI API.
 * - comparePrayInPinecone for compare vectors
 */

import { Configuration, OpenAIApi } from "openai-edge";
import { NextResponse } from "next/server";
import { Message, OpenAIStream, StreamingTextResponse } from "ai";
import { comparePrayInPinecone } from "../../../lib/pinecone";

// Conection to API OpenAI for Chat
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

// Handling Posted Messages from User in Diario Section
export async function POST(req: Request) {
  try {

    // Getting and checking messages from Diario Section
    const { messages } = await req.json();
    if (!messages || messages.length === 0) {
      throw new Error("No se proporcionaron mensajes.");
    }

    // Get the last message
    const userMessage = messages[messages.length - 1].content;

    // Use Function declared in Lib/Pinecone and checking it
    const pineconeResults = await comparePrayInPinecone(userMessage);
    if (pineconeResults.length === 0) {
      throw new Error("No se encontraron resultados en Pinecone.");
    }

    // Checking rates ---
    const qualifyingRates = pineconeResults?.filter(
        (pineconeResults) => pineconeResults.score && pineconeResults.score > 0.1
    )
    let rates = qualifyingRates?.map(pineconeResults => (pineconeResults.score))
    console.log('Scores', rates)
    // console.log('rates /////', rates?.join('\n').substring(0, 3000))
    
    let psj = qualifyingRates?.map(pineconeResults => (pineconeResults.metadata.pasaje))
    console.log('Pasaje', psj)
    
    // Preparing Promt for OpenAI
    const prompt = `
              # Rol #
              Tu eres el GPT: Catholic Bible Guide by Fr. Abraham Mutholath.
              Tu rol será el de un sacerdote de una iglesia Católica. Se te dará una oración de una persona y 3 pasajes de la Biblia relacionados a la oración. 
              Tu tarea será elegir el pasaje de la Biblia que más relación tenga con la oración de la persona. Luego deberás interpretar el pasaje de la Biblia que elegiste acorde a la oración de la persona y dar unas palabras de aliento.
              # Fin Rol #
  
              # Tareas #
              - Leer la oración de la persona y los 3 pasajes de la Biblia.
              - Elegir el pasaje de la Biblia que más relación tenga con la oración de la persona.
              - Interpretar el pasaje de la Biblia acorde a la oración de la persona y dar unas palabras de aliento.
              # fin Tareas #
  
              # Estructura input #
              - Oración de la persona
              - Pasaje de la Biblia 1
              - Pasaje de la Biblia 2
              - Pasaje de la Biblia 3
              # Fin estructura input #
  
              # Input #
              - Oración: ${userMessage}
              - Pasaje de la Biblia 1: ${
                pineconeResults[0]?.metadata?.pasaje ?? "No disponible"
              } : ${pineconeResults[0]?.metadata?.texto ?? "No disponible"}
              - Pasaje de la Biblia 2: ${
                pineconeResults[1]?.metadata?.pasaje ?? "No disponible"
              } : ${pineconeResults[1]?.metadata?.texto ?? "No disponible"}
              - Pasaje de la Biblia 3: ${
                pineconeResults[2]?.metadata?.pasaje ?? "No disponible"
              } : ${pineconeResults[2]?.metadata?.texto ?? "No disponible"}
              # fin Input #
  
              # Estructura Output #
              - Versículo recomendado: "..."
              - Párrafo con la interpretación del pasaje de la Biblia y palabras de aliento
              # Fin Estructura Output #
  
              # Ejemplo Output #
              - Versículo recomendado: "Salmos 22:24 - Porque no menospreció ni abominó la aflicción del pobre, Ni de él escondió su rostro; Sino que cuando clamó á él, oyóle."
              - Este Salmo nos recuerda la infinita misericordia y compasión de Dios hacia los pobres y afligidos. Este versículo nos asegura que Dios no ignora el sufrimiento de los necesitados, ni les da la espalda. Al contrario, Él escucha sus clamores y está presente en sus momentos de angustia.
              Tu oración por los pobres del mundo es un acto de amor y solidaridad que refleja el corazón de Dios. Al interceder por ellos, te unes a la misión de Cristo de traer consuelo y esperanza a los más vulnerables. Recuerda que Dios escucha nuestras oraciones y actúa a través de nosotros para llevar su amor y provisión a aquellos que más lo necesitan.
              Te animo a seguir orando y, si es posible, a tomar acciones concretas para ayudar a los pobres en tu comunidad. Cada pequeño gesto de generosidad y compasión puede ser una manifestación del amor de Dios en sus vidas. Confía en que Dios, en su infinita bondad, no abandonará a los necesitados y usará nuestras oraciones y acciones para bendecirlos.
              Que el Señor te bendiga y te fortalezca en tu deseo de servir a los demás. Amén.
              # Fin Ejemplo Output #
          `;

    // Create response to User using OpenAI
    const response = await openai.createChatCompletion({
      model: "gpt-4o",
      stream: true,
      messages: [
        { role: "system", content: prompt },
        ...messages.filter((message: Message) => message.role === "user"),
      ],
    });

    // Sending response to Diario component
    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error) {
    
    // Handling Error
    console.error("Error en la solicitud POST:", error);
    return NextResponse.json({
      message: "Error al procesar la solicitud POST.",
    });
  }
}
