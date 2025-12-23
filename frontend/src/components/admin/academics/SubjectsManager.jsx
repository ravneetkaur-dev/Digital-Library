"use client"

import { useState } from "react"
import { Card, Button, Table, Modal, Form, Spinner, Row, Col, InputGroup } from "react-bootstrap"
import { FaPlus, FaEdit, FaTrash, FaBook, FaSearch } from "react-icons/fa"
import { apiPost, apiPut, apiDelete, apiGet, ENDPOINTS } from "../../../utils/api"
import '../academics.css'

export default function SubjectsManager({ notify, onDataChange, globalData, setGlobalData }) {
  const { departments, courses, semesters, subjects } = globalData

  const [showModal, setShowModal] = useState(false)
  const [editingSubject, setEditingSubject] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    department: "",
    course: "",
    semester: "",
    description: "",
  })
  const [loading, setLoading] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deletingSubject, setDeletingSubject] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterDept, setFilterDept] = useState("")
  const [availableCourses, setAvailableCourses] = useState([])
  const [availableSemesters, setAvailableSemesters] = useState([])

  const loadCoursesForDept = async (deptId) => {
    if (!deptId) {
      setAvailableCourses([])
      return
    }
    try {
      const deptCourses = await apiGet(ENDPOINTS.course.courses.byDepartment(deptId))
      setAvailableCourses(Array.isArray(deptCourses) ? deptCourses : [])
    } catch (error) {
      console.error("Error loading courses:", error)
      setAvailableCourses([])
    }
  }

  const loadSemestersForCourse = async (courseId) => {
    if (!courseId) {
      setAvailableSemesters([])
      return
    }
    try {
      const courseSemesters = await apiGet(ENDPOINTS.course.semesters.byCourse(courseId))
      setAvailableSemesters(Array.isArray(courseSemesters) ? courseSemesters : [])
    } catch (error) {
      console.error("Error loading semesters:", error)
      setAvailableSemesters([])
    }
  }

  const handleDepartmentChange = (deptId) => {
    setFormData((prev) => ({ ...prev, department: deptId, course: "", semester: "" }))
    loadCoursesForDept(deptId)
    setAvailableSemesters([])
  }

  const handleCourseChange = (courseId) => {
    setFormData((prev) => ({ ...prev, course: courseId, semester: "" }))
    loadSemestersForCourse(courseId)
  }

  const filteredSubjects = subjects.filter((subject) => {
    const matchesSearch =
      !searchTerm ||
      subject.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.description?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDept = !filterDept || (subject.department?._id || subject.department) === filterDept

    return matchesSearch && matchesDept
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (
      !formData.name.trim() ||
      !formData.code.trim() ||
      !formData.department ||
      !formData.course ||
      !formData.semester
    ) {
      notify("error", "Please fill all required fields")
      return
    }

    try {
      setLoading(true)
      if (editingSubject) {
        await apiPut(`${ENDPOINTS.subjects.list}/${editingSubject._id}`, formData)
        notify("success", "Subject updated successfully")
      } else {
        await apiPost(ENDPOINTS.subjects.create, formData)
        notify("success", "Subject created successfully")
      }

      setShowModal(false)
      resetForm()

      // Reload subjects
      const updatedSubjects = await apiGet(ENDPOINTS.subjects.list)
      setGlobalData((prev) => ({ ...prev, subjects: Array.isArray(updatedSubjects) ? updatedSubjects : [] }))
      onDataChange()
    } catch (error) {
      notify("error", error.message || "Operation failed")
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = async (subject) => {
    setEditingSubject(subject)
    setFormData({
      name: subject.name,
      code: subject.code,
      department: subject.department?._id || subject.department,
      course: subject.course?._id || subject.course,
      semester: subject.semester?._id || subject.semester,
      description: subject.description || "",
    })

    // Load related data
    await loadCoursesForDept(subject.department?._id || subject.department)
    await loadSemestersForCourse(subject.course?._id || subject.course)

    setShowModal(true)
  }

  const handleDelete = async () => {
    if (!deletingSubject) return

    try {
      setLoading(true)
      await apiDelete(`${ENDPOINTS.subjects.list}/${deletingSubject._id}`)
      notify("success", "Subject deleted successfully")
      setShowDeleteModal(false)
      setDeletingSubject(null)

      // Reload subjects
      const updatedSubjects = await apiGet(ENDPOINTS.subjects.list)
      setGlobalData((prev) => ({ ...prev, subjects: Array.isArray(updatedSubjects) ? updatedSubjects : [] }))
      onDataChange()
    } catch (error) {
      notify("error", error.message || "Failed to delete subject")
    } finally {
      setLoading(false)
    }
  }

  const openDeleteModal = (subject) => {
    setDeletingSubject(subject)
    setShowDeleteModal(true)
  }

  const resetForm = () => {
    setFormData({
      name: "",
      code: "",
      department: "",
      course: "",
      semester: "",
      description: "",
    })
    setEditingSubject(null)
    setAvailableCourses([])
    setAvailableSemesters([])
  }

  const resetModal = () => {
    setShowModal(false)
    resetForm()
  }

  return (
    <div className="subjects-manager">
      <Card className="shadow-sm">
        <Card.Header className="bg-white">
          <Row className="align-items-center">
            <Col>
              <h5 className="mb-0" style={{width:120}}>
                <FaBook className="me-2 text-info" />
                Subjects Management
              </h5>
            </Col>
            <Col xs="auto">
              <div className="d-flex gap-2">
                <InputGroup style={{ width: "200px" }}>
                  <InputGroup.Text>
                    <FaSearch />
                  </InputGroup.Text>
                  <Form.Control
                    size="sm"
                    placeholder="Search subjects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
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
                <Button variant="info" size="sm" onClick={() => setShowModal(true)}>
                  <FaPlus className="me-1" />
                  Add Subject
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
                  <th>Subject Name</th>
                  <th>Code</th>
                  <th>Department</th>
                  <th>Course</th>
                  <th>Semester</th>
                  <th style={{ width: "120px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubjects.map((subject, index) => (
                  <tr key={subject._id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        {/* <FaBook className="me-2 text-muted"  /> */}
                        <div>
                          <div>{subject.name}</div>
                          {/* {subject.description && <small className="text-muted">{subject.description}</small>} */}
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge bg-primary">{subject.code}</span>
                    </td>
                    <td>
                      <span className="badge bg-secondary">{subject.department?.name || "-"}</span>
                    </td>
                    <td>
                      <span className="badge bg-success">{subject.course?.name || "-"}</span>
                    </td>
                    <td>
                      <span className="badge bg-warning text-dark">{subject.semester?.number || "-"}</span>
                    </td>
                    <td>
                      <div className="btn-group" role="group">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => handleEdit(subject)}
                          title="Edit Subject"
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => openDeleteModal(subject)}
                          title="Delete Subject"
                        >
                          <FaTrash />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredSubjects.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center py-4 text-muted">
                      <FaBook size={24} className="mb-2 opacity-50" />
                      <br />
                      {searchTerm || filterDept
                        ? "No subjects match your filters."
                        : "No subjects found. Add your first subject to get started."}
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={resetModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{editingSubject ? "Edit Subject" : "Add New Subject"}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Subject Name *</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g., Data Structures"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    required
                    autoFocus
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Subject Code *</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g., CS201"
                    value={formData.code}
                    onChange={(e) => setFormData((prev) => ({ ...prev, code: e.target.value }))}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Department *</Form.Label>
                  <Form.Select
                    value={formData.department}
                    onChange={(e) => handleDepartmentChange(e.target.value)}
                    required
                  >
                    <option value="">Select Department</option>
                    {departments.map((dept) => (
                      <option key={dept._id} value={dept._id}>
                        {dept.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Course *</Form.Label>
                  <Form.Select
                    value={formData.course}
                    onChange={(e) => handleCourseChange(e.target.value)}
                    required
                    disabled={!formData.department}
                  >
                    <option value="">Select Course</option>
                    {availableCourses.map((course) => (
                      <option key={course._id} value={course._id}>
                        {course.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Semester *</Form.Label>
                  <Form.Select
                    value={formData.semester}
                    onChange={(e) => setFormData((prev) => ({ ...prev, semester: e.target.value }))}
                    required
                    disabled={!formData.course}
                  >
                    <option value="">Select Semester</option>
                    {availableSemesters.map((semester) => (
                      <option key={semester._id} value={semester._id}>
                        {semester.number}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Optional description of the subject"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={resetModal}>
              Cancel
            </Button>
            <Button type="submit" variant="info" disabled={loading}>
              {loading && <Spinner size="sm" className="me-2" />}
              {editingSubject ? "Update" : "Create"} Subject
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
          <p>Are you sure you want to delete the subject:</p>
          <strong>
            "{deletingSubject?.name}" ({deletingSubject?.code})
          </strong>
          <p className="text-muted mt-2">
            Department: {deletingSubject?.department?.name}
            <br />
            Course: {deletingSubject?.course?.name}
            <br />
            Semester: {deletingSubject?.semester?.number}
          </p>
          <p className="text-danger mt-2 mb-0">
            <small>This action cannot be undone and may affect related notes and resources.</small>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete} disabled={loading}>
            {loading && <Spinner size="sm" className="me-2" />}
            Delete Subject
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
