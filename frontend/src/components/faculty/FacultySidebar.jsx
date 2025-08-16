
import { Nav } from "react-bootstrap"
import { FaHome, FaBook, FaUser, FaSignOutAlt } from "react-icons/fa"

export const FacultySidebar = ({ activeTab, setActiveTab, facultyData, onLogout }) => {
  return (
    <div className="faculty-sidebar">
      <div className="sidebar-header">
        <h4>Faculty Panel</h4>
        <small>{facultyData?.name}</small>
      </div>

      <Nav className="flex-column sidebar-nav">
        <Nav.Link
          className={`sidebar-link ${activeTab === "dashboard" ? "active" : ""}`}
          onClick={() => setActiveTab("dashboard")}
        >
          <FaHome /> Dashboard
        </Nav.Link>
        <Nav.Link
          className={`sidebar-link ${activeTab === "subjects" ? "active" : ""}`}
          onClick={() => setActiveTab("subjects")}
        >
          <FaBook /> My Subjects
        </Nav.Link>
        <Nav.Link
          className={`sidebar-link ${activeTab === "profile" ? "active" : ""}`}
          onClick={() => setActiveTab("profile")}
        >
          <FaUser /> Profile
        </Nav.Link>

        <hr className="sidebar-divider" />

        <Nav.Link className="sidebar-link text-danger" onClick={onLogout}>
          <FaSignOutAlt /> Logout
        </Nav.Link>
      </Nav>
    </div>
  )
}
