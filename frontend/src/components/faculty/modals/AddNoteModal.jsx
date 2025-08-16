
import { useState } from "react"
import { Modal, Form, Button, Row, Col, Spinner } from "react-bootstrap"
import { FaVideo, FaLink } from "react-icons/fa"

export const AddNoteModal = ({ show, onHide, subjects, selectedSubject, onAddNote, loading }) => {
  const [noteForm, setNoteForm] = useState({
    title: "",
    description: "",
    semester: "",
    year: "",
    isPublic: true,
    files: [],
    videoLink: "",
    websiteLink: "",
  })

  const [currentSubject, setCurrentSubject] = useState(selectedSubject || "")

  const handleSubmit = async () => {
    if (!noteForm.title.trim() || !currentSubject) return

    try {
      await onAddNote({
        ...noteForm,
        subject: currentSubject,
      })
      resetForm()
      onHide()
    } catch (error) {
      console.error("Add note failed:", error)
    }
  }

  const resetForm = () => {
    setNoteForm({
      title: "",
      description: "",
      semester: "",
      year: "",
      isPublic: true,
      files: [],
      videoLink: "",
      websiteLink: "",
    })
    setCurrentSubject("")
  }

  const handleClose = () => {
    resetForm()
    onHide()
  }

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Note {currentSubject && `- ${currentSubject}`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Subject *</Form.Label>
                <Form.Select value={currentSubject} onChange={(e) => setCurrentSubject(e.target.value)} required>
                  <option value="">Select Subject</option>
                  {subjects.map((subject, index) => (
                    <option key={index} value={subject}>
                      {subject}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Title *</Form.Label>
                <Form.Control
                  type="text"
                  value={noteForm.title}
                  onChange={(e) => setNoteForm({ ...noteForm, title: e.target.value })}
                  placeholder="Enter note title"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Semester</Form.Label>
                <Form.Select
                  value={noteForm.semester}
                  onChange={(e) => setNoteForm({ ...noteForm, semester: e.target.value })}
                >
                  <option value="">Select Semester</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                    <option key={sem} value={sem}>
                      Semester {sem}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Academic Year</Form.Label>
                <Form.Control
                  type="text"
                  value={noteForm.year}
                  onChange={(e) => setNoteForm({ ...noteForm, year: e.target.value })}
                  placeholder="e.g., 2024-25"
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={noteForm.description}
              onChange={(e) => setNoteForm({ ...noteForm, description: e.target.value })}
              placeholder="Enter note description"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Upload Files</Form.Label>
            <Form.Control
              type="file"
              multiple
              onChange={(e) => setNoteForm({ ...noteForm, files: Array.from(e.target.files) })}
              accept=".pdf,.doc,.docx,.ppt,.pptx"
            />
            <Form.Text className="text-muted">Upload PDF, DOC, DOCX, PPT, PPTX files</Form.Text>
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  <FaVideo /> Video Link
                </Form.Label>
                <Form.Control
                  type="url"
                  value={noteForm.videoLink}
                  onChange={(e) => setNoteForm({ ...noteForm, videoLink: e.target.value })}
                  placeholder="https://youtube.com/watch?v=..."
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  <FaLink /> Website Link
                </Form.Label>
                <Form.Control
                  type="url"
                  value={noteForm.websiteLink}
                  onChange={(e) => setNoteForm({ ...noteForm, websiteLink: e.target.value })}
                  placeholder="https://example.com"
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Check
              type="switch"
              id="public-switch"
              label="Make this note public (visible to students)"
              checked={noteForm.isPublic}
              onChange={(e) => setNoteForm({ ...noteForm, isPublic: e.target.checked })}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={!noteForm.title.trim() || !currentSubject || loading}
        >
          {loading ? <Spinner size="sm" className="me-2" /> : null}
          Add Note
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
