import React, { useEffect, useState } from "react";
import { FiMoon, FiSun, FiMenu, FiRefreshCw } from "react-icons/fi";

const Header = ({ onReset }) => {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");
  const [sidebarOpen, setSidebarOpen] = useState(() => document.body.classList.contains("sidebar-open"));

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleSidebar = () => {
    document.body.classList.toggle("sidebar-open");
    setSidebarOpen(document.body.classList.contains("sidebar-open"));
  };

  useEffect(() => {
    const onDocClick = () => setSidebarOpen(document.body.classList.contains("sidebar-open"));
    window.addEventListener("resize", onDocClick);
    return () => window.removeEventListener("resize", onDocClick);
  }, []);

  return (
    <header className="app-header">
      <div className="header-left">
        <button className="hamburger-btn" onClick={toggleSidebar} aria-label="Toggle sidebar" aria-expanded={sidebarOpen}>
          <FiMenu size={18} />
        </button>
        <div>
          <div className="brand">hayleamalk me</div>
          <div className="subtitle">Personal AI Assistant</div>
        </div>
      </div>
      <div className="header-right">
        <button className="icon-btn" onClick={() => setTheme(theme === "dark" ? "light" : "dark" )} aria-label="Toggle theme">
          {theme === "dark" ? <FiMoon size={16} /> : <FiSun size={16} />}
        </button>
        <button className="reset-btn" onClick={onReset} aria-label="Reset conversation"><FiRefreshCw size={14} style={{verticalAlign: 'middle', marginRight: 6}}/>Reset</button>
      </div>
    </header>
  );
};

export default Header;
