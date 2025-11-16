import React from "react";
import { FiUser, FiFolder, FiMusic, FiSmile, FiFileText, FiZap } from "react-icons/fi";

const prompts = [
  { title: "Skills", prompt: "Tell me about Haylebest's skills" },
  { title: "Projects", prompt: "Tell me about Haylebest's projects" },
  { title: "Hobbies", prompt: "Tell me about Haylebest's hobbies" },
  { title: "Personality", prompt: "Describe Haylebest's personality" },
];

const Sidebar = () => {
  const handleClick = (p) => {
    window.dispatchEvent(new CustomEvent("quick-ask", { detail: p }));
  };

  return (
    <aside className="app-sidebar" aria-label="Quick prompts and actions">
      <div className="sidebar-block">
        <h3>Quick Prompts</h3>
        <ul>
          {prompts.map((p, idx) => (
            <li key={p.title}>
              <button className="ghost-btn" onClick={() => handleClick(p.prompt)}>
                <span className="icon">{idx === 0 ? <FiUser/> : idx === 1 ? <FiFolder/> : idx === 2 ? <FiMusic/> : <FiSmile/>}</span>
                <span className="label">{p.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-block">
        <h3>Actions</h3>
        <button className="ghost-btn" onClick={() => handleClick('Summarize my resume')}><span className="icon"><FiFileText/></span><span className="label">Summarize resume</span></button>
        <button className="ghost-btn" onClick={() => handleClick('Generate project ideas')}><span className="icon"><FiZap/></span><span className="label">Project ideas</span></button>
      </div>
    </aside>
  );
};

export default Sidebar;
