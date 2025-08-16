
import { Card, Row, Col, Badge, Button } from "react-bootstrap"
import { FaUser, FaBook, FaCamera, FaEdit } from "react-icons/fa"

export const ProfileView = ({ facultyData, subjects, onUpdateImage, onChangePassword }) => {
  return (
    <div className="fade-in">
      <Card className="faculty-profile-card">
        <Card.Body>
          <h3 className="text-primary-custom mb-4">Faculty Profile</h3>

          <Row>
            <Col md={4} className="text-center">
              <div className="profile-image-container">
                {facultyData?.profileImage ? (
                  <img
                    src={facultyData.profileImage || "/placeholder.svg"}
                    alt={facultyData?.name}
                    className="profile-image"
                    style={{ width: "150px", height: "150px" }}
                  />
                ) : (
                  <div
                    className="default-user-icon d-flex align-items-center justify-content-center rounded-circle"
                    style={{
                      width: "150px",
                      height: "150px",
                      background: "#f0f0f0",
                      border: "2px dashed #ccc",
                      margin: "0 auto",
                    }}
                  >
                    <FaUser size={60} color="#888" />
                  </div>
                )}
                <Button className="profile-image-upload" onClick={onUpdateImage}>
                  <FaCamera size={16} />
                </Button>
              </div>
            </Col>
            <Col md={8}>
              <div className="profile-details">
                <div className="profile-info">
                  <div className="info-item">
                    <FaUser />
                    <strong>Name:</strong> {facultyData?.name}
                  </div>
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
                  <div className="info-item">
                    <FaBook />
                    <strong>Subjects:</strong>
                    <div className="mt-2">
                      {subjects.map((subject, index) => (
                        <Badge key={index} className="badge-primary me-1 mb-1">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <Button variant="warning" onClick={onChangePassword}>
                    <FaEdit /> Change Password
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  )
}
