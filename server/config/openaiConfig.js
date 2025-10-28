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
      model: "gpt-3.5-turbo",
      messages: messages,
    }),
  });

  const data = await response.json();
  return data;
};
