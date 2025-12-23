
import { useEffect, useState } from "react"
import { Card, Tabs, Tab, Table, Button, Spinner } from "react-bootstrap"
import { apiDelete, apiGet, ENDPOINTS } from "../../utils/api"
import { FaTrash } from "react-icons/fa"

function BooksTable() {
  const [loading, setLoading] = useState(true)
  const [rows, setRows] = useState([])

  async function loadBook() {
    try {
      setLoading(true)
      const data = await apiGet(ENDPOINTS.books.list)
      setRows(Array.isArray(data) ? data : [])
    } catch (e) {
      console.error("Failed to load books:", e.message)
      setRows([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadBook()
  }, [])

  const handleBookDelete = async (id) => {
    if (!window.confirm("Delete this book?")) return
    try {
      await apiDelete(ENDPOINTS.books.delete(id))
      await loadBook()
    } catch (e) {
      alert(e.message || "Failed to delete book")
    }
  }

  return loading ? (
    <div className="text-muted d-flex align-items-center gap-2">
      <Spinner size="sm" animation="border" /> Loading books...
    </div>
  ) : (
    <div className="table-responsive">
      <Table hover className="align-middle">
        <thead>
          <tr>
            <th>Title</th>
            <th>Subject</th>
            <th>Author</th>
            <th>Semester</th>
            <th>Year</th>
            <th>Course</th>
            <th>Departments</th>
            <th style={{ width: 120 }}>Actions</th>
          </tr>
        </thead>
       <tbody>
          {rows.map((r) => (
            <tr key={r._id || r.id}>
              <td className="fw-semibold">{r.title || "Untitled"}</td>
              <td>{r.subject?.name || "N/A"}</td>
              <td>{r.author || "N/A"}</td>
              <td>{r.semester?.number || r.semester?.name || "N/A"}</td>
              <td>{r.year || "N/A"}</td>
              <td>{r.Course?.name || "N/A"}</td>
              <td>{r.department?.name || "N/A"}</td>
              <td>
                <Button
                  size="sm"
                  variant="outline-danger"
                  onClick={() => handleBookDelete(r._id || r.id)}
                >
                  <FaTrash className="me-1" /> Delete
                </Button>
              </td>
            </tr>
          ))}
          {!rows.length && (
            <tr>
              <td colSpan={8} className="text-center text-muted">
                No books found.
              </td>
            </tr>
          )}
        </tbody>

      </Table>
    </div>
  )
}

function SyllabusTable() {
  const [loading, setLoading] = useState(true)
  const [rows, setRows] = useState([])

  async function loadSyllabus() {
    try {
      setLoading(true)
      const data = await apiGet(ENDPOINTS.syllabus.list)
      setRows(Array.isArray(data) ? data : [])
    } catch (e) {
      console.error("Failed to load syllabus:", e.message)
      setRows([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSyllabus()
  }, [])

  const handleSyllabusDelete = async (id) => {
    if (!window.confirm("Delete this syllabus?")) return
    try {
      await apiDelete(ENDPOINTS.syllabus.delete(id))
      await loadSyllabus()
    } catch (e) {
      alert(e.message || "Failed to delete syllabus")
    }
  }

  return loading ? (
    <div className="text-muted d-flex align-items-center gap-2">
      <Spinner size="sm" animation="border" /> Loading syllabus...
    </div>
  ) : (
    <div className="table-responsive">
      <Table hover className="align-middle">
        <thead>
          <tr>
            <th>Title</th>
            <th>Subject</th>
            <th>Semester</th>
            <th>Year</th>
            <th>Course</th>
            <th>Departments</th>
            <th style={{ width: 120 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r._id || r.id}>
              <td className="fw-semibold">{r.title || "Untitled"}</td>
              <td>{r.subject?.name || "N/A"}</td>
              <td>{r.semester?.number || r.semester?.name || "N/A"}</td>
              <td>{r.year || "N/A"}</td>
              <td>{r.Course?.name || "N/A"}</td>
              <td>{r.department?.name || "N/A"}</td>
              <td>
                <Button
                  size="sm"
                  variant="outline-danger"
                  onClick={() => handleSyllabusDelete(r._id || r.id)}
                >
                  <FaTrash className="me-1" /> Delete
                </Button>
              </td>
            </tr>
          ))}
          {!rows.length && (
            <tr>
              <td colSpan={7} className="text-center text-muted">
                No syllabus found.
              </td>
            </tr>
          )}
        </tbody>

      </Table>
    </div>
  )
}

function PapersTable() {
  const [loading, setLoading] = useState(true)
  const [rows, setRows] = useState([])

  async function loadPaper() {
    try {
      setLoading(true)
      const data = await apiGet(ENDPOINTS.papers.list)
      setRows(Array.isArray(data) ? data : [])
    } catch (e) {
      console.error("Failed to load papers:", e.message)
      setRows([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPaper()
  }, [])

  const handlePaperDelete = async (id) => {
    if (!window.confirm("Delete this paper?")) return
    try {
      await apiDelete(ENDPOINTS.papers.delete(id))
      await loadPaper()
    } catch (e) {
      alert(e.message || "Failed to delete paper")
    }
  }

  return loading ? (
    <div className="text-muted d-flex align-items-center gap-2">
      <Spinner size="sm" animation="border" /> Loading papers...
    </div>
  ) : (
    <div className="table-responsive">
      <Table hover className="align-middle">
        <thead>
          <tr>
            <th>Title</th>
            <th>Subject</th>
            <th>Semester</th>
            <th>Year</th>
            <th>Course</th>
            <th>Department</th>
            <th style={{ width: 120 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r._id || r.id}>
              <td className="fw-semibold">{r.title || "Untitled"}</td>
              <td>{r.subject?.name || "N/A"}</td>
              <td>{r.semester?.number || r.semester?.name || "N/A"}</td>
              <td>{r.year || "N/A"}</td>
              <td>{r.course?.name || "N/A"}</td>
              <td>{r.department?.name || "N/A"}</td>
              <td>
                <Button
                  size="sm"
                  variant="outline-danger"
                  onClick={() => handlePaperDelete(r._id || r.id)}
                >
                  <FaTrash className="me-1" /> Delete
                </Button>
              </td>
            </tr>
          ))}
          {!rows.length && (
            <tr>
              <td colSpan={7} className="text-center text-muted">
                No papers found.
              </td>
            </tr>
          )}
        </tbody>

      </Table>
    </div>
  )
}

export default function LibraryManager() {
  return (
    <Card className="shadow-sm">
      <Card.Header className="bg-white">
        <strong>Library</strong>
      </Card.Header>
      <Card.Body>
        <Tabs defaultActiveKey="books" className="mb-3">
          <Tab eventKey="books" title="Books">
            <BooksTable />
          </Tab>
          <Tab eventKey="syllabus" title="Syllabus">
            <SyllabusTable />
          </Tab>
          <Tab eventKey="papers" title="Papers">
            <PapersTable />
          </Tab>
        </Tabs>
      </Card.Body>
    </Card>
  )
}
