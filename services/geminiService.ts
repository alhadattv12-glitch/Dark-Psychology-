import { GoogleGenAI, Type } from "@google/genai";
import { ImageStyle, GeneratedPrompts } from '../types';
import { SYSTEM_INSTRUCTION } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateDetailedPrompt = async (idea: string, style: ImageStyle): Promise<GeneratedPrompts> => {
  if (!idea.trim()) {
    throw new Error("Please enter a base idea to generate a prompt.");
  }

  try {
    const userPrompt = `Idea: "${idea}", Style: "${style}"`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userPrompt,
        config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.9,
            topP: 0.95,
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    long: { type: Type.STRING },
                    medium: { type: Type.STRING },
                    short: { type: Type.STRING },
                },
                required: ["long", "medium", "short"],
            },
        }
    });
    
    const text = response.text;

    if (!text) {
        throw new Error("Prompt generation failed. The model returned no response.");
    }

    const prompts: GeneratedPrompts = JSON.parse(text);

    if (!prompts.long || !prompts.medium || !prompts.short) {
        throw new Error("The generated response is missing one or more prompt variations.");
    }
    
    return prompts;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof SyntaxError) {
        throw new Error("Failed to parse generated prompts. The model returned an invalid format.");
    }
    if (error instanceof Error && error.message.includes('API key not valid')) {
        throw new Error("The provided API key is not valid. Please check your environment settings.");
    }
    throw new Error("An unexpected error occurred while generating the prompt. Please try again later.");
  }
};