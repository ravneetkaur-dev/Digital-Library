import { useState } from "react";
import { Accordion, Button, Form, Modal } from "react-bootstrap";
import "./SubjectDetails.css";

export const SubjectDetails = ({ subject }) => {
  const [topics, setTopics] = useState(["Introduction", "Advanced Topics"]);
  const [showTopicModal, setShowTopicModal] = useState(false);
  const [newTopic, setNewTopic] = useState("");

  const handleAddTopic = () => {
    if (newTopic.trim() !== "") {
      setTopics([...topics, newTopic.trim()]);
      setNewTopic("");
      setShowTopicModal(false);
    }
  };

  return (
    <div className="subject-details mt-4">
      <h4 className="text-white">{subject}</h4>
      <Button size="sm" variant="warning" onClick={() => setShowTopicModal(true)}>
        + Add Topic
      </Button>

      <Accordion className="mt-3">
        {topics.map((topic, idx) => (
          <Accordion.Item eventKey={idx.toString()} key={idx}>
            <Accordion.Header>{topic}</Accordion.Header>
            <Accordion.Body className="bg-dark text-white">
              <Form.Group className="mb-2">
                <Form.Label className="text-white">Upload Notes</Form.Label>
                <Form.Control type="file" className="bg-dark text-white border-secondary" />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label className="text-white">YouTube Video Link</Form.Label>
                <Form.Control
                  type="url"
                  placeholder="Paste YouTube URL"
                  className="bg-dark text-white border-secondary"
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label className="text-white">Website Link</Form.Label>
                <Form.Control
                  type="url"
                  placeholder="Paste Website URL"
                  className="bg-dark text-white border-secondary"
                />
              </Form.Group>
              <Button variant="outline-light" size="sm">
                Save
              </Button>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>

      {/* Modal for adding topic */}
      <Modal show={showTopicModal} onHide={() => setShowTopicModal(false)} centered>
        <Modal.Body className="topic-modal-body">
          <h4 className="modal-title-text mb-3">Add New Topic</h4>
          <Form.Group className="mb-3">
            <Form.Label className="modal-label">Topic Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter topic name"
              value={newTopic}
              onChange={(e) => setNewTopic(e.target.value)}
              className="modal-input"
            />
          </Form.Group>
          <div className="modal-buttons">
            <Button variant="secondary" onClick={() => setShowTopicModal(false)} className="modal-close">
              Cancel
            </Button>
            <Button onClick={handleAddTopic} className="modal-save">
              Add Topic
            </Button>
          </div>
        </Modal.Body>
      </Modal>

    </div>
  );
};
