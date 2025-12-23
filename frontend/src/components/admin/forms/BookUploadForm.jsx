import { useState, useEffect } from "react"
import { Form, Button, Row, Col, Spinner } from "react-bootstrap"
import { apiUpload, apiGet, ENDPOINTS } from "../../../utils/api"
import { useFormik } from "formik"
import { toast, ToastContainer } from "react-toastify"
import * as Yup from "yup"

// Validation schema
const validationSchema = Yup.object({
  title: Yup.string()
    .min(2, "Title must be at least 2 characters")
    .max(200, "Title must be less than 200 characters")
    .required("Title is required"),
  author: Yup.string()
    .min(2, "Author name must be at least 2 characters")
    .max(100, "Author name must be less than 100 characters")
    .required("Author is required"),
  department: Yup.string().required("Department is required"),
  course: Yup.string().required("Course is required"),
  semester: Yup.string().required("Semester is required"),
  subject: Yup.string().required("Subject is required"),
  year: Yup.number()
    .typeError("Year must be a number")
    .required("Year is required")
    .min(1900, "Year too small")
    .max(new Date().getFullYear() + 5, "Invalid year"),
  isbn: Yup.string()
    .matches(/^(?:\d{10}|\d{13})$/, "ISBN must be 10 or 13 digits")
    .nullable(),
  edition: Yup.string().max(50, "Edition must be less than 50 characters"),
  pages: Yup.number()
    .typeError("Pages must be a number")
    .min(1, "Pages must be at least 1")
    .max(10000, "Pages cannot exceed 10,000")
    .nullable(),
  description: Yup.string().max(1000, "Description must be less than 1000 characters"),
  file: Yup.mixed()
    .required("Book file is required")
    .test("fileType", "Only PDF files are allowed", (value) => {
      return value && value.type === "application/pdf"
    })
    .test("fileSize", "File size must be less than 100MB", (value) => {
      return value && value.size <= 500 * 1024 * 1024 // 500MB for books
    }),
})

export default function BookUploadForm() {
  const initialFormState = {
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
  }

  const [departments, setDepartments] = useState([])
  const [courses, setCourses] = useState([])
  const [semesters, setSemesters] = useState([])
  const [subjects, setSubjects] = useState([])
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState("")

  // Load stored form data
  const loadStoredForm = () => {
    const saved = localStorage.getItem("bookUploadForm")
    return saved ? { ...initialFormState, ...JSON.parse(saved), file: null, coverImage: null } : initialFormState
  }

  const formik = useFormik({
    initialValues: loadStoredForm(),
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (form, { resetForm }) => {
      setMsg("")
      try {
        setSaving(true)
        const fd = new FormData()
        fd.append("title", form.title)
        fd.append("author", form.author)
        fd.append("subject", form.subject)
        fd.append("semester", form.semester)
        fd.append("year", form.year.toString())
        fd.append("Course", form.course) // Capital C
        fd.append("department", form.department)
        fd.append("visibility", form.visibility)
        fd.append("available", form.available.toString())
        if (form.isbn) fd.append("isbn", form.isbn)
        if (form.edition) fd.append("edition", form.edition)
        if (form.pages) fd.append("pages", form.pages.toString())
        if (form.description) fd.append("description", form.description)
        if (form.uploadedBy) fd.append("uploadedBy", form.uploadedBy)
        if (form.file) fd.append("file", form.file)
        if (form.coverImage) fd.append("coverImage", form.coverImage)

        await apiUpload(ENDPOINTS.books.create, fd)
        toast.success("Book uploaded successfully.", {
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
        
        // setMsg("Book uploaded successfully.")
        resetForm({ values: initialFormState })
        localStorage.removeItem("bookUploadForm")
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

  // Persist form in localStorage (excluding files)
  useEffect(() => {
    const { file, coverImage, ...formDataToSave } = formik.values
    localStorage.setItem("bookUploadForm", JSON.stringify(formDataToSave))
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
      {/* {msg && <div className={`alert ${msg.includes("successfully") ? "alert-success" : "alert-danger"}`}>{msg}</div>} */}

      {/* Title & Author */}
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
              placeholder="Enter book title..."
            />
            <Form.Control.Feedback type="invalid">{formik.errors.title}</Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group>
            <Form.Label>Author</Form.Label>
            <Form.Control
              name="author"
              value={formik.values.author}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.author && !!formik.errors.author}
              placeholder="Enter author name..."
            />
            <Form.Control.Feedback type="invalid">{formik.errors.author}</Form.Control.Feedback>
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

      {/* Year & ISBN */}
      <Row className="mb-3">
        <Col md={4}>
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

        <Col md={4}>
          <Form.Group>
            <Form.Label>ISBN (optional)</Form.Label>
            <Form.Control
              name="isbn"
              value={formik.values.isbn}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.isbn && !!formik.errors.isbn}
              placeholder="10 or 13 digits"
            />
            <Form.Control.Feedback type="invalid">{formik.errors.isbn}</Form.Control.Feedback>
          </Form.Group>
        </Col>

        
      </Row>

      {/* Edition & Pages */}
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Edition (optional)</Form.Label>
            <Form.Control
              name="edition"
              value={formik.values.edition}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.edition && !!formik.errors.edition}
              placeholder="e.g., 1st, 2nd, Latest"
            />
            <Form.Control.Feedback type="invalid">{formik.errors.edition}</Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group>
            <Form.Label>Pages (optional)</Form.Label>
            <Form.Control
              type="number"
              name="pages"
              value={formik.values.pages}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.pages && !!formik.errors.pages}
              placeholder="Number of pages"
            />
            <Form.Control.Feedback type="invalid">{formik.errors.pages}</Form.Control.Feedback>
          </Form.Group>
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
          isInvalid={formik.touched.description && !!formik.errors.description}
          placeholder="Enter a brief description of the book..."
        />
        <Form.Control.Feedback type="invalid">{formik.errors.description}</Form.Control.Feedback>
      </Form.Group>

      {/* File Upload */}
      <Form.Group className="mb-3">
        <Form.Label>Book File (PDF)</Form.Label>
        <Form.Control
          type="file"
          accept="application/pdf"
          name="file"
          onChange={(e) => formik.setFieldValue("file", e.target.files[0])}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.file && !!formik.errors.file}
        />
        <Form.Control.Feedback type="invalid">{formik.errors.file}</Form.Control.Feedback>
        <Form.Text className="text-muted">Maximum file size: 100MB. Only PDF files are allowed.</Form.Text>
      </Form.Group>

      {/* Cover Image Upload */}
      <Form.Group className="mb-3">
        <Form.Label>Cover Image (optional)</Form.Label>
        <Form.Control
          type="file"
          accept="image/*"
          name="coverImage"
          onChange={(e) => formik.setFieldValue("coverImage", e.target.files[0])}
        />
        <Form.Text className="text-muted">Upload a cover image for the book (JPG, PNG, etc.)</Form.Text>
      </Form.Group>

      {/* Visibility & Availability */}
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Visibility</Form.Label>
            <Form.Select name="visibility" value={formik.values.visibility} onChange={formik.handleChange}>
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
            checked={formik.values.available}
            onChange={(e) => formik.setFieldValue("available", e.target.checked)}
            label="Available for download"
          />
        </Col>
      </Row>

      <Button type="submit" variant="primary" disabled={saving || !formik.isValid}>
        {saving ? (
          <>
            <Spinner size="sm" animation="border" className="me-2" /> Uploading...
          </>
        ) : (
          "Upload Book"
        )}
      </Button>
    </Form>
    </>
  )
}
