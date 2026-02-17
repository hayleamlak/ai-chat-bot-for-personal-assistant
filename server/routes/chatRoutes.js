// routes/chatRoutes.js
import express from "express";
import { callOpenRouter } from "../config/openrouterConfig.js"; // Use OpenRouter
import { buildSystemPrompt } from "../utils/systemPrompt.js";

const router = express.Router();

// In-memory per-client conversation storage (avoids cross-user leaks)
const conversations = new Map();
const MAX_TURNS = 20;

const getClientId = (req) => {
  return req.get("x-client-id") || req.ip;
};

const trimHistory = (history) => {
  const maxMessages = MAX_TURNS * 2;
  if (history.length > maxMessages) {
    return history.slice(history.length - maxMessages);
  }
  return history;
};

router.post("/ask", async (req, res) => {
  try {
    const userMessage = String(req.body.message || "").trim();
    if (!userMessage) {
      return res.status(400).json({ error: "Message is required" });
    }

    const clientId = getClientId(req);
    const systemPrompt = buildSystemPrompt();
    const conversationHistory = conversations.get(clientId) || [];

    // Build messages array for OpenRouter
    const messages = [
      { role: "system", content: systemPrompt },
      ...conversationHistory,
      { role: "user", content: userMessage }
    ];

    if (process.env.DEBUG_CHAT === "true") {
      console.log("OpenRouter request size:", messages.length);
    }

    // Call OpenRouter API
    const completion = await callOpenRouter(messages);

    if (process.env.DEBUG_CHAT === "true") {
      console.log("OpenRouter response received");
    }

    if (!completion.choices || completion.choices.length === 0) {
      return res.status(500).json({ error: "No response from OpenRouter API" });
    }

    // Extract AI reply (OpenRouter response format)
    const aiReply = completion.choices[0].message?.content || "No reply from AI";

    // Save conversation
    const updatedHistory = trimHistory([
      ...conversationHistory,
      { role: "user", content: userMessage },
      { role: "assistant", content: aiReply }
    ]);
    conversations.set(clientId, updatedHistory);

    res.json({ answer: aiReply });
  } catch (error) {
    console.error("Error in /ask route:", error);
    // Send the actual error message for debugging (optional in production)
    res.status(500).json({ error: error.message || "Something went wrong" });
  }
});

router.post("/reset", (req, res) => {
  const clientId = getClientId(req);
  conversations.delete(clientId);
  res.json({ message: "Conversation reset." });
});

export default router;
