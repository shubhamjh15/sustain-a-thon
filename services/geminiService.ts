import { GoogleGenAI } from "@google/genai";
import { UserStats } from "../types";

const apiKey = process.env.API_KEY || '';

let aiClient: GoogleGenAI | null = null;

if (apiKey) {
  aiClient = new GoogleGenAI({ apiKey });
}

export const getGeminiResponse = async (
  history: { role: string; text: string }[], 
  message: string,
  userStats?: UserStats
): Promise<string> => {
  if (!aiClient) {
    return "Demo Mode: API Key missing. Please configure process.env.API_KEY to chat with the real AI assistant! But I'd love to help you save the planet once I'm connected.";
  }

  try {
    const model = aiClient.models;
    
    // Construct user context string
    let userContext = "";
    if (userStats) {
      userContext = `
      CURRENT USER STATS:
      - Level: ${userStats.level}
      - XP: ${userStats.xp}
      - CO2 Saved: ${userStats.co2Saved.toFixed(1)}kg
      - Badges: ${userStats.badges.join(', ')}
      - Streak: ${userStats.streak} days
      `;
    }

    const context = history.map(h => `${h.role === 'user' ? 'User' : 'Assistant'}: ${h.text}`).join('\n');
    
    // Enhanced Prompt Engineering
    const fullPrompt = `
    ${context}
    User: ${message}
    Assistant:
    `;

    const response = await model.generateContent({
      model: 'gemini-3-flash-preview',
      contents: message,
      config: {
        systemInstruction: `
        You are EcoBot, the official AI coach for "Sustain-a-thon".
        
        YOUR PERSONA:
        - Tone: Youthful, high-energy, Neo-Brutalist, hopeful, punchy.
        - Style: Use emojis 🌿, slang (e.g., "That's lit", "Game changer", "Level up"), and exclamation marks.
        - Philosophy: Anti-doom-and-gloom. Focus on action, gamification, and positive impact. "Together we fix this."
        
        YOUR GOAL:
        - Motivate the user to complete missions and log actions.
        - Explain complex climate science using simple, fun analogies (e.g., "The atmosphere is like a thick blanket...").
        - React to their stats if provided. Praise their streaks and badges.
        
        ${userContext}
        
        GUIDELINES:
        - If they ask for tips, give 1-3 short, actionable bullet points.
        - If they seem discouraged, remind them of the community impact (500 tons saved!).
        - Never be preachy or judgmental.
        `,
      }
    });

    return response.text || "I'm thinking about trees... try asking again!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Oops! My eco-circuits are overloaded. Please try again in a moment.";
  }
};