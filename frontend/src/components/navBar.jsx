import { Nav, Navbar, Container, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { LoginModal } from "./loginModal";
import { useState } from "react";
import './navBar.css';

export const NavBar=()=>{
  const [showLogin, setShowLogin] = useState(false);

  const handleShow=()=> setShowLogin(true);
  const handleClose=()=> setShowLogin(false);
  return (
    <>
    <Navbar expand="lg" className="sticky-top nav shadow">
    <Container fluid className="d-flex justify-content-between align-items-center">
    <Navbar.Brand href="/" className="mx-2 brand">MAIMT</Navbar.Brand>

    <Navbar.Toggle aria-controls="navbar-nav" />

    <Navbar.Collapse id="navbar-nav" className="justify-content-center">
      <Nav className="nav-links d-flex justify-content-center">
        <Nav.Link as={Link} to="/">Home</Nav.Link>
        <Nav.Link as={Link} to="/about">About Us</Nav.Link>
        <Nav.Link as={Link} to="/paper">Paper</Nav.Link>
        <Nav.Link as={Link} to="/syllabus">Syllabus</Nav.Link>
        <Nav.Link as={Link} to="/rules">Rules & Regulations</Nav.Link>
        <Nav.Link as={Link} to="/journals">Journals</Nav.Link>
        <Nav.Link as={Link} to="/time-table">Time Table</Nav.Link>
        <Nav.Link as={Link} to="/econtent">E-Content</Nav.Link>
        <Nav.Link as={Link} to="/contact">Contact Us</Nav.Link>
      </Nav>
    </Navbar.Collapse>

    <Button
      onClick={handleShow}
      className="border-0 ms-lg-4 mt-3 mt-lg-0 hover:scale-105 login-btn"
      style={{backgroundColor:"#fdc800", color:"#002147"}}
    >
      Login
    </Button>
  </Container>

  <LoginModal show={showLogin} handleClose={handleClose} />
</Navbar>

    </>
  );
};
