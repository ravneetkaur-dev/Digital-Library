
import { Card, Row, Col, Button } from "react-bootstrap"
import { FaUser, FaBook, FaCamera } from "react-icons/fa"
import { SubjectCard } from "./SubjectCard"

export const DashboardView = ({ facultyData, subjects, getSubjectNotes, onAddNote, onViewSubjects, onUpdateImage }) => {
  return (
    <div className="fade-in">
      {/* Welcome Section */}
      <div className="welcome-section">
        <h2>Welcome back, {facultyData?.name}!</h2>
        <p>Manage your subjects, add notes, and track your teaching resources.</p>
      </div>

      {/* Faculty Profile Card */}
      <Card className="faculty-profile-card">
        <Card.Body>
          <Row>
            <Col md={3} className="text-center">
              <div className="profile-image-container" onClick={onUpdateImage} style={{ cursor: "pointer" }}>
                {facultyData?.profileImage ? (
                  <img
                    src={facultyData.profileImage || "/placeholder.svg"}
                    alt={facultyData?.name}
                    className="profile-image"
                  />
                ) : (
                  <div
                    className="default-user-icon d-flex align-items-center justify-content-center rounded-circle"
                    style={{
                      width: "120px",
                      height: "120px",
                      background: "#f0f0f0",
                      border: "2px dashed #ccc",
                      margin: "0 auto",
                    }}
                  >
                    <FaUser size={50} color="#888" />
                  </div>
                )}
                <Button className="profile-image-upload">
                  <FaCamera size={14} />
                </Button>
              </div>
            </Col>

            <Col md={9}>
              <div className="profile-details">
                <h3>{facultyData?.name}</h3>
                <div className="profile-info">
                  <div className="info-item">
                    <FaUser />
                    <strong>Email:</strong> {facultyData?.email}
                  </div>
                  <div className="info-item">
                    <FaUser />
                    <strong>Designation:</strong> {facultyData?.designation || "Faculty"}
                  </div>
                  <div className="info-item">
                    <FaBook />
                    <strong>Department:</strong> {facultyData?.department || "General"}
                  </div>
                  <div className="info-item">
                    <FaBook />
                    <strong>Role:</strong> {facultyData?.role}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Subjects Section */}
      <div className="subjects-container">
        <h3>
          <FaBook /> My Subjects ({subjects.length})
        </h3>
        {subjects.length > 0 ? (
          <div className="subjects-grid">
            {subjects.map((subject, index) => (
              <SubjectCard
                key={index}
                subject={subject}
                notes={getSubjectNotes(subject)}
                onAddNote={onAddNote}
                onViewAll={onViewSubjects}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <FaBook />
            <h4>No Subjects Assigned</h4>
            <p>Contact your administrator to assign subjects to your profile.</p>
          </div>
        )}
      </div>
    </div>
  )
}
