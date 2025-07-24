import { Modal, Button, Form } from "react-bootstrap";
import './loginModal.css';
import { Link } from "react-router-dom";
export const LoginModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
        <Modal.Body className="login-body">
            <h3 className="login-title">Login</h3>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <Form.Group className="mb-3 text-end">
                    <a href="#" className="forgot-password-link">Forgot Password?</a>
                </Form.Group>
            </Form>


            <div className="login-buttons">
            <Button type="submit" className="login-submit">Login</Button>
            <Button onClick={handleClose} className="login-close">Close</Button>
            </div>
        </Modal.Body>
    </Modal>

  );
};
