import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();

// Ensure the API key is available and vali


const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const AIChatSession = model.startChat({
  generationConfig,
  // safetySettings: Adjust safety settings
  // See https://ai.google.dev/gemini-api/docs/safety-settings
  history: [],
});
