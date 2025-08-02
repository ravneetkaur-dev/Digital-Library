import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import './SubjectScroller.css';

export const SubjectScroller = ({ onSelectSubject }) => {
  const [subjects, setSubjects] = useState(["HTML", "DSA", "OS"]);
  const [showModal, setShowModal] = useState(false);
  const [newSubject, setNewSubject] = useState("");

  const handleAddSubject = () => {
    if (newSubject.trim()) {
      setSubjects([...subjects, newSubject.trim()]);
      setNewSubject("");
      setShowModal(false);
    }
  };

  return (
    <div className="subject-scroller shadow-sm">
      <h5 className="section-title">Subjects</h5>
      <div className="scroll-container p-2">
        {subjects.map((sub, idx) => (
          <div
            className="custom-subject-card"
            key={idx}
            onClick={() => onSelectSubject(sub)}
          >
            <div className="subject-header">{sub}</div>
          </div>
        ))}

        <div className="custom-subject-card add-card" onClick={() => setShowModal(true)}>
          <div className="add-icon">+</div>
          <div className="subject-name">Add Subject</div>
        </div>
      </div>

      {/* Modal for adding subject */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Body className="topic-modal-body">
          <h4 className="modal-title-text mb-3">Add Subject</h4>
          <Form.Control
            type="text"
            placeholder="Enter subject name"
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
            className="modal-input"
          />
          <div className="modal-buttons mt-3 d-flex justify-content-end gap-2">
            <Button onClick={() => setShowModal(false)} className="modal-close">
              Cancel
            </Button>
            <Button onClick={handleAddSubject} className="modal-save">
              Add
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
