import {
    API
} from './api';

// Check similarity between two texts
export async function checkTextSimilarity(text1, text2) {
    try {
        const response = await API.post('/ai/similarity', {
            text1,
            text2
        });
        return response.data;
    } catch (error) {
        console.error('Similarity check error:', error);
        throw error;
    }
}

// Get embeddings for texts
export async function getTextEmbeddings(texts) {
    try {
        const response = await API.post('/ai/embeddings', {
            texts
        });
        return response.data;
    } catch (error) {
        console.error('Embeddings error:', error);
        throw error;
    }
}

// Find most similar text from a list
export async function findMostSimilar(query, textList) {
    try {
        const similarities = await Promise.all(
            textList.map(text => checkTextSimilarity(query, text))
        );

        const results = textList.map((text, index) => ({
            text,
            similarity: parseFloat(similarities[index].similarity),
            percentage: similarities[index].percentage
        }));

        results.sort((a, b) => b.similarity - a.similarity);
        return results;
    } catch (error) {
        console.error('Find similar error:', error);
        throw error;
    }
}