import { Nav, Navbar, Container, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import './navBar.css';

export const NavBar = () => {
  return (
    <Navbar expand="lg" className="sticky-top nav shadow">
      <Container fluid className="justify-content-between">
        <Navbar.Brand href="/" className="mx-2 brand">MAIMT</Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />

        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
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
          <Button className="border-0 ms-lg-4 mt-3 mt-lg-0 hover:scale-105" style={{ backgroundColor: "#fdc800", color: "#002147" }}>
            Login
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
