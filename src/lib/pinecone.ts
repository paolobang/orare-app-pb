/* import { Pinecone } from '@pinecone-database/pinecone';
import { getEmbeddings } from '../app/api/chat/route';

import md5 from 'md5'

let pc: Pinecone | null = null

export const getPineconeClient = async () => {
    if (!pc) {
        pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
    }
    return pc

}

type baba = {
    prayerContent: string;
    metadata : {
        loc: {content: string}
    }
}

export async function loadPrayIntoPinecone( pray: string) {
    const prayers = pray
    if (!prayers) {
        throw new Error("No hay oracion")
    }


    // 1. 
}

async function embedPray( doc: Document) {
    try {
        const embeddings = await getEmbeddings( doc.text )

    } catch (error) {
        console.log("Error embedPray", error)
        throw error
    }
}


export async function findSimilarPrayers(userMessage: string) {
    // 1. Obtener el embedding del mensaje del usuario
    const embedding = await getEmbeddings(userMessage);

    // 2. Obtener el índice de Pinecone
    const pinecone = await getPineconeClient();
    const index = pinecone.Index('bible');

    // 3. Realizar la consulta de similitud en Pinecone
    const queryResponse = await index.query({
        topK: 3, // Devolver los 3 resultados más similares
        vector: embedding,
        namespace: 'content', // Usar el namespace 'content'
        includeMetadata: true // Incluir los metadatos en la respuesta
    });

    // 4. Procesar los resultados
    const results = queryResponse.matches.map(match => ({
        id: match.id,
        score: match.score,
        metadata: match.metadata
    }));

    return results;
}
 */

import { Pinecone } from '@pinecone-database/pinecone';
import { getEmbeddings } from '../app/api/chat/route';
import md5 from 'md5';

let pc: Pinecone | null = null;

export const getPineconeClient = async () => {
    if (!pc) {
        pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
    }
    return pc

};

export async function comparePrayInPinecone(pray: string) {
    if (!pray) {
        throw new Error('No hay oración');
    }

    // 1. Vectorizar la oración
    const embedding = await embedPray(pray);

    // 2. Obtener el cliente de Pinecone y el índice
    const pinecone = await getPineconeClient();
    const index = pinecone.Index('bible-verses-metadata');

    // 3. Comparar el vector del mensaje con los existentes en el índice
    try {
        const queryResponse = await index.query({
            vector: embedding,
            topK: 3, // Retorna los 3 vectores más similares
            //namespace: 'content', // Namespace donde se encuentran los vectores
            includeMetadata: true // Incluir metadatos en la respuesta
        });

        // 4. Procesar los resultados
        if (queryResponse.matches?.length) {
            return queryResponse.matches.map(match => ({
                id: match.id,
                score: match.score,
                metadata: match.metadata,
            }));
        } else {
            console.log('No se encontraron coincidencias.');
            return [];
        }
    } catch (error) {
        console.error('Error al comparar la oración en Pinecone:', error);
        throw error;
    }
}

async function embedPray(prayerContent: string) {
    try {
        const embeddings = await getEmbeddings(prayerContent);
        return embeddings;
    } catch (error) {
        console.error('Error en embedPray', error);
        throw error;
    }
}
