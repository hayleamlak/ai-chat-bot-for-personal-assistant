// config/openrouterConfig.js
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

export const callOpenRouter = async (messages) => {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "microsoft/wizardlm-2-8x22b", // Free model on OpenRouter
      messages: messages,
      max_tokens: 2048,
    }),
  });

  const data = await response.json();
  return data;
};
