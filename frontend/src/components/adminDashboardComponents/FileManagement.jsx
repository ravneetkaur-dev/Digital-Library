import { useState, useEffect } from 'react';
import { Form, Button, ListGroup, Card } from 'react-bootstrap';
import axios from 'axios';

export const FileManagement = () => {
  const [file, setFile] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [meta, setMeta] = useState({ title: '', subject: '', semester: '', year: '' });

  const fetchFiles = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/syllabus/getsyllabus');
      setFileList(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Choose a file");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", meta.title);
    formData.append("subject", meta.subject);
    formData.append("semester", meta.semester);
    formData.append("year", meta.year);
    formData.append("description", "Uploaded by Admin");
    formData.append("createdBy", "Admin");

    try {
      await axios.post('http://localhost:5000/api/syllabus/uploadsyllabus', formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchFiles();
      setFile(null);
      setMeta({ title: '', subject: '', semester: '', year: '' });
    } catch (err) {
      console.error('Upload error:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this file?")) {
      try {
        await axios.delete(`http://localhost:5000/api/syllabus/deletesyllabus/${id}`, {
          withCredentials: true,
        });
        fetchFiles();
      } catch (err) {
        console.error('Delete error:', err);
      }
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <Card className="p-4 shadow-sm">
      <h3 className="mb-4">Upload Files (Books, Syllabus, Papers)</h3>
      <Form onSubmit={handleUpload} className="mb-3">
        <Form.Control
          placeholder="Title"
          className="mb-2"
          value={meta.title}
          onChange={(e) => setMeta({ ...meta, title: e.target.value })}
          required
        />
        <Form.Control
          placeholder="Subject"
          className="mb-2"
          value={meta.subject}
          onChange={(e) => setMeta({ ...meta, subject: e.target.value })}
          required
        />
        <Form.Control
          placeholder="Semester"
          className="mb-2"
          value={meta.semester}
          onChange={(e) => setMeta({ ...meta, semester: e.target.value })}
          required
        />
        <Form.Control
          placeholder="Year"
          className="mb-2"
          value={meta.year}
          onChange={(e) => setMeta({ ...meta, year: e.target.value })}
          required
        />
        <Form.Control
          type="file"
          className="mb-2"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        <Button type="submit">Upload</Button>
      </Form>

      <ListGroup>
        {fileList.map((f) => (
          <ListGroup.Item key={f._id} className="d-flex justify-content-between">
            {f.title} ({f.subject})
            <Button variant="outline-danger" size="sm" onClick={() => handleDelete(f._id)}>
              Delete
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
};

