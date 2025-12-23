import { useState, useEffect } from "react"
import { Form, Button, Row, Col, Spinner } from "react-bootstrap"
import { useFormik } from "formik"
import { toast, ToastContainer } from "react-toastify"
import * as Yup from "yup"
import { apiUpload, apiGet, ENDPOINTS } from "../../../utils/api"

// Validation schema
const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters")
    .required("Title is required"),
  year: Yup.number()
    .typeError("Year must be a number")
    .required("Year is required")
    .min(1900, "Year too small")
    .max(new Date().getFullYear(), "Invalid year"),
  department: Yup.string().required("Department is required"),
  course: Yup.string().required("Course is required"),
  semester: Yup.string().required("Semester is required"),
  subject: Yup.string().required("Subject is required"),
  description: Yup.string().max(500, "Description must be less than 500 characters"),
  file: Yup.mixed()
    .required("File is required")
    .test("fileType", "Only PDF files are allowed", (value) => {
      return value && value.type === "application/pdf"
    })
    .test("fileSize", "File size must be less than 50MB", (value) => {
      return value && value.size <= 50 * 1024 * 1024 // 50MB
    }),
})

export default function SyllabusUploadForm({ adminId }) {
  const initialFormState = {
    title: "",
    description: "",
    department: "",
    course: "",
    semester: "",
    subject: "",
    year: "",
    file: null,
  }

  const [departments, setDepartments] = useState([])
  const [courses, setCourses] = useState([])
  const [semesters, setSemesters] = useState([])
  const [subjects, setSubjects] = useState([])
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState("")

  // Load stored form data
  const loadStoredForm = () => {
    const saved = localStorage.getItem("syllabusUploadForm")
    return saved ? { ...initialFormState, ...JSON.parse(saved), file: null } : initialFormState
  }

  const formik = useFormik({
    initialValues: loadStoredForm(),
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      setMsg("")
      try {
        setSaving(true)
        const fd = new FormData()
        fd.append("title", values.title)
        fd.append("description", values.description)
        fd.append("department", values.department)
        fd.append("Course", values.course) // backend expects "Course"
        fd.append("semester", values.semester)
        fd.append("subject", values.subject)
        fd.append("year", values.year.toString())
        fd.append("createdBy", adminId || "admin")
        if (values.file) fd.append("file", values.file)

        await apiUpload(ENDPOINTS.syllabus.create, fd)
        toast.success("syllabus uploaded successfully.", {
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
        // setMsg("Syllabus uploaded successfully.")

        resetForm({ values: initialFormState })
        localStorage.removeItem("syllabusUploadForm")
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
        // setMsg(err.message || "Upload failed")
      } finally {
        setSaving(false)
      }
    },
  })

  // Save form to localStorage whenever values change (excluding file)
  useEffect(() => {
    const { file, ...formDataToSave } = formik.values
    localStorage.setItem("syllabusUploadForm", JSON.stringify(formDataToSave))
  }, [formik.values])

  // Fetch departments
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
      {msg && <div className={`alert ${msg.includes("successfully") ? "alert-success" : "alert-danger"}`}>{msg}</div>}

      {/* Title + Year */}
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
              placeholder="Enter syllabus title..."
            />
            <Form.Control.Feedback type="invalid">{formik.errors.title}</Form.Control.Feedback>
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
              placeholder="e.g., 2024"
            />
            <Form.Control.Feedback type="invalid">{formik.errors.year}</Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      {/* Department & Course */}
      <Row className="mb-3">
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
      </Row>

      {/* Semester & Subject */}
      <Row className="mb-3">
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
              {subjects.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">{formik.errors.subject}</Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      {/* Description */}
      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.description && !!formik.errors.description}
          placeholder="Enter a brief description of the syllabus..."
        />
        <Form.Control.Feedback type="invalid">{formik.errors.description}</Form.Control.Feedback>
      </Form.Group>

      {/* File */}
      <Form.Group className="mb-3">
        <Form.Label>File (PDF)</Form.Label>
        <Form.Control
          type="file"
          accept="application/pdf"
          name="file"
          onChange={(e) => {
            formik.setFieldValue("file", e.currentTarget.files[0])
          }}
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
          "Upload Syllabus"
        )}
      </Button>
    </Form>
    </>
  )
}
