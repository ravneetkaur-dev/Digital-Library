import { useState, useEffect } from "react"
import { Container, Row, Col, Nav, Tab, Alert } from "react-bootstrap"
import { FaGraduationCap, FaBuilding, FaBook, FaCalendarAlt } from "react-icons/fa"
import DepartmentsManager from "./academics/DepartmentsManager"
import CoursesManager from "./academics/CoursesManager"
import SemestersManager from "./academics/SemestersManager"
import SubjectsManager from "./academics/SubjectsManager"
import { apiGet, ENDPOINTS } from "../../utils/api"
import './academics.css';

export default function AcademicsManager() {
  const [activeTab, setActiveTab] = useState("departments")
  const [message, setMessage] = useState(null)
  const [globalData, setGlobalData] = useState({
    departments: [],
    courses: [],
    semesters: [],
    subjects: [],
  })

  const notify = (type, text) => {
    setMessage({ type, text })
    setTimeout(() => setMessage(null), 3000)
  }

  const loadAllData = async () => {
    try {
      const [departments, subjects] = await Promise.all([
        apiGet(ENDPOINTS.course.departments.list),
        apiGet(ENDPOINTS.subjects.list),
      ])

      setGlobalData((prev) => ({
        ...prev,
        departments: Array.isArray(departments) ? departments : [],
        subjects: Array.isArray(subjects) ? subjects : [],
      }))
    } catch (error) {
      notify("error", "Failed to load data")
    }
  }

  useEffect(() => {
    loadAllData()
  }, [])

  const refreshData = (type) => {
    if (type === "all") {
      loadAllData()
    } else {
      // Refresh specific data type
      loadAllData()
    }
  }

  return (
    <div className="academics-manager">
      <Container fluid>
        <div className="academics-header mb-4">
          <h2 className="text-primary">
            <FaGraduationCap className="me-2" />
            Academic Structure Management
          </h2>
          <p className="text-white">Manage departments, courses, semesters, and subjects</p>
        </div>

        {message && (
          <Alert
            variant={message.type === "success" ? "success" : "danger"}
            dismissible
            onClose={() => setMessage(null)}
            className="mb-4"
          >
            {message.text}
          </Alert>
        )}

        <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
          <Row>
            <Col md={3}>
              <Nav variant="pills" className="flex-column academics-nav">
                <Nav.Item>
                  <Nav.Link eventKey="departments" className="academics-nav-link">
                    <FaBuilding className="me-2" />
                    Departments
                    <span className="badge bg-primary ms-auto">{globalData.departments.length}</span>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="courses" className="academics-nav-link">
                    <FaBook className="me-2" />
                    Courses
                    <span className="badge bg-success ms-auto">{globalData.courses.length}</span>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="semesters" className="academics-nav-link">
                    <FaCalendarAlt className="me-2" />
                    Semesters
                    <span className="badge bg-warning ms-auto">{globalData.semesters.length}</span>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="subjects" className="academics-nav-link">
                    <FaBook className="me-2" />
                    Subjects
                    <span className="badge bg-info ms-auto">{globalData.subjects.length}</span>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>

            <Col md={9}>
              <Tab.Content>
                <Tab.Pane eventKey="departments">
                  <DepartmentsManager
                    notify={notify}
                    onDataChange={() => refreshData("departments")}
                    departments={globalData.departments}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="courses">
                  <CoursesManager
                    notify={notify}
                    onDataChange={() => refreshData("courses")}
                    departments={globalData.departments}
                    courses={globalData.courses}
                    setGlobalData={setGlobalData}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="semesters">
                  <SemestersManager
                    notify={notify}
                    onDataChange={() => refreshData("semesters")}
                    departments={globalData.departments}
                    courses={globalData.courses}
                    semesters={globalData.semesters}
                    setGlobalData={setGlobalData}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="subjects">
                  <SubjectsManager
                    notify={notify}
                    onDataChange={() => refreshData("subjects")}
                    globalData={globalData}
                    setGlobalData={setGlobalData}
                  />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </div>
  )
}
