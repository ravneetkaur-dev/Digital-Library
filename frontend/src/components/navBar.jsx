import { Nav, Navbar, Container, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { LoginModal } from "./loginModal";
import { useState } from "react";
import './navBar.css';

export const NavBar = () => {
  const [showLogin, setShowLogin] = useState(false);

  const handleShow = () => setShowLogin(true);
  const handleClose = () => setShowLogin(false);

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
              <Nav.Link as={Link} to="/journals">Journals</Nav.Link>
              <Nav.Link as={Link} to="/time-table">Time Table</Nav.Link>
              <Nav.Link as={Link} to="/econtent">E-Content</Nav.Link>
              <Nav.Link as={Link} to="/contact">Contact Us</Nav.Link>

              <Button
                onClick={handleShow}
                className="border-0 mt-3 d-lg-none"
                style={{ backgroundColor: "#fdc800", color: "#002147" }}
              >
                Login
              </Button>
            </Nav>
          </Navbar.Collapse>

          <div className="d-none d-lg-block">
            <Button
              onClick={handleShow}
              className="border-0 ms-3"
              style={{ backgroundColor: "#fdc800", color: "#002147" }}
            >
              Login
            </Button>
          </div>
        </Container>
      </Navbar>

      <LoginModal show={showLogin} handleClose={handleClose} />
    </>
  );
};
