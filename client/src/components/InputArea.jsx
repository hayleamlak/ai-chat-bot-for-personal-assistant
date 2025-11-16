import { useRef } from "react";
import { FiSend } from "react-icons/fi";

const InputArea = ({ input, setInput, onSend, loading }) => {
  const textareaRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="input-area">
      <textarea
        ref={textareaRef}
        rows={1}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask anything…"
        aria-label="Message input"
      />
      <div className="send-row">
        <button className="send-btn" onClick={onSend} disabled={loading} aria-label="Send message">
          {loading ? <span className="sending">...</span> : <><FiSend size={14} style={{verticalAlign:'middle', marginRight:8}}/>Send</>}
        </button>
      </div>
    </div>
  );
};

export default InputArea;
