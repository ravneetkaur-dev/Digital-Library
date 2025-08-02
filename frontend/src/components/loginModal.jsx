import { Modal, Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import "./loginModal.css";
import axios from "../api/axiosConfig.js";

export const LoginModal = ({ show, handleClose, role }) => {
  const isAdmin = role === "admin";

  const loginRoute = isAdmin ? "/api/loginAdmin" : "/api/faculty/login";
  const redirectRoute = isAdmin ? "/api/admin/dashboard" : "/api/faculty/dashboard";

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
        <h3 className="login-title">{isAdmin ? "Admin Login" : "Faculty Login"}</h3>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const response = await axios.post(loginRoute, values);
              const { token, name, email, id } = response.data;

              localStorage.setItem("token", token);
              localStorage.setItem(`${role}Name`, name);
              localStorage.setItem(`${role}Email`, email);
              localStorage.setItem(`${role}Id`, id);

              alert("Login Successful!");
              handleClose();

              window.location.href = redirectRoute;

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
