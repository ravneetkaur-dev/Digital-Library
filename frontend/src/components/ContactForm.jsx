import { useState } from "react"
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from "react-bootstrap"
import { FaStar, FaEnvelope, FaUser, FaComment, FaPaperPlane } from "react-icons/fa"
import { apiJson, ENDPOINTS } from "../utils/api"
import "./Contact.css"

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    content: "",
    rating: 0,
  })
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState({ show: false, type: "", message: "" })
  const [hoveredStar, setHoveredStar] = useState(0)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleStarClick = (rating) => {
    setFormData((prev) => ({
      ...prev,
      rating,
    }))
  }

  const showAlert = (type, message) => {
    setAlert({ show: true, type, message })
    setTimeout(() => {
      setAlert({ show: false, type: "", message: "" })
    }, 5000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.userName || !formData.userEmail || !formData.content || !formData.rating) {
      showAlert("danger", "Please fill in all fields and provide a rating.")
      return
    }

    if (formData.rating < 1 || formData.rating > 5) {
      showAlert("danger", "Please provide a rating between 1 and 5 stars.")
      return
    }

    setLoading(true)
    try {
      await apiJson(ENDPOINTS.feedback.submit, {
        method: "POST",
        body: JSON.stringify(formData),
      })

      showAlert("success", "Thank you for your feedback! We appreciate your input.")
      setFormData({
        userName: "",
        userEmail: "",
        content: "",
        rating: 0,
      })
    } catch (error) {
      showAlert("danger", error.message || "Failed to submit feedback. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const renderStars = () => {
    return [...Array(5)].map((_, index) => {
      const starValue = index + 1
      return (
        <FaStar
          key={index}
          className={`contact-star ${starValue <= (hoveredStar || formData.rating) ? "active" : ""}`}
          onClick={() => handleStarClick(starValue)}
          onMouseEnter={() => setHoveredStar(starValue)}
          onMouseLeave={() => setHoveredStar(0)}
        />
      )
    })
  }

  return (
    <div className="contact-section">
      <Container>
        <Row className="justify-content-center">
          <Col lg={8} xl={6}>
            <div className="contact-header text-center mb-5">
              <h2 className="contact-title">Get in Touch</h2>
              <p className="contact-subtitle">
                We'd love to hear from you. Send us your feedback and help us improve our services.
              </p>
            </div>

            <Card className="contact-card">
              <Card.Body className="p-4">
                {alert.show && (
                  <Alert variant={alert.type} className="mb-4">
                    {alert.message}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="contact-label">
                          <FaUser className="me-2" />
                          Full Name
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="userName"
                          value={formData.userName}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          className="contact-input"
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="contact-label">
                          <FaEnvelope className="me-2" />
                          Email Address
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name="userEmail"
                          value={formData.userEmail}
                          onChange={handleInputChange}
                          placeholder="Enter your email"
                          className="contact-input"
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-4">
                    <Form.Label className="contact-label">
                      <FaComment className="me-2" />
                      Your Message
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      placeholder="Tell us about your experience or share your suggestions..."
                      className="contact-textarea"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="contact-label mb-3">Rate Your Experience</Form.Label>
                    <div className="contact-rating">
                      {renderStars()}
                      <span className="rating-text ms-3">
                        {formData.rating > 0 ? `${formData.rating} out of 5 stars` : "Click to rate"}
                      </span>
                    </div>
                  </Form.Group>

                  <div className="text-center">
                    <Button type="submit" className="contact-submit-btn" disabled={loading} size="lg">
                      {loading ? (
                        <>
                          <Spinner size="sm" className="me-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <FaPaperPlane className="me-2" />
                          Send Feedback
                        </>
                      )}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

