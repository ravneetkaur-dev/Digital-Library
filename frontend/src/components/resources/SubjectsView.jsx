import { Row, Col, Button, Form, Spinner } from "react-bootstrap"
import { FaArrowLeft, FaSearch } from "react-icons/fa"
import LoadingSpinner from "./LoadingSpinner"
import ErrorAlert from "./ErrorAlert"

const SubjectsView = ({
  selectedCourse,
  semesters,
  selectedSemester,
  filteredSubjects,
  searchTerm,
  loadingSemesters,
  loadingSubjects,
  error,
  onBack,
  onSelectSemester,
  onSearchChange,
  onSelectSubject,
  onErrorClose,
}) => {
  return (
    <div className="res-slide-in">
      <Button className="res-back-button mb-4" onClick={() => onBack("courses")}>
        <FaArrowLeft className="me-2" />
        Back to Courses
      </Button>

      <ErrorAlert error={error} onClose={onErrorClose} />
      <h3 className="res-section-title">{selectedCourse.name} Subjects</h3>

      {/* Semester Dropdown */}
      <div className="res-semester-dropdown-container">
        <Row className="align-items-center">
          <Col md={6}>
            <Form.Label className="fw-bold mb-2">Select Semester:</Form.Label>
            {loadingSemesters ? (
              <div className="d-flex align-items-center">
                <Spinner size="sm" animation="border" className="me-2" />
                <span>Loading semesters...</span>
              </div>
            ) : (
              <Form.Select
                className="res-semester-dropdown"
                value={selectedSemester}
                onChange={(e) => onSelectSemester(e.target.value)}
              >
                <option value="">Choose Semester...</option>
                {semesters.map((sem) => (
                  <option key={sem._id} value={sem._id}>
                    Semester {sem.number}
                  </option>
                ))}
              </Form.Select>
            )}
          </Col>
          <Col md={6}>
            <Form.Label className="fw-bold text-navy mb-2">Search Subjects:</Form.Label>
            <div className="position-relative">
              <Form.Control
                type="text"
                placeholder="Search by subject name or code..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="res-search-input"
                disabled={!selectedSemester || loadingSubjects}
              />
              <FaSearch className="position-absolute top-50 end-0 translate-middle-y me-3 text-muted" />
            </div>
          </Col>
        </Row>
      </div>

      {/* Subjects Table */}
      {selectedSemester && (
        <div className="res-subjects-table-container">
          {loadingSubjects ? (
            <LoadingSpinner text="Loading subjects..." />
          ) : (
            <div className="table-responsive">
              <table className="table res-subjects-table">
                <thead>
                  <tr>
                    <th>Subject Name</th>
                    <th>Subject Code</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubjects.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="text-center py-4">
                        {searchTerm
                          ? "No subjects found matching your search."
                          : "No subjects available for this semester."}
                      </td>
                    </tr>
                  ) : (
                    filteredSubjects.map((subject) => (
                      <tr key={subject._id}>
                        <td>
                          <div className="res-subject-name">{subject.name}</div>
                        </td>
                        <td>
                          <div className="res-subject-code">{subject.code}</div>
                        </td>
                        <td>
                          <Button className="res-subject-action-btn" onClick={() => onSelectSubject(subject)}>
                            View Resources
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SubjectsView
