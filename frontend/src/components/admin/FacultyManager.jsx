
import { useState } from "react"
import { Card, Button } from "react-bootstrap"
import FacultyTable from "./FacultyTable"
import FacultyFormModal from "./FacultyFormModal"

export default function FacultyManager() {
  const [showModal, setShowModal] = useState(false)
  const [editFaculty, setEditFaculty] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)

  const handleAdd = () => {
    setEditFaculty(null)
    setShowModal(true)
  }

  const handleEdit = (faculty) => {
    setEditFaculty(faculty)
    setShowModal(true)
  }

  const handleSaved = () => {
    setShowModal(false)
    setEditFaculty(null)
    setReloadKey((k) => k + 1)
  }

  return (
    <Card className="shadow-sm">
      <Card.Header className="bg-white d-flex justify-content-between align-items-center">
        <strong>Faculty Management</strong>
        <Button variant="primary" onClick={handleAdd}>
          Add Faculty
        </Button>
      </Card.Header>
      <Card.Body>
        <FacultyTable key={reloadKey} onEdit={handleEdit} />
      </Card.Body>

      <FacultyFormModal
        show={showModal}
        onHide={() => setShowModal(false)}
        initialData={editFaculty}
        onSaved={handleSaved}
      />
    </Card>
  )
}
