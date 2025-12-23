"use client"

import { useState, useEffect } from "react"
import { Card, Button, Table, Modal, Form, Spinner, Row, Col } from "react-bootstrap"
import { FaPlus, FaEdit, FaTrash, FaCalendarAlt } from "react-icons/fa"
import { apiPost, apiPut, apiDelete, apiGet, ENDPOINTS } from "../../../utils/api"
import '../academics.css'

export default function SemestersManager({ notify, onDataChange, departments, courses, semesters, setGlobalData }) {
  const [showModal, setShowModal] = useState(false)
  const [editingSemester, setEditingSemester] = useState(null)
  const [formData, setFormData] = useState({ number: "", courseId: "", departmentId: "" })
  const [loading, setLoading] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deletingSemester, setDeletingSemester] = useState(null)
  const [filterDept, setFilterDept] = useState("")
  const [filterCourse, setFilterCourse] = useState("")
  const [allSemesters, setAllSemesters] = useState([])
  const [availableCourses, setAvailableCourses] = useState([])

  useEffect(() => {
    loadAllSemesters()
  }, [courses])

  useEffect(() => {
    if (filterDept) {
      const deptCourses = courses.filter((course) => course.department === filterDept)
      setAvailableCourses(deptCourses)
      setFilterCourse("")
    } else {
      setAvailableCourses(courses)
    }
  }, [filterDept, courses])

  const loadAllSemesters = async () => {
    try {
      const allSemestersData = []
      for (const course of courses) {
        const courseSemesters = await apiGet(ENDPOINTS.course.semesters.byCourse(course._id))
        if (Array.isArray(courseSemesters)) {
          allSemestersData.push(
            ...courseSemesters.map((semester) => ({
              ...semester,
              courseName: course.name,
              departmentName: course.departmentName,
              departmentId: course.department,
            })),
          )
        }
      }
      setAllSemesters(allSemestersData)
      setGlobalData((prev) => ({ ...prev, semesters: allSemestersData }))
    } catch (error) {
      console.error("Error loading semesters:", error)
    }
  }

  const filteredSemesters = allSemesters.filter((semester) => {
    const deptMatch = filterDept ? semester.departmentId === filterDept : true
    const courseMatch = filterCourse ? semester.course === filterCourse : true
    return deptMatch && courseMatch
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.number.trim() || !formData.courseId) {
      notify("error", "Please fill all required fields")
      return
    }

    try {
      setLoading(true)
      if (editingSemester) {
        await apiPut(`${ENDPOINTS.course.semesters.create}/${editingSemester._id}`, {
          number: formData.number,
        })
        notify("success", "Semester updated successfully")
      } else {
        await apiPost(ENDPOINTS.course.semesters.create, formData)
        notify("success", "Semester created successfully")
      }

      setShowModal(false)
      resetForm()
      loadAllSemesters()
      onDataChange()
    } catch (error) {
      notify("error", error.message || "Operation failed")
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (semester) => {
    setEditingSemester(semester)
    setFormData({
      number: semester.number,
      courseId: semester.course,
      departmentId: semester.departmentId,
    })
    setShowModal(true)
  }

  const handleDelete = async () => {
    if (!deletingSemester) return

    try {
      setLoading(true)
      await apiDelete(`${ENDPOINTS.course.semesters.create}/${deletingSemester._id}`)
      notify("success", "Semester deleted successfully")
      setShowDeleteModal(false)
      setDeletingSemester(null)
      loadAllSemesters()
      onDataChange()
    } catch (error) {
      notify("error", error.message || "Failed to delete semester")
    } finally {
      setLoading(false)
    }
  }

  const openDeleteModal = (semester) => {
    setDeletingSemester(semester)
    setShowDeleteModal(true)
  }

  const resetForm = () => {
    setFormData({ number: "", courseId: "", departmentId: "" })
    setEditingSemester(null)
  }

  const resetModal = () => {
    setShowModal(false)
    resetForm()
  }

  return (
    <div className="semesters-manager">
      <Card className="shadow-sm">
        <Card.Header className="bg-white">
          <Row className="align-items-center">
            <Col>
              <h5 className="mb-0">
                <FaCalendarAlt className="me-2 text-warning" />
                Semesters Management
              </h5>
            </Col>
            <Col xs="auto">
              <div className="d-flex gap-2">
                <Form.Select
                  size="sm"
                  value={filterDept}
                  onChange={(e) => setFilterDept(e.target.value)}
                  style={{ width: "150px" }}
                >
                  <option value="">All Departments</option>
                  {departments.map((dept) => (
                    <option key={dept._id} value={dept._id}>
                      {dept.name}
                    </option>
                  ))}
                </Form.Select>
                <Form.Select
                  size="sm"
                  value={filterCourse}
                  onChange={(e) => setFilterCourse(e.target.value)}
                  style={{ width: "150px" }}
                  disabled={!filterDept}
                >
                  <option value="">All Courses</option>
                  {availableCourses.map((course) => (
                    <option key={course._id} value={course._id}>
                      {course.name}
                    </option>
                  ))}
                </Form.Select>
                <Button variant="warning" size="sm" onClick={() => setShowModal(true)}>
                  <FaPlus className="me-1" />
                  Add Semester
                </Button>
              </div>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body className="p-0">
          <div className="table-responsive">
            <Table hover className="mb-0">
              <thead className="table-light">
                <tr>
                  <th style={{ width: "60px" }}>#</th>
                  <th>Semester</th>
                  <th>Course</th>
                  <th>Department</th>
                  <th style={{ width: "120px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSemesters.map((semester, index) => (
                  <tr key={semester._id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <FaCalendarAlt className="me-2 text-muted" />
                        {semester.number}
                      </div>
                    </td>
                    <td>
                      <span className="badge bg-light text-dark">{semester.courseName}</span>
                    </td>
                    <td>
                      <span className="badge bg-secondary">{semester.departmentName}</span>
                    </td>
                    <td>
                      <div className="btn-group" role="group">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => handleEdit(semester)}
                          title="Edit Semester"
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => openDeleteModal(semester)}
                          title="Delete Semester"
                        >
                          <FaTrash />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredSemesters.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-muted">
                      <FaCalendarAlt size={24} className="mb-2 opacity-50" />
                      <br />
                      No semesters found. Add your first semester to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={resetModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editingSemester ? "Edit Semester" : "Add New Semester"}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Department *</Form.Label>
              <Form.Select
                value={formData.departmentId}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, departmentId: e.target.value, courseId: "" }))
                }}
                required
                disabled={editingSemester}
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept._id} value={dept._id}>
                    {dept.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Course *</Form.Label>
              <Form.Select
                value={formData.courseId}
                onChange={(e) => setFormData((prev) => ({ ...prev, courseId: e.target.value }))}
                required
                disabled={!formData.departmentId || editingSemester}
              >
                <option value="">Select Course</option>
                {courses
                  .filter((course) => course.department === formData.departmentId)
                  .map((course) => (
                    <option key={course._id} value={course._id}>
                      {course.name}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Semester Number/Name *</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., 1, 2, 3 or First, Second"
                value={formData.number}
                onChange={(e) => setFormData((prev) => ({ ...prev, number: e.target.value }))}
                required
                autoFocus
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={resetModal}>
              Cancel
            </Button>
            <Button type="submit" variant="warning" disabled={loading}>
              {loading && <Spinner size="sm" className="me-2" />}
              {editingSemester ? "Update" : "Create"} Semester
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete the semester:</p>
          <strong>"{deletingSemester?.number}"</strong>
          <p className="text-muted">Course: {deletingSemester?.courseName}</p>
          <p className="text-danger mt-2 mb-0">
            <small>This action cannot be undone and may affect related subjects.</small>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete} disabled={loading}>
            {loading && <Spinner size="sm" className="me-2" />}
            Delete Semester
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
