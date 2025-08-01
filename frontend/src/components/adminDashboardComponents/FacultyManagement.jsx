import { useEffect, useState } from 'react';
import { Form, Button, Table, Card } from 'react-bootstrap';
import axios from 'axios';

export const FacultyManagement = () => {
  const [facultyList, setFacultyList] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'faculty' });

  const fetchFaculty = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/getfaculty', { withCredentials: true });
      setFacultyList(res.data);
    } catch (err) {
      console.error('Error fetching faculty:', err);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/admin/register', formData, { withCredentials: true });
      fetchFaculty();
      setFormData({ name: '', email: '', password: '', role: 'faculty' });
    } catch (err) {
      console.error('Error adding faculty:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this faculty?')) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/delete/${id}`, { withCredentials: true });
        fetchFaculty();
      } catch (err) {
        console.error('Error deleting faculty:', err);
      }
    }
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  return (
    <Card className="p-4 shadow-sm">
      <h3 className="mb-4">Manage Faculty</h3>
      <Form onSubmit={handleAdd}>
        <Form.Group className="mb-2">
          <Form.Control
            placeholder="Name"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control
            placeholder="Email"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control
            placeholder="Password"
            type="password"
            value={formData.password}
            onChange={e => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </Form.Group>
        <Button type="submit" className='border-0' style={{backgroundColor:"#002147"}}>Add Faculty</Button>
      </Form>

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {facultyList.map((f, i) => (
            <tr key={f._id}>
              <td>{i + 1}</td>
              <td>{f.name}</td>
              <td>{f.email}</td>
              <td>
                <Button variant="danger" size="sm" onClick={() => handleDelete(f._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
};

