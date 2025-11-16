import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

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
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, rehypeSanitize]}
          components={{
            // Ensure links open in a new tab and are safe
            a: ({ node, ...props }) => (
              <a {...props} target="_blank" rel="noopener noreferrer" />
            )
          }}
        >
          {displayedText}
        </ReactMarkdown>
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
