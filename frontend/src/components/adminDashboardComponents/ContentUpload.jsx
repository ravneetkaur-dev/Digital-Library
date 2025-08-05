import { useState, useEffect } from 'react';
import { Form, Button, ListGroup } from 'react-bootstrap';
import axios from 'axios';

export const ContentUpload = () => {
  const [file, setFile] = useState(null);
  const [meta, setMeta] = useState({ title: '', subject: '', semester: '', year: '' });
  const [fileList, setFileList] = useState([]);

  const fetchFiles = async () => {
    const res = await axios.get('http://localhost:5000/api/syllabus/getsyllabus');
    setFileList(res.data);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Choose a file");

    const formData = new FormData();
    formData.append("file", file);
    Object.entries(meta).forEach(([k, v]) => formData.append(k, v));
    formData.append("description", "Uploaded by Admin");
    formData.append("createdBy", "Admin");

    try {
      await axios.post('http://localhost:5000/api/syllabus/uploadsyllabus', formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchFiles();
      setFile(null);
      setMeta({ title: '', subject: '', semester: '', year: '' });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this file?")) {
      await axios.delete(`http://localhost:5000/api/syllabus/deletesyllabus/${id}`);
      fetchFiles();
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <>
      <h3>Upload Books / Papers / Syllabus</h3>
      <Form onSubmit={handleUpload}>
        <Form.Control placeholder="Title" className="mb-2" value={meta.title} onChange={(e) => setMeta({ ...meta, title: e.target.value })} required />
        <Form.Control placeholder="Subject" className="mb-2" value={meta.subject} onChange={(e) => setMeta({ ...meta, subject: e.target.value })} required />
        <Form.Control placeholder="Semester" className="mb-2" value={meta.semester} onChange={(e) => setMeta({ ...meta, semester: e.target.value })} required />
        <Form.Control placeholder="Year" className="mb-2" value={meta.year} onChange={(e) => setMeta({ ...meta, year: e.target.value })} required />
        <Form.Control type="file" className="mb-2" onChange={(e) => setFile(e.target.files[0])} required />
        <Button type="submit">Upload</Button>
      </Form>

      <ListGroup className="mt-4">
        {fileList.map(f => (
          <ListGroup.Item key={f._id} className="d-flex justify-content-between">
            {f.title} ({f.subject})
            <Button size="sm" variant="danger" onClick={() => handleDelete(f._id)}>Delete</Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};
