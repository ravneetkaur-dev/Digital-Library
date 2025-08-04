import { useState } from "react";
import { Container, Card, Row, Col, Form, Button } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import "./FacultyProfile.css";

export const FullFacultyProfile = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);
    }
  };

  const handlePasswordChange = () => {
    alert("Password update functionality coming soon!");
  };

  return (
    <Container className="faculty-profile-container">
      <Card className="shadow-lg profile-card p-4">
        <Row>
          <Col md={4} className="text-center mb-3">
            <label htmlFor="profileInput">
              {profilePic ? (
                <img
                  src={profilePic}
                  alt="Profile"
                  className="profile-pic"
                />
              ) : (
                <FaUserCircle size={120} color="white" style={{ cursor: "pointer" }} />
              )}
            </label>
            <input
              type="file"
              id="profileInput"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleProfileChange}
            />
          </Col>

          <Col md={8}>
            <h3 style={{color:"gold"}}>Dr. Shalini</h3>
            <p><strong>Email:</strong> shalini.m@maimt.com <br />
            <strong>Department:</strong> Computer Applications <br />
            <strong>Designation:</strong> Associate Professor</p>
          </Col>
        </Row>

        <hr />

        <h5 className="mt-3">Change Password</h5>
        <Form onSubmit={(e) => { e.preventDefault(); handlePasswordChange(); }}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="oldPassword">
                <Form.Label>Old Password</Form.Label>
                <Form.Control
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="newPassword">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Button type="submit" className="border-0" style={{backgroundColor:"#fdc800", color:"#011a3c"}}>Update Password</Button>
        </Form>
      </Card>
    </Container>
  );
};
