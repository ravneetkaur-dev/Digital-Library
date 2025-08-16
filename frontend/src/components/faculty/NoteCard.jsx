
import { Card, Badge, Button } from "react-bootstrap"
import { FaEye, FaLock, FaGlobe, FaTrash } from "react-icons/fa"

export const NoteCard = ({ note, onToggleVisibility, onDelete }) => {
  return (
    <Card className="note-card">
      <Card.Body>
        <div className="note-header">
          <h6 className="note-title">{note.title}</h6>
          <div className="note-status">
            <Badge className={`status-badge ${note.isApproved ? "status-approved" : "status-pending"}`}>
              {note.isApproved ? "Approved" : "Pending"}
            </Badge>
            <Badge className={`status-badge ${note.isPublic ? "status-public" : "status-private"}`}>
              {note.isPublic ? "Public" : "Private"}
            </Badge>
          </div>
        </div>

        <p className="note-description">{note.description || "No description provided"}</p>

        <div className="note-meta">
          <span>
            <strong>Subject:</strong> {note.subject}
          </span>
          <span>
            <strong>Semester:</strong> {note.semester || "N/A"}
          </span>
        </div>

        <div className="note-actions">
          <Button className="btn-note-action btn-view" size="sm">
            <FaEye /> View
          </Button>
          <Button
            className="btn-note-action btn-edit"
            size="sm"
            onClick={() => onToggleVisibility(note._id, note.isPublic)}
          >
            {note.isPublic ? <FaLock /> : <FaGlobe />}
          </Button>
          <Button className="btn-note-action btn-delete" size="sm" onClick={() => onDelete(note._id)}>
            <FaTrash />
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}
