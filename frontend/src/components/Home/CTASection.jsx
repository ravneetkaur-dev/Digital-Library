import React from 'react';
import { Container, Button } from 'react-bootstrap';
import './cta.css';

export const CTASection = () => {
  return (
    <section className="cta-section">
      <Container className="text-center">
        <h2 className="display-4 fw-bold cta-title">
          Ready to Transform Your Learning Experience?
        </h2>
        <p className="lead cta-description">
          Join thousands of students and researchers who are already benefiting from our comprehensive digital library platform.
        </p>
        <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
          <Button size="lg" variant="light" className="cta-btn-primary">
            Get Started Today
          </Button>
          {/* <Button size="lg" variant="outline-light" className="cta-btn-secondary">
            Schedule Demo
          </Button> */}
        </div>
      </Container>
    </section>
  );
};

