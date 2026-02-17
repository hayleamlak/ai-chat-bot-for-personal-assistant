// services/api.js
import axios from "axios";

// Live backend URL
const API_URL = "https://ai-chat-bot-for-personal-assistant-1.onrender.com/api/chat/ask";

// Optional reset endpoint if your backend supports it
const RESET_URL = "https://ai-chat-bot-for-personal-assistant-1.onrender.com/api/chat/reset";

const getClientId = () => {
  const key = "chat_client_id";
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
};

export const askAI = async (message) => {
  const res = await axios.post(API_URL, { message }, {
    headers: { "X-Client-Id": getClientId() }
  });
  return res.data.answer;
};

export const resetConversation = async () => {
  try {
    const res = await axios.post(RESET_URL, null, {
      headers: { "X-Client-Id": getClientId() }
    });
    return res.data.message;
  } catch {
    // If backend doesn't have reset endpoint, just ignore
    return "Conversation reset locally.";
  }
};
