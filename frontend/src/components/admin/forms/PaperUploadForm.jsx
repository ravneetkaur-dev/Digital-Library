import { useState, useEffect } from "react";
import { Form, Button, Row, Col, Spinner } from "react-bootstrap";
import { apiUpload, apiGet, ENDPOINTS } from "../../../utils/api";

export default function PaperUploadForm() {
  const [form, setForm] = useState({
    title: "",
    subject: "",
    semester: "",
    year: "",
    uploadedBy: "",
    visibility: "public",
    available: true,
    department: "",
    course: "",
    description: "",
    file: null,
  });

  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  // Fetch departments on mount
  useEffect(() => {
    async function fetchDepartments() {
      try {
        const data = await apiGet(ENDPOINTS.course.departments.list);
        setDepartments(data);
      } catch (err) {
        console.error("Error fetching departments:", err);
      }
    }
    fetchDepartments();
  }, []);

  // Fetch courses when department changes
  useEffect(() => {
    async function fetchCourses() {
      if (!form.department) return;
      try {
        const data = await apiGet(
          ENDPOINTS.course.courses.byDepartment(form.department)
        );
        setCourses(data);
        setForm((f) => ({ ...f, course: "", semester: "", subject: "" }));
        setSemesters([]);
        setSubjects([]);
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    }
    fetchCourses();
  }, [form.department]);

  // Fetch semesters when course changes
  useEffect(() => {
    async function fetchSemesters() {
      if (!form.course) return;
      try {
        const data = await apiGet(
          ENDPOINTS.course.semesters.byCourse(form.course)
        );
        setSemesters(data);
        setForm((f) => ({ ...f, semester: "", subject: "" }));
        setSubjects([]);
      } catch (err) {
        console.error("Error fetching semesters:", err);
      }
    }
    fetchSemesters();
  }, [form.course]);

  // Fetch subjects when semester changes
  useEffect(() => {
    async function fetchSubjects() {
      if (!form.semester) return;
      try {
        const data = await apiGet(`${ENDPOINTS.subjects.list}?semester=${form.semester}`);
        setSubjects(data);
        setForm((f) => ({ ...f, subject: "" }));
      } catch (err) {
        console.error("Error fetching subjects:", err);
      }
    }
    fetchSubjects();
  }, [form.semester]);

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    if (name === "resources") {
      setForm((s) => ({ ...s, file: files && files[0] ? files[0] : null }));
    } else if (type === "checkbox") {
      setForm((s) => ({ ...s, [name]: checked }));
    } else {
      setForm((s) => ({ ...s, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      setSaving(true);
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("subject", form.subject);
      fd.append("semester", form.semester);
      fd.append("year", form.year);
      fd.append("uploadedBy", form.uploadedBy);
      fd.append("visibility", form.visibility);
      fd.append("available", form.available);
      fd.append("course", form.course);
      fd.append("department", form.department);
      if (form.description) fd.append("description", form.description);
      if (form.file) fd.append("resources", form.file);

      await apiUpload(ENDPOINTS.papers.create, fd);
      setMsg("Paper uploaded successfully.");
      setForm({
        title: "",
        subject: "",
        semester: "",
        year: "",
        uploadedBy: "",
        visibility: "public",
        available: true,
        department: "",
        course: "",
        description: "",
        file: null,
      });
      setCourses([]);
      setSemesters([]);
      setSubjects([]);
    } catch (err) {
      setMsg(err.message || "Upload failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {msg && (
        <div
          className={`alert ${
            msg.includes("successfully") ? "alert-success" : "alert-danger"
          }`}
        >
          {msg}
        </div>
      )}

      {/* Title */}
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>

        {/* Department */}
        <Col md={6}>
          <Form.Group>
            <Form.Label>Department</Form.Label>
            <Form.Select
              name="department"
              value={form.department}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Department --</option>
              {departments.map((d) => (
                <option key={d._id} value={d._id}>
                  {d.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      {/* Course & Semester */}
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Course</Form.Label>
            <Form.Select
              name="course"
              value={form.course}
              onChange={handleChange}
              required
              disabled={!courses.length}
            >
              <option value="">-- Select Course --</option>
              {courses.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group>
            <Form.Label>Semester</Form.Label>
            <Form.Select
              name="semester"
              value={form.semester}
              onChange={handleChange}
              required
              disabled={!semesters.length}
            >
              <option value="">-- Select Semester --</option>
              {semesters.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.number}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      {/* Subject & Year */}
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Subject</Form.Label>
            <Form.Select
              name="subject"
              value={form.subject}
              onChange={handleChange}
              required
              disabled={!subjects.length}
            >
              <option value="">-- Select Subject --</option>
              {subjects.map((subj) => (
                <option key={subj._id} value={subj._id}>
                  {subj.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group>
            <Form.Label>Year</Form.Label>
            <Form.Control
              type="number"
              name="year"
              value={form.year}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>

      {/* Visibility & Available */}
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Visibility</Form.Label>
            <Form.Select
              name="visibility"
              value={form.visibility}
              onChange={handleChange}
              required
            >
              <option value="public">Public</option>
              <option value="faculty-only">Faculty Only</option>
              <option value="students">Students</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={6} className="d-flex align-items-center">
          <Form.Check
            type="checkbox"
            name="available"
            checked={form.available}
            onChange={handleChange}
            label="Available"
          />
        </Col>
      </Row>

      {/* Description */}
      <Form.Group className="mb-3">
        <Form.Label>Description (optional)</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="description"
          value={form.description}
          onChange={handleChange}
        />
      </Form.Group>

      {/* File Upload */}
      <Form.Group className="mb-3">
        <Form.Label>Paper File (PDF)</Form.Label>
        <Form.Control
          type="file"
          accept="application/pdf"
          name="resources"
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Button type="submit" variant="primary" disabled={saving}>
        {saving ? (
          <>
            <Spinner size="sm" animation="border" className="me-2" /> Uploading...
          </>
        ) : (
          "Upload Paper"
        )}
      </Button>
    </Form>
  );
}
