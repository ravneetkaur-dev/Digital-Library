import { Modal, Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import "./loginModal.css";
import { Link } from "react-router-dom";
import axios from "../api/axiosConfig.js"; 

export const LoginModal = ({ show, handleClose }) => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .min(6, "Email must be at least 6 characters")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body className="login-body">
        <h3 className="login-title">Admin Login</h3>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            try {
              const response = await axios.post("/api/loginadmin", values); 
              const { token, name, email, id } = response.data;

              localStorage.setItem("token", token);
              localStorage.setItem("adminName", name);
              localStorage.setItem("adminEmail", email);
              localStorage.setItem("adminId", id);

              alert("Login Successful!");
              handleClose();

              window.location.href = "/dashboard";

            } catch (error) {
              if (error.response && error.response.data.message) {
                alert(error.response.data.message);
              } else {
                alert("Login failed. Please try again.");
              }
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            errors,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
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

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.password && !!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3 text-end">
                <a href="#" className="forgot-password-link">
                  Forgot Password?
                </a>
              </Form.Group>

              <div className="login-buttons">
                <Button type="submit" className="login-submit">
                  Login
                </Button>
                <Button onClick={handleClose} className="login-close">
                  Close
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};
