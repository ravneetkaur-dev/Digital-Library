"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, Row, Col, Form, Button, Table, Alert } from "react-bootstrap"
import { ENDPOINTS, apiGet, apiJson } from "../../utils/api"

export default function AcademicsManager() {
  // Lists
  const [departments, setDepartments] = useState([])
  const [courses, setCourses] = useState([])
  const [semesters, setSemesters] = useState([])
  const [subjects, setSubjects] = useState([])

  // Selections
  const [selectedDept, setSelectedDept] = useState("")
  const [selectedCourse, setSelectedCourse] = useState("")
  const [selectedSemester, setSelectedSemester] = useState("")

  // Forms
  const [deptName, setDeptName] = useState("")
  const [courseName, setCourseName] = useState("")
  const [semesterNumber, setSemesterNumber] = useState("")
  const [subjectName, setSubjectName] = useState("")
  const [subjectCode, setSubjectCode] = useState("")
  const [subjectDesc, setSubjectDesc] = useState("")

  // UI
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  function notify(type, text) {
    setMessage({ type, text })
    setTimeout(() => setMessage(null), 2500)
  }

  // Load base lists
  async function loadDepartments() {
    const data = await apiGet(ENDPOINTS.course.departments.list)
    setDepartments(Array.isArray(data) ? data : [])
  }

  async function loadSubjects() {
    const data = await apiGet(ENDPOINTS.subjects.list)
    setSubjects(Array.isArray(data) ? data : [])
  }

  async function loadCoursesForDept(deptId) {
    if (!deptId) {
      setCourses([])
      return
    }
    const data = await apiGet(ENDPOINTS.course.courses.byDepartment(deptId))
    setCourses(Array.isArray(data) ? data : [])
  }

  async function loadSemestersForCourse(courseId) {
    if (!courseId) {
      setSemesters([])
      return
    }
    const data = await apiGet(ENDPOINTS.course.semesters.byCourse(courseId))
    setSemesters(Array.isArray(data) ? data : [])
  }

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        setLoading(true)
        await Promise.all([loadDepartments(), loadSubjects()])
      } catch (e) {
        notify("error", e.message || "Failed to load data")
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => {
      mounted = false
    }
  }, [])

  // Cascade when department changes
  useEffect(() => {
    setSelectedCourse("")
    setSemesters([])
    if (selectedDept) {
      loadCoursesForDept(selectedDept)
    } else {
      setCourses([])
    }
  }, [selectedDept])

  // Cascade when course changes
  useEffect(() => {
    setSelectedSemester("")
    if (selectedCourse) {
      loadSemestersForCourse(selectedCourse)
    } else {
      setSemesters([])
    }
  }, [selectedCourse])

  // Create handlers
  async function handleCreateDepartment(e) {
    e.preventDefault()
    if (!deptName.trim()) return notify("error", "Enter department name")
    try {
      setLoading(true)
      await apiJson(ENDPOINTS.course.departments.create, {
        method: "POST",
        body: JSON.stringify({ name: deptName.trim() }),
      })
      setDeptName("")
      await loadDepartments()
      notify("success", "Department created")
    } catch (e) {
      notify("error", e.message || "Failed to create department")
    } finally {
      setLoading(false)
    }
  }

  async function handleCreateCourse(e) {
    e.preventDefault()
    if (!courseName.trim() || !selectedDept) {
      return notify("error", "Select department and enter course name")
    }
    try {
      setLoading(true)
      await apiJson(ENDPOINTS.course.courses.create, {
        method: "POST",
        body: JSON.stringify({ name: courseName.trim(), departmentId: selectedDept }),
      })
      setCourseName("")
      await loadCoursesForDept(selectedDept)
      notify("success", "Course created")
    } catch (e) {
      notify("error", e.message || "Failed to create course")
    } finally {
      setLoading(false)
    }
  }

  async function handleCreateSemester(e) {
    e.preventDefault()
    if (!semesterNumber.trim() || !selectedCourse) {
      return notify("error", "Select course and enter semester number/name")
    }
    try {
      setLoading(true)
      await apiJson(ENDPOINTS.course.semesters.create, {
        method: "POST",
        body: JSON.stringify({ number: semesterNumber.trim(), courseId: selectedCourse }),
      })
      setSemesterNumber("")
      await loadSemestersForCourse(selectedCourse)
      notify("success", "Semester created")
    } catch (e) {
      notify("error", e.message || "Failed to create semester")
    } finally {
      setLoading(false)
    }
  }

  async function handleCreateSubject(e) {
    e.preventDefault()
    if (!subjectName.trim() || !subjectCode.trim() || !selectedDept || !selectedCourse || !selectedSemester) {
      return notify("error", "Fill subject fields and select department, course, semester")
    }
    try {
      setLoading(true)
      await apiJson(ENDPOINTS.subjects.create, {
        method: "POST",
        body: JSON.stringify({
          name: subjectName.trim(),
          code: subjectCode.trim(),
          department: selectedDept,
          course: selectedCourse,
          semester: selectedSemester,
          description: subjectDesc.trim(),
        }),
      })
      setSubjectName("")
      setSubjectCode("")
      setSubjectDesc("")
      await loadSubjects()
      notify("success", "Subject created")
    } catch (e) {
      notify("error", e.message || "Failed to create subject")
    } finally {
      setLoading(false)
    }
  }

  const filteredSubjects = useMemo(() => {
    return subjects.filter((s) => {
      const okDept = selectedDept ? String(s.department?._id || s.department) === String(selectedDept) : true
      const okCourse = selectedCourse ? String(s.course?._id || s.course) === String(selectedCourse) : true
      const okSem = selectedSemester ? String(s.semester?._id || s.semester) === String(selectedSemester) : true
      return okDept && okCourse && okSem
    })
  }, [subjects, selectedDept, selectedCourse, selectedSemester])

  return (
    <div className="admin-content">
      {message && (
        <Alert variant={message.type === "success" ? "success" : "danger"} className="mb-3">
          {message.text}
        </Alert>
      )}

      <Row className="g-3">
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Header className="bg-white fw-bold">Add Department</Card.Header>
            <Card.Body>
              <Form onSubmit={handleCreateDepartment} className="d-flex gap-2">
                <Form.Control
                  placeholder="Department name (e.g., Computer Science)"
                  value={deptName}
                  onChange={(e) => setDeptName(e.target.value)}
                />
                <Button type="submit" variant="primary" disabled={loading}>
                  {loading ? "Saving..." : "Add"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Header className="bg-white fw-bold">Add Course</Card.Header>
            <Card.Body>
              <Form onSubmit={handleCreateCourse} className="d-flex gap-2">
                <Form.Select value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)}>
                  <option value="">Select Department</option>
                  {departments.map((d) => (
                    <option key={d._id} value={d._id}>
                      {d.name}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control
                  placeholder="Course name (e.g., B.Tech IT)"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                />
                <Button type="submit" variant="primary" disabled={loading || !selectedDept}>
                  {loading ? "Saving..." : "Add"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Header className="bg-white fw-bold">Add Semester</Card.Header>
            <Card.Body>
              <Form onSubmit={handleCreateSemester} className="d-flex flex-wrap gap-2">
                <Form.Select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="flex-grow-1"
                >
                  <option value="">Select Department</option>
                  {departments.map((d) => (
                    <option key={d._id} value={d._id}>
                      {d.name}
                    </option>
                  ))}
                </Form.Select>
                <Form.Select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  disabled={!selectedDept}
                  className="flex-grow-1"
                >
                  <option value="">{selectedDept ? "Select Course" : "Pick Department first"}</option>
                  {courses.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control
                  placeholder="Semester (e.g., 1, 2, 3, or First)"
                  value={semesterNumber}
                  onChange={(e) => setSemesterNumber(e.target.value)}
                />
                <Button type="submit" variant="primary" disabled={loading || !selectedCourse}>
                  {loading ? "Saving..." : "Add"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Header className="bg-white fw-bold">Add Subject</Card.Header>
            <Card.Body>
              <Form onSubmit={handleCreateSubject} className="space-y-3">
                <div className="d-flex flex-wrap gap-2">
                  <Form.Select
                    value={selectedDept}
                    onChange={(e) => setSelectedDept(e.target.value)}
                    className="flex-grow-1"
                  >
                    <option value="">Select Department</option>
                    {departments.map((d) => (
                      <option key={d._id} value={d._id}>
                        {d.name}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    disabled={!selectedDept}
                    className="flex-grow-1"
                  >
                    <option value="">{selectedDept ? "Select Course" : "Pick Department first"}</option>
                    {courses.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Select
                    value={selectedSemester}
                    onChange={(e) => setSelectedSemester(e.target.value)}
                    disabled={!selectedCourse}
                    className="flex-grow-1"
                  >
                    <option value="">{selectedCourse ? "Select Semester" : "Pick Course first"}</option>
                    {semesters.map((s) => (
                      <option key={s._id} value={s._id}>
                        {s.number}
                      </option>
                    ))}
                  </Form.Select>
                </div>
                <div className="d-flex flex-wrap gap-2">
                  <Form.Control
                    placeholder="Subject name (e.g., Data Structures)"
                    value={subjectName}
                    onChange={(e) => setSubjectName(e.target.value)}
                  />
                  <Form.Control
                    placeholder="Code (e.g., CS201)"
                    value={subjectCode}
                    onChange={(e) => setSubjectCode(e.target.value)}
                    style={{ maxWidth: 200 }}
                  />
                </div>
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder="Description (optional)"
                  value={subjectDesc}
                  onChange={(e) => setSubjectDesc(e.target.value)}
                />
                <div className="d-flex justify-content-end">
                  <Button type="submit" variant="primary" disabled={loading || !selectedSemester}>
                    {loading ? "Saving..." : "Add Subject"}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-3 mt-3">
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Header className="bg-white fw-bold">Departments</Card.Header>
            <Card.Body className="p-0">
              <div className="table-responsive">
                <Table hover size="sm" className="mb-0">
                  <thead>
                    <tr>
                      <th style={{ width: 60 }}>#</th>
                      <th>Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {departments.map((d, idx) => (
                      <tr key={d._id}>
                        <td>{idx + 1}</td>
                        <td>{d.name}</td>
                      </tr>
                    ))}
                    {!departments.length && (
                      <tr>
                        <td colSpan={2} className="text-muted text-center py-3">
                          No departments yet
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Header className="bg-white fw-bold">
              Courses {selectedDept ? "for Department" : ""}{" "}
              {selectedDept ? (
                <span className="text-muted">
                  ({departments.find((d) => String(d._id) === String(selectedDept))?.name || "Selected"})
                </span>
              ) : null}
            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-responsive">
                <Table hover size="sm" className="mb-0">
                  <thead>
                    <tr>
                      <th style={{ width: 60 }}>#</th>
                      <th>Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((c, idx) => (
                      <tr key={c._id}>
                        <td>{idx + 1}</td>
                        <td>{c.name}</td>
                      </tr>
                    ))}
                    {!courses.length && (
                      <tr>
                        <td colSpan={2} className="text-muted text-center py-3">
                          {selectedDept ? "No courses yet in this department" : "Pick a department to view courses"}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-3 mt-3">
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Header className="bg-white fw-bold">
              Semesters {selectedCourse ? "for Course" : ""}{" "}
              {selectedCourse ? (
                <span className="text-muted">
                  ({courses.find((c) => String(c._id) === String(selectedCourse))?.name || "Selected"})
                </span>
              ) : null}
            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-responsive">
                <Table hover size="sm" className="mb-0">
                  <thead>
                    <tr>
                      <th style={{ width: 60 }}>#</th>
                      <th>Number/Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {semesters.map((s, idx) => (
                      <tr key={s._id}>
                        <td>{idx + 1}</td>
                        <td>{s.number}</td>
                      </tr>
                    ))}
                    {!semesters.length && (
                      <tr>
                        <td colSpan={2} className="text-muted text-center py-3">
                          {selectedCourse ? "No semesters yet for this course" : "Pick a course to view semesters"}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Header className="bg-white fw-bold">Subjects</Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <Table hover size="sm" className="mb-0">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Code</th>
                      <th>Dept</th>
                      <th>Course</th>
                      <th>Sem</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSubjects.map((s) => (
                      <tr key={s._id}>
                        <td>{s.name}</td>
                        <td>{s.code}</td>
                        <td>{s.department?.name || "-"}</td>
                        <td>{s.course?.name || "-"}</td>
                        <td>{s.semester?.number || "-"}</td>
                      </tr>
                    ))}
                    {!filteredSubjects.length && (
                      <tr>
                        <td colSpan={5} className="text-muted text-center py-3">
                          {subjects.length ? "No subjects match current filters" : "No subjects yet"}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}


