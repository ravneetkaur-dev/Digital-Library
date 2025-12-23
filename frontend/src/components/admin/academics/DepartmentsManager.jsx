import { useState } from "react"
import { Card, Button, Table, Modal, Form, Spinner } from "react-bootstrap"
import { FaPlus, FaEdit, FaTrash, FaBuilding } from "react-icons/fa"
import { apiPost, apiPut, apiDelete, ENDPOINTS } from "../../../utils/api"
import { toast, ToastContainer } from "react-toastify"
import '../academics.css'

export default function DepartmentsManager({ notify, onDataChange, departments }) {
  const [showModal, setShowModal] = useState(false)
  const [editingDept, setEditingDept] = useState(null)
  const [formData, setFormData] = useState({ name: "" })
  const [loading, setLoading] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deletingDept, setDeletingDept] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name.trim()) {
      notify("error", "Department name is required")
      return
    }

    try {
      setLoading(true)
      if (editingDept) {
        await apiPut(`${ENDPOINTS.course.departments.list}/${editingDept._id}`, formData)
        // notify("success", "Department updated successfully")
        toast.success("Department updated successfully", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          style: {
            backgroundColor: "#ffffff",
            color: "#333333",
          },
          progressStyle: {
            backgroundColor: "#22c55e",
          },
        })

      } else {
        await apiPost(ENDPOINTS.course.departments.create, formData)
        // notify("success", "Department created successfully")
        toast.success("Department created successfully", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          style: {
            backgroundColor: "#ffffff",
            color: "#333333",
          },
          progressStyle: {
            backgroundColor: "#22c55e",
          },
        })
      }

      setShowModal(false)
      setFormData({ name: "" })
      setEditingDept(null)
      onDataChange()
    } catch (error) {
      notify("error", error.message || "Operation failed")
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (dept) => {
    setEditingDept(dept)
    setFormData({ name: dept.name })
    setShowModal(true)
  }

  const handleDelete = async () => {
    if (!deletingDept) return

    try {
      setLoading(true)
      await apiDelete(`${ENDPOINTS.course.departments.list}/${deletingDept._id}`)
      // notify("success", "Department deleted successfully")
      toast.success("Department deleted successfully", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          style: {
            backgroundColor: "#ffffff",
            color: "#333333",
          },
          progressStyle: {
            backgroundColor: "#22c55e",
          },
        })
      setShowDeleteModal(false)
      setDeletingDept(null)
      onDataChange()
    } catch (error) {
      // notify("error", error.message || "Failed to delete department")
      toast.error(err.message || "Upload failed", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
          style: {
            backgroundColor: "#ffffff",
            color: "#333333",
          },
          progressStyle: {
            backgroundColor: "#ef4444",
          },
      })
    } finally {
      setLoading(false)
    }
  }

  const openDeleteModal = (dept) => {
    setDeletingDept(dept)
    setShowDeleteModal(true)
  }

  const resetModal = () => {
    setShowModal(false)
    setEditingDept(null)
    setFormData({ name: "" })
  }

  return (
    <>
    <ToastContainer
      position="top-center"
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
    <div className="departments-manager">
      <Card className="shadow-sm">
        <Card.Header className="bg-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">
            <FaBuilding className="me-2 text-primary" />
            Departments Management
          </h5>
          <Button variant="primary" size="sm" onClick={() => setShowModal(true)}>
            <FaPlus className="me-1" />
            Add Department
          </Button>
        </Card.Header>
        <Card.Body className="p-0">
          <div className="table-responsive">
            <Table hover className="mb-0">
              <thead className="table-light">
                <tr>
                  <th style={{ width: "60px" }}>#</th>
                  <th>Department Name</th>
                  <th style={{ width: "120px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {departments.map((dept, index) => (
                  <tr key={dept._id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <FaBuilding className="me-2 text-muted" />
                        {dept.name}
                      </div>
                    </td>
                    <td>
                      <div className="btn-group" role="group">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => handleEdit(dept)}
                          title="Edit Department"
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => openDeleteModal(dept)}
                          title="Delete Department"
                        >
                          <FaTrash />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {departments.length === 0 && (
                  <tr>
                    <td colSpan={3} className="text-center py-4 text-muted">
                      <FaBuilding size={24} className="mb-2 opacity-50" />
                      <br />
                      No departments found. Add your first department to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={resetModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editingDept ? "Edit Department" : "Add New Department"}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Department Name *</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., Computer Science"
                value={formData.name}
                onChange={(e) => setFormData({ name: e.target.value })}
                required
                autoFocus
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={resetModal}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={loading}>
              {loading && <Spinner size="sm" className="me-2" />}
              {editingDept ? "Update" : "Create"} Department
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete the department:</p>
          <strong>"{deletingDept?.name}"</strong>
          <p className="text-danger mt-2 mb-0">
            <small>This action cannot be undone and may affect related courses.</small>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete} disabled={loading}>
            {loading && <Spinner size="sm" className="me-2" />}
            Delete Department
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </>
  )
}
