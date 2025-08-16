import React from 'react';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import { FaCode, FaChevronRight } from 'react-icons/fa';
import { FiTrendingUp } from 'react-icons/fi';
import { NavBar } from '../Navbar/NavBar';
import './Departments.css';

export const Departments = () => {
  return (
    <section className="departments-section">
      <NavBar/>
      <Container>
        <div className="text-center mb-5">
          <h2 className="display-4 fw-bold section-title">
            Academic Departments
          </h2>
          <p className="lead section-description">
            Specialized resources tailored for each department's unique academic requirements and industry standards.
          </p>
        </div>
        
        <Row className="g-4">
          <Col md={6}>
            <Card className="h-100 shadow-lg department-card">
              <Card.Body className="p-5">
                <div className="d-flex align-items-start mb-4">
                  <div className="department-icon-container">
                    <FaCode size={32} />
                  </div>
                  <div className="ms-4">
                    <h3 className="h2 fw-bold department-title">
                      Computer Applications
                    </h3>
                    <p className="department-subtitle">
                      Advanced computing, programming, and technology resources
                    </p>
                  </div>
                </div>
                
                <p className="department-description">
                  Comprehensive collection covering programming languages, software engineering, data science, 
                  artificial intelligence, and emerging technologies in computer science.
                </p>
                
                <div className="mb-4">
                  <Badge className="department-badge cs">BCA</Badge>
                  {/* <Badge className="department-badge cs">BCA-AI</Badge>
                  <Badge className="department-badge cs">BCA-CTIS</Badge> */}
                  <Badge className="department-badge cs">MCA</Badge>
                </div>
                
                <Button variant="outline-primary" className="department-btn">
                  Explore Department
                  <FaChevronRight className="ms-2" size={14} />
                </Button>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={6}>
            <Card className="h-100 shadow-lg department-card">
              <Card.Body className="p-5">
                <div className="d-flex align-items-start mb-4">
                  <div className="department-icon-container business">
                    <FiTrendingUp size={32} />
                  </div>
                  <div className="ms-4">
                    <h3 className="h2 fw-bold department-title">
                      Business Management
                    </h3>
                    <p className="department-subtitle">
                      Strategic business and management excellence resources
                    </p>
                  </div>
                </div>
                
                <p className="department-description">
                  Extensive library of management theories, case studies, market analysis, strategic planning, 
                  and contemporary business practices from leading global institutions.
                </p>
                
                <div className="mb-4">
                  <Badge className="department-badge business">BBA</Badge>
                  <Badge className="department-badge business">MBA</Badge>
                </div>
                
                <Button variant="outline-success" className="department-btn">
                  Explore Department
                  <FaChevronRight className="ms-2" size={14} />
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

