"use client"

import { useState, useEffect } from "react"
import { Card, Table, Badge, Button, Row, Col, Spinner, Alert, Modal } from "react-bootstrap"
import { FaComments, FaStar, FaEye, FaTrash, FaCalendarAlt, FaUser, FaEnvelope } from "react-icons/fa"
import { apiGet, apiDelete } from "../../utils/api"

const FeedbackManager = () => {
  const [feedbacks, setFeedbacks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedFeedback, setSelectedFeedback] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [deleting, setDeleting] = useState(null)

  useEffect(() => {
    loadFeedbacks()
  }, [])

  const loadFeedbacks = async () => {
    try {
      setLoading(true)
      setError("")
      const data = await apiGet("/api/feedback/all")
      setFeedbacks(data)
    } catch (err) {
      setError("Failed to load feedback. Please try again.")
      console.error("Error loading feedback:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (feedbackId) => {
    if (!window.confirm("Are you sure you want to delete this feedback?")) {
      return
    }

    try {
      setDeleting(feedbackId)
      await apiDelete(`/api/feedback/${feedbackId}`)
      setFeedbacks(feedbacks.filter((f) => f._id !== feedbackId))
    } catch (err) {
      setError("Failed to delete feedback. Please try again.")
      console.error("Error deleting feedback:", err)
    } finally {
      setDeleting(null)
    }
  }

  const handleViewDetails = (feedback) => {
    setSelectedFeedback(feedback)
    setShowModal(true)
  }

  const getRatingColor = (rating) => {
    if (rating >= 4) return "success"
    if (rating >= 3) return "warning"
    return "danger"
  }

  const getRatingStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar key={i} className={i < rating ? "text-warning" : "text-muted"} size={14} />
    ))
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStats = () => {
    const totalFeedbacks = feedbacks.length
    const averageRating =
      totalFeedbacks > 0 ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / totalFeedbacks).toFixed(1) : 0
    const recentFeedbacks = feedbacks.filter(
      (f) => new Date(f.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    ).length

    return { totalFeedbacks, averageRating, recentFeedbacks }
  }

  const stats = getStats()

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Loading feedback...</p>
      </div>
    )
  }

  return (
    <div className="feedback-manager">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="d-flex align-items-center gap-2">
          <FaComments className="text-primary" />
          Feedback Management
        </h4>
        <Button variant="outline-primary" onClick={loadFeedbacks}>
          Refresh
        </Button>
      </div>

      {error && (
        <Alert variant="danger" dismissible onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      {/* Stats Cards */}
      <Row className="mb-4">
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <h3 className="text-primary">{stats.totalFeedbacks}</h3>
              <p className="text-muted mb-0">Total Feedback</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <h3 className="text-warning">{stats.averageRating}</h3>
              <p className="text-muted mb-0">Average Rating</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <h3 className="text-success">{stats.recentFeedbacks}</h3>
              <p className="text-muted mb-0">This Week</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Feedback Table */}
      <Card>
        <Card.Header>
          <strong>All Feedback</strong>
        </Card.Header>
        <Card.Body className="p-0">
          {feedbacks.length === 0 ? (
            <div className="text-center py-5">
              <FaComments size={48} className="text-muted mb-3" />
              <p className="text-muted">No feedback received yet.</p>
            </div>
          ) : (
            <Table responsive hover className="mb-0">
              <thead className="table-light">
                <tr>
                  <th>User</th>
                  <th>Rating</th>
                  <th>Content Preview</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {feedbacks.map((feedback) => (
                  <tr key={feedback._id}>
                    <td>
                      <div>
                        <div className="fw-bold d-flex align-items-center gap-1">
                          <FaUser size={12} className="text-muted" />
                          {feedback.userName}
                        </div>
                        <small className="text-muted d-flex align-items-center gap-1">
                          <FaEnvelope size={10} />
                          {feedback.userEmail}
                        </small>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <Badge bg={getRatingColor(feedback.rating)}>{feedback.rating}</Badge>
                        <div>{getRatingStars(feedback.rating)}</div>
                      </div>
                    </td>
                    <td>
                      <div style={{ maxWidth: "300px" }}>
                        {feedback.content.length > 100 ? `${feedback.content.substring(0, 100)}...` : feedback.content}
                      </div>
                    </td>
                    <td>
                      <small className="d-flex align-items-center gap-1">
                        <FaCalendarAlt size={10} />
                        {formatDate(feedback.createdAt)}
                      </small>
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <Button size="sm" variant="outline-primary" onClick={() => handleViewDetails(feedback)}>
                          <FaEye size={12} />
                        </Button>
                        {/* <Button
                          size="sm"
                          variant="outline-danger"
                          onClick={() => handleDelete(feedback._id)}
                          disabled={deleting === feedback._id}
                        >
                          {deleting === feedback._id ? <Spinner size="sm" animation="border" /> : <FaTrash size={12} />}
                        </Button> */}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      {/* Feedback Details Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Feedback Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedFeedback && (
            <div>
              <Row className="mb-3">
                <Col md={6}>
                  <strong>User Name:</strong>
                  <p>{selectedFeedback.userName}</p>
                </Col>
                <Col md={6}>
                  <strong>Email:</strong>
                  <p>{selectedFeedback.userEmail}</p>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <strong>Rating:</strong>
                  <div className="d-flex align-items-center gap-2 mt-1">
                    <Badge bg={getRatingColor(selectedFeedback.rating)} className="fs-6">
                      {selectedFeedback.rating}/5
                    </Badge>
                    <div>{getRatingStars(selectedFeedback.rating)}</div>
                  </div>
                </Col>
                <Col md={6}>
                  <strong>Submitted:</strong>
                  <p>{formatDate(selectedFeedback.createdAt)}</p>
                </Col>
              </Row>
              <div className="mb-3">
                <strong>Feedback Content:</strong>
                <Card className="mt-2">
                  <Card.Body>
                    <p className="mb-0" style={{ whiteSpace: "pre-wrap" }}>
                      {selectedFeedback.content}
                    </p>
                  </Card.Body>
                </Card>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          {/* {selectedFeedback && (
            <Button
              variant="danger"
              onClick={() => {
                handleDelete(selectedFeedback._id)
                setShowModal(false)
              }}
              disabled={deleting === selectedFeedback._id}
            >
              {deleting === selectedFeedback._id ? (
                <>
                  <Spinner size="sm" animation="border" className="me-2" />
                  Deleting...
                </>
              ) : (
                <>
                  <FaTrash className="me-2" />
                  Delete Feedback
                </>
              )}
            </Button>
          )} */}
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default FeedbackManager
