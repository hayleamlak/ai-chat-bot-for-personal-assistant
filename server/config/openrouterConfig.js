// config/openrouterConfig.js
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

export const callOpenRouter = async (messages) => {
  try {
    const resp = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "microsoft/wizardlm-2-8x22b",
        messages: messages,
        max_tokens: 2048,
      }),
      // optional: set a timeout via AbortController if you want
    });

    // Log status for easier debugging in Render logs
    console.log("OpenRouter response status:", resp.status);

    const text = await resp.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (err) {
      console.error("OpenRouter response not JSON:", text.slice(0, 200));
      throw new Error(`OpenRouter returned non-JSON response (status ${resp.status})`);
    }

    if (!resp.ok) {
      // Attach body message when available
      const msg = data?.error?.message || data?.message || JSON.stringify(data);
      console.error("OpenRouter error:", resp.status, msg);
      // Throw so route handler returns a 500 with a descriptive message
      throw new Error(`OpenRouter error ${resp.status}: ${msg}`);
    }

    return data;
  } catch (error) {
    console.error("callOpenRouter failed:", error?.message || error);
    // Re-throw so caller can decide how to respond
    throw error;
  }
};
