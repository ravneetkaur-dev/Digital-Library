
import { useState } from "react"
import { Modal, Form, Button, Spinner } from "react-bootstrap"

export const ProfileImageModal = ({ show, onHide, onUpload, loading }) => {
  const [imageFile, setImageFile] = useState(null)

  const handleSubmit = async () => {
    if (!imageFile) return

    try {
      await onUpload(imageFile)
      setImageFile(null)
      onHide()
    } catch (error) {
      console.error("Upload failed:", error)
    }
  }

  const handleClose = () => {
    setImageFile(null)
    onHide()
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Profile Image</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Select New Profile Image</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
        </Form.Group>
        {imageFile && (
          <div className="text-center mt-3">
            <img
              src={URL.createObjectURL(imageFile) || "/placeholder.svg"}
              alt="Preview"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
              className="rounded-circle"
            />
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={!imageFile || loading}>
          {loading ? <Spinner size="sm" className="me-2" /> : null}
          Update Image
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
