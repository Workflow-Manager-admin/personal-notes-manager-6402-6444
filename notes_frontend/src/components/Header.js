import React from "react";
import "./Header.css";

// PUBLIC_INTERFACE
function Header({ search, setSearch, onNewNote, onThemeToggle, theme }) {
  /** Header bar with search, new note, and user/theme actions. */
  return (
    <div className="header-bar">
      <div className="logo">📝 Notes</div>
      <input
        className="search-input"
        type="text"
        placeholder="Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Search notes"
      />
      <button className="btn btn-accent" onClick={onNewNote} aria-label="Create new note">
        ＋ New
      </button>
      <button className="btn btn-theme" onClick={onThemeToggle} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
        {theme === "light" ? "🌙" : "☀️"}
      </button>
    </div>
  );
}

export default Header;
