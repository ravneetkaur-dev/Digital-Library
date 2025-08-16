import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { 
  FaBook, 
  FaFacebookF, 
  FaTwitter, 
  FaLinkedinIn, 
  FaInstagram,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone
} from 'react-icons/fa';
import './Footer.css';

export const Footer = () => {
  return (
    <footer className="footer-section">
      <Container>
        <Row className="g-4">
          <Col md={4}>
            <div className="footer-brand-container">
              <div className="footer-logo">
                <FaBook color="white" size={20} />
              </div>
              <div>
                <h5 className="footer-brand-title">MAIMT</h5>
                <small className="footer-brand-subtitle">Digital Library</small>
              </div>
            </div>
            <p className="footer-description">
              Empowering academic excellence through innovative digital resources and cutting-edge technology.
            </p>
            <div className="footer-social-icons">
              <FaFacebookF className="footer-social-icon" size={20} />
              <FaTwitter className="footer-social-icon" size={20} />
              <FaLinkedinIn className="footer-social-icon" size={20} />
              <FaInstagram className="footer-social-icon" size={20} />
            </div>
          </Col>
          
          <Col md={2}>
            <h6 className="footer-section-title">Quick Links</h6>
            <div className="footer-links">
              <Link to="/" className="footer-link">Home</Link>
              <Link to="/resources" className="footer-link">Resources</Link>
              <Link to="/departments" className="footer-link">Departments</Link>
              <Link to="/research" className="footer-link">Research</Link>
            </div>
          </Col>
          
          <Col md={3}>
            <h6 className="footer-section-title">Departments</h6>
            <div className="footer-links">
              <Link to="/computer-applications" className="footer-link">
                Computer Applications
              </Link>
              <Link to="/business-management" className="footer-link">
                Business Management
              </Link>
              {/* <Link to="/engineering" className="footer-link">
                Engineering
              </Link>
              <Link to="/research" className="footer-link">
                Research Center
              </Link> */}
            </div>
          </Col>
          
          <Col md={3}>
            <h6 className="footer-section-title">Contact Info</h6>
            <div>
              <div className="footer-contact-item">
                <FaMapMarkerAlt className="footer-contact-icon" size={16} />
                <span className="footer-contact-text">Maharaja Agrasen Institute of Management and Technology,Jagadhri, Haryana, India</span>
              </div>
              <div className="footer-contact-item">
                <FaEnvelope className="footer-contact-icon" size={16} />
                <span className="footer-contact-text">library@maimt.edu</span>
              </div>
              <div className="footer-contact-item">
                <FaPhone className="footer-contact-icon" size={16} />
                <span className="footer-contact-text">+91 11 2345 6789</span>
              </div>
            </div>
          </Col>
        </Row>
        
        <hr className="footer-divider" />
        <div className="footer-copyright">
          © {new Date().getFullYear()} MAIMT Digital Library. All rights reserved. | Privacy Policy | Terms of Service
        </div>
      </Container>
    </footer>
  );
};

