import express from "express";
import openai from "../config/openaiConfig.js";
import { buildSystemPrompt } from "../utils/systemPrompt.js";

const router = express.Router();

// Store conversation per session (simple in-memory version)
let conversationHistory = [];

router.post("/ask", async (req, res) => {
  try {
    const userMessage = req.body.message;
    if (!userMessage) return res.status(400).json({ error: "Message is required" });

    const systemPrompt = buildSystemPrompt();

    // Build messages array for OpenAI
    const messages = [
      { role: "system", content: systemPrompt },
      ...conversationHistory,
      { role: "user", content: userMessage }
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: messages,
      temperature: 0.7
    });

    const aiReply = completion.choices[0].message.content;

    // Save conversation for follow-ups
    conversationHistory.push({ role: "user", content: userMessage });
    conversationHistory.push({ role: "assistant", content: aiReply });

    res.json({ answer: aiReply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
