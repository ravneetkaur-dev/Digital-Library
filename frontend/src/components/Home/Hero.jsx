import React from 'react';
import { Container, Row, Col, Badge, Button } from 'react-bootstrap';
import { FaChevronRight } from 'react-icons/fa';
import './Hero.css';
import { Link } from 'react-router-dom';

export const HeroSection = () => {
  return (
    <section className="hero-section">
      <Container>
        <Row className="align-items-center g-5">
          <Col lg={6}>
            <div className="mb-4">
              {/* <Badge className="hero-badge">
                🎓 Academic Excellence Platform
              </Badge> */}
              
              <h1 className="display-3 fw-bold hero-title">
                Unlock Your{' '}
                <span className="hero-gradient-text">Academic</span>
                <br />
                Potential
              </h1>
              
              <p className="lead hero-description">
                Access world-class digital resources at Maharaja Agrasen Institute of Management and Technology. 
                Your gateway to academic excellence and research innovation.
              </p>
            </div>
            
            <div className="d-flex flex-column flex-sm-row gap-3 mb-5">
              <Link as={Link} to="/resources"><Button size="lg" className="hero-btn-primary">
                Explore Resources
                <FaChevronRight className="ms-2" size={16} />
              </Button></Link>
              {/* <Button variant="outline-primary" size="lg" className="hero-btn-secondary">
                Take Virtual Tour
              </Button> */}
            </div>
            
            <Row className="text-center pt-4">
              <Col xs={4}>
                <div className="hero-stats-number">50K+</div>
                <div className="hero-stats-label">Resources</div>
              </Col>
              <Col xs={4}>
                <div className="hero-stats-number">1.2K+</div>
                <div className="hero-stats-label">Journals</div>
              </Col>
              <Col xs={4}>
                <div className="hero-stats-number">24/7</div>
                <div className="hero-stats-label">Access</div>
              </Col>
            </Row>
          </Col>
          
          <Col lg={6}>
            <div className="hero-image-container">
              <img 
                src="/images/lib_st.avif"
                alt="MAIMT Digital Library"
                className="img-fluid rounded-3 shadow-lg hero-image"
              />
              <div className="hero-image-bg"></div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

