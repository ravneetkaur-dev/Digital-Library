import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';

export const AddFaculty = () => {
  const initialValues = {
    name: '', email: '', password: '', role: 'faculty',
    designation: '', department: '', subjects: ''
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'Name should be at least 3 characters')
      .required('Name is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password should be at least 6 characters')
      .required('Password is required'),
    designation: Yup.string(),
    department: Yup.string().required('Department is required'),
    subjects: Yup.string()
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await axios.post('http://localhost:5000/api/admin/register', values);
      alert("Faculty added!");
      resetForm();
    } catch (err) {
      console.error(err);
      alert("Error adding faculty.");
    }
  };

  return (
    <Card className="p-4 shadow border-0 rounded-4">
      <h3 className="mb-4 text-center text-primary fw-bold">Add New Faculty</h3>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter full name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.name && !!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.email && !!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.password && !!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="designation">
                  <Form.Label>Designation</Form.Label>
                  <Form.Control
                    type="text"
                    name="designation"
                    placeholder="e.g., Assistant Professor"
                    value={values.designation}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="department">
                  <Form.Label>Department</Form.Label>
                  <Form.Control
                    type="text"
                    name="department"
                    placeholder="e.g., Computer Science"
                    value={values.department}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="subjects">
                  <Form.Label>Subjects</Form.Label>
                  <Form.Control
                    type="text"
                    name="subjects"
                    placeholder="e.g., DBMS, OS"
                    value={values.subjects}
                    onChange={handleChange}
                  />
                  <Form.Text className="text-muted">Comma separated</Form.Text>
                </Form.Group>
              </Col>
            </Row>

            <div className="text-center mt-4">
              <Button
                type="submit"
                className="px-5 py-2"
                style={{ backgroundColor: "#002147", border: "none", borderRadius: "30px" }}
              >
                Add Faculty
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Card>
  );
};
