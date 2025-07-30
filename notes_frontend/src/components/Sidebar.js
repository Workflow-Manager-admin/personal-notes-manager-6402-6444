import React from "react";
import "./Sidebar.css";

// PUBLIC_INTERFACE
function Sidebar({ notes, activeId, onSelect, onDelete }) {
  /** Sidebar listing notes, selectable and deletable. */
  return (
    <aside className="sidebar">
      <div className="notes-list">
        {notes.length === 0 && <div className="notes-empty">No notes</div>}
        {notes.map((note) => (
          <div
            className={`note-list-item${note.id === activeId ? " active" : ""}`}
            key={note.id}
            onClick={() => onSelect(note.id)}
            tabIndex={0}
            aria-label={`Select note ${note.title}`}
          >
            <div className="note-title">
              {note.title || <em>(Untitled)</em>}
            </div>
            <button
              className="delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(note.id);
              }}
              aria-label="Delete note"
              title="Delete note"
              tabIndex={-1}
            >
              🗑
            </button>
          </div>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;
