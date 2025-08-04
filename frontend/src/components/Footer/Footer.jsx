import { Container, Row, Col, Image } from "react-bootstrap";
import { BsTelephoneFill, BsEnvelopeFill } from "react-icons/bs";
import { FaInstagram, FaLinkedin, FaFacebook } from "react-icons/fa";
import './footer.css';

export const Footer = () => {
  return (
    <footer className="site-footer">
      <Container className="footer-container">
        <Row>
          <Col className="footer-top">
            <Image
              src="/images/book_feather.png"
              alt="book"
              className="footer-img"
            />
            <span className="fs-4">
              <em>"Tamaso ma jyotirgamaya"</em>
            </span>
          </Col>
        </Row>

        <hr className="footer-hr" />

        <Row className="footer-content">
          <Col xs={12} md={5} className="maimt-info text-center mb-4 mb-md-0">
            <Image
              src="/images/logo.png"
              alt="maimt-logo"
              className="maimt-logo mb-3"
            />
            <h4 style={{ color: "gold" }}>
              <b>Maharaja Agrasen Institute of Management and Technology</b>
            </h4>
            <p>
              MAIMT is an institution where ambition meets opportunity, and where management and technology converge to sculpt tomorrow’s leaders.
            </p>
          </Col>

          <Col xs={12} md={4} className="contact-info text-center mb-4 mb-md-0">
            <h4><b>Contact Us</b></h4>
            <hr className="footer-hr-sm" />
            <p>
              Maharaja Agrasen Institute of Management and Technology,
              Agrasen Chowk, Old Saharanpur Road,
              Near Sector-15, Jagadhri, Yamuna Nagar-135003
            </p>
            <p><BsTelephoneFill className="me-1" /> +91 9355455140</p>
            <p><BsEnvelopeFill className="me-1" /> director@maimt.com</p>
          </Col>

          <Col xs={12} md={3} className="social-info text-center">
            <h4><b>Social Links</b></h4>
            <hr className="footer-hr-sm" />
            <div className="social-link">
              <span className="me-3"><FaInstagram /></span>
              <span className="me-3"><FaLinkedin /></span>
              <span><FaFacebook /></span>
            </div>
          </Col>
        </Row>

        <hr className="footer-hr" />

        <Row className="text-center m-0">
          <p className="copyright">© 2025 MAIMT Digital Library. All Rights Reserved.</p>
        </Row>
      </Container>
    </footer>
  );
};
