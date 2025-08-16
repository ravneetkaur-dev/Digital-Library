import React from 'react';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import { FaCode, FaDatabase } from 'react-icons/fa';
import { FiTrendingUp, FiUsers, FiBookOpen } from 'react-icons/fi';
import './References.css';

export const ReferencesSection = () => {
  const essentialBooks = [
    {
      title: "Data Structures & Algorithms",
      author: "Cormen, Leiserson, Rivest",
      category: "Computer Science",
      icon: <FaCode size={24} />,
      gradient: "from-blue-50 to-indigo-100",
      iconBg: "from-blue-500 to-indigo-600",
      badgeColor: "bg-blue-100 text-blue-700"
    },
    {
      title: "Database System Concepts",
      author: "Silberschatz, Galvin, Gagne",
      category: "Information Systems",
      icon: <FaDatabase size={24} />,
      gradient: "from-purple-50 to-pink-100",
      iconBg: "from-purple-500 to-pink-600",
      badgeColor: "bg-purple-100 text-purple-700"
    },
    {
      title: "Strategic Management",
      author: "Michael Porter",
      category: "Business Strategy",
      icon: <FiTrendingUp size={24} />,
      gradient: "from-emerald-50 to-teal-100",
      iconBg: "from-emerald-500 to-teal-600",
      badgeColor: "bg-emerald-100 text-emerald-700"
    },
    {
      title: "Marketing Management",
      author: "Philip Kotler",
      category: "Marketing",
      icon: <FiUsers size={24} />,
      gradient: "from-orange-50 to-amber-100",
      iconBg: "from-orange-500 to-amber-600",
      badgeColor: "bg-orange-100 text-orange-700"
    }
  ];

  return (
    <section className="ref-section">
      <Container>
        <div className="text-center mb-5">
          <h2 className="display-4 fw-bold ref-section-title">
            Essential Academic References
          </h2>
          <p className="lead ref-section-description">
            Core textbooks and references recommended by our distinguished faculty members.
          </p>
        </div>
        
        <Row className="g-4">
          {essentialBooks.map((book, index) => (
            <Col md={6} lg={3} key={index}>
              <Card className={`h-100 ref-card ref-card-${index + 1}`}>
                <Card.Body className="p-4 text-center ref-card-body">
                  <div className={`ref-icon-container ref-icon-${index + 1}`}>
                    {book.icon}
                  </div>
                  <h5 className="ref-title">{book.title}</h5>
                  <p className="ref-author">{book.author}</p>
                  <Badge className={`ref-category ref-badge-${index + 1}`}>
                    {book.category}
                  </Badge>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        
        <div className="text-center mt-5">
          <Button size="lg" className="ref-browse-btn">
            <FiBookOpen className="me-2" size={20} />
            Browse All References
          </Button>
        </div>
      </Container>
    </section>
  );
};

