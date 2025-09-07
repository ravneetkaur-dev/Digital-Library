import { useState, useEffect } from "react";
import { Form, Button, Row, Col, Spinner } from "react-bootstrap";
import { Formik, Field, Form as FormikForm, ErrorMessage } from "formik";
import * as Yup from "yup";
import { apiUpload, apiGet, ENDPOINTS } from "../../../utils/api";

//  Yup schema
const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  author: Yup.string().required("Author is required"),
  department: Yup.string().required("Department is required"),
  course: Yup.string().required("Course is required"),
  semester: Yup.string().required("Semester is required"),
  subject: Yup.string().required("Subject is required"),
  year: Yup.number().required("Year is required").min(1900).max(new Date().getFullYear()),
  file: Yup.mixed().required("File is required"),
});

export default function BookUploadForm() {
  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const STORAGE_KEY = "bookUploadDraft";

  // Load draft data
  const loadDraft = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved
      ? JSON.parse(saved)
      : {
          title: "",
          author: "",
          subject: "",
          semester: "",
          year: "",
          isbn: "",
          edition: "",
          pages: "",
          uploadedBy: "",
          department: "",
          course: "",
          file: null,
          coverImage: null,
          visibility: "public",
          available: true,
          description: "",
        };
  };

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

  // Fetch dependent lists
  useEffect(() => {
    async function fetchCourses(dep) {
      if (!dep) return;
      try {
        const data = await apiGet(ENDPOINTS.course.courses.byDepartment(dep));
        setCourses(data);
        setSemesters([]);
        setSubjects([]);
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    }
    fetchCourses(loadDraft().department);
  }, []);

  const handleSubmit = async (values, { resetForm }) => {
    setMsg("");
    try {
      setSaving(true);
      const fd = new FormData();
      Object.entries(values).forEach(([key, val]) => {
        if (val !== null && val !== undefined) {
          if (key === "file" || key === "coverImage") {
            if (val instanceof File) fd.append(key, val);
          } else {
            fd.append(key, val);
          }
        }
      });

      await apiUpload(ENDPOINTS.books.create, fd);
      setMsg("Book uploaded successfully.");
      localStorage.removeItem(STORAGE_KEY); // ✅ Clear draft
      resetForm();
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
    <Formik
      initialValues={loadDraft()}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue }) => {
        // Save draft whenever values change
        useEffect(() => {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
        }, [values]);

        return (
          <FormikForm>
            {msg && (
              <div
                className={`alert ${
                  msg.includes("successfully") ? "alert-success" : "alert-danger"
                }`}
              >
                {msg}
              </div>
            )}

            {/* Title & Author */}
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Title</Form.Label>
                  <Field name="title" as={Form.Control} />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-danger small"
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Author</Form.Label>
                  <Field name="author" as={Form.Control} />
                  <ErrorMessage
                    name="author"
                    component="div"
                    className="text-danger small"
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Department & Course */}
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Department</Form.Label>
                  <Field name="department" as={Form.Select}>
                    <option value="">-- Select Department --</option>
                    {departments.map((d) => (
                      <option key={d._id} value={d._id}>
                        {d.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="department"
                    component="div"
                    className="text-danger small"
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Course</Form.Label>
                  <Field name="course" as={Form.Select} disabled={!courses.length}>
                    <option value="">-- Select Course --</option>
                    {courses.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="course"
                    component="div"
                    className="text-danger small"
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* File Upload */}
            <Form.Group className="mb-3">
              <Form.Label>Book File (PDF)</Form.Label>
              <input
                type="file"
                accept="application/pdf"
                name="file"
                className="form-control"
                onChange={(e) => setFieldValue("file", e.currentTarget.files[0])}
              />
              <ErrorMessage
                name="file"
                component="div"
                className="text-danger small"
              />
            </Form.Group>

            {/* Visibility */}
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Visibility</Form.Label>
                  <Field name="visibility" as={Form.Select}>
                    <option value="public">Public</option>
                    <option value="faculty-only">Faculty Only</option>
                    <option value="students">Students</option>
                  </Field>
                </Form.Group>
              </Col>

              <Col md={6} className="d-flex align-items-center">
                <Form.Check
                  type="checkbox"
                  name="available"
                  checked={values.available}
                  onChange={(e) => setFieldValue("available", e.target.checked)}
                  label="Available"
                />
              </Col>
            </Row>

            <Button type="submit" variant="primary" disabled={saving}>
              {saving ? (
                <>
                  <Spinner size="sm" animation="border" className="me-2" /> Uploading...
                </>
              ) : (
                "Upload Book"
              )}
            </Button>
          </FormikForm>
        );
      }}
    </Formik>
  );
}
