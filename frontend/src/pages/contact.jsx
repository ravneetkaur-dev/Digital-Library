import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Header } from "../components/Header/Header";
import { NavBar } from "../components/NavBar/NavBar";
import { Footer } from "../components/Footer/Footer";
import axios from "../api/axiosConfig";
import { Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import "./contact.css";

export const Contact = () => {
  const [message, setMessage] = useState("");

  const initialValues = {
    userName: "",
    userEmail: "",
    content: "",
    rating: "5",
  };

  const validationSchema = Yup.object({
    userName: Yup.string().required("Name is required"),
    userEmail: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    content: Yup.string().required("Message is required"),
    rating: Yup.string().required("Rating is required"),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      await axios.post("http://localhost:5000/api/feedback/submit", values);
      setMessage("Message sent successfully!");
      resetForm();
    } catch (error) {
      setMessage("Failed to send message. Please try again.");
    } finally {
      setSubmitting(false);
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
            <Col
              md={6}
              className="d-flex align-items-center justify-content-center"
            >
              <div className="contact-form-wrapper">
                <h2 className="contact-title mb-4">Let's Connect</h2>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    errors,
                    touched,
                    isSubmitting,
                  }) => (
                    <Form className="contact-form" onSubmit={handleSubmit}>
                      <Form.Group className="mb-3">
                        <Form.Label>Your Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="userName"
                          value={values.userName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.userName && !!errors.userName}
                          placeholder="Enter your name"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.userName}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                          type="email"
                          name="userEmail"
                          value={values.userEmail}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.userEmail && !!errors.userEmail}
                          placeholder="Enter your email"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.userEmail}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Message</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={4}
                          name="content"
                          value={values.content}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.content && !!errors.content}
                          placeholder="Your message"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.content}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Rating</Form.Label>
                        <Form.Select
                          name="rating"
                          value={values.rating}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.rating && !!errors.rating}
                        >
                          <option value="5">5 - Excellent</option>
                          <option value="4">4 - Good</option>
                          <option value="3">3 - Average</option>
                          <option value="2">2 - Poor</option>
                          <option value="1">1 - Very Poor</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          {errors.rating}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Button
                        variant="custom"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>

                      {message && (
                        <p className="mt-3 text-success fw-bold">{message}</p>
                      )}
                    </Form>
                  )}
                </Formik>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </>
  );
};
