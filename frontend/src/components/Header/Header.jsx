import { Container, Row, Col, Image } from "react-bootstrap";
import { BsTelephoneFill, BsEnvelopeFill } from "react-icons/bs";
import './header.css';

export const Header = () => {
  return (
    <> 
      <header className="main-header">
        <p className="top">
          <span className="me-3"><BsTelephoneFill /> +91 9355455140</span>
          <BsEnvelopeFill /> director@maimt.com
        </p>
        <Container fluid className='header-container'>
          <Row className="align-items-center">
            <Col xs={12} md="auto" className="d-flex justify-content-center justify-content-md-start align-items-center mb-3 mb-md-0">
              <Image 
                src="/images/logo.png" 
                alt="MAIMT Logo" 
                className="logo"
              />
            </Col>
            <Col xs={12} md>
              <h1 className="header-title mb-1">
                <span className="main-title">Maharaja Agrasen Institute of Management and Technology</span>
              </h1>
              <p className="mb-0 small slogan2">Empowering Students, Skills to Success</p>
            </Col>
          </Row>
        </Container>
      </header>
    </>
  );
};
