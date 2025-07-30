import React, { useRef } from "react";
import "./NoteEditor.css";

// PUBLIC_INTERFACE
function NoteEditor({ note, onChange, onSave, editing, setEditing }) {
  /** Note editor/viewer with light rich text controls. */

  const contentRef = useRef();

  const format = (command) => {
    document.execCommand(command, false, null);
    // Following line triggers React controlled value update by syncing innerHTML
    if (onChange) {
      onChange({
        ...note,
        content: contentRef.current.innerHTML,
      });
    }
  };

  return (
    <div className="note-editor">
      {editing ? (
        <>
          <input
            className="note-title-input"
            value={note.title}
            onChange={(e) => onChange({ ...note, title: e.target.value })}
            placeholder="Title"
            autoFocus
            aria-label="Note title"
          />
          <div className="toolbar">
            <button type="button" className="format-btn" onClick={() => format("bold")} title="Bold">
              <b>B</b>
            </button>
            <button type="button" className="format-btn" onClick={() => format("italic")} title="Italic">
              <i>I</i>
            </button>
            <button type="button" className="format-btn" onClick={() => format("underline")} title="Underline">
              <u>U</u>
            </button>
          </div>
          <div
            className="note-content-editable"
            contentEditable
            ref={contentRef}
            suppressContentEditableWarning
            onInput={(e) => onChange({ ...note, content: e.currentTarget.innerHTML })}
            dangerouslySetInnerHTML={{ __html: note.content }}
            aria-label="Note content"
            spellCheck={true}
            tabIndex={0}
          />
          <div className="editor-actions">
            <button className="btn btn-primary" onClick={onSave} aria-label="Save note">
              Save
            </button>
            <button className="btn btn-secondary" onClick={() => setEditing(false)} aria-label="Cancel edit">
              Cancel
            </button>
          </div>
        </>
      ) : (
        note && (
          <div className="note-display">
            <div className="note-title-view">{note.title}</div>
            <div
              className="note-content-view"
              dangerouslySetInnerHTML={{ __html: note.content || "<em>(empty)</em>" }}
            />
            <button className="btn btn-edit" onClick={() => setEditing(true)} aria-label="Edit note">
              Edit
            </button>
          </div>
        )
      )}
    </div>
  );
}

export default NoteEditor;
