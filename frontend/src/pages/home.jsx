import { Header } from "../components/Header/Header";
import { NavBar } from "../components/NavBar/NavBar";
import { Container, Carousel, Row, Col } from "react-bootstrap";
import { CourseCard} from '../components/CourseDetails/CourseCards';
import { Footer } from "../components/Footer/Footer";
import "./Home.css";

export const Home = () => {
  return (
    <>
      <Header />
      <NavBar />

      <Carousel fade interval={3000} controls={true} indicators={false} pause={false} className="home-carousel">
        <Carousel.Item>
          <div className="home-main d-flex align-items-center">
            <Container>
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
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div
            className="carousel-image-only"
            style={{ backgroundImage: "url('/images/maimt1.jpg')" }}
          ></div>
        </Carousel.Item>

        <Carousel.Item>
          <div
            className="carousel-image-only"
            style={{ backgroundImage: "url('/images/Ullaas-2025.jpg')" }}
          ></div>
        </Carousel.Item>

        <Carousel.Item>
          <div
            className="carousel-image-only"
            style={{ backgroundImage: "url('/images/Ullaas-2024-1.jpg')" }}
          ></div>
        </Carousel.Item>
      </Carousel>


      <div className="page-content" style={{ backgroundColor: "snow" }}>
        <Container fluid>
          <Row className="border shadow-lg content-row align-items-center">
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

          <CourseCard />
        </Row>
        
      </Container>
      <Footer />
    </>
  );
};
