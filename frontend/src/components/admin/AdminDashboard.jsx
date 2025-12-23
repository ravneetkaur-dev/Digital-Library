import { useEffect, useMemo, useState } from "react"
import { Card, Row, Col, Nav, Button, Spinner, Offcanvas } from "react-bootstrap"
import { FaUsersCog, FaUpload, FaBook, FaList, FaHome, FaComments, FaBars, FaTimes } from "react-icons/fa"
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

export const AdminDashboard = () => {
  const [active, setActive] = useState("overview")
  const [counts, setCounts] = useState({ faculty: 0, books: 0, syllabus: 0, papers: 0, feedback: 0 })
  const [loadingCounts, setLoadingCounts] = useState(true)
  const [showSidebar, setShowSidebar] = useState(false)
  
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

  const handleNavClick = (section) => {
    setActive(section)
    setShowSidebar(false) // Close sidebar on mobile after selection
  }

  const navigationItems = [
    { key: "overview", label: "Overview", icon: FaHome },
    { key: "faculty", label: "Faculty", icon: FaUsersCog },
    { key: "uploads", label: "Uploads", icon: FaUpload },
    { key: "academics", label: "Academics", icon: FaList },
    { key: "library", label: "Library", icon: FaBook },
    { key: "feedback", label: "Feedback", icon: FaComments },
  ]

  const SidebarContent = ({ isMobile = false }) => (
    <Nav variant="pills" className={`flex-column ${isMobile ? 'mobile-nav' : ''}`}>
      {navigationItems.map(({ key, label, icon: Icon }) => (
        <Nav.Link 
          key={key}
          active={active === key} 
          onClick={() => handleNavClick(key)}
          className={`sidebar-nav-link ${active === key ? 'active' : ''}`}
        >
          <Icon className="me-2" /> {label}
        </Nav.Link>
      ))}
    </Nav>
  )

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <Button
              variant="link"
              className="d-lg-none me-2 p-0 text-white mobile-menu-btn"
              onClick={() => setShowSidebar(true)}
              aria-label="Open navigation menu"
            >
              <FaBars size={20} />
            </Button>
            <h2 className="d-flex align-items-center gap-2 mb-0">
              <FaHome className="me-2" /> Admin Dashboard
            </h2>
          </div>
          {!isAuthed && (
            <div>
              <span className="badge bg-warning text-dark">Not logged in as admin</span>
            </div>
          )}
        </div>
      </header>

      <div className="admin-container">
        {/* Desktop Sidebar */}
        <aside className="admin-sidebar d-none d-lg-block">
          <div className="sidebar-content">
            <SidebarContent />
          </div>
        </aside>

        {/* Mobile Sidebar (Offcanvas) */}
        <Offcanvas 
          show={showSidebar} 
          onHide={() => setShowSidebar(false)} 
          placement="start"
          className="d-lg-none admin-mobile-sidebar"
        >
          <Offcanvas.Header closeButton className="admin-mobile-header">
            <Offcanvas.Title>
              <FaHome className="me-2" />
              Admin Panel
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="p-0">
            <SidebarContent isMobile={true} />
          </Offcanvas.Body>
        </Offcanvas>

        <main className="admin-content">
          {active === "overview" && (
            <div className="overview-section">
              <Row className="mb-4">
                <Col xs={12} sm={6} lg={3}>
                  <StatCard title="Faculty" value={counts.faculty} icon={<FaUsersCog size={28} />} />
                </Col>
                <Col xs={12} sm={6} lg={3}>
                  <StatCard title="Books" value={counts.books} icon={<FaBook size={28} />} />
                </Col>
                <Col xs={12} sm={6} lg={3}>
                  <StatCard title="Syllabus" value={counts.syllabus} icon={<FaList size={28} />} />
                </Col>
                <Col xs={12} sm={6} lg={3}>
                  <StatCard title="Papers" value={counts.papers} icon={<FaList size={28} />} />
                </Col>
                <Col xs={12} sm={6} lg={3}>
                  <StatCard title="Feedback" value={counts.feedback} icon={<FaComments size={28} />} />
                </Col>
              </Row>
              
              <Card className="shadow-sm">
                <Card.Header className="bg-white">
                  <strong>Quick Actions</strong>
                </Card.Header>
                <Card.Body>
                  <div className="d-flex flex-wrap gap-2">
                    <Button variant="outline-primary" onClick={() => handleNavClick("faculty")}>
                      Manage Faculty
                    </Button>
                    <Button variant="primary" onClick={() => handleNavClick("uploads")}>
                      Upload Content
                    </Button>
                    <Button variant="outline-secondary" onClick={() => handleNavClick("library")}>
                      View Library
                    </Button>
                    <Button variant="outline-info" onClick={() => handleNavClick("feedback")}>
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
            </div>
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
