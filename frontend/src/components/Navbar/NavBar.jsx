import { Nav, Navbar, Container, Dropdown } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { LoginModal } from "../Login/LoginModal";
import { useState } from "react";
import './navBar.css';

export const NavBar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [selectedRole, setSelectedRole] = useState(""); 

  const handleLoginSelect = (role) => {
    setSelectedRole(role);
    setShowLogin(true);
  };

  const handleClose = () => {
    setShowLogin(false);
    setSelectedRole("");
  };

  return (
    <>
      <Navbar expand="lg" className="sticky-top nav shadow">
        <Container fluid className="px-4">
          <Navbar.Brand href="/" className="brand">MAIMT</Navbar.Brand>

          <Navbar.Toggle aria-controls="navbar-nav" />

          <Navbar.Collapse id="navbar-nav" className="justify-content-center">
            <Nav className="nav-links">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/about">About Us</Nav.Link>
              <Nav.Link as={Link} to="/paper">Paper</Nav.Link>
              <Nav.Link as={Link} to="/syllabus">Syllabus</Nav.Link>
              <Nav.Link as={Link} to="/rules">Rules & Regulations</Nav.Link>
              <Nav.Link as={Link} to="/econtent">E-Content</Nav.Link>
              <Nav.Link as={Link} to="/contact">Contact Us</Nav.Link>

              <Dropdown className="mt-3 d-lg-none" onSelect={handleLoginSelect}>
                <Dropdown.Toggle
                  style={{ backgroundColor: "#fdc800", color: "#002147", border: "none" }}
                >
                  Login
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="admin">Admin</Dropdown.Item>
                  <Dropdown.Item eventKey="faculty">Faculty</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>

          <Dropdown className="d-none d-lg-block" onSelect={handleLoginSelect}>
            <Dropdown.Toggle
              style={{ backgroundColor: "#fdc800", color: "#002147", border: "none" }}
            >
              Login
            </Dropdown.Toggle>
            <Dropdown.Menu className="login-option">
              <Dropdown.Item eventKey="admin">Admin</Dropdown.Item>
              <Dropdown.Item eventKey="faculty">Faculty</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </Navbar>

      <LoginModal show={showLogin} handleClose={handleClose} role={selectedRole} />
    </>
  );
};
