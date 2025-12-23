import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap"
import { Link } from "react-router-dom";
import { NavBar } from "../components/Navbar/NavBar";
import {
  FaUsers,
  FaAward,
  FaBullseye,
  FaEye,
  FaHeart,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaCalendarAlt,
  FaBookOpen,
  FaDatabase,
  FaClock,
  FaDownload,
  FaCode,
  FaServer,
  FaPalette,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaGraduationCap,
} from "react-icons/fa"
import "./about.css"

export const About = () => {
  const stats = [
    {
      icon: <FaBookOpen size={32} />,
      number: "50,000+",
      label: "Digital Resources",
      description: "Books, journals, and research papers",
    },
    {
      icon: <FaUsers size={32} />,
      number: "5,000+",
      label: "Active Users",
      description: "Students and faculty members",
    },
    {
      icon: <FaDatabase size={32} />,
      number: "1,200+",
      label: "Academic Journals",
      description: "Peer-reviewed publications",
    },
    {
      icon: <FaDownload size={32} />,
      number: "100K+",
      label: "Monthly Downloads",
      description: "Resource access and downloads",
    },
  ]

  const features = [
    {
      icon: <FaClock size={24} />,
      title: "24/7 Access",
      description: "Round-the-clock access to digital resources from anywhere in the world",
    },
    {
      icon: <FaDatabase size={24} />,
      title: "Advanced Search",
      description: "Powerful search capabilities across all digital collections",
    },
    {
      icon: <FaBookOpen size={24} />,
      title: "Multi-format Support",
      description: "PDF, eBooks, videos, and interactive learning materials",
    },
    {
      icon: <FaUsers size={24} />,
      title: "Collaborative Learning",
      description: "Share resources and collaborate with peers and faculty",
    },
  ]

  const timeline = [
    {
      year: "1999",
      title: "Institute Founded",
      description: "MAIMT was established with a vision to provide quality education in management and technology.",
    },
    {
      year: "2005",
      title: "Digital Initiative",
      description: "Launched our first digital library with basic online resources and catalog system.",
    },
    {
      year: "2015",
      title: "Major Expansion",
      description: "Expanded digital collection to include international journals and research databases.",
    },
    {
      year: "2020",
      title: "Cloud Migration",
      description: "Migrated entire library system to cloud infrastructure for better accessibility.",
    },
    {
      year: "2024",
      title: "Modern Platform",
      description: "Launched this comprehensive digital library platform with enhanced user experience.",
    },
  ]

  const developers = [
    {
      name: "Gayatri Kamboj",
      role: "Backend Developer - Database & Security Management",
      description:
        "Worked jointly on backend systems, handling database design, query optimization, and data security. Focused on implementing secure authentication, role-based access, and efficient data management.",
      skills: ["Node.js", "Express", "MongoDB", "Security", "Database Management", "Server Architecture"],
      pic: "/images/gayatri.jpg",
      colorClass: "backend-dev-1",
      git: "https://github.com/G822-g",
      linkedin: "https://www.linkedin.com/in/gayatri-kamboj/"
    },
    {
      name: "Diksha Sharma",
      role: "Backend Developer - Server & API Development",
      description:
        "Collaboratively developed and maintained backend architecture, including RESTful APIs, authentication, and server-side logic. Focused on ensuring scalability and reliability.",
      skills: ["Node.js", "Express", "Database Optimization", "Server Management", "API Design", "Routing"],
      pic: "/images/diksha.jpg",
      colorClass: "backend-dev-2",
      git: "https://github.com/Diksha-sharma12",
      linkedin: "https://www.linkedin.com/in/diksha-sharma03/"
    },
    {
      name: "Ravneet Kaur",
      role: "Frontend Developer & Integration Specialist",
      description:
        "Responsible for user interface design, user experience optimization, and seamless integration of frontend with backend services. Focused on creating intuitive and responsive designs that enhance the overall user experience.",
      skills: ["React", "JavaScript", "CSS", "UI/UX Design", "API Integration", "Responsive Design"],
      pic: "/images/ravneet.jpg",
      colorClass: "frontend-dev",
      git: "https://github.com/ravneetkaur-dev",
      linkedin: "https://www.linkedin.com/in/ravneet-kaur07/"
    },
    
  ]

  return (
    <div className="about-page">
      <NavBar/>
      {/* Hero Section */}
      <section className="about-hero">
        <Container>
          <Row className="align-items-center min-vh-100">
            <Col lg={6}>
              <Badge className="about-badge mb-4">
                <FaGraduationCap className="me-2" />
                About MAIMT Digital Library
              </Badge>
              <h1 className="about-hero-title">
                Empowering Education Through
                <span className="text-gradient"> Digital Innovation</span>
              </h1>
              <p className="about-hero-subtitle">
                At Maharaja Agrasen Institute of Management and Technology, we believe in the transformative power of
                knowledge. Our digital library serves as the cornerstone of academic excellence, providing unlimited
                access to world-class resources.
              </p>
              <div className="about-hero-buttons">
                <Button as={Link} to="/resources" className="btn-primary-gradient me-3">
                  <FaBookOpen className="me-2" />
                  Explore Resources
                </Button>
                <Button as={Link} to="/contact" variant="outline-primary">
                  <FaEnvelope className="me-2" />
                  Contact Us
                </Button>
              </div>
            </Col>
            <Col lg={6}>
              <div className="about-hero-image">
                <img
                  src="/images/maimt1.jpg"
                  alt="MAIMT Digital Library"
                  className="img-fluid rounded-4 shadow-lg about-image"
                />
                <div className="about-hero-badge">
                  <FaAward size={24} />
                  <div>
                    <div className="fw-bold">25+ Years</div>
                    <small>of Excellence</small>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Institute Overview */}
      <section className="about-overview">
        <Container>
          <Row className="g-5 align-items-center">
            <Col lg={6}>
              <h2 className="section-title">About MAIMT</h2>
              <p className="section-text">
                Maharaja Agrasen Institute of Management and Technology (MAIMT) stands as a beacon of educational
                excellence, established with the vision to nurture future leaders in management and technology. Since
                our inception in 1999, we have been committed to providing world-class education that bridges
                theoretical knowledge with practical application.
              </p>
              <p className="section-text">
                Our digital library represents our commitment to modern education, offering students and faculty
                unprecedented access to academic resources, research materials, and collaborative learning tools. We
                believe that knowledge should be accessible, searchable, and available whenever inspiration strikes.
              </p>

              <Row className="g-4 mt-4">
                <Col md={6}>
                  <div className="about-mission-card">
                    <div className="mission-icon mission-icon-blue">
                      <FaBullseye size={24} />
                    </div>
                    <div>
                      <h5 className="fw-bold mb-2">Our Mission</h5>
                      <p className="small text-muted mb-0">
                        To democratize access to quality education and research resources through innovative digital
                        solutions.
                      </p>
                    </div>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="about-mission-card">
                    <div className="mission-icon mission-icon-indigo">
                      <FaEye size={24} />
                    </div>
                    <div>
                      <h5 className="fw-bold mb-2">Our Vision</h5>
                      <p className="small text-muted mb-0">
                        To be the leading digital library platform that transforms how students and educators access
                        knowledge.
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col lg={6}>
              <div className="about-overview-image">
                <img
                  src="/images/maimt_pic1.jpg"
                  alt="MAIMT Campus"
                  className="img-fluid rounded-4 shadow-lg"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Statistics */}
      <section className="about-stats">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="section-title">Digital Library by Numbers</h2>
              <p className="section-subtitle">
                Our commitment to digital excellence is reflected in these impressive statistics
              </p>
            </Col>
          </Row>
          <Row className="g-4">
            {stats.map((stat, index) => (
              <Col key={index} md={6} lg={3}>
                <Card className="stat-card h-100 text-center border-0 shadow-lg">
                  <Card.Body className="p-4">
                    <div className="stat-icon mb-3">{stat.icon}</div>
                    <h3 className="stat-number">{stat.number}</h3>
                    <h5 className="stat-label">{stat.label}</h5>
                    <p className="stat-description">{stat.description}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Features */}
      <section className="about-features">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="section-title">Why Choose Our Digital Library?</h2>
              <p className="section-subtitle">
                Experience cutting-edge features designed to enhance your learning journey
              </p>
            </Col>
          </Row>
          <Row className="g-4">
            {features.map((feature, index) => (
              <Col key={index} md={6} lg={3}>
                <Card className="feature-card h-100 text-center border shadow-sm">
                  <Card.Body className="p-4">
                    <div className="feature-icon mb-3">{feature.icon}</div>
                    <h5 className="fw-bold mb-3">{feature.title}</h5>
                    <p className="text-muted small">{feature.description}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Timeline */}
      {/* <section className="about-timeline">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="section-title">Our Digital Journey</h2>
              <p className="section-subtitle">From humble beginnings to a comprehensive digital ecosystem</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="timeline-container">
                <div className="timeline-line"></div>
                {timeline.map((item, index) => (
                  <div key={index} className={`timeline-item ${index % 2 === 0 ? "timeline-left" : "timeline-right"}`}>
                    <div className="timeline-content">
                      <Card className="timeline-card shadow-lg border-0">
                        <Card.Body className="p-4">
                          <div className="timeline-year">{item.year}</div>
                          <h5 className="fw-bold mb-3">{item.title}</h5>
                          <p className="text-muted mb-0">{item.description}</p>
                        </Card.Body>
                      </Card>
                    </div>
                    <div className="timeline-dot">
                      <FaCalendarAlt size={16} />
                    </div>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section> */}

      {/* Development Team */}
      <section className="about-team">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="section-title">Meet Our Development Team</h2>
              <p className="section-subtitle">
                The talented individuals who brought this digital library platform to life
              </p>
            </Col>
          </Row>
          <Row className="g-4">
            {developers.map((dev, index) => (
              <Col key={index} lg={4}>
                <Card className={`team-card h-100 border-0 shadow-lg ${dev.colorClass}`}>
                  <div className="team-card-header"></div>
                  <Card.Body className="p-4 text-center">
                    <div className="dev-avatar">
                        <img 
                          src={dev.pic}
                          alt={dev.name}
                          className="rounded-circle"
                        />
                      </div>
                    <h4 className="fw-bold mb-2">{dev.name}</h4>
                    <p className="team-role mb-4">{dev.role}</p>
                    <p className="text-muted mb-4">{dev.description}</p>

                    <div className="team-skills mb-4">
                      <h6 className="fw-bold mb-3">Core Skills</h6>
                      <div className="d-flex flex-wrap gap-2 justify-content-center">
                        {dev.skills.map((skill, skillIndex) => (
                          <Badge key={skillIndex} bg="light" text="dark" className="skill-badge">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="team-social">
                      <Link to={dev.git}><Button variant="outline-secondary" size="sm" className="me-2">
                        <FaGithub />
                      </Button></Link>
                      <Link to={dev.linkedin}><Button variant="outline-secondary" size="sm" className="me-2">
                        <FaLinkedin />
                      </Button></Link>
                      
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <Row className="mt-5">
            <Col>
              <Card className="passion-card text-center border-0 shadow-lg">
                <Card.Body className="p-5">
                  <FaHeart size={48} className="text-danger mb-4" />
                  <h3 className="fw-bold mb-4">Built with Passion</h3>
                  <p className="lead text-muted">
                    This digital library platform was crafted with dedication, countless hours of coding, and a shared
                    vision to revolutionize digital education at MAIMT. Every feature was thoughtfully designed to
                    enhance the learning experience for our academic community.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Contact Information */}
      <section className="about-contact">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="section-title">Get in Touch</h2>
              <p className="section-subtitle">Have questions about our digital library? We'd love to hear from you.</p>
            </Col>
          </Row>
          <Row className="g-4">
            <Col md={4}>
              <Card className="contact-card h-100 text-center border-0 shadow-lg">
                <Card.Body className="p-4">
                  <div className="contact-icon contact-icon-blue mb-4">
                    <FaMapMarkerAlt size={32} />
                  </div>
                  <h5 className="fw-bold mb-3">Visit Us</h5>
                  <p className="text-muted">
                    MAIMT Campus
                    <br />
                    Sector 22, Rohini
                    <br />
                    New Delhi, India - 110085
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="contact-card h-100 text-center border-0 shadow-lg">
                <Card.Body className="p-4">
                  <div className="contact-icon contact-icon-green mb-4">
                    <FaPhone size={32} />
                  </div>
                  <h5 className="fw-bold mb-3">Call Us</h5>
                  <p className="text-muted">
                    Library Help Desk
                    <br />
                    +91 11 2345 6789
                    <br />
                    Mon-Fri: 9:00 AM - 6:00 PM
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="contact-card h-100 text-center border-0 shadow-lg">
                <Card.Body className="p-4">
                  <div className="contact-icon contact-icon-purple mb-4">
                    <FaEnvelope size={32} />
                  </div>
                  <h5 className="fw-bold mb-3">Email Us</h5>
                  <p className="text-muted">
                    library@maimt.edu
                    <br />
                    support@maimt.edu
                    <br />
                    Quick response guaranteed
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <Container>
          <Row className="text-center">
            <Col>
              <h2 className="cta-title">Ready to Explore Our Digital Library?</h2>
              <p className="cta-subtitle">
                Join thousands of students and researchers who are already benefiting from our comprehensive digital
                resources.
              </p>
              <div className="cta-buttons">
                <Button as={Link} to="/resources" size="lg" className="btn-primary-gradient me-3">
                  <FaBookOpen className="me-2" />
                  Browse Resources
                </Button>
                <Button as={Link} to="/contact" size="lg" variant="outline-light">
                  <FaEnvelope className="me-2" />
                  Contact Us
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  )
}

