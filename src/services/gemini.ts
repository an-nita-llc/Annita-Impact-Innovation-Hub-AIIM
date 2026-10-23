import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const generatePitchFeedback = async (pitch: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are an expert startup mentor and investor at the Annita Impact-Innovation Hub (AIIM), supporting startups across Liberia and West Africa. 
      Analyze the following pitch and provide constructive feedback. 
      Focus on: 
      1. Value Proposition
      2. Market Opportunity (specifically in the Liberian/West African context)
      3. Clarity and Impact
      4. One specific area for improvement.
      
      Keep the tone professional, encouraging, and culturally relevant.
      
      Pitch: ${pitch}`,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm sorry, I couldn't process your pitch at the moment. Please try again later.";
  }
};

export const askFundraisingQuestion = async (question: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are a fundraising expert for the Annita Impact-Innovation Hub (AIIM), a subsidiary of the Annita Group. 
      Answer the following question about fundraising, grants, or startup growth in Liberia as well as across the West African region.
      
      Question: ${question}`,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm sorry, I couldn't answer your question right now.";
  }
};
