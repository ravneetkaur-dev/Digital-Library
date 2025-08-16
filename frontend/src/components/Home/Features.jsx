import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaRegNewspaper, FaDatabase, FaHeadphones } from 'react-icons/fa';
import { FiBookOpen, FiAward, FiUsers } from 'react-icons/fi';
import './Features.css';

export const FeaturesSection = () => {
  const features = [
    {
      icon: <FiBookOpen size={32} />,
      title: "24/7 Digital Access",
      description: "Access our comprehensive digital collection anytime, anywhere with seamless cloud integration.",
      bgClass: "bg-1"
    },
    {
      icon: <FaRegNewspaper size={32} />,
      title: "Latest Publications",
      description: "Stay current with cutting-edge research papers, journals, and industry publications.",
      bgClass: "bg-2"
    },
    {
      icon: <FiUsers size={32} />,
      title: "Expert Curation",
      description: "Resources meticulously selected by our distinguished faculty and subject matter experts.",
      bgClass: "bg-3"
    },
    {
      icon: <FaDatabase size={32} />,
      title: "Advanced Research Tools",
      description: "Powerful databases and analytical tools to accelerate your research and academic projects.",
      bgClass: "bg-4"
    },
    {
      icon: <FaHeadphones size={32} />,
      title: "Multimedia Learning",
      description: "Rich multimedia content including video lectures, podcasts, and interactive simulations.",
      bgClass: "bg-5"
    },
    {
      icon: <FiAward size={32} />,
      title: "Academic Excellence",
      description: "Curated resources aligned with industry standards and academic excellence frameworks.",
      bgClass: "bg-6"
    }
  ];

  return (
    <section className="features-section">
      <Container>
        <div className="text-center mb-5">
          <h2 className="display-4 fw-bold section-title">
            Why Choose Our Digital Library?
          </h2>
          <p className="lead section-description">
            Experience next-generation digital learning with cutting-edge features designed for academic success.
          </p>
        </div>
        
        <Row className="g-4">
          {features.map((feature, index) => (
            <Col md={6} lg={4} key={index}>
              <Card className={`h-100 shadow-lg feature-card ${feature.bgClass}`}>
                <Card.Body className="p-4 text-center">
                  <div className="feature-icon-container">
                    {feature.icon}
                  </div>
                  <h4 className="feature-title">{feature.title}</h4>
                  <p className="feature-description">{feature.description}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

