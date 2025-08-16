"use client"

import { useEffect, useState } from "react"
import { Modal, Form, Button, Row, Col, Spinner } from "react-bootstrap"
import { apiUpload, ENDPOINTS } from "../../utils/api"

export default function FacultyFormModal({ show, onHide, initialData, onSaved }) {
  const isEdit = !!initialData
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "faculty",
    designation: "",
    department: "",
    subjects: "",
    profileImage: null,
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (isEdit) {
      setForm({
        name: initialData.name || "",
        email: initialData.email || "",
        password: "",
        role: initialData.role || "faculty",
        designation: initialData.designation || "",
        department: initialData.department || "",
        subjects: Array.isArray(initialData.subjects) ? initialData.subjects.join(", ") : "",
        profileImage: null,
      })
    } else {
      setForm({
        name: "",
        email: "",
        password: "",
        role: "faculty",
        designation: "",
        department: "",
        subjects: "",
        profileImage: null,
      })
    }
    setError("")
  }, [initialData, isEdit, show])

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === "profileImage") {
      setForm((s) => ({ ...s, profileImage: files && files[0] ? files[0] : null }))
    } else {
      setForm((s) => ({ ...s, [name]: value }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    try {
      setSaving(true)
      const payload = new FormData()
      payload.append("name", form.name)
      payload.append("email", form.email)
      payload.append("role", form.role)
      payload.append("designation", form.designation)
      payload.append("department", form.department)
      // Handle subjects as array on server: you can split on comma
      const subjectsArray = form.subjects
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
      subjectsArray.forEach((s, idx) => payload.append(`subjects[${idx}]`, s))

      if (!isEdit) {
        payload.append("password", form.password) // required on create
      }
      if (form.profileImage) {
        payload.append("profileImage", form.profileImage)
      }

      if (isEdit) {
        // Update supports multipart too
        const url = ENDPOINTS.faculty.update(initialData._id || initialData.id)
        // Some backends expect PUT/PATCH; FormData with method PUT may not be accepted by all servers; adjust if needed
        const res = await fetch(`${url.startsWith("http") ? url : new URL(url, location.origin)}`, {
          method: "PUT",
          body: payload,
          credentials: "include",
          headers: {
            // Auth handled by cookie or token; if Bearer needed, switch to api helper instead and add headers.
          },
        })
        if (!res.ok) {
          const msg = (await res.json().catch(() => null))?.message || "Update failed"
          throw new Error(msg)
        }
      } else {
        await apiUpload(ENDPOINTS.faculty.create, payload)
      }
      onSaved?.()
    } catch (err) {
      setError(err.message || "Failed to save faculty")
    } finally {
      setSaving(false)
    }
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? "Edit Faculty" : "Add Faculty"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <div className="alert alert-danger">{error}</div>}

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control name="name" value={form.name} onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" value={form.email} onChange={handleChange} required />
              </Form.Group>
            </Col>
          </Row>

          {!isEdit && (
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    minLength={6}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Role</Form.Label>
                  <Form.Select name="role" value={form.role} onChange={handleChange}>
                    <option value="faculty">Faculty</option>
                    <option value="admin">Admin</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          )}

          {isEdit && (
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Role</Form.Label>
                  <Form.Select name="role" value={form.role} onChange={handleChange}>
                    <option value="faculty">Faculty</option>
                    <option value="admin">Admin</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          )}

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Designation</Form.Label>
                <Form.Control name="designation" value={form.designation} onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Department</Form.Label>
                <Form.Control name="department" value={form.department} onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Subjects (comma separated)</Form.Label>
            <Form.Control
              placeholder="e.g. Data Structures, Algorithms"
              name="subjects"
              value={form.subjects}
              onChange={handleChange}
            />
          </Form.Group>

          {/* <Form.Group>
            <Form.Label>Profile Image (optional)</Form.Label>
            <Form.Control type="file" name="profileImage" accept="image/*" onChange={handleChange} />
          </Form.Group> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={onHide} disabled={saving}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={saving}>
            {saving ? (
              <>
                <Spinner size="sm" animation="border" className="me-2" />
                Saving...
              </>
            ) : (
              "Save"
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}
