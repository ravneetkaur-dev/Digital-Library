
import { useState } from "react"
import { Modal, Form, Button, Row, Col, Alert, Spinner } from "react-bootstrap"
import { FaPlus, FaTrash, FaUpload } from "react-icons/fa"

export const AddTopicModal = ({ show, onHide, subject, onAddTopic, loading }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    semester: "",
    year: "",
    files: [],
    extraLinks: [],
  })
  const [error, setError] = useState("")

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    setFormData((prev) => ({
      ...prev,
      files: files,
    }))
  }

  const addExtraLink = () => {
    setFormData((prev) => ({
      ...prev,
      extraLinks: [...prev.extraLinks, { url: "", type: "reference" }],
    }))
  }

  const removeExtraLink = (index) => {
    setFormData((prev) => ({
      ...prev,
      extraLinks: prev.extraLinks.filter((_, i) => i !== index),
    }))
  }

  const updateExtraLink = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      extraLinks: prev.extraLinks.map((link, i) => (i === index ? { ...link, [field]: value } : link)),
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!formData.title.trim()) {
      setError("Topic title is required.")
      return
    }

    try {
      await onAddTopic(subject, formData)
      // Reset form
      setFormData({
        title: "",
        description: "",
        semester: "",
        year: "",
        files: [],
        extraLinks: [],
      })
      onHide()
    } catch (err) {
      setError("Failed to add topic. Please try again.")
    }
  }

  const handleClose = () => {
    setFormData({
      title: "",
      description: "",
      semester: "",
      year: "",
      files: [],
      extraLinks: [],
    })
    setError("")
    onHide()
  }

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Topic to {subject}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {error && (
            <Alert variant="danger" dismissible onClose={() => setError("")}>
              {error}
            </Alert>
          )}

          <Row>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label>
                  Topic Title <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter topic title"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Semester</Form.Label>
                <Form.Select name="semester" value={formData.semester} onChange={handleInputChange}>
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
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
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
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter topic description"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Upload Files</Form.Label>
            <Form.Control type="file" multiple onChange={handleFileChange} accept=".pdf,.doc,.docx,.ppt,.pptx" />
            <Form.Text className="text-muted">
              You can upload multiple files (PDF, DOC, DOCX, PPT, PPTX). Max 5 files.
            </Form.Text>
            {formData.files.length > 0 && (
              <div className="mt-2">
                <small className="text-muted">Selected files:</small>
                <ul className="list-unstyled mt-1">
                  {Array.from(formData.files).map((file, index) => (
                    <li key={index} className="text-sm">
                      • {file.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Form.Group>

          <div className="mb-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <Form.Label className="mb-0">Additional Links</Form.Label>
              <Button variant="outline-primary" size="sm" onClick={addExtraLink}>
                <FaPlus className="me-1" />
                Add Link
              </Button>
            </div>

            {formData.extraLinks.map((link, index) => (
              <Row key={index} className="mb-2">
                <Col md={6}>
                  <Form.Control
                    type="url"
                    placeholder="Enter URL"
                    value={link.url}
                    onChange={(e) => updateExtraLink(index, "url", e.target.value)}
                  />
                </Col>
                <Col md={4}>
                  <Form.Select value={link.type} onChange={(e) => updateExtraLink(index, "type", e.target.value)}>
                    <option value="reference">Reference</option>
                    <option value="video">Video</option>
                    <option value="article">Article</option>
                    <option value="tutorial">Tutorial</option>
                    <option value="other">Other</option>
                  </Form.Select>
                </Col>
                <Col md={2}>
                  <Button variant="outline-danger" size="sm" onClick={() => removeExtraLink(index)}>
                    <FaTrash />
                  </Button>
                </Col>
              </Row>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? (
              <>
                <Spinner size="sm" animation="border" className="me-2" />
                Adding Topic...
              </>
            ) : (
              <>
                <FaUpload className="me-2" />
                Add Topic
              </>
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}
