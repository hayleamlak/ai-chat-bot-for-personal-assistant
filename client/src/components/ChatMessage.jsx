import { useEffect, useState } from "react";

const ChatMessage = ({ sender, text }) => {
  const [displayedText, setDisplayedText] = useState(sender === "ai" ? "" : text);

  useEffect(() => {
    if (sender !== "ai") return;

    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;
      if (index >= text.length) clearInterval(interval);
    }, 20); // typing speed (ms)
    return () => clearInterval(interval);
  }, [text, sender]);

  return <div className={`message ${sender}`}>{displayedText}</div>;
};

export default ChatMessage;
