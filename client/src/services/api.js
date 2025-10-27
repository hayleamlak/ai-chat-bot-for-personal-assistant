import axios from "axios";

const API_URL = "http://localhost:5000/ask"; // Your working endpoint

export const askAI = async (message) => {
  const res = await axios.post(API_URL, { message });
  return res.data.answer;
};

// Optional reset (only if your backend supports it)
export const resetConversation = async () => {
  const res = await axios.post("http://localhost:5000/reset");
  return res.data.message;
};
