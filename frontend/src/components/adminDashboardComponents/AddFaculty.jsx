import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useState } from 'react';
import './AddFaculty.css'

export const AddFaculty = () => {
  const [previewImage, setPreviewImage] = useState(null);

  const initialValues = {
    name: '',
    email: '',
    password: '',
    role: 'faculty',
    designation: '',
    department: '',
    subjects: '',
    // profilepicture: null,
  };

  const validationSchema = Yup.object({
    name: Yup.string().min(3, 'Minimum 3 characters').required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
    designation: Yup.string(),
    department: Yup.string().required('Department is required'),
    subjects: Yup.string(),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const updatedValues = {
        ...values,
        subjects: values.subjects.split(',').map((s) => s.trim()),
      };

      const formData = new FormData();
      for (let key in updatedValues) {
        if (key === "profile" && updatedValues.profile) {
          formData.append('profile', updatedValues.profile);
        } else if (key === "subjects") {
          updatedValues.subjects.forEach((subject, index) => {
            formData.append(`subjects[${index}]`, subject);
          });
        } else {
          formData.append(key, updatedValues[key]);
        }
      }

      await axios.post('http://localhost:5000/api/admin/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('Faculty added!');
      resetForm();
      setPreviewImage(null);
    } catch (err) {
      console.error(err);
      alert('Error adding faculty.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <Card className="p-5 shadow-lg border-0 rounded-5 w-100" style={{ maxWidth: '600px' }}>
        <h3 className="mb-4 text-center fw-bold" style={{color:"#002147"}}>Add New Faculty</h3>

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ handleSubmit, handleChange, handleBlur, setFieldValue, values, touched, errors }) => (
            <Form noValidate onSubmit={handleSubmit}>
              {/* Name */}
              <Form.Group controlId="name" className="mb-3">
                <Form.Label className="fw-semibold">Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.name && !!errors.name}
                  placeholder="Enter full name"
                />
                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
              </Form.Group>

              {/* Email */}
              <Form.Group controlId="email" className="mb-3">
                <Form.Label className="fw-semibold">Email Address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.email && !!errors.email}
                  placeholder="Enter email"
                />
                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
              </Form.Group>

              {/* Password */}
              <Form.Group controlId="password" className="mb-3">
                <Form.Label className="fw-semibold">Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.password && !!errors.password}
                  placeholder="Create password"
                />
                <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
              </Form.Group>

              {/* Department */}
              <Form.Group controlId="department" className="mb-3">
                <Form.Label className="fw-semibold">Department</Form.Label>
                <Form.Control
                  type="text"
                  name="department"
                  value={values.department}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.department && !!errors.department}
                  placeholder="e.g. Computer Science"
                />
                <Form.Control.Feedback type="invalid">{errors.department}</Form.Control.Feedback>
              </Form.Group>

              {/* Designation */}
              <Form.Group controlId="designation" className="mb-3">
                <Form.Label className="fw-semibold">Designation</Form.Label>
                <Form.Control
                  type="text"
                  name="designation"
                  value={values.designation}
                  onChange={handleChange}
                  placeholder="e.g. Assistant Professor"
                />
              </Form.Group>

              {/* Subjects */}
              <Form.Group controlId="subjects" className="mb-3">
                <Form.Label className="fw-semibold">Subjects (comma separated)</Form.Label>
                <Form.Control
                  type="text"
                  name="subjects"
                  value={values.subjects}
                  onChange={handleChange}
                  placeholder="e.g. DSA, OOP, DBMS"
                />
              </Form.Group>

              {/* Profile Picture Upload */}
              {/* <Form.Group controlId="profilepicture" className="mb-4">
                <Form.Label className="fw-semibold">Profile Picture</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    setFieldValue('profile', e.currentTarget.files[0]);
                    setPreviewImage(URL.createObjectURL(e.currentTarget.files[0]));
                  }}
                />
                {previewImage && (
                  <div className="mt-3 text-center">
                    <img src={previewImage} alt="Preview" height="100" className="rounded-circle shadow" />
                  </div>
                )}
              </Form.Group> */}

              {/* Submit Button */}
              <Button type="submit" className="w-100 rounded-4 fw-semibold py-2 border-0 add-button">
                Add Faculty
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};
