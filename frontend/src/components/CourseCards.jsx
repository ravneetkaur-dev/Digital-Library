import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { courses } from "../utils/courses.js";
import "./CourseCard.css";

export const CourseCard = () => {
  return (
    <section className="banner-cards-section py-5">
      <Container>
        <Row className="g-4">
          {courses.map((course) => (
            <Col xs={12} sm={6} md={3} key={course.id}>
              <Link
                to={`/course/${course.id}`}
                className="text-decoration-none text-dark"
              >
                <div className="course-card clickable-card">
                  <div
                    className="course-card-header"
                    style={{ backgroundImage: `url('${course.image}')` }}
                  ></div>
                  <div className="course-card-icon">
                    <img src={course.icon} alt={`${course.name} Icon`} />
                  </div>
                  <div className="course-card-body">
                    <h3 className="course-title">{course.id}</h3>
                  </div>
                </div>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};
