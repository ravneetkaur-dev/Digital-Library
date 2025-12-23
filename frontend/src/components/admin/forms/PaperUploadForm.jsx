"use client"

import { useState, useEffect } from "react"
import { Form, Button, Row, Col, Spinner } from "react-bootstrap"
import { useFormik } from "formik"
import * as Yup from "yup"
import { apiUpload, apiGet, ENDPOINTS } from "../../../utils/api"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  department: Yup.string().required("Department is required"),
  course: Yup.string().required("Course is required"),
  semester: Yup.string().required("Semester is required"),
  subject: Yup.string().required("Subject is required"),
  year: Yup.number()
    .typeError("Year must be a number")
    .required("Year is required")
    .min(1900, "Year too small")
    .max(new Date().getFullYear() + 5, "Invalid year"),
  visibility: Yup.string().required("Visibility is required"),
  file: Yup.mixed()
    .required("Paper file is required")
    .test("fileType", "Only PDF files are allowed", (value) => {
      return value && value.type === "application/pdf"
    })
    .test("fileSize", "File size must be less than 50MB", (value) => {
      return value && value.size <= 50 * 1024 * 1024 // 50MB
    }),
})

export default function PaperUploadForm() {
  const initialFormState = {
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
  }

  const [departments, setDepartments] = useState([])
  const [courses, setCourses] = useState([])
  const [semesters, setSemesters] = useState([])
  const [subjects, setSubjects] = useState([])
  const [saving, setSaving] = useState(false)

  // Load stored form data
  const loadStoredForm = () => {
    const saved = localStorage.getItem("paperUploadForm")
    return saved ? { ...initialFormState, ...JSON.parse(saved), file: null } : initialFormState
  }

  const formik = useFormik({
    initialValues: loadStoredForm(),
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      try {
        setSaving(true)
        const fd = new FormData()
        fd.append("title", values.title)
        fd.append("subject", values.subject)
        fd.append("semester", values.semester)
        fd.append("year", values.year.toString())
        fd.append("uploadedBy", values.uploadedBy)
        fd.append("visibility", values.visibility)
        fd.append("available", values.available.toString())
        fd.append("course", values.course)
        fd.append("department", values.department)
        if (values.description) fd.append("description", values.description)
        if (values.file) fd.append("resources", values.file)

        await apiUpload(ENDPOINTS.papers.create, fd)
        toast.success("Paper uploaded successfully.", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          style: {
            backgroundColor: "#ffffff",
            color: "#333333",
          },
          progressStyle: {
            backgroundColor: "#22c55e",
          },
        })

        resetForm({ values: initialFormState })
        localStorage.removeItem("paperUploadForm")
        setCourses([])
        setSemesters([])
        setSubjects([])
      } catch (err) {
        toast.error(err.message || "Upload failed", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          style: {
            backgroundColor: "#ffffff",
            color: "#333333",
          },
          progressStyle: {
            backgroundColor: "#ef4444",
          },
        })
      } finally {
        setSaving(false)
      }
    },
  })

  // Persist form in localStorage (excluding file)
  useEffect(() => {
    const { file, ...formDataToSave } = formik.values
    localStorage.setItem("paperUploadForm", JSON.stringify(formDataToSave))
  }, [formik.values])

  // Fetch departments on mount
  useEffect(() => {
    async function fetchDepartments() {
      try {
        const data = await apiGet(ENDPOINTS.course.departments.list)
        setDepartments(data)
      } catch (err) {
        console.error("Error fetching departments:", err)
      }
    }
    fetchDepartments()
  }, [])

  // Fetch courses when department changes
  useEffect(() => {
    async function fetchCourses() {
      if (!formik.values.department) return
      try {
        const data = await apiGet(ENDPOINTS.course.courses.byDepartment(formik.values.department))
        setCourses(data)
        formik.setFieldValue("course", "")
        formik.setFieldValue("semester", "")
        formik.setFieldValue("subject", "")
        setSemesters([])
        setSubjects([])
      } catch (err) {
        console.error("Error fetching courses:", err)
      }
    }
    fetchCourses()
  }, [formik.values.department])

  // Fetch semesters when course changes
  useEffect(() => {
    async function fetchSemesters() {
      if (!formik.values.course) return
      try {
        const data = await apiGet(ENDPOINTS.course.semesters.byCourse(formik.values.course))
        setSemesters(data)
        formik.setFieldValue("semester", "")
        formik.setFieldValue("subject", "")
        setSubjects([])
      } catch (err) {
        console.error("Error fetching semesters:", err)
      }
    }
    fetchSemesters()
  }, [formik.values.course])

  // Fetch subjects when semester changes
  useEffect(() => {
    async function fetchSubjects() {
      if (!formik.values.semester) return
      try {
        const data = await apiGet(`${ENDPOINTS.subjects.list}?semester=${formik.values.semester}`)
        setSubjects(data)
        formik.setFieldValue("subject", "")
      } catch (err) {
        console.error("Error fetching subjects:", err)
      }
    }
    fetchSubjects()
  }, [formik.values.semester])

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Form onSubmit={formik.handleSubmit}>
        {/* Title & Department */}
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.title && !!formik.errors.title}
              />
              <Form.Control.Feedback type="invalid">{formik.errors.title}</Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>Department</Form.Label>
              <Form.Select
                name="department"
                value={formik.values.department}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.department && !!formik.errors.department}
              >
                <option value="">-- Select Department --</option>
                {departments.map((d) => (
                  <option key={d._id} value={d._id}>
                    {d.name}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">{formik.errors.department}</Form.Control.Feedback>
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
                value={formik.values.course}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={!courses.length}
                isInvalid={formik.touched.course && !!formik.errors.course}
              >
                <option value="">-- Select Course --</option>
                {courses.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">{formik.errors.course}</Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>Semester</Form.Label>
              <Form.Select
                name="semester"
                value={formik.values.semester}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={!semesters.length}
                isInvalid={formik.touched.semester && !!formik.errors.semester}
              >
                <option value="">-- Select Semester --</option>
                {semesters.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.number || s.name}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">{formik.errors.semester}</Form.Control.Feedback>
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
                value={formik.values.subject}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={!subjects.length}
                isInvalid={formik.touched.subject && !!formik.errors.subject}
              >
                <option value="">-- Select Subject --</option>
                {subjects.map((subj) => (
                  <option key={subj._id} value={subj._id}>
                    {subj.name}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">{formik.errors.subject}</Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>Year</Form.Label>
              <Form.Control
                type="number"
                name="year"
                value={formik.values.year}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.year && !!formik.errors.year}
              />
              <Form.Control.Feedback type="invalid">{formik.errors.year}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        {/* Uploaded By & Visibility */}
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Visibility</Form.Label>
              <Form.Select
                name="visibility"
                value={formik.values.visibility}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.visibility && !!formik.errors.visibility}
              >
                <option value="public">Public</option>
                <option value="faculty-only">Faculty Only</option>
                <option value="students">Students</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">{formik.errors.visibility}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        {/* Available Checkbox */}
        <Row className="mb-3">
          <Col md={12}>
            <Form.Check
              type="checkbox"
              name="available"
              checked={formik.values.available}
              onChange={(e) => formik.setFieldValue("available", e.target.checked)}
              label="Available for download"
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
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter a brief description of the paper..."
          />
        </Form.Group>

        {/* File Upload */}
        <Form.Group className="mb-3">
          <Form.Label>Paper File (PDF)</Form.Label>
          <Form.Control
            type="file"
            accept="application/pdf"
            name="file"
            onChange={(e) => formik.setFieldValue("file", e.target.files[0])}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.file && !!formik.errors.file}
          />
          <Form.Control.Feedback type="invalid">{formik.errors.file}</Form.Control.Feedback>
          <Form.Text className="text-muted">Maximum file size: 50MB. Only PDF files are allowed.</Form.Text>
        </Form.Group>

        <Button type="submit" variant="primary" disabled={saving || !formik.isValid}>
          {saving ? (
            <>
              <Spinner size="sm" animation="border" className="me-2" /> Uploading...
            </>
          ) : (
            "Upload Paper"
          )}
        </Button>
      </Form>
    </>
  )
}
