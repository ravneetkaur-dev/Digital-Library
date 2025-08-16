
import { Card, Badge, Button } from "react-bootstrap"
import { FaPlus, FaEye } from "react-icons/fa"

export const SubjectCard = ({ subject, notes, onAddNote, onViewAll }) => {
  const approvedNotes = notes.filter((note) => note.isApproved)
  const publicNotes = notes.filter((note) => note.isPublic)

  return (
    <Card className="subject-card">
      <Card.Body>
        <div className="subject-header">
          <h5 className="subject-title">{subject}</h5>
          <Badge className="subject-badge">{notes.length} notes</Badge>
        </div>

        <div className="subject-stats">
          <div className="stat-item">
            <span className="stat-number">{notes.length}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{approvedNotes.length}</span>
            <span className="stat-label">Approved</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{publicNotes.length}</span>
            <span className="stat-label">Public</span>
          </div>
        </div>

        <div className="subject-actions">
          <Button className="btn-subject btn-primary-custom" onClick={() => onAddNote(subject)}>
            <FaPlus /> Add Note
          </Button>
          <Button className="btn-subject btn-outline-custom" onClick={onViewAll}>
            <FaEye /> View All
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}
