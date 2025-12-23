"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Container, Navbar, Nav, Button } from "react-bootstrap"
import { FaBook, FaBars } from "react-icons/fa"
import { LoginModal } from "../Login/LoginModal"
import "./NavBar.css"

export const NavBar = () => {
  const [showLogin, setShowLogin] = useState(false)

  const handleClose = () => setShowLogin(false)

  const handleForgotPassword = () => {
    setShowLogin(false)
    // Navigate to your forgot password route or open a reset modal
    console.log("Navigate to forgot-password")
  }

  return (
    <>
      <Navbar bg="white" expand="lg" sticky="top" className="shadow-sm custom-navbar">
        <Container>
          <Navbar.Brand as={Link} to="/home" className="navbar-brand-container">
            <div className="navbar-logo">
              <FaBook color="white" size={20} />
            </div>
            <div>
              <div className="navbar-brand-text">MAIMT</div>
              <div className="navbar-brand-subtitle">Digital Library</div>
            </div>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <FaBars />
          </Navbar.Toggle>

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center">
              <Nav.Link as={Link} to="/home" className="navbar-nav-link">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/resources" className="navbar-nav-link">
                Resources
              </Nav.Link>
              <Nav.Link as={Link} to="/departments/computer-applications" className="navbar-nav-link">
                Departments
              </Nav.Link>
              <Nav.Link as={Link} to="/about" className="navbar-nav-link">
                About
              </Nav.Link>
              <Nav.Link as={Link} to="/contact" className="navbar-nav-link">
                Contact
              </Nav.Link>

              <Button
                className="navbar-signin-btn"
                variant="outline-primary"
                onClick={(e) => {
                  e.preventDefault()
                  setShowLogin(true)
                }}
              >
                Login
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <LoginModal
        show={showLogin}
        initialRole="faculty"
        onClose={handleClose}
        onForgotPassword={handleForgotPassword}
      />
    </>
  )
}
