
import { useEffect, useMemo, useState } from "react"
import { Card, Row, Col, Nav, Button, Spinner } from "react-bootstrap"
import { FaUsersCog, FaUpload, FaBook, FaList, FaHome, FaComments } from "react-icons/fa"
import "./admin.css"
import FacultyManager from "./FacultyManager"
import UploadManager from "./UploadManager"
import LibraryManager from "./LibraryManager"
import AcademicsManager from "./AcademicsManager"
import FeedbackManager from "./FeedbackManager"
import { apiGet, ENDPOINTS } from "../../utils/api"

const StatCard = ({ title, value, icon }) => (
  <Card className="mb-3 shadow-sm stat-card">
    <Card.Body className="d-flex align-items-center justify-content-between">
      <div>
        <div className="text-muted">{title}</div>
        <div className="h4 mb-0 fw-bold">{value}</div>
      </div>
      <div className="text-primary" aria-hidden>
        {icon}
      </div>
    </Card.Body>
  </Card>
)

export const AdminDashboard=()=> {
  const [active, setActive] = useState("overview")
  const [counts, setCounts] = useState({ faculty: 0, books: 0, syllabus: 0, papers: 0, feedback: 0 })
  const [loadingCounts, setLoadingCounts] = useState(true)
  const isAuthed = useMemo(() => {
    if (typeof window === "undefined") return false
    return !!localStorage.getItem("admin_token")
  }, [])

  useEffect(() => {
    let mounted = true
    async function loadCounts() {
      try {
        setLoadingCounts(true)
        const [faculty, books, syllabus, papers, feedback] = await Promise.allSettled([
          apiGet(ENDPOINTS.faculty.list),
          apiGet(ENDPOINTS.books.list),
          apiGet(ENDPOINTS.syllabus.list),
          apiGet(ENDPOINTS.papers.list),
          apiGet(ENDPOINTS.feedback.list),
        ])
        if (!mounted) return

        setCounts({
          faculty: faculty.status === "fulfilled" ? (Array.isArray(faculty.value) ? faculty.value.length : 0) : 0,
          books: books.status === "fulfilled" ? (Array.isArray(books.value) ? books.value.length : 0) : 0,
          syllabus: syllabus.status === "fulfilled" ? (Array.isArray(syllabus.value) ? syllabus.value.length : 0) : 0,
          papers: papers.status === "fulfilled" ? (Array.isArray(papers.value) ? papers.value.length : 0) : 0,
          feedback: feedback.status === "fulfilled" ? (Array.isArray(feedback.value) ? feedback.value.length : 0) : 0,
        })
      } catch (_e) {
        // ignore, already handled by settled
      } finally {
        if (mounted) setLoadingCounts(false)
      }
    }
    loadCounts()
    return () => {
      mounted = false
    }
  }, [])

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h2 className="d-flex align-items-center gap-2">
          <FaHome className="me-2" /> Admin Dashboard
        </h2>
        {!isAuthed && (
          <div className="mt-2">
            <span className="badge bg-warning text-dark">You are not logged in as admin. Some actions may fail.</span>
          </div>
        )}
      </header>

      <div className="admin-container">
        <aside className="admin-sidebar p-2">
          <Nav variant="pills" className="flex-column">
            <Nav.Link active={active === "overview"} onClick={() => setActive("overview")}>
              <FaHome className="me-2" /> Overview
            </Nav.Link>
            <Nav.Link active={active === "faculty"} onClick={() => setActive("faculty")}>
              <FaUsersCog className="me-2" /> Faculty
            </Nav.Link>
            <Nav.Link active={active === "uploads"} onClick={() => setActive("uploads")}>
              <FaUpload className="me-2" /> Uploads
            </Nav.Link>
            <Nav.Link active={active === "academics"} onClick={() => setActive("academics")}>
              <FaList className="me-2" /> Academics
            </Nav.Link>
            <Nav.Link active={active === "library"} onClick={() => setActive("library")}>
              <FaBook className="me-2" /> Library
            </Nav.Link>
            <Nav.Link active={active === "feedback"} onClick={() => setActive("feedback")}>
              <FaComments className="me-2" /> Feedback
            </Nav.Link>
          </Nav>
        </aside>

        <main className="admin-content">
          {active === "overview" && (
            <>
              <Row className="mb-4">
                <Col md={6} lg={3}>
                  <StatCard title="Faculty" value={counts.faculty} icon={<FaUsersCog size={28} />} />
                </Col>
                <Col md={6} lg={3}>
                  <StatCard title="Books" value={counts.books} icon={<FaBook size={28} />} />
                </Col>
                <Col md={6} lg={3}>
                  <StatCard title="Syllabus" value={counts.syllabus} icon={<FaList size={28} />} />
                </Col>
                <Col md={6} lg={3}>
                  <StatCard title="Papers" value={counts.papers} icon={<FaList size={28} />} />
                </Col>
                <Col md={6} lg={3}>
                  <StatCard title="Feedback" value={counts.feedback} icon={<FaComments size={28} />} />
                </Col>
              </Row>
              <Card className="shadow-sm">
                <Card.Header className="bg-white">
                  <strong>Quick Actions</strong>
                </Card.Header>
                <Card.Body>
                  <div className="d-flex flex-wrap gap-2">
                    <Button variant="outline-primary" onClick={() => setActive("faculty")}>
                      Manage Faculty
                    </Button>
                    <Button variant="primary" onClick={() => setActive("uploads")}>
                      Upload Content
                    </Button>
                    <Button variant="outline-secondary" onClick={() => setActive("library")}>
                      View Library
                    </Button>
                    <Button variant="outline-info" onClick={() => setActive("feedback")}>
                      View Feedback
                    </Button>
                  </div>
                </Card.Body>
              </Card>
              {loadingCounts && (
                <div className="mt-3 text-muted d-flex align-items-center gap-2">
                  <Spinner size="sm" animation="border" /> Refreshing counts...
                </div>
              )}
            </>
          )}

          {active === "faculty" && <FacultyManager />}

          {active === "uploads" && <UploadManager />}

          {active === "academics" && <AcademicsManager />}

          {active === "library" && <LibraryManager />}

          {active === "feedback" && <FeedbackManager />}
        </main>
      </div>
    </div>
  )
}
