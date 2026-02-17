import { useState, useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import InputArea from "./InputArea";
import Loader from "./Loader";
import { askAI, resetConversation } from "../services/api";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Listen for quick-ask events dispatched from Sidebar or other UI
  useEffect(() => {
    const onQuick = (e) => {
      if (!e?.detail) return;
      if (e.detail === "__RESET__") {
        handleReset();
        return;
      }
      handleQuickAsk(e.detail);
    };
    window.addEventListener("quick-ask", onQuick);
    return () => window.removeEventListener("quick-ask", onQuick);
  }, [messages]);

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
      setMessages([...newMessages, { sender: "ai", text: "⚠️ AI service is temporarily offline due to insufficient credits." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    await resetConversation();
    setMessages([]);
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
    <div className="chat-container" role="region" aria-label="Chat conversation">
      <main className="messages" id="messages-list">
        {messages.map((msg, i) => (
          <ChatMessage key={i} sender={msg.sender} text={msg.text} />
        ))}
        {loading && <Loader />}
        <div ref={messagesEndRef} />
      </main>

      <footer className="chat-footer">
        <div className="floating-input">
          <div className="input-wrap">
            <InputArea input={input} setInput={setInput} onSend={handleSend} loading={loading} />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ChatBox;
