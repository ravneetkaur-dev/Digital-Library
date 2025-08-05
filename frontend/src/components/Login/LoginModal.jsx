import { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./LoginModal.css"; 

export const LoginModal = ({ show, handleClose, role }) => {
  const [error, setError] = useState("");

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setError("");

    try {
      const loginRoute =
        role === "admin"
          ? "http://localhost:5000/api/loginadmin"
          : "http://localhost:5000/api/faculty/login";

      const response = await axios.post(loginRoute, {
        email: values.email,
        password: values.password,
      });

      localStorage.setItem("token", response.data.token);
      alert("Login successful");

      handleClose();
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      console.log("Full error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <Modal.Header closeButton className="login-body">
        <Modal.Title>
          {role === "admin" ? "Admin Login" : "Faculty Login"}
        </Modal.Title>
      </Modal.Header>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          errors,
          isSubmitting,
        }) => (
          <Form className="login-body" onSubmit={handleSubmit}>
            {error && <Alert variant="danger">{error}</Alert>}

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.email && !!errors.email}
                placeholder="Enter email"
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.password && !!errors.password}
                placeholder="Enter password"
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <div className="login-buttons justify-content-end">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
