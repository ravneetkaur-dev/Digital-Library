import React, { useState } from 'react';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import './FacultyProfile.css';

export const FacultyProfile = () => {
  const [profilePic, setProfilePic] = useState(null);

  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);
    }
  };

  return (
    <Container className="faculty-profile-container">
      <Card className="shadow-lg profile-card">
        <Row className="align-items-center">
          <Col md={4} className="text-center">
            <label htmlFor="profileInput">
              {profilePic ? (
                <img
                  src={profilePic}
                  alt="Profile"
                  className="profile-pic"
                />
              ) : (
                <FaUserCircle size={120} color="white" style={{ cursor: 'pointer' }} />
              )}
            </label>
            <input
              type="file"
              id="profileInput"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleProfileChange}
            />
          </Col>

          <Col md={8}>
            <h3 className="faculty-name">Welcome, Dr. Shalini </h3>
            <p className="faculty-role">Associate Professor <br /> Department of Computer Applications</p>
            <p className="faculty-email">Email: shalini.m@maimt.com</p>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};
