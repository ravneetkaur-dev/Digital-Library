import { Container, Row, Col, Card } from "react-bootstrap";
import { Header } from "../components/Header/Header";
import { NavBar } from "../components/NavBar/NavBar";
import { Footer } from "../components/Footer/Footer";
import "./Rule.css"; 

export const Rules = () => {
  return (
    <>
      <Header />
      <NavBar />

      <div className="rules-hero text-white text-center py-5">
        <h1 className="display-4 fw-bold">Library Rules & Regulations</h1>
        <p className="lead">Guiding Principles for an Enriching Digital Learning Experience</p>
      </div>

      <section className="rules-content">
        <Container>
          <Row className="g-4 justify-content-center">
            <Col md={8}>
              <Card className="rules-card">
                <Card.Body>
                  <h3 className="rules-heading"> Campus Rules</h3>
                  <ul className="rules-list">
                    <li>Access is restricted to registered MAIMT students and staff only.</li>
                    <li>Keep your login credentials confidential and secure.</li>
                    <li>Respect all copyrights and intellectual property rights.</li>
                  </ul>

                  <h3 className="rules-heading"> Usage Policy</h3>
                  <ul className="rules-list">
                    <li>Use digital resources for study and research purposes only.</li>
                    <li>Sharing or selling downloaded content is strictly prohibited.</li>
                    <li>Always give proper credit when using library materials.</li>
                  </ul>

                  <h3 className="rules-heading"> Code of Conduct</h3>
                  <ul className="rules-list">
                    <li>Misuse of the library platform can lead to account suspension.</li>
                    <li>Report technical issues or misuse immediately to library staff.</li>
                    <li>Abide by all MAIMT policies and community standards.</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <Footer />
    </>
  );
};
