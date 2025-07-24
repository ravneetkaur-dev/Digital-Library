import { Header } from "../components/Header";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/footer";
import { Container, Row, Col } from "react-bootstrap";
import "./Home.css";

export const Home = () => {
  return (
    <>
      <Header />
      <NavBar />

      <Container fluid className="home-main">
        <Row className="justify-content-start">
          <Col md="auto" className="main-section-quote">
            <p>
              <em>
                "Amidst shelves of words and wisdom, we discover ourselves - one
                page at a time."
              </em>
            </p>
          </Col>
        </Row>
      </Container>

      <div className="page-content" style={{ backgroundColor: "snow" }}>
        <Container fluid>
          <Row className="border shadow-lg mx-2 content-row align-items-center">
            <Col md={6} className="image-block d-none d-md-block"></Col>
            <Col xs={12} md={6} className="text-block">
              <h2 className="section-title">
                Explore. Learn. Grow.
              </h2>

              <p className="section-text">
                Welcome to the MAIMT Digital Library — a gateway beyond shelves
                and screens. Explore thousands of curated e-books, journals,
                syllabi, past papers, timetables, and resources anytime,
                anywhere.
              </p>

              <p className="quote-text">
                “Libraries store the energy that fuels the imagination.” —{" "}
                <em>Sidney Sheldon</em>
              </p>

              <p className="section-text">
                Here, timeless knowledge meets modern access, empowering you to
                learn, research, and grow at your own pace.
              </p>

              <p className="section-text">
                Dive in. Discover. <em>Your journey begins now.</em>
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      <Container fluid className="text-center mb-5" style={{ backgroundColor: "snow" }}>
        <Row className="border shadow-lg mx-2 pt-4">
          <h2 className="section-title">Discover Our Courses</h2>
          <p className="section-description">
            Choose your program and dive deep into digital resources curated just
            for you.
          </p>

        </Row>
        
      </Container>
      <Footer/>
    </>
  );
};
