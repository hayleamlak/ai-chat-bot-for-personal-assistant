// routes/chatRoutes.js
import express from "express";
import { callOpenRouter } from "../config/openrouterConfig.js"; // Use OpenRouter
import { buildSystemPrompt } from "../utils/systemPrompt.js";

const router = express.Router();

// Simple in-memory conversation storage
let conversationHistory = [];

router.post("/ask", async (req, res) => {
  try {
    const userMessage = req.body.message;
    if (!userMessage) {
      return res.status(400).json({ error: "Message is required" });
    }

    const systemPrompt = buildSystemPrompt();

    // Build messages array for OpenRouter
    const messages = [
      { role: "system", content: systemPrompt },
      ...conversationHistory,
      { role: "user", content: userMessage }
    ];

    console.log("Messages sent to OpenRouter:", messages);

    // Call OpenRouter API
    const completion = await callOpenRouter(messages);

    console.log("OpenRouter response:", completion);

    if (!completion.choices || completion.choices.length === 0) {
      return res.status(500).json({ error: "No response from OpenRouter API" });
    }

    // Extract AI reply (OpenRouter response format)
    const aiReply = completion.choices[0].message?.content || "No reply from AI";

    // Save conversation
    conversationHistory.push({ role: "user", content: userMessage });
    conversationHistory.push({ role: "assistant", content: aiReply });

    res.json({ answer: aiReply });
  } catch (error) {
    console.error("Error in /ask route:", error);
    // Send the actual error message for debugging (optional in production)
    res.status(500).json({ error: error.message || "Something went wrong" });
  }
});

export default router;
