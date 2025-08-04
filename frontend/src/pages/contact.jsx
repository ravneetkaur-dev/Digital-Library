import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Header } from "../components/Header/Header";
import { NavBar } from "../components/NavBar/NavBar";
import { Footer } from "../components/Footer/Footer";
import axios from "../api/axiosConfig"; 
import { useState } from "react";
import "./contact.css";

export const Contact = () => {
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    content: "",
    rating: 5, // default rating
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/feedback", formData);
      setMessage("Message sent successfully!");
      setFormData({
        userName: "",
        userEmail: "",
        content: "",
        rating: 5,
      });
    } catch (error) {
      setMessage("Failed to send message. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <NavBar />
      <section className="contact-full">
        <Container fluid className="h-100">
          <Row className="h-100">
            <Col md={6} className="contact-image-col">
              <div className="contact-image"></div>
            </Col>
            <Col md={6} className="d-flex align-items-center justify-content-center">
              <div className="contact-form-wrapper">
                <h2 className="contact-title mb-4">Let's Connect</h2>
                <Form className="contact-form" onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="userName"
                      value={formData.userName}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      name="userEmail"
                      value={formData.userEmail}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      name="content"
                      value={formData.content}
                      onChange={handleChange}
                      placeholder="Your message"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                      as="select"
                      name="rating"
                      value={formData.rating}
                      onChange={handleChange}
                    >
                      <option value="5">5 - Excellent</option>
                      <option value="4">4 - Good</option>
                      <option value="3">3 - Average</option>
                      <option value="2">2 - Poor</option>
                      <option value="1">1 - Very Poor</option>
                    </Form.Control>
                  </Form.Group>

                  <Button variant="custom" type="submit">
                    Send Message
                  </Button>

                  {message && <p className="mt-3 text-success">{message}</p>}
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </>
  );
};
