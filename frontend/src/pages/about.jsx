import { Container, Row, Col, Card } from 'react-bootstrap';
import { Header } from '../components/Header';
import { NavBar } from '../components/NavBar';
import { Footer } from '../components/Footer';
import './about.css';

export const About = () => {
  return (
    <>
    <Header/>
    <NavBar/>
    <div className="about-page">

      <div className="about-hero text-white text-center py-5">
        <h1 className="display-4 fw-bold">About MAIMT</h1>
        <p className="lead">Building Future Leaders Through Knowledge & Values</p>
      </div>

      <section className="about-section section-history px-4 py-5">
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="mb-4 mb-md-0">
              <h2 className="section-title">Our Legacy</h2>
              <p className="section-text">
                Established in the heart of Yamunanagar, MAIMT has been a beacon of knowledge and growth since its inception.
                With a humble beginning and a powerful vision, we have grown into one of the most respected institutes in the region.
              </p>
              <p className="section-text">
                Our journey has been shaped by visionary leadership and unwavering commitment to holistic development.
              </p>
            </Col>
            <Col md={6}>
              <div className="image-card rounded shadow-lg">
                <img src="/images/maimt1.jpg" alt="Our History" className="img-fluid rounded" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="about-section section-academics py-5 bg-deep-blue">
        <Container>
          <h2 className="text-center section-title mb-5">Academic Excellence</h2>
          <Row className="g-4">
            <Col md={4}>
              <Card className="info-card p-4 rounded shadow">
                <Card.Body>
                  <Card.Title>Well-Curated Curriculum</Card.Title>
                  <Card.Text>Each course is tailored to align with industry demands and future skills.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="info-card p-4 rounded shadow">
                <Card.Body>
                  <Card.Title>Expert Faculty</Card.Title>
                  <Card.Text>Our educators bring real-world experience, delivering both theory and practical insights.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="info-card p-4 rounded shadow">
                <Card.Body>
                  <Card.Title>Practical Exposure</Card.Title>
                  <Card.Text>From case studies to live projects — students gain hands-on learning at every step.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="about-section section-student-life py-5 bg-light px-4">
        <Container>
          <Row className="align-items-center">
            <Col md={5} className="mb-4 mb-md-0">
              <img
                src="/images/maimt_pic2.jpg"
                alt="MAIMT Campus Life"
                className="img-fluid rounded shadow-lg"
              />
            </Col>

            <Col md={7}>
              <h2 className="section-title mb-4">Student Life & Culture</h2>
              <div className="timeline">
                <div className="timeline-item mb-4">
                  <h5>Everyday Moments</h5>
                  <p>From library mornings to chai breaks under the trees, MAIMT life is a mix of calm, chaos, and connection.</p>
                </div>
                <div className="timeline-item mb-4">
                  <h5>Creative Clubs & Hobby Classes</h5>
                  <p>Whether it's dance rhythms, brush strokes, or vocal notes — our campus encourages every creative spark through dedicated hobby classes and student-led groups.</p>
                </div>
                <div className="timeline-item mb-0">
                  <h5>Events That Stay With You</h5>
                  <p>Fests, workshops, open mics, hackathons — there's always a spark that keeps the spirit alive.</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="about-section section-why-us py-5 bg-light px-4">
        <Container>
          <Row className="align-items-center">
            <Col md={7}>
              <h2 className="section-title mb-4">What Makes Us Different</h2>
              <div className="timeline">
                <div className="timeline-item mb-4">
                  <h5>Supportive Mentors</h5>
                  <p>Faculty who genuinely care about your growth, both academic and personal.</p>
                </div>
                <div className="timeline-item mb-4">
                  <h5>Balanced Environment</h5>
                  <p>Disciplined yet flexible - a mix of structure and student freedom.</p>
                </div>
                <div className="timeline-item mb-0">
                  <h5>Placement-Ready Curriculum</h5>
                  <p>Practical knowledge, soft skills training, and internship support – all in one place.</p>
                </div>
              </div>
            </Col>

            <Col md={5} className="mt-4 mt-md-0">
              <img
                src="/images/maimt_pic1.jpg"
                alt="Why Choose Us"
                className="img-fluid rounded shadow-lg"
              />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="about-section section-whyus py-5 px-4 bg-deep-blue text-light">
        <Container className="text-center">
          <h2 className="section-title mb-4">Why MAIMT?</h2>
          <Row className="g-4 justify-content-center">
            <Col md={3}>
              <Card className="why-card p-3 rounded shadow">
                <Card.Body>
                  <Card.Title>Strong Alumni</Card.Title>
                  <Card.Text>Our graduates thrive at top companies and global institutions.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="why-card p-3 rounded shadow">
                <Card.Body>
                  <Card.Title>Ethical Education</Card.Title>
                  <Card.Text>We believe in nurturing integrity, empathy, and leadership values.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="why-card p-2 rounded shadow">
                <Card.Body>
                  <Card.Title>Placement Excellence</Card.Title>
                  <Card.Text>Consistently high placements and dedicated training support.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

    </div>
    <Footer/>

    </>
  );
};
