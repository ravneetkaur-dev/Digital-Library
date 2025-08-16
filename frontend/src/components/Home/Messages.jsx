import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import './Messages.css';

export const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "BCA Final Year",
      image: "https://randomuser.me/api/portraits/women/32.jpg",
      quote: "The digital library's programming resources and coding tutorials have been instrumental in my academic success. The 24/7 access has been a game-changer.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "MBA Student",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      quote: "The business case studies and management resources are exceptional. The search functionality makes finding relevant materials incredibly efficient.",
      rating: 5
    },
    {
      name: "Dr. Priya Sharma",
      role: "Associate Professor",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      quote: "As faculty, I appreciate the comprehensive collection and the ability to create custom reading lists for my students. Truly professional platform.",
      rating: 5
    }
  ];

  return (
    <section className="testimonials-section">
      <Container>
        <div className="text-center mb-5">
          <h2 className="display-4 fw-bold section-title">
            What Our Community Says
          </h2>
          <p className="lead section-description">
            Hear from students and faculty who have transformed their academic journey with our digital library.
          </p>
        </div>
        
        <Row className="g-4">
          {testimonials.map((testimonial, index) => (
            <Col md={4} key={index}>
              <Card className="h-100 testimonial-card">
                <Card.Body className="p-4">
                  <div className="testimonial-rating">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="text-warning" size={16} />
                    ))}
                  </div>
                  <p className="testimonial-quote">
                    "{testimonial.quote}"
                  </p>
                  <div className="d-flex align-items-center">
                    <img 
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="testimonial-avatar"
                    />
                    <div>
                      <h6 className="testimonial-name">{testimonial.name}</h6>
                      <small className="testimonial-role">{testimonial.role}</small>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

