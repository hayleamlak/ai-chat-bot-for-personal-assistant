import React, { useEffect } from "react";
import ChatBox from "./components/ChatBox";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import "./styles/ui.css";

function App() {
  // reset will be triggered by Header, but ChatBox has its own reset function via window event
  const handleReset = () => {
    window.dispatchEvent(new CustomEvent('quick-ask', { detail: '__RESET__' }));
    // ChatBox listens for quick-ask; it will ignore unknown prompts but you can implement reset handling if desired
    // Alternatively, implement a dedicated 'reset-conversation' event in the future.
  };

  // Close sidebar overlay when clicking outside or pressing Escape (mobile UX)
  useEffect(() => {
    const onDocClick = (e) => {
      if (!document.body.classList.contains('sidebar-open')) return;
      if (e.target.closest('.app-sidebar')) return;
      if (e.target.closest('.hamburger-btn')) return;
      document.body.classList.remove('sidebar-open');
    };

    const onKey = (e) => {
      if (e.key === 'Escape') document.body.classList.remove('sidebar-open');
    };

    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <div className="app-shell">
      <div className="app-frame">
        <Header onReset={handleReset} />
        <div className="app-body">
          <Sidebar />
          <main className="chat-root">
            <ChatBox />
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
