
import { useState } from 'react';
import { Container, Row, Col, Button, Nav, Navbar, Dropdown, Badge } from 'react-bootstrap';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import './AdminDashboard.css';
import { FacultyManagement } from '../components/adminDashboardComponents/FacultyManagement';
import { FileManagement } from '../components/adminDashboardComponents/FileManagement';
import { NotificationsPanel } from '../components/adminDashboardComponents/NotificationPanel';
import { Header } from '../components/Header';

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('faculty');
  const [notifications, setNotifications] = useState([
    
  ]);

  return (
    <>
    <Header/>
    <Container fluid className="admin-dashboard text-center">
      <Row>
        <Col md={2} className="sidebar d-none d-md-block text-start">
          <h4 className="mb-4">Admin Panel</h4>
          <Nav className="flex-column text-start">
            <Nav.Link onClick={() => setActiveTab('faculty')}>Manage Faculty</Nav.Link>
            <Nav.Link onClick={() => setActiveTab('files')}>Manage Files</Nav.Link>
          </Nav>
        </Col>

        <Col md={10} className="p-0">
          <Navbar bg="light" className="justify-content-between px-3 shadow-sm">
            <Navbar.Brand>Admin Dashboard</Navbar.Brand>
            <div className="d-flex align-items-center">
              <Dropdown align="end">
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  <FaBell size={20} />
                  {notifications.length > 0 && (
                    <Badge bg="danger" pill>
                      {notifications.length}
                    </Badge>
                  )}
                </Dropdown.Toggle>

                <Dropdown.Menu className="notifications-dropdown">
                  {notifications.length === 0 ? (
                    <Dropdown.Item>No new notifications</Dropdown.Item>
                  ) : (
                    notifications.map((n) => (
                      <Dropdown.Item key={n.id}>
                        <NotificationsPanel notification={n} />
                      </Dropdown.Item>
                    ))
                  )}
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown align="end" className="ms-3">
                <Dropdown.Toggle variant="light" id="admin-profile-dropdown" className="border-0 bg-transparent">
                    <FaUserCircle size={24} />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Header>Admin Profile</Dropdown.Header>
                    <Dropdown.Item>Name: Admin</Dropdown.Item>
                    <Dropdown.Item>Email: admin@example.com</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={() => alert("Logging out...")}>Logout</Dropdown.Item>
                </Dropdown.Menu>
                </Dropdown>

            </div>
          </Navbar>

          <div className="p-4">
            {activeTab==='faculty'&&<FacultyManagement />}
            {activeTab==='files' && <FileManagement />}
          </div>
        </Col>
      </Row>
    </Container>
    </>
  );
};
