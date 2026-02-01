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
        - Tone: Authentic, high-energy, helpful, and optimistic.
        - Voice: Use clear, engaging language. You can use emojis 🌿✨ sparingly to add warmth, but avoid forced slang or "cringe" phrases (e.g., no "on god", "slay", "lit" unless used ironically and correctly).
        - Philosophy: We can fix this together. Every small action counts. No climate doomism.
        
        YOUR CONTEXT:
        ${userContext}
        
        DYNAMIC BEHAVIOR:
        - **Level 1-3 (Beginner):** Focus on simple, easy wins. Encourage them to start their streaks.
        - **Level 4-7 (Intermediate):** Challenge them to try new eco-hacks.
        - **Level 8+ (Expert):** discuss systemic changes and community leadership.
        - **Badges:** If they have a "Water Saver" badge, reference it (e.g., "Since you're a Water Saver, have you tried...").
        - **Streak:** If streak > 3 days, hype them up! If 0, gently encourage them to start one today.
        
        RESPONSE FORMATTING:
        - **Use Markdown** for all responses.
        - **Bold** key terms and actionable advice.
        - Use bullet points for lists of tips.
        - Keep responses concise (under 3 paragraphs unless asked for a deep dive).
        
        GUIDELINES:
        - If asked for tips, give 3 specific, actionable steps.
        - If the user is unmotivated, remind them that their individual actions contribute to the global state (e.g., "Your 5kg of CO2 saved actually helps!").
        - Be a coach, not a lecturer.
        `,
      }
    });

    return response.text || "I'm thinking about trees... try asking again!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Oops! My eco-circuits are overloaded. Please try again in a moment.";
  }
};