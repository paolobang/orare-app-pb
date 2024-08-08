/* import { Configuration, OpenAIApi } from 'openai-edge';
import { NextResponse } from 'next/server'
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { loadPrayIntoPinecone } from '../../../lib/pinecone';

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(config)


export async function getEmbeddings (text: string){
    try {

        const response = await openai.createEmbedding({
            model: 'text-embedding-3-small', // Embedding actual
            input: text.replace(/\n/g, ' ')
        })
        const result = await response.json()
        return result.data[0].embedding as number[]
    } catch (error) {
        console.log('error llamando opean embeddings api', error)
        throw error
    }
}


export async function POST(request: Request){
    const { messages } = await request.json()

    // Cargamos la Oracion a Pinecone.ts
    await loadPrayIntoPinecone(messages)

    const response = await openai.createChatCompletion({
       model: "gpt-4o",
       stream: true,
       messages
    })

    const stream = OpenAIStream(response, {
        onStart: () => {
            console.log("Started Streaming")
        },

    })

    return new StreamingTextResponse(stream)

    // Process with openai
    return NextResponse.json({ message: "hello world"});
} */

import { Configuration, OpenAIApi } from 'openai-edge';
import { NextResponse } from 'next/server';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { comparePrayInPinecone } from '../../../lib/pinecone';

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export async function getEmbeddings(text: string) {
    try {
        const response = await openai.createEmbedding({
            model: 'text-embedding-3-small', // Modelo de embeddings adecuado
            input: text.replace(/\n/g, ' '),
        });

        const result = await response.json();
        return result.data[0].embedding as number[];
    } catch (error) {
        console.error('Error llamando OpenAI embeddings API', error);
        throw error;
    }
}

export async function POST(request: Request) {
    try {
        const { messages } = await request.json();

        // Vectoriza y almacena la oración en Pinecone
        const userMessage = messages[messages.length - 1]?.content;
        if (userMessage) {
            await comparePrayInPinecone(userMessage);
        }

        const response = await openai.createChatCompletion({
            model: 'gpt-4o', // Modelo correcto
            stream: true,
            messages,
        });

        const stream = OpenAIStream(response, {
            onStart: () => {
                console.log('Started Streaming');
            },
        });

        return new StreamingTextResponse(stream);
    } catch (error) {
        console.error('Error en POST', error);
        return NextResponse.json({ error: 'Error al procesar la solicitud' }, { status: 500 });
    }
}
