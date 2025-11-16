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
    }, 18);
    return () => clearInterval(interval);
  }, [text, sender]);

  const initials = sender === "user" ? "U" : "AI";

  return (
    <div className={`message-wrapper ${sender}`}>
      {sender !== "user" && (
        <div className="avatar" aria-hidden>
          {initials}
        </div>
      )}
      <div className={`message ${sender}`} role="article" aria-label={`${sender} message`}>
        {displayedText}
      </div>
      {sender === "user" && (
        <div className="avatar" aria-hidden>
          {initials}
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
