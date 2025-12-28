import { GoogleGenAI } from '@google/genai'; // The new 2025 SDK import
import { Router } from "express";

// Your new API Key
const GEN_AI_KEY = "AIzaSyAX5uu5hKHt9yx7KvdVO3eaRlftvYyEt28"; 

// Initialize the new client
const ai = new GoogleGenAI({ apiKey: GEN_AI_KEY });

export const chatRouter = Router();

chatRouter.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    console.log("Contacting Mama Care AI using unified SDK...");

    // Using Gemini 3 Flash - the new default stable model for 2025
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash', 
      contents: `You are Mama Care, a warm and empathetic pregnancy assistant. Help the user: ${message}`,
    });

    res.json({ response: response.text });
    
  } catch (error: any) {
    console.error("--- AI CONNECTION ERROR ---");
    console.error(error.message);
    
    // Fallback in case Gemini 3 isn't available in your specific region yet
    try {
      const backupResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: req.body.message,
      });
      return res.json({ response: backupResponse.text });
    } catch (innerError) {
      res.json({ response: `Connection failed: ${error.message}` });
    }
  }
});