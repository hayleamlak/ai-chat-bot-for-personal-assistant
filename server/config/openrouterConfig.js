// config/openrouterConfig.js
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

export const callOpenRouter = async (messages) => {
  try {
    const model = process.env.OPENROUTER_MODEL || "deepseek/deepseek-r1-0528:free";
    const maxTokens = Number(process.env.OPENROUTER_MAX_TOKENS) || 512;

    console.log(`OpenRouter using model: ${model}, max_tokens: ${maxTokens}`);

    const resp = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages,
        max_tokens: maxTokens,
      }),
    });

    console.log("OpenRouter response status:", resp.status);

    const text = await resp.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      console.error("OpenRouter returned non-JSON:", text.slice(0, 200));
      throw new Error(`OpenRouter returned non-JSON response (status ${resp.status})`);
    }

    if (!resp.ok) {
      const msg = data?.error?.message || data?.message || JSON.stringify(data);
      console.error("OpenRouter error:", resp.status, msg);
      throw new Error(`OpenRouter error ${resp.status}: ${msg}`);
    }

    return data;
  } catch (error) {
    console.error("callOpenRouter failed:", error?.message || error);
    throw error;
  }
};
