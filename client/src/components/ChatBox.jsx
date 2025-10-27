import { useState, useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import InputArea from "./InputArea";
import Loader from "./Loader";
import { askAI, resetConversation } from "../Services/api";
const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const answer = await askAI(input);
      setMessages([...newMessages, { sender: "ai", text: answer }]);
    } catch (err) {
      setMessages([...newMessages, { sender: "ai", text: "Error: Cannot reach server." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    try {
      await resetConversation();
    } catch (err) {
      console.error("Reset failed:", err);
    } finally {
      setMessages([]);
    }
  };

  const handleQuickAsk = async (prompt) => {
    const newMessages = [...messages, { sender: "user", text: prompt }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const answer = await askAI(prompt);
      setMessages([...newMessages, { sender: "ai", text: answer }]);
    } catch (err) {
      setMessages([...newMessages, { sender: "ai", text: "Error: Cannot reach server." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      {/* Quick-access floating buttons */}
      <div className="quick-buttons">
        <button onClick={() => handleQuickAsk("Tell me about Haylebest's skills")}>Skills</button>
        <button onClick={() => handleQuickAsk("Tell me about Haylebest's projects")}>Projects</button>
        <button onClick={() => handleQuickAsk("Tell me about Haylebest's hobbies")}>Hobbies</button>
        <button onClick={() => handleQuickAsk("Describe Haylebest's personality")}>Personality</button>
      </div>

      {/* Chat messages */}
      <div className="messages">
        {messages.map((msg, i) => (
          <ChatMessage key={i} sender={msg.sender} text={msg.text} />
        ))}
        {loading && <Loader />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <InputArea input={input} setInput={setInput} onSend={handleSend} loading={loading} />

      {/* Reset button */}
      <button className="reset-btn" onClick={handleReset}>
        Reset Conversation
      </button>
    </div>
  );
};

export default ChatBox;
