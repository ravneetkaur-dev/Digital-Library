"use client"
import { Row, Col, Card, Button } from "react-bootstrap"
import { FaArrowLeft, FaFilePdf, FaBook, FaGraduationCap } from "react-icons/fa"
import ErrorAlert from "./ErrorAlert"

const ResourcesSelectionView = ({ selectedSubject, error, onBack, onSelectResource, onErrorClose }) => {
  return (
    <div className="res-slide-in">
      <Button className="res-back-button mb-4" onClick={() => onBack("subjects")}>
        <FaArrowLeft className="me-2" />
        Back to Subjects
      </Button>

      <ErrorAlert error={error} onClose={onErrorClose} />
      <h3 className="res-section-title">{selectedSubject.name} Resources</h3>

      <Row className="g-4">
        <Col md={4}>
          <Card className="res-resource-card res-resource-papers" onClick={() => onSelectResource("papers")}>
            <Card.Body className="text-center">
              <div className="res-resource-icon">
                <FaFilePdf size={48} />
              </div>
              <h4 className="res-resource-title">Question Papers</h4>
              <p className="res-resource-description">
                Previous year examination papers with solutions and marking schemes
              </p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="res-resource-card res-resource-books" onClick={() => onSelectResource("books")}>
            <Card.Body className="text-center">
              <div className="res-resource-icon">
                <FaBook size={48} />
              </div>
              <h4 className="res-resource-title">Reference Books</h4>
              <p className="res-resource-description">
                Recommended textbooks and reference materials for comprehensive study
              </p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="res-resource-card res-resource-syllabus" onClick={() => onSelectResource("syllabus")}>
            <Card.Body className="text-center">
              <div className="res-resource-icon">
                <FaGraduationCap size={48} />
              </div>
              <h4 className="res-resource-title">Syllabus</h4>
              <p className="res-resource-description">
                Complete curriculum outline with unit-wise topics and weightage
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default ResourcesSelectionView
