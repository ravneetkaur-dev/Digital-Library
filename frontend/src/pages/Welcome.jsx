"use client"

import { useState, useEffect } from "react"
import { Container, Row, Col, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import "./Welcome.css"

export const WelcomePage = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const quotes = [
    {
      text: "The library is the temple of learning, and learning has gained the right to all places.",
      author: "Thomas Jefferson",
    },
    {
      text: "A university is just a group of buildings gathered around a library.",
      author: "Shelby Foote",
    },
    {
      text: "Libraries are the memory of mankind.",
      author: "Jean-Baptiste Cotton des Houssayes",
    },
    {
      text: "The only thing you absolutely have to know is the location of the library.",
      author: "Albert Einstein",
    },
    {
      text: "Libraries store the energy that fuels the imagination.",
      author: "Sidney Sheldon",
    },
  ]

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]

  return (
    <div className="welcome-page">
      {/* Geometric Background Pattern */}
      <div className="geometric-background">
        <div className="geometric-shape shape-1"></div>
        <div className="geometric-shape shape-2"></div>
        <div className="geometric-shape shape-3"></div>
        <div className="geometric-shape shape-4"></div>
      </div>

      {/* Subtle Grid Overlay */}
      <div className="grid-overlay"></div>

      <Container fluid className="welcome-container h-100">
        <Row className="h-100 align-items-center justify-content-center m-5">
          <Col xl={10} lg={11} className="text-center">
            {/* Header Section */}
            <div className={`header-section ${mounted ? "fade-in-up" : ""}`}>
              {/* <div className="institution-logo mb-4">
                <div className="logo-hexagon">
                  <div className="logo-inner">
                    <div className="book-stack">
                      <div className="book book-1"></div>
                      <div className="book book-2"></div>
                      <div className="book book-3"></div>
                    </div>
                  </div>
                </div>
              </div> */}

              <h1 className="main-title mb-3">
                <span className="title-line-1">MAIMT</span>
                <span className="title-line-2">Digital Library</span>
              </h1>

              <div className="institution-details">
                <h2 className="institution-name">Maharaja Agrasen Institute of Management and Technology</h2>
                <div className="divider-line"></div>
                <p className="tagline">Excellence in Academic Resources</p>
              </div>
            </div>

            {/* Quote Section */}
            <div className={`quote-section ${mounted ? "fade-in-up delay-1" : ""}`}>
              <div className="quote-container">
                <div className="quote-content">
                  <blockquote className="quote-text">"{randomQuote.text}"</blockquote>
                  <cite className="quote-author">— {randomQuote.author}</cite>
                </div>
              </div>
            </div>

            {/* Action Section */}
            <div className={`action-section ${mounted ? "fade-in-up delay-2" : ""}`}>
              <Link to="/home" className="text-decoration-none">
                <Button className="enter-btn">
                  <span className="btn-content">
                    <span className="btn-text">Access Library</span>
                    <span className="btn-icon">→</span>
                  </span>
                </Button>
              </Link>
              <p className="access-note">Comprehensive digital resources for academic excellence</p>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Corner Accents */}
      <div className="corner-accent corner-top-left"></div>
      <div className="corner-accent corner-bottom-right"></div>
    </div>
  )
}
