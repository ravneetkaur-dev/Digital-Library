import { useEffect, useState } from 'react';
import { Table, Button, Card, Spinner, Image, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

export const ManageFaculty = () => {
  const [facultyList, setFacultyList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [deleteFacultyId, setDeleteFacultyId] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    designation: '',
    role: '',
    subjects: ''
  });

  const fetchFaculty = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/getfaculty');
      setFacultyList(res.data);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConfirm = (id) => {
    setDeleteFacultyId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/delete/${deleteFacultyId}`);
      setShowDeleteModal(false);
      fetchFaculty();
    } catch (err) {
      console.error('Delete error:', err);
      alert("Error deleting faculty member.");
    }
  };

  const handleEditClick = (faculty) => {
    setSelectedFaculty(faculty);
    setFormData({
      name: faculty.name,
      email: faculty.email,
      department: faculty.department || '',
      designation: faculty.designation || '',
      role: faculty.role || '',
      subjects: (faculty.subjects || []).join(', ')
    });
    setShowUpdateModal(true);
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/admin/update/${selectedFaculty._id}`, {
        ...formData,
        subjects: formData.subjects.split(',').map(sub => sub.trim())
      });
      setShowUpdateModal(false);
      fetchFaculty();
    } catch (error) {
      console.error('Update error:', error);
      alert("Error updating faculty member.");
    }
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  return (
    <>
      <Card className="p-4 shadow border-0 rounded-4">
        <h3 className="text-center fw-bold mb-4" style={{ color: "#002147" }}>
          Manage Faculty Members
        </h3>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3">Loading faculty data...</p>
          </div>
        ) : facultyList.length === 0 ? (
          <div className="text-center py-4 text-muted">No faculty members found.</div>
        ) : (
          <Table responsive bordered hover className="text-center align-middle">
            <thead className="table-primary">
              <tr>
                <th>#</th>
                <th>Profile</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {facultyList.map((faculty, index) => (
                <tr key={faculty._id}>
                  <td>{index + 1}</td>
                  <td>
                    <Image
                      src={faculty.profilePic || '/default-user-icon.png'}
                      alt="Profile"
                      roundedCircle
                      width={45}
                      height={45}
                      className="object-fit-cover"
                    />
                  </td>
                  <td>{faculty.name}</td>
                  <td>{faculty.email}</td>
                  <td>{faculty.department || '—'}</td>
                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      <Button
                        size="sm"
                        className="rounded-pill px-3 border-0"
                        onClick={() => handleEditClick(faculty)}
                        style={{ backgroundColor: "#002147" }}
                      >
                        Update
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        className="rounded-pill px-3"
                        onClick={() => handleDeleteConfirm(faculty._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>

      {/* ===== Update Modal ===== */}
      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Faculty</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="facultyName" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="facultyEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="facultyDepartment" className="mb-3">
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="text"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="facultyDesignation" className="mb-3">
              <Form.Label>Designation</Form.Label>
              <Form.Control
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="facultyRole" className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Control
                type="text"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="facultySubjects" className="mb-3">
              <Form.Label>Subjects (comma separated)</Form.Label>
              <Form.Control
                type="text"
                name="subjects"
                value={formData.subjects}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setShowUpdateModal(false)}>
            Cancel
          </Button>
          <Button onClick={handleUpdate} style={{ backgroundColor: "#002147", border: "none" }}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* ===== Delete Confirmation Modal ===== */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this faculty member? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer className='border-0'>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
