
import { Card, Row, Col, Button, Badge } from "react-bootstrap"
import { FaBook, FaPlus, FaFileAlt } from "react-icons/fa"

export const SubjectsOverview = ({ subjects, topics, onAddTopic }) => {
  if (!subjects || subjects.length === 0) {
    return (
      <Card className="subjects-overview-card">
        <Card.Body className="text-center py-5">
          <FaBook size={48} className="text-muted mb-3" />
          <h5 className="text-muted">No Subjects Assigned</h5>
          <p className="text-muted">Contact admin to assign subjects to your profile.</p>
        </Card.Body>
      </Card>
    )
  }

  return (
    <Card className="subjects-overview-card shadow-sm">
      <Card.Header>
        <h5 className="mb-0 d-flex align-items-center">
          <FaBook className="me-2" />
          My Subjects ({subjects.length})
        </h5>
      </Card.Header>
      <Card.Body>
        <Row className="g-4">
          {subjects.map((subject, index) => {
            const subjectTopics = topics[subject] || []
            return (
              <Col md={6} lg={4} key={index}>
                <Card className="subject-card h-100 border">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <h6 className="subject-title">{subject}</h6>
                      <Badge bg="info" className="topic-count">
                        {subjectTopics.length} topics
                      </Badge>
                    </div>

                    <div className="subject-stats mb-3">
                      <div className="d-flex align-items-center text-muted mb-1">
                        <FaFileAlt size={14} className="me-2" />
                        <small>{subjectTopics.length} topics uploaded</small>
                      </div>
                    </div>

                    <div className="subject-actions">
                      <Button variant="outline-primary" size="sm" className="w-100" onClick={() => onAddTopic(subject)}>
                        <FaPlus className="me-2" />
                        Add Topic
                      </Button>
                    </div>

                    {subjectTopics.length > 0 && (
                      <div className="recent-topics mt-3">
                        <small className="text-muted">Recent topics:</small>
                        <div className="mt-1">
                          {subjectTopics.slice(0, 3).map((topic, topicIndex) => (
                            <div key={topicIndex} className="topic-item">
                              <small className="text-truncate d-block">{topic.title}</small>
                            </div>
                          ))}
                          {subjectTopics.length > 3 && (
                            <small className="text-muted">+{subjectTopics.length - 3} more...</small>
                          )}
                        </div>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            )
          })}
        </Row>
      </Card.Body>
    </Card>
  )
}
