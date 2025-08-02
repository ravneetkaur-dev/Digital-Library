import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Sidebar } from "./Sidebar";
import { FacultyProfile } from "./FacultyProfile";
import { FullFacultyProfile } from "./FullFacultyProfile"; 
import { SubjectScroller } from "./SubjectScroller";
import { SubjectDetails } from "./SubjectDetails";
import { MyFiles } from "./MyFiles";
import { Header } from "./Header";
import { Footer } from "./Footer";
import "./FacultyDashboard.css";

export const FacultyDashboard = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedPanel, setSelectedPanel] = useState("dashboard");

  return (
    <>
      <Header />
      <Container fluid className="faculty-dashboard">
        <Row className="flex-nowrap">
          <Col md={3} className="sidebar-wrapper px-0">
            <Sidebar onSelect={setSelectedPanel} />
          </Col>

          <Col md={9} className="main-content py-4 px-5">
          {selectedPanel === "profile" ? (
            <FullFacultyProfile />
          ) : selectedPanel === "files" ? (
            <MyFiles />
          ) : (
            <>
              <div className="profile-section mb-4">
                <FacultyProfile />
              </div>

              <div className="subject-scroller-section mb-4">
                <SubjectScroller onSelectSubject={setSelectedSubject} />
              </div>

              <div className="subject-details-section">
                {selectedSubject && <SubjectDetails subject={selectedSubject} />}
              </div>
            </>
          )}
        </Col>

        </Row>
      </Container>
      <Footer />
    </>
  );
};
