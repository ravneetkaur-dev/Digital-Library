"use client"

import { useEffect, useMemo, useState } from "react"
import { Table, Button, Form, InputGroup, Spinner } from "react-bootstrap"
import { apiDelete, apiGet, ENDPOINTS } from "../../utils/api"
import { FaEdit, FaTrash, FaSearch, FaUser } from "react-icons/fa"
import "./admin.css"

export default function FacultyTable({ onEdit }) {
  const [loading, setLoading] = useState(true)
  const [faculties, setFaculties] = useState([])
  const [query, setQuery] = useState("")

  async function load() {
    try {
      setLoading(true)
      const data = await apiGet(ENDPOINTS.faculty.list)
      setFaculties(Array.isArray(data) ? data : [])
    } catch (e) {
      console.error("Failed to load faculty:", e.message)
      setFaculties([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const filtered = useMemo(() => {
    if (!query.trim()) return faculties
    const q = query.toLowerCase()
    return faculties.filter((f) =>
      [f.name, f.email, f.role, f.designation, f.department]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q)),
    )
  }, [faculties, query])

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this faculty?")) return
    try {
      await apiDelete(ENDPOINTS.faculty.delete(id))
      await load()
    } catch (e) {
      alert(e.message || "Failed to delete")
    }
  }

  const total = faculties.length
  const showEmpty = !loading && filtered.length === 0

  return (
    <div className="ft-card">
      <div className="ft-header">
        <div className="ft-titles">
          <h3 className="ft-title">Faculty</h3>
          <p className="ft-subtitle">{total} total</p>
        </div>
        <InputGroup className="ft-search">
          <InputGroup.Text className="ft-search-addon">
            <FaSearch size={12} />
          </InputGroup.Text>
          <Form.Control
            placeholder="Search name, email, role, department..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </InputGroup>
      </div>

      {loading ? (
        <div className="ft-body">
          <div className="ft-loading">
            <Spinner size="sm" animation="border" />
            <span>Loading faculty...</span>
          </div>
        </div>
      ) : (
        <div className="ft-table">
          <div className="table-responsive">
            <Table hover className="mb-0">
              <thead className="ft-table-header">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Designation</th>
                  <th>Department</th>
                  <th>Subjects</th>
                  <th style={{ width: 160 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((f) => {
                  const id = f._id || f.id
                  const role = f.role || "faculty"
                  const img = f.profileImage || f.profilePicture || ""
                  const hasImage =
                    img && typeof img === "string" && img.trim().length > 0 && !img.endsWith("default.jpg")
                  return (
                    <tr key={id} className="ft-table-row">
                      <td>
                        <div className="ft-user">
                          <div className={`ft-avatar ${hasImage ? "" : "ft-avatar-fallback"}`}>
                            {hasImage ? (
                              <img src={img || "/placeholder.svg"} alt={f.name ? `${f.name} profile` : "profile"} />
                            ) : (
                              <FaUser size={14} />
                            )}
                          </div>
                          <div className="ft-user-meta">
                            <div className="ft-user-name">{f.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="ft-muted">{f.email}</td>
                      <td>
                        <span className={`ft-role ${role === "admin" ? "ft-role-admin" : "ft-role-faculty"}`}>
                          {role}
                        </span>
                      </td>
                      <td>{f.designation || "—"}</td>
                      <td>{f.department || "—"}</td>
                      <td>
                        {Array.isArray(f.subjects) && f.subjects.length > 0 ? (
                          <span className="ft-pill">{f.subjects.length}</span>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td>
                        <div className="ft-actions">
                          <Button size="sm" variant="outline-primary" className="ft-action-btn" onClick={() => onEdit(f)}>
                            <FaEdit className="me-1" /> Edit
                          </Button>
                          <Button size="sm" variant="outline-danger" className="ft-action-btn" onClick={() => handleDelete(id)}>
                            <FaTrash className="me-1" /> Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
                {showEmpty && (
                  <tr>
                    <td colSpan={7} className="text-center ft-empty">
                      No faculty found{query ? ` for "${query}"` : ""}.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      )}
    </div>
  )
}