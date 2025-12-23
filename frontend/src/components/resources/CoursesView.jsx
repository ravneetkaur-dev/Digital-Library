import { Row, Col, Card, Button } from "react-bootstrap"
import { FaArrowLeft, FaChevronRight } from "react-icons/fa"
import { FiBookOpen } from "react-icons/fi"
import LoadingSpinner from "./LoadingSpinner"
import ErrorAlert from "./ErrorAlert"

const CoursesView = ({ selectedDept, courses, loadingCourses, error, onBack, onSelectCourse, onErrorClose }) => {
  return (
    <div className="res-slide-in">
      <Button className="res-back-button mb-4" onClick={() => onBack("departments")}>
        <FaArrowLeft className="me-2" />
        Back to Departments
      </Button>

      <ErrorAlert error={error} onClose={onErrorClose} />
      <h3 className="res-section-title">{selectedDept.name} Courses</h3>

      {loadingCourses ? (
        <LoadingSpinner text="Loading courses..." />
      ) : (
        <Row className="g-4">
          {courses.map((course) => (
            <Col key={course._id} md={6}>
              <Card className="h-100 res-course-card" onClick={() => onSelectCourse(course)}>
                <Card.Body>
                  <div className="res-course-icon">
                    <FiBookOpen size={32} />
                  </div>
                  <div className="res-large-card-content">
                    <h4 className="res-large-card-title">{course.name}</h4>
                  </div>
                  <FaChevronRight className="res-chevron-icon" />
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  )
}

export default CoursesView
