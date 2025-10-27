const InputArea = ({ input, setInput, onSend, loading }) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") onSend();
  };

  return (
    <div className="input-area">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Ask me about skills, projects, hobbies..."
      />
      <button onClick={onSend} disabled={loading}>
        {loading ? "..." : "Send"}
      </button>
    </div>
  );
};

export default InputArea;
