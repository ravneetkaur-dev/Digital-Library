
import { useState } from "react"
import { Container, Alert, Spinner } from "react-bootstrap"
import { useFacultyDashboard } from "../../hooks/useFacultyDashboard"
import { FacultySidebar } from "./FacultySidebar"
import { DashboardView } from "./DashboardView"
import { SubjectsView } from "./SubjectsView"
import { ProfileView } from "./ProfileView"
import { ProfileImageModal } from "./modals/ProfileImageModal"
import { AddNoteModal } from "./modals/AddNoteModal"
import { ChangePasswordModal } from "./modals/ChangePasswordModal"
import "./faculty-dashboard.css"

export const FacultyDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [showImageModal, setShowImageModal] = useState(false)
  const [showNoteModal, setShowNoteModal] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState("")

  const {
    facultyData,
    subjects,
    notes,
    loading,
    error,
    success,
    updateProfileImage,
    addNote,
    changePassword,
    toggleNoteVisibility,
    deleteNote,
    getSubjectNotes,
    clearMessages,
  } = useFacultyDashboard()

  const handleLogout = () => {
    localStorage.removeItem("faculty_data")
    localStorage.removeItem("faculty_token")
    window.location.href = "/"
  }

  const handleAddNote = (subject = "") => {
    setSelectedSubject(subject)
    setShowNoteModal(true)
  }

  const handleUpdateImage = () => {
    setShowImageModal(true)
  }

  const handleChangePassword = () => {
    setShowPasswordModal(true)
  }

  const handleViewSubjects = () => {
    setActiveTab("subjects")
  }

  // Access denied check
  if (!loading && !facultyData) {
    return (
      <Container className="mt-5">
        <div className="text-center">
          <Spinner animation="border" variant="primary" className="mb-3" />
          <h4>Access Denied</h4>
          <p>Faculty data not found. Please login again.</p>
          <button className="btn btn-primary" onClick={() => (window.location.href = "/")}>
            Go to Login
          </button>
        </div>
      </Container>
    )
  }

  // Loading state
  if (loading && !facultyData) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="mt-3">Loading dashboard...</p>
      </div>
    )
  }

  return (
    <div className="faculty-dashboard">
      <FacultySidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        facultyData={facultyData}
        onLogout={handleLogout}
      />

      <div className="faculty-content">
        <Container fluid>
          {error && (
            <Alert variant="danger" dismissible onClose={clearMessages}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert variant="success" dismissible onClose={clearMessages}>
              {success}
            </Alert>
          )}

          {activeTab === "dashboard" && (
            <DashboardView
              facultyData={facultyData}
              subjects={subjects}
              getSubjectNotes={getSubjectNotes}
              onAddNote={handleAddNote}
              onViewSubjects={handleViewSubjects}
              onUpdateImage={handleUpdateImage}
            />
          )}

          {activeTab === "subjects" && (
            <SubjectsView
              notes={notes}
              onAddNote={() => handleAddNote()}
              onToggleVisibility={toggleNoteVisibility}
              onDeleteNote={deleteNote}
            />
          )}

          {activeTab === "profile" && (
            <ProfileView
              facultyData={facultyData}
              subjects={subjects}
              onUpdateImage={handleUpdateImage}
              onChangePassword={handleChangePassword}
            />
          )}
        </Container>
      </div>

      {/* Modals */}
      <ProfileImageModal
        show={showImageModal}
        onHide={() => setShowImageModal(false)}
        onUpload={updateProfileImage}
        loading={loading}
      />

      <AddNoteModal
        show={showNoteModal}
        onHide={() => setShowNoteModal(false)}
        subjects={subjects}
        selectedSubject={selectedSubject}
        onAddNote={addNote}
        loading={loading}
      />

      <ChangePasswordModal
        show={showPasswordModal}
        onHide={() => setShowPasswordModal(false)}
        onChangePassword={changePassword}
        loading={loading}
      />
    </div>
  )
}
