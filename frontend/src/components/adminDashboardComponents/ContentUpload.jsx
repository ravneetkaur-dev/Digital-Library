import { useState } from 'react';
import {
  Form,
  Button,
  Card,
  Container,
  Row,
  Col,
  Dropdown,
  DropdownButton,
  Alert,
} from 'react-bootstrap';
import axios from 'axios';

const defaultBook = {
  title: '',
  author: '',
  subject: '',
  semester: '',
  year: '',
  isbn: '',
  edition: '',
  pages: '',
  visibility: 'public',
  description: '',
};
const defaultSyllabus = {
  title: '',
  subject: '',
  semester: '',
  year: '',
  description: '',
};
const defaultPaper = {
  title: '',
  subject: '',
  semester: '',
  year: '',
  visibility: 'public',
  description: '',
};

export const ContentUpload = () => {
  const [selectedType, setSelectedType] = useState('Book');
  const [file, setFile] = useState(null);
  const [coverImage, setCoverImage] = useState(null); 
  const [resources, setResources] = useState([]); 
  const [formData, setFormData] = useState(defaultBook);
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const data = new FormData();

    if (selectedType === 'Book') {
      Object.entries(formData).forEach(([k, v]) => data.append(k, v));
      if (!file) return alert('Choose book file');
      data.append('file', file);
      if (coverImage) data.append('coverImage', coverImage);
      data.append('uploadedBy', 'adminUserId'); // Replace with real user ID

      await axios.post('http://localhost:5000/api/books/upload', data);
      setFormData(defaultBook);
    } else if (selectedType === 'Syllabus') {
      Object.entries(formData).forEach(([k, v]) => data.append(k, v));
      if (!file) return alert('Choose syllabus file');
      data.append('file', file);
      data.append('createdBy', 'adminUserId');

      await axios.post('http://localhost:5000/api/syllabus/uploadsyllabus', data);
      setFormData(defaultSyllabus);
    } else if (selectedType === 'Paper') {
      Object.entries(formData).forEach(([k, v]) => data.append(k, v));
      if (!resources.length) return alert('Upload at least one paper file');
      resources.forEach((r, i) => {
        data.append(`resources[${i}]`, r);
      });
      data.append('uploadedBy', 'adminUserId');

      await axios.post('http://localhost:5000/api/papers/upload', data);
      setFormData(defaultPaper);
    }

    setFile(null);
    setCoverImage(null);
    setResources([]);
    setSuccess(`${selectedType} uploaded successfully!`);
    setTimeout(() => setSuccess(''), 4000);
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
    setFormData(
      type === 'Book' ? defaultBook : type === 'Syllabus' ? defaultSyllabus : defaultPaper
    );
    setFile(null);
    setCoverImage(null);
    setResources([]);
    setSuccess('');
  };

  return (
    <Container className="my-5">
      <Card className="p-4 shadow">
        <h4 className="mb-4 text-primary">Upload Content</h4>
        <Row className="mb-3">
          <Col>
            <DropdownButton
              title={`Uploading: ${selectedType}`}
              onSelect={(e) => handleTypeChange(e)}
            >
              <Dropdown.Item eventKey="Book">Book</Dropdown.Item>
              <Dropdown.Item eventKey="Syllabus">Syllabus</Dropdown.Item>
              <Dropdown.Item eventKey="Paper">Paper</Dropdown.Item>
            </DropdownButton>
          </Col>
        </Row>

        <Form onSubmit={handleUpload}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Subject</Form.Label>
                <Form.Control
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Semester</Form.Label>
                <Form.Control
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Year</Form.Label>
                <Form.Control
                  name="year"
                  type="number"
                  value={formData.year}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            {selectedType === 'Book' && (
              <>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Author</Form.Label>
                    <Form.Control
                      name="author"
                      value={formData.author}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>ISBN</Form.Label>
                    <Form.Control
                      name="isbn"
                      value={formData.isbn}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Edition</Form.Label>
                    <Form.Control
                      name="edition"
                      value={formData.edition}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Pages</Form.Label>
                    <Form.Control
                      name="pages"
                      type="number"
                      value={formData.pages}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </>
            )}

            {(selectedType === 'Book' || selectedType === 'Paper') && (
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Visibility</Form.Label>
                  <Form.Select
                    name="visibility"
                    value={formData.visibility}
                    onChange={handleChange}
                  >
                    <option value="public">Public</option>
                    <option value="faculty-only">Faculty Only</option>
                    <option value="students">Students</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            )}

            {selectedType !== 'Paper' && (
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    name="description"
                    as="textarea"
                    rows={3}
                    value={formData.description}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            )}

            {selectedType === 'Book' && (
              <>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Book File (PDF)</Form.Label>
                    <Form.Control
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => setFile(e.target.files[0])}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Cover Image (Optional)</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={(e) => setCoverImage(e.target.files[0])}
                    />
                  </Form.Group>
                </Col>
              </>
            )}

            {selectedType === 'Syllabus' && (
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Syllabus File (PDF)</Form.Label>
                  <Form.Control
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setFile(e.target.files[0])}
                    required
                  />
                </Form.Group>
              </Col>
            )}

            {selectedType === 'Paper' && (
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Upload Paper Files</Form.Label>
                  <Form.Control
                    type="file"
                    multiple
                    onChange={(e) => setResources([...e.target.files])}
                  />
                </Form.Group>
              </Col>
            )}
          </Row>

          <Button type="submit" className="mt-2">
            Upload {selectedType}
          </Button>

          {success && <Alert className="mt-3" variant="success">{success}</Alert>}
        </Form>
      </Card>
    </Container>
  );
};
