"use client"

import { useState } from "react"
import { Modal, Button, Form, InputGroup, Spinner, Alert } from "react-bootstrap"
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaSignInAlt, FaExclamationTriangle } from "react-icons/fa"
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import "./LoginModal.css"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"

export const LoginModal = ({
  show = false,
  onClose = () => {},
  onForgotPassword = () => {},
  initialRole = "faculty",
}) => {
  const [role, setRole] = useState(initialRole)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPwd, setShowPwd] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  const navigate = useNavigate()

  const toggleRole = () => {
    setRole((r) => (r === "faculty" ? "admin" : "faculty"))
    setError("")
  }

  const sanitizeHtmlString = (str) => {
    if (!str || typeof str !== "string") return ""
    return str
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
  }

  const friendlyErrorMessage = (err) => {
    if (!err.response) {
      return "Unable to reach server. Please check your connection."
    }

    const data = err.response.data

    if (data && typeof data === "object" && (data.message || data.error)) {
      return data.message || data.error
    }

    if (typeof data === "string") {
      const cleaned = sanitizeHtmlString(data)
      if (cleaned) return cleaned
    }

    return "Login failed. Please try again."
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Please enter both email and password.")
      return
    }

    try {
      setSubmitting(true)

      const endpoint = role === "faculty" ? `${API_BASE_URL}/api/faculty/login` : `${API_BASE_URL}/api/loginadmin/login`

      const body = { email, password, role }

      const res = await axios.post(endpoint, body, { withCredentials: true })

      // Store token and user data
      if (res.data?.token) {
        localStorage.setItem(`${role}_token`, res.data.token)

        // Store faculty data for dashboard use
        if (role === "faculty") {
          const facultyData = {
            id: res.data.id,
            name: res.data.name,
            email: res.data.email,
            role: res.data.role,
            designation: res.data.designation,
            department: res.data.department,
            subjects: res.data.subjects || [],
            profileImage: res.data.profileImage,
          }
          localStorage.setItem("faculty_data", JSON.stringify(facultyData))
        } else {
          // Store admin data
          localStorage.setItem("admin_data", JSON.stringify(res.data))
        }
      }

      toast.success(`${role === "faculty" ? "Faculty" : "Admin"} login successful!`)

      onClose()

      // Navigate to appropriate dashboard
      if (role === "faculty") {
        navigate("/faculty-dashboard")
      } else {
        navigate("/admin-dashboard")
      }
    } catch (err) {
      const msg = friendlyErrorMessage(err)
      setError(msg)

      console.error("Login error (raw):", err?.response ?? err)
    } finally {
      setSubmitting(false)
    }
  }

  const resetForm = () => {
    setEmail("")
    setPassword("")
    setShowPwd(false)
    setError("")
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  return (
    <Modal show={show} onHide={handleClose} centered dialogClassName="auth-modal" contentClassName="auth-modal-content">
      <div className="auth-header">
        <div className="auth-header-content">
          <h5 className="auth-title">{role === "faculty" ? "Faculty Login" : "Admin Login"}</h5>
          <p className="auth-subtitle">
            {role === "faculty" ? "Access your faculty dashboard and resources" : "Access your admin dashboard"}
          </p>
        </div>
      </div>

      <Form onSubmit={handleSubmit}>
        <Modal.Body className="auth-body">
          {error && (
            <Alert variant="danger" className="auth-alert">
              <FaExclamationTriangle className="me-2" />
              {error}
            </Alert>
          )}

          {/* Email */}
          <Form.Group className="mb-3" controlId="loginEmail">
            <Form.Label className="auth-label">Email</Form.Label>
            <InputGroup>
              <InputGroup.Text className="auth-input-icon">
                <FaEnvelope />
              </InputGroup.Text>
              <Form.Control
                type="email"
                placeholder="name@maimt.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="auth-input"
                required
                autoFocus
              />
            </InputGroup>
          </Form.Group>

          {/* Password */}
          <Form.Group className="mb-2" controlId="loginPassword">
            <Form.Label className="auth-label">Password</Form.Label>
            <InputGroup>
              <InputGroup.Text className="auth-input-icon">
                <FaLock />
              </InputGroup.Text>
              <Form.Control
                type={showPwd ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="auth-input"
                required
                minLength={6}
              />
              <Button
                type="button"
                variant="light"
                className="auth-eye-btn"
                onClick={() => setShowPwd((s) => !s)}
                aria-label={showPwd ? "Hide password" : "Show password"}
              >
                {showPwd ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </InputGroup>
          </Form.Group>

          {/* Links */}
          <div className="d-flex justify-content-between align-items-center mt-2">
            <button type="button" className="auth-link" onClick={onForgotPassword}>
              Forgot password?
            </button>

            <button type="button" className="auth-link-secondary" onClick={toggleRole}>
              {role === "faculty" ? "Admin Login" : "Faculty Login"}
            </button>
          </div>
        </Modal.Body>

        {/* Footer */}
        <Modal.Footer className="auth-footer">
          <Button
            type="button"
            variant="outline-primary"
            className="auth-cancel-btn"
            onClick={handleClose}
            disabled={submitting}
          >
            Cancel
          </Button>

          <Button type="submit" className="auth-submit-btn" disabled={submitting}>
            {submitting ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Signing in...
              </>
            ) : (
              <>
                <FaSignInAlt className="me-2" />
                Sign In
              </>
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}
