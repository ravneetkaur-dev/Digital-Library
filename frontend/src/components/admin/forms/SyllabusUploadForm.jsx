import { useEffect } from "react"
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { Form, Button, Row, Col, Spinner } from "react-bootstrap"
import { apiUpload, ENDPOINTS } from "../../../utils/api"

export default function SyllabusUploadForm({ adminId }) {
  const STORAGE_KEY = "syllabusUploadForm"

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    year: Yup.number()
      .typeError("Year must be a number")
      .required("Year is required"),
    department: Yup.string().required("Department is required"),
    course: Yup.string().required("Course is required"),
    semester: Yup.string().required("Semester is required"),
    subject: Yup.string().required("Subject is required"),
    description: Yup.string().min(5, "Description must be at least 5 characters"),
    file: Yup.mixed().required("File is required"),
  })

  // Load saved form data
  const loadSaved = () => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved
      ? JSON.parse(saved)
      : {
          title: "",
          description: "",
          department: "",
          course: "",
          semester: "",
          subject: "",
          year: "",
          file: null,
        }
  }

  return (
    <Formik
      initialValues={loadSaved()}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={async (values, { resetForm, setSubmitting, setStatus }) => {
        try {
          const fd = new FormData()
          fd.append("title", values.title)
          fd.append("description", values.description)
          fd.append("department", values.department)
          fd.append("Course", values.course)
          fd.append("semester", values.semester)
          fd.append("subject", values.subject)
          fd.append("year", values.year)
          fd.append("createdBy", adminId)
          if (values.file) fd.append("file", values.file)

          await apiUpload(ENDPOINTS.syllabus.create, fd)

          setStatus({ success: "Syllabus uploaded successfully." })
          resetForm()
          localStorage.removeItem(STORAGE_KEY)
        } catch (err) {
          setStatus({ error: err.message || "Upload failed" })
        } finally {
          setSubmitting(false)
        }
      }}
    >
      {({ values, setFieldValue, isSubmitting, status }) => {
        // persist to localStorage whenever form changes (except file)
        useEffect(() => {
          const { file, ...rest } = values
          localStorage.setItem(STORAGE_KEY, JSON.stringify(rest))
        }, [values])

        return (
          <FormikForm as={Form}>
            {status?.success && (
              <div className="alert alert-success">{status.success}</div>
            )}
            {status?.error && (
              <div className="alert alert-danger">{status.error}</div>
            )}

            {/* Title & Year */}
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Title</Form.Label>
                  <Field name="title" as={Form.Control} />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-danger"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Year</Form.Label>
                  <Field name="year" as={Form.Control} type="number" />
                  <ErrorMessage
                    name="year"
                    component="div"
                    className="text-danger"
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Department & Course */}
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Department</Form.Label>
                  <Field as={Form.Select} name="department">
                    <option value="">-- Select Department --</option>
                    {/* fetch & map departments here */}
                  </Field>
                  <ErrorMessage
                    name="department"
                    component="div"
                    className="text-danger"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Course</Form.Label>
                  <Field as={Form.Select} name="course">
                    <option value="">-- Select Course --</option>
                    {/* fetch & map courses here */}
                  </Field>
                  <ErrorMessage
                    name="course"
                    component="div"
                    className="text-danger"
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Semester & Subject */}
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Semester</Form.Label>
                  <Field as={Form.Select} name="semester">
                    <option value="">-- Select Semester --</option>
                    {/* fetch & map semesters here */}
                  </Field>
                  <ErrorMessage
                    name="semester"
                    component="div"
                    className="text-danger"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Subject</Form.Label>
                  <Field as={Form.Select} name="subject">
                    <option value="">-- Select Subject --</option>
                    {/* fetch & map subjects here */}
                  </Field>
                  <ErrorMessage
                    name="subject"
                    component="div"
                    className="text-danger"
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Description  */}
            <Form.Group className="mb-3">
              <Form.Label>Description (Optional)</Form.Label>
              <Field
                as="textarea"
                name="description"
                className="form-control"
                rows={3}
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-danger"
              />
            </Form.Group>

            {/* File */}
            <Form.Group className="mb-3">
              <Form.Label>File (PDF)</Form.Label>
              <Form.Control
                type="file"
                accept="application/pdf"
                onChange={(e) => setFieldValue("file", e.target.files[0])}
              />
              <ErrorMessage
                name="file"
                component="div"
                className="text-danger"
              />
            </Form.Group>

            <Button type="submit" variant="primary" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Spinner size="sm" animation="border" className="me-2" />{" "}
                  Uploading...
                </>
              ) : (
                "Upload Syllabus"
              )}
            </Button>
          </FormikForm>
        )
      }}
    </Formik>
  )
}
