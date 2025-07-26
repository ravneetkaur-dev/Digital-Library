import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Header } from "../components/Header";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import "./contact.css";

export const Contact = () => {
  return (
    <>
    <Header/>
        <NavBar/>
    <section className="contact-full">
        
      <Container fluid className="h-100">
        <Row className="h-100">
          <Col md={6} className="contact-image-col">
            <div className="contact-image"></div>
          </Col>
          <Col md={6} className="d-flex align-items-center justify-content-center">
            <div className="contact-form-wrapper">
              <h2 className="contact-title mb-4">Let's Connect</h2>
              <Form className="contact-form">
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Your Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter your name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type="email" placeholder="Enter your email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formMessage">
                  <Form.Label>Message</Form.Label>
                  <Form.Control as="textarea" rows={4} placeholder="Your message" />
                </Form.Group>

                <Button variant="custom" type="submit">
                  Send Message
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
    <Footer/>
    </>
  );
};
