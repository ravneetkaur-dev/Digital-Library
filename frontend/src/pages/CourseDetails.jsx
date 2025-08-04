import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Header } from '../components/Header/Header';
import { NavBar } from '../components/NavBar/NavBar';
import { Footer } from '../components/Footer/Footer';
import { courses } from '../utils/courses';
import './CourseDetails.css';

export const CourseDetails = () => {
  const { courseId } = useParams();
  const course = courses.find((c) => c.id === courseId);

  if (!course) {
    return (
      <>
        <Header />
        <NavBar />
        <Container className="text-center py-5">
          <h2 className="text-danger">Course Not Found</h2>
        </Container>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <NavBar />

      <div className="course-details-wrapper" style={{ backgroundColor: 'snow' }}>
        <Container fluid className="pt-5 pb-4">
          <Row className="justify-content-center align-items-center">
            <Col xs={12} md={5} className="text-center">
              <img
                src={course.image}
                alt={course.id}
                className="course-image img-fluid shadow"
              />
            </Col>
            <Col xs={12} md={6} className="text-start px-4">
              <h2 className="course-title">{course.id}</h2>
              <h4 style={{color:"grey"}}><strong>{course.name}</strong></h4>
              
              <p className="course-duration"><strong>Duration:</strong> {course.duration} <br />
              <strong>Course Coordinator:</strong> {course.coordinator}
              </p>
              <p className="course-description">
                {course.description}
              </p>
              
            </Col>
          </Row>
        </Container>
      </div>

      <Footer />
    </>
  );
};
