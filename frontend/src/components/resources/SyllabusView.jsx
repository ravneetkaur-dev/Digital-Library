"use client"
import { Row, Col, Card, Button } from "react-bootstrap"
import { FaArrowLeft, FaDownload } from "react-icons/fa"
import LoadingSpinner from "./LoadingSpinner"
import ErrorAlert from "./ErrorAlert"
import { handleDownload } from "../../utils/resourcesHelpers"

const SyllabusView = ({ selectedSubject, syllabusData = [], loadingSyllabus, error, onBack, onErrorClose }) => {
  return (
    <div className="res-slide-in">
      <Button className="res-back-button mb-4" onClick={() => onBack("resources")}>
        <FaArrowLeft className="me-2" />
        Back to Resources
      </Button>

      <ErrorAlert error={error} onClose={onErrorClose} />
      <h3 className="res-section-title">Syllabus - {selectedSubject?.name || "N/A"}</h3>

      {loadingSyllabus ? (
        <LoadingSpinner text="Loading syllabus..." />
      ) : (
        <div className="res-syllabus-container">
          {syllabusData.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-muted">No syllabus available for this subject.</p>
            </div>
          ) : (
            syllabusData.map((syllabus) => (
              <Card key={syllabus._id.toString()} className="res-syllabus-unit-card mb-4">
                <Card.Header className="res-syllabus-unit-header">
                  <Row className="align-items-center">
                    <Col>
                      <h5 className="res-unit-title">{syllabus.title || "Untitled"}</h5>
                      <p className="mb-0">{syllabus.description || "No description"}</p>
                    </Col>
                    <Col xs="auto">
                      <Button
                        className="res-syllabus-download-btn"
                        onClick={() => handleDownload(syllabus.fileUrl, syllabus.title)}
                      >
                        <FaDownload className="me-2" />
                        Download
                      </Button>
                    </Col>
                  </Row>
                </Card.Header>
                <Card.Body>
                  <div className="res-syllabus-details">
                    <div className="res-assessment-item">
                      <strong>Subject:</strong> {syllabus.subject?.name || "N/A"}
                    </div>
                    <div className="res-assessment-item">
                      <strong>Semester:</strong> {syllabus.semester?.name || syllabus.semester?.number || "N/A"}
                    </div>
                    <div className="res-assessment-item">
                      <strong>Course:</strong> {syllabus.Course?.name || "N/A"}
                    </div>
                    <div className="res-assessment-item">
                      <strong>Year:</strong> {syllabus.year || "N/A"}
                    </div>
                    <div className="res-assessment-item">
                      <strong>Department:</strong> {syllabus.department?.name || "N/A"}
                    </div>
                  </div>
                </Card.Body>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default SyllabusView
