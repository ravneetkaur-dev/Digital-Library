import { useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { courses, semesters, subjects } from "../utils/courses";
import "./CourseCard.css";

export const DataComponent = ({ data, mode, title, initialCourse }) => {
  const [selectedCourse, setSelectedCourse] = useState(initialCourse || null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const handleBack = () => {
    if (selectedSubject) {
      setSelectedSubject(null);
    } else if (selectedSemester) {
      setSelectedSemester(null);
    } else if (selectedCourse) {
      setSelectedCourse(null);
    }
  };

  return (
    <>
    <div className="data-hero text-white text-center py-5">
                <h1 className="display-4 fw-bold">{title}</h1>
        </div>
    <section className="py-5">
      <Container>
        

        {(selectedCourse || selectedSemester || selectedSubject) && (
          <Button variant="secondary" className="mb-4" onClick={handleBack}>
            ← Back
          </Button>
        )}

        {!selectedCourse && (
          <>
            <h3 className="mb-3">Choose a Course</h3>
            <Row className="g-4">
              {data.map((course) => {
                const courseMeta = courses.find((c) => c.id === course.id);
                return (
                  <Col xs={12} sm={6} md={3} key={course.id}>
                    <div className="course-card">
                      <div
                        className="course-card-header"
                        style={{
                          backgroundImage: `url('${courseMeta?.image || ""}')`,
                        }}
                      ></div>
                      <div className="course-card-icon">
                        <img
                          src={courseMeta?.icon || ""}
                          alt={`${course.id} Icon`}
                        />
                      </div>
                      <div className="course-card-body">
                        <h3 className="course-title">{course.id}</h3>
                        <p>{course.name}</p>
                        <Button
                          variant="light"
                          className="course-btn"
                          onClick={() => setSelectedCourse(course)}
                        >
                          View Semesters
                        </Button>
                      </div>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </>
        )}

        {selectedCourse && !selectedSemester && (
          <>
            <h3 className="mb-3">{selectedCourse.name} - Semesters</h3>
            <Row className="g-4">
              {selectedCourse.semesters.map((sem) => {
                const semMeta = semesters.find((s) => s.id === sem.id) || {};
                return (
                  <Col xs={12} sm={6} md={3} key={sem.id}>
                    <div className="course-card">
                      <div
                        className="course-card-header"
                        style={{
                          backgroundImage: `url('${semMeta.image}')`,
                        }}
                      ></div>
                      <div className="course-card-icon">
                        <img src={semMeta.icon} alt="Semester Icon" />
                      </div>
                      <div className="course-card-body">
                        <h3 className="course-title">{sem.name}</h3>
                        <Button
                          variant="light"
                          className="course-btn"
                          onClick={() => setSelectedSemester(sem)}
                        >
                          View Subjects
                        </Button>
                      </div>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </>
        )}

        {selectedSemester && !selectedSubject && (
          <>
            <h3 className="mb-3">{selectedSemester.name} - Subjects</h3>
            <Row className="g-4">
              {selectedSemester.subjects.map((subject, index) => {
                const subjectMeta = subjects.find(
                  (s) => s.name === subject.name
                ) || {};
                return (
                  <Col xs={12} sm={6} md={4} key={index}>
                    <div className="course-card">
                      <div
                        className="course-card-header"
                        style={{
                          backgroundImage: `url('${subjectMeta.image}')`,
                        }}
                      ></div>
                      <div className="course-card-icon">
                        <img src={subjectMeta.icon} alt="Subject Icon" />
                      </div>
                      <div className="course-card-body">
                        <h3 className="course-title">{subject.name}</h3>
                        <Button
                        variant="light"
                          className="course-btn"
                          onClick={() => setSelectedSubject(subject)}
                        >
                          View {mode.charAt(0).toUpperCase() + mode.slice(1)}
                        </Button>
                      </div>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </>
        )}

     {selectedSubject && (
            <>
              <h4 className="mb-3 fw-semibold">
                {selectedSubject.name} - 
              </h4>
              <Row className="g-4">
                <Col xs={12}>
                  <Card className="shadow-sm border-0">
                    <Card.Body>
                      {mode === "papers" &&
                        selectedSubject.papers?.map((paper, i) => (
                          <div key={i} className="d-flex justify-content-between align-items-center mb-3">
                            <strong>{paper.label}</strong>
                            <div>
                              <Button
                                variant="success"
                                size="sm"
                                href={paper.path}
                                download
                                className="me-2"
                              >
                                Download
                              </Button>
                              <Button
                                variant="outline-dark"
                                size="sm"
                                href={paper.path}
                                target="_blank"
                                rel="noreferrer"
                              >
                                View
                              </Button>
                            </div>
                          </div>
                        ))}

                      {mode === "books" &&
                        selectedSubject.books?.map((book, i) => (
                          <div key={i} className="d-flex justify-content-between align-items-center mb-3">
                            <strong>{book.title}</strong>
                            <div>
                              <Button
                                variant="success"
                                size="sm"
                                href={book.path}
                                download
                                className="me-2"
                              >
                                Download
                              </Button>
                              <Button
                                variant="outline-dark"
                                size="sm"
                                href={book.path}
                                target="_blank"
                                rel="noreferrer"
                              >
                                View
                              </Button>
                            </div>
                          </div>
                        ))}

                      {mode === "syllabus" && selectedSubject.syllabus && (
                        <div className="d-flex justify-content-between align-items-center">
                          <strong>{selectedSubject.syllabus.label}</strong>
                          <div>
                            <Button
                              variant="success"
                              size="sm"
                              href={selectedSubject.syllabus.path}
                              download
                              className="me-2"
                            >
                              Download
                            </Button>
                            <Button
                              variant="outline-dark"
                              size="sm"
                              href={selectedSubject.syllabus.path}
                              target="_blank"
                              rel="noreferrer"
                            >
                              View
                            </Button>
                          </div>
                        </div>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </>
          )}
      </Container>
    </section>
    </>
  );
};
