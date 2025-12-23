import { Row, Col, Card, Button } from "react-bootstrap";
import { FaArrowLeft, FaBookOpen, FaDownload, FaEye } from "react-icons/fa";
import LoadingSpinner from "./LoadingSpinner";
import ErrorAlert from "./ErrorAlert";
import { handleDownload } from "../../utils/resourcesHelpers";
import { handleView } from "../../utils/resourcesHelpers";

const BooksView = ({ selectedSubject, books, loadingBooks, error, onBack, onErrorClose }) => {
  return (
    <div className="res-slide-in">
      <Button className="res-back-button mb-4" onClick={() => onBack("resources")}>
        <FaArrowLeft className="me-2" />
        Back to Resources
      </Button>

      <ErrorAlert error={error} onClose={onErrorClose} />
      <h3 className="res-section-title">Reference Books - {selectedSubject.name}</h3>

      {loadingBooks ? (
        <LoadingSpinner text="Loading books..." />
      ) : (
        <Row className="g-4">
          {books.length === 0 ? (
            <Col>
              <div className="text-center py-5">
                <p className="text-muted">No books available for this subject.</p>
              </div>
            </Col>
          ) : (
            books.map((book) => (
              <Col md={6} lg={4} key={book._id}>
                <Card className="res-book-card h-100">
                  <Card.Body>
                    <div className="res-book-header">
                      <div className="res-book-icon">
                        <FaBookOpen size={32} />
                      </div>
                    </div>

                    <h5 className="res-book-title">{book.title}</h5>
                    <p className="res-book-author">by {book.author}</p>

                    <div className="res-book-details">
                      <div className="res-book-detail">
                        <strong>Subject:</strong> {book.subject?.name || "N/A"}
                      </div>
                      <div className="res-book-detail">
                        <strong>Semester:</strong> {book.semester?.number || "N/A"}
                      </div>
                      <div className="res-book-detail">
                        <strong>Year:</strong> {book.year}
                      </div>
                      {book.isbn && (
                        <div className="res-book-detail">
                          <strong>ISBN:</strong> {book.isbn}
                        </div>
                      )}
                    </div>

                    <div className="res-book-actions">
                      {/* <Button
                        className="res-book-btn res-book-btn-download"
                        onClick={() => handleDownload(book.fileUrl, book.originalname)}
                      >
                        <FaDownload className="me-1" />
                        Download
                      </Button> */}
                      <Button
                        className="res-book-btn res-book-btn-download"
                        variant="secondary"
                        onClick={() => handleView(book.fileUrl)}
                      >
                        <FaEye className="me-1" />
                        View
                      </Button>

                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>
      )}
    </div>
  );
};

export default BooksView;
