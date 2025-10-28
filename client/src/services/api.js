import axios from "axios";

// Live backend URL
const API_URL = "https://ai-chat-bot-for-personal-assistant.onrender.com/api/chat/ask";

// Optional reset endpoint if your backend supports it
const RESET_URL = "https://ai-chat-bot-for-personal-assistant.onrender.com/api/chat/reset";

export const askAI = async (message) => {
  const res = await axios.post(API_URL, { message });
  return res.data.answer;
};

export const resetConversation = async () => {
  try {
    const res = await axios.post(RESET_URL);
    return res.data.message;
  } catch {
    // If backend doesn't have reset endpoint, just ignore
    return "Conversation reset locally.";
  }
};
