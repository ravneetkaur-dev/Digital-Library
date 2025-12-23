import { useState } from "react"
import { Container, Row, Col, Card, Form, Button, Spinner } from "react-bootstrap"
import { FaStar, FaEnvelope, FaUser, FaComment, FaPaperPlane } from "react-icons/fa"
import { useFormik } from "formik"
import * as Yup from "yup"
import { toast, ToastContainer } from "react-toastify"
import { apiPost, ENDPOINTS } from "../utils/api"
import "react-toastify/dist/ReactToastify.css"
import "./Contact.css"

// Validation schema
const validationSchema = Yup.object({
  userName: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .matches(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces")
    .required("Full name is required"),
  userEmail: Yup.string().email("Please enter a valid email address").required("Email address is required"),
  content: Yup.string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters")
    .required("Message is required"),
  rating: Yup.number()
    .min(1, "Please provide a rating")
    .max(5, "Rating cannot exceed 5 stars")
    .required("Rating is required"),
})

export const ContactForm = () => {
  const [loading, setLoading] = useState(false)
  const [hoveredStar, setHoveredStar] = useState(0)

  const formik = useFormik({
    initialValues: {
      userName: "",
      userEmail: "",
      content: "",
      rating: 0,
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true)
      try {
        await apiPost(ENDPOINTS.feedback.submit, values)

        toast.success("🎉 Thank you for your feedback! We appreciate your input and will get back to you soon.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })

        resetForm()
        setHoveredStar(0)
      } catch (error) {
        toast.error(`❌ ${error.message || "Failed to submit feedback. Please try again."}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
      } finally {
        setLoading(false)
      }
    },
  })

  const handleStarClick = (rating) => {
    formik.setFieldValue("rating", rating, true)
    // formik.setFieldTouched("rating", true, true)
  }

  const renderStars = () => {
    return [...Array(5)].map((_, index) => {
      const starValue = index + 1
      const isActive = starValue <= (hoveredStar || formik.values.rating)

      return (
        <FaStar
          key={index}
          className={`contact-star ${isActive ? "active" : ""} ${
            formik.touched.rating && formik.errors.rating ? "error" : ""
          }`}
          onClick={() => handleStarClick(starValue)}
          onMouseEnter={() => setHoveredStar(starValue)}
          onMouseLeave={() => setHoveredStar(0)}
          style={{ cursor: "pointer" }}
        />
      )
    })
  }

  const getRatingText = () => {
    const rating = formik.values.rating
    if (rating === 0) return "Click to rate your experience"

    const ratingTexts = {
      1: "Poor - We'll work to improve",
      2: "Fair - There's room for improvement",
      3: "Good - We're on the right track",
      4: "Very Good - We're doing well",
      5: "Excellent - Thank you!",
    }

    return `${rating} out of 5 stars - ${ratingTexts[rating]}`
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
                <Form onSubmit={formik.handleSubmit} noValidate>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="contact-label">
                          <FaUser className="me-2" />
                          Full Name *
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="userName"
                          value={formik.values.userName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          placeholder="Enter your full name"
                          className="contact-input"
                          isInvalid={formik.touched.userName && !!formik.errors.userName}
                          isValid={formik.touched.userName && !formik.errors.userName}
                        />
                        <Form.Control.Feedback type="invalid">{formik.errors.userName}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="contact-label">
                          <FaEnvelope className="me-2" />
                          Email Address *
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name="userEmail"
                          value={formik.values.userEmail}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          placeholder="Enter your email address"
                          className="contact-input"
                          isInvalid={formik.touched.userEmail && !!formik.errors.userEmail}
                          isValid={formik.touched.userEmail && !formik.errors.userEmail}
                        />
                        <Form.Control.Feedback type="invalid">{formik.errors.userEmail}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-4">
                    <Form.Label className="contact-label">
                      <FaComment className="me-2" />
                      Your Message *
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      name="content"
                      value={formik.values.content}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Tell us about your experience, suggestions, or any feedback you'd like to share..."
                      className="contact-textarea"
                      isInvalid={formik.touched.content && !!formik.errors.content}
                      isValid={formik.touched.content && !formik.errors.content}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.content}</Form.Control.Feedback>
                    <Form.Text className="text-muted">{formik.values.content.length}/1000 characters</Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="contact-label mb-3">Rate Your Experience *</Form.Label>
                    <div className="contact-rating">
                      {renderStars()}
                      <div className="rating-text ms-3">
                        <span className={formik.touched.rating && formik.errors.rating ? "text-danger" : "text-muted"}>
                          {getRatingText()}
                        </span>
                      </div>
                    </div>
                    {formik.touched.rating && formik.errors.rating && (
                      <div className="text-danger small mt-1">{formik.errors.rating}</div>
                    )}
                  </Form.Group>

                  <div className="text-center">
                    <Button
                      type="submit"
                      className="contact-submit-btn"
                      disabled={loading || !formik.isValid}
                      size="lg"
                    >
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

                  <div className="text-center mt-3">
                    <small className="text-muted">* Required fields</small>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 9999 }}
      />
    </div>
  )
}
