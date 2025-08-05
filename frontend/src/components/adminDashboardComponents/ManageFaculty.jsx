import { useEffect, useState } from 'react';
import { Table, Button, Card, Spinner, Image } from 'react-bootstrap';
import axios from 'axios';

export const ManageFaculty = () => {
  const [facultyList, setFacultyList] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this faculty member?')) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/delete/${id}`);
        fetchFaculty();
      } catch (err) {
        console.error('Delete error:', err);
        alert("Error deleting faculty member.");
      }
    }
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  return (
    <Card className="p-4 shadow border-0 rounded-4">
      <h3 className="text-center text-primary fw-bold mb-4">Manage Faculty Members</h3>

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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {facultyList.map((faculty, index) => (
              <tr key={faculty._id}>
                <td>{index + 1}</td>
                <td>
                  <Image
                    src={faculty.profilePic || '/default-user-icon.png'} // fallback if image not found
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
                  <Button 
                    variant="danger" 
                    size="sm" 
                    className="rounded-pill px-3"
                    onClick={() => handleDelete(faculty._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Card>
  );
};
