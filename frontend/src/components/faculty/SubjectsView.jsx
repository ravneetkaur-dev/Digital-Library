
import { Button } from "react-bootstrap"
import { FaFileAlt, FaPlus } from "react-icons/fa"
import { NoteCard } from "./NoteCard"

export const SubjectsView = ({ notes, onAddNote, onToggleVisibility, onDeleteNote }) => {
  return (
    <div className="fade-in">
      <div className="notes-section">
        <div className="notes-header">
          <h3>
            <FaFileAlt /> My Notes ({notes.length})
          </h3>
          <Button className="add-note-btn" onClick={onAddNote}>
            <FaPlus /> Add New Note
          </Button>
        </div>

        {notes.length > 0 ? (
          <div className="notes-grid">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} onToggleVisibility={onToggleVisibility} onDelete={onDeleteNote} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <FaFileAlt />
            <h4>No Notes Added</h4>
            <p>Start by adding your first note to share with students.</p>
          </div>
        )}
      </div>
    </div>
  )
}
