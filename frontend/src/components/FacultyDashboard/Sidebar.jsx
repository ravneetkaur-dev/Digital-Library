import { Nav } from "react-bootstrap";
import {
  FaUser,
  FaFileAlt,
  FaSignOutAlt,
  FaTachometerAlt,
  FaCog,
  FaQuestionCircle
} from "react-icons/fa";
import "./Sidebar.css";

export const Sidebar = ({ onSelect }) => {
  return (
    <div className="custom-sidebar d-flex flex-column p-4">
      <h5 className="text-white mb-4 text-start fw-bold">Faculty Panel</h5>
      <Nav className="flex-column">
        <Nav.Link onClick={() => onSelect("dashboard")}>
          <FaTachometerAlt className="sidebar-icon" />
          <span className="sidebar-label">Dashboard</span>
        </Nav.Link>

        <Nav.Link onClick={() => onSelect("profile")}>
          <FaUser className="sidebar-icon" />
          <span className="sidebar-label">My Profile</span>
        </Nav.Link>
        <Nav.Link onClick={() => onSelect("files")}>
          <FaFileAlt className="sidebar-icon" />
          <span className="sidebar-label">My Files</span>
        </Nav.Link>
        {/* <Nav.Link onClick={() => onSelect("settings")}>
          <FaCog className="sidebar-icon" />
          <span className="sidebar-label">Settings</span>
        </Nav.Link> */}
        {/* <Nav.Link onClick={() => onSelect("help")}>
          <FaQuestionCircle className="sidebar-icon" />
          <span className="sidebar-label">Help</span>
        </Nav.Link> */}
        <Nav.Link className="text-danger mt-auto" onClick={() => onSelect("logout")}>
          <FaSignOutAlt className="sidebar-icon" />
          <span className="sidebar-label">Logout</span>
        </Nav.Link>
      </Nav>
    </div>
  );
};
