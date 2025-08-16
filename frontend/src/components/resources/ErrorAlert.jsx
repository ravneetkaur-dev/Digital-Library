"use client"
import { Alert } from "react-bootstrap"

const ErrorAlert = ({ error, onClose }) =>
  error && (
    <Alert variant="danger" dismissible onClose={onClose}>
      {error}
    </Alert>
  )

export default ErrorAlert
