import { Row, Col, Card } from "react-bootstrap"
import { FaChevronRight } from "react-icons/fa"
import { getDepartmentIcon, getDepartmentDescription } from "../../utils/resourcesHelpers"
import LoadingSpinner from "./LoadingSpinner"
import ErrorAlert from "./ErrorAlert"

const DepartmentsView = ({ departments, loadingDepartments, error, onSelectDepartment, onErrorClose }) => {
  return (
    <div className="res-fade-in">
      <ErrorAlert error={error} onClose={onErrorClose} />
      <h3 className="res-section-title">Select Department</h3>
      {loadingDepartments ? (
        <LoadingSpinner text="Loading departments..." />
      ) : (
        <Row className="g-4">
          {departments.map((dept) => {
            const Icon = getDepartmentIcon(dept.name) // get the component type
            return (
              <Col key={dept._id} md={6}>
                <Card className="h-100 res-department-card" onClick={() => onSelectDepartment(dept)}>
                  <Card.Body>
                    <div className="res-department-icon">
                      <Icon size={32} /> {/* render the component */}
                    </div>
                    <div className="res-large-card-content">
                      <h4 className="res-large-card-title">{dept.name}</h4>
                      <p className="res-large-card-description">{getDepartmentDescription(dept.name)}</p>
                    </div>
                    <FaChevronRight className="res-chevron-icon" />
                  </Card.Body>
                </Card>
              </Col>
            )
          })}
        </Row>
      )}
    </div>
  )
}

export default DepartmentsView
