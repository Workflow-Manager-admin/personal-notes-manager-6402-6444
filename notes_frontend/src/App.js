import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import NoteEditor from "./components/NoteEditor";

/**
 * PUBLIC_INTERFACE
 * Main app component for personal notes manager with sidebar, rich note editing, search/filter, and responsive design.
 */
function App() {
  // Main app state management

  // Notes format: {id, title, content, created, modified}
  const [notes, setNotes] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [editing, setEditing] = useState(false);
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState("light");

  // On mount, load notes from localStorage if available
  useEffect(() => {
    const json = window.localStorage.getItem("notes-data");
    if (json) {
      try {
        const arr = JSON.parse(json);
        setNotes(arr);
        if (!activeId && arr.length > 0) {
          setActiveId(arr[0].id);
        }
      } catch {
        setNotes([]);
      }
    }
  }, []);

  // Persist notes to localStorage on any change
  useEffect(() => {
    window.localStorage.setItem("notes-data", JSON.stringify(notes));
  }, [notes]);

  // Effect to sync theme variable on root
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Create a new note and set it active
  // PUBLIC_INTERFACE
  const handleNewNote = useCallback(() => {
    const newNote = {
      id: String(Date.now()),
      title: "",
      content: "",
      created: Date.now(),
      modified: Date.now(),
    };
    setNotes([newNote, ...notes]);
    setActiveId(newNote.id);
    setEditing(true);
  }, [notes]);

  // PUBLIC_INTERFACE
  const handleSelectNote = useCallback(
    (id) => {
      setActiveId(id);
      setEditing(false);
    },
    []
  );

  // PUBLIC_INTERFACE
  const handleDeleteNote = useCallback(
    (id) => {
      let idx = notes.findIndex((n) => n.id === id);
      if (idx < 0) return;
      let nextId = notes.length > 1
        ? notes[(idx + 1) % notes.length].id
        : null;
      if (window.confirm("Delete this note?")) {
        setNotes(notes.filter((n) => n.id !== id));
        setActiveId(id === activeId ? nextId : activeId);
        setEditing(false);
      }
    },
    [notes, activeId]
  );

  // Get currently active note object
  const activeNote = notes.find((n) => n.id === activeId);

  // PUBLIC_INTERFACE
  const handleChangeNote = (note) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === note.id ? { ...note, modified: Date.now() } : n))
    );
  };

  // Save changes to note (exit edit mode)
  // PUBLIC_INTERFACE
  const handleSave = () => {
    setEditing(false);
  };

  // PUBLIC_INTERFACE
  const handleThemeToggle = () => {
    setTheme((theme) => (theme === "light" ? "dark" : "light"));
  };

  // Filter notes with search query (case-insensitive, search in title/content)
  const filteredNotes = search
    ? notes.filter(
        (n) =>
          n.title?.toLowerCase().includes(search.toLowerCase()) ||
          n.content?.toLowerCase().includes(search.toLowerCase())
      )
    : notes;

  // If there are filteredNotes but activeId is not visible, update.
  useEffect(() => {
    if (
      filteredNotes.length &&
      !filteredNotes.some((n) => n.id === activeId)
    ) {
      setActiveId(filteredNotes[0].id);
      setEditing(false);
    }
  }, [filteredNotes, activeId]);

  return (
    <div className="App">
      <Header
        search={search}
        setSearch={setSearch}
        onNewNote={handleNewNote}
        onThemeToggle={handleThemeToggle}
        theme={theme}
      />
      <div className="notes-layout">
        <Sidebar
          notes={filteredNotes}
          activeId={activeId}
          onSelect={handleSelectNote}
          onDelete={handleDeleteNote}
        />
        <main style={{ flex: 1, background: "var(--bg-primary)" }}>
          {activeNote ? (
            <NoteEditor
              note={activeNote}
              onChange={handleChangeNote}
              onSave={handleSave}
              editing={editing}
              setEditing={setEditing}
            />
          ) : (
            <div style={{ margin: "2rem", color: "#aaa", fontSize: "1.2rem" }}>
              <em>Select a note or create a new one to begin.</em>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
