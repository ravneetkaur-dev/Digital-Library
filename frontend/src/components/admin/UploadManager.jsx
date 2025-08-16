"use client"

import { useState } from "react"
import { Card, Form } from "react-bootstrap"
import SyllabusUploadForm from "./forms/SyllabusUploadForm"
import BookUploadForm from "./forms/BookUploadForm"
import PaperUploadForm from "./forms/PaperUploadForm"

export default function UploadManager() {
  const [type, setType] = useState("syllabus")

  return (
    <Card className="shadow-sm upload-card">
      <Card.Header className="bg-white">
        <div className="d-flex align-items-center justify-content-between">
          <strong>Upload Center</strong>
          <div style={{ minWidth: 220 }}>
            <Form.Select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="syllabus">Syllabus</option>
              <option value="book">Book</option>
              <option value="paper">Paper</option>
            </Form.Select>
          </div>
        </div>
      </Card.Header>
      <Card.Body>
        {type === "syllabus" && <SyllabusUploadForm />}
        {type === "book" && <BookUploadForm />}
        {type === "paper" && <PaperUploadForm />}
      </Card.Body>
    </Card>
  )
}
