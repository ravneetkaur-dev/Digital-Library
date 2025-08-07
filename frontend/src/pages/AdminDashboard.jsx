import { useState } from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Welcome } from '../components/adminDashboardComponents/Welcome';
import { AddFaculty } from '../components/adminDashboardComponents/AddFaculty';
import { ManageFaculty } from '../components/adminDashboardComponents/ManageFaculty';
import { ContentUpload } from '../components/adminDashboardComponents/ContentUpload';
import { Header } from '../components/Header/Header';

import { FaHome, FaUserPlus, FaChalkboardTeacher, FaUpload } from 'react-icons/fa';
import './AdminDashboard.css';

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('welcome');

  return (
    <>
      <Header />
      <Container fluid className="admin-dashboard">
        <Row>
          <Col md={2} className="sidebar p-3">
            <h4 className="sidebar-title mb-4">Admin Panel</h4>
            <Nav className="flex-column side-nav">
              <Nav.Link
                onClick={() => setActiveTab('welcome')}
                className={`sidebar-link ${activeTab === 'welcome' ? 'active' : ''}`}
              >
                <FaHome className="me-2" /> Home
              </Nav.Link>
              <Nav.Link
                onClick={() => setActiveTab('addFaculty')}
                className={`sidebar-link ${activeTab === 'addFaculty' ? 'active' : ''}`}
              >
                <FaUserPlus className="me-2" /> Add Faculty
              </Nav.Link>
              <Nav.Link
                onClick={() => setActiveTab('manageFaculty')}
                className={`sidebar-link ${activeTab === 'manageFaculty' ? 'active' : ''}`}
              >
                <FaChalkboardTeacher className="me-2" /> Manage Faculty
              </Nav.Link>
              <Nav.Link
                onClick={() => setActiveTab('uploadContent')}
                className={`sidebar-link ${activeTab === 'uploadContent' ? 'active' : ''}`}
              >
                <FaUpload className="me-2" /> Upload Content
              </Nav.Link>
            </Nav>
          </Col>

          <Col md={10} className="p-4">
            {activeTab === 'welcome' && <Welcome />}
            {activeTab === 'addFaculty' && <AddFaculty />}
            {activeTab === 'manageFaculty' && <ManageFaculty />}
            {activeTab === 'uploadContent' && <ContentUpload />}
          </Col>
        </Row>
      </Container>
    </>
  );
};
