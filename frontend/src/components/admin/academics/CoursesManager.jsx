import { useState, useEffect } from "react"
import { Card, Button, Table, Modal, Form, Spinner, Row, Col } from "react-bootstrap"
import { FaPlus, FaEdit, FaTrash, FaBook } from "react-icons/fa"
import { apiPost, apiPut, apiDelete, apiGet, ENDPOINTS } from "../../../utils/api"
import '../academics.css'

export default function CoursesManager({ notify, onDataChange, departments, courses, setGlobalData }) {
  const [showModal, setShowModal] = useState(false)
  const [editingCourse, setEditingCourse] = useState(null)
  const [formData, setFormData] = useState({ name: "", departmentId: "" })
  const [loading, setLoading] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deletingCourse, setDeletingCourse] = useState(null)
  const [filterDept, setFilterDept] = useState("")
  const [allCourses, setAllCourses] = useState([])

  useEffect(() => {
    loadAllCourses()
  }, [departments])

  const loadAllCourses = async () => {
    try {
      const allCoursesData = []
      for (const dept of departments) {
        const deptCourses = await apiGet(ENDPOINTS.course.courses.byDepartment(dept._id))
        if (Array.isArray(deptCourses)) {
          allCoursesData.push(
            ...deptCourses.map((course) => ({
              ...course,
              departmentName: dept.name,
            })),
          )
        }
      }
      setAllCourses(allCoursesData)
      setGlobalData((prev) => ({ ...prev, courses: allCoursesData }))
    } catch (error) {
      console.error("Error loading courses:", error)
    }
  }

  const filteredCourses = filterDept ? allCourses.filter((course) => course.department === filterDept) : allCourses

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.departmentId) {
      notify("error", "Please fill all required fields")
      return
    }

    try {
      setLoading(true)
      if (editingCourse) {
        await apiPut(`${ENDPOINTS.course.courses.create}/${editingCourse._id}`, {
          name: formData.name,
        })
        notify("success", "Course updated successfully")
      } else {
        await apiPost(ENDPOINTS.course.courses.create, formData)
        notify("success", "Course created successfully")
      }

      setShowModal(false)
      resetForm()
      loadAllCourses()
      onDataChange()
    } catch (error) {
      notify("error", error.message || "Operation failed")
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (course) => {
    setEditingCourse(course)
    setFormData({
      name: course.name,
      departmentId: course.department,
    })
    setShowModal(true)
  }

  const handleDelete = async () => {
    if (!deletingCourse) return

    try {
      setLoading(true)
      await apiDelete(`${ENDPOINTS.course.courses.create}/${deletingCourse._id}`)
      notify("success", "Course deleted successfully")
      setShowDeleteModal(false)
      setDeletingCourse(null)
      loadAllCourses()
      onDataChange()
    } catch (error) {
      notify("error", error.message || "Failed to delete course")
    } finally {
      setLoading(false)
    }
  }

  const openDeleteModal = (course) => {
    setDeletingCourse(course)
    setShowDeleteModal(true)
  }

  const resetForm = () => {
    setFormData({ name: "", departmentId: "" })
    setEditingCourse(null)
  }

  const resetModal = () => {
    setShowModal(false)
    resetForm()
  }

  return (
    <div className="courses-manager">
      <Card className="shadow-sm">
        <Card.Header className="bg-white">
          <Row className="align-items-center">
            <Col>
              <h5 className="mb-0">
                <FaBook className="me-2 text-success" />
                Courses Management
              </h5>
            </Col>
            <Col xs="auto">
              <div className="d-flex gap-2">
                <Form.Select
                  size="sm"
                  value={filterDept}
                  onChange={(e) => setFilterDept(e.target.value)}
                  style={{ width: "200px" }}
                >
                  <option value="">All Departments</option>
                  {departments.map((dept) => (
                    <option key={dept._id} value={dept._id}>
                      {dept.name}
                    </option>
                  ))}
                </Form.Select>
                <Button variant="success" size="sm" onClick={() => setShowModal(true)}>
                  <FaPlus className="me-1" />
                  Add Course
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
                  <th>Course Name</th>
                  <th>Department</th>
                  <th style={{ width: "120px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses.map((course, index) => (
                  <tr key={course._id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <FaBook className="me-2 text-muted" />
                        {course.name}
                      </div>
                    </td>
                    <td>
                      <span className="badge bg-light text-dark">{course.departmentName}</span>
                    </td>
                    <td>
                      <div className="btn-group" role="group">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => handleEdit(course)}
                          title="Edit Course"
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => openDeleteModal(course)}
                          title="Delete Course"
                        >
                          <FaTrash />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredCourses.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center py-4 text-muted">
                      <FaBook size={24} className="mb-2 opacity-50" />
                      <br />
                      {filterDept
                        ? "No courses found for selected department."
                        : "No courses found. Add your first course to get started."}
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
          <Modal.Title>{editingCourse ? "Edit Course" : "Add New Course"}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Department *</Form.Label>
              <Form.Select
                value={formData.departmentId}
                onChange={(e) => setFormData((prev) => ({ ...prev, departmentId: e.target.value }))}
                required
                disabled={editingCourse} // Don't allow changing department when editing
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept._id} value={dept._id}>
                    {dept.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Course Name *</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., B.Tech Computer Science"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                required
                autoFocus
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={resetModal}>
              Cancel
            </Button>
            <Button type="submit" variant="success" disabled={loading}>
              {loading && <Spinner size="sm" className="me-2" />}
              {editingCourse ? "Update" : "Create"} Course
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
          <p>Are you sure you want to delete the course:</p>
          <strong>"{deletingCourse?.name}"</strong>
          <p className="text-danger mt-2 mb-0">
            <small>This action cannot be undone and may affect related semesters.</small>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete} disabled={loading}>
            {loading && <Spinner size="sm" className="me-2" />}
            Delete Course
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
