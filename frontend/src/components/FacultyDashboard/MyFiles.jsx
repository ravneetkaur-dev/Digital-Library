// import React, { useEffect, useState } from "react";
// import { Card, ListGroup, Container, Spinner, Alert } from "react-bootstrap";
// import axios from "axios";
// import { FaFileAlt } from "react-icons/fa"; // file icon

// export const MyFiles = () => {
//   const [files, setFiles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const facultyId = "FAC123"; // 🔁 Replace with real logged-in faculty ID

//   useEffect(() => {
//     const fetchFiles = async () => {
//       try {
//         const res = await axios.get(`/api/faculty/${facultyId}/files`);
//         setFiles(res.data);
//       } catch (err) {
//         setError("Failed to load files.");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFiles();
//   }, []);

//   return (
//     <Container>
//       <Card className="shadow">
//         <Card.Header><strong>📁 Uploaded Files</strong></Card.Header>
//         <ListGroup variant="flush">
//           {loading ? (
//             <ListGroup.Item>
//               <Spinner animation="border" size="sm" /> Loading files...
//             </ListGroup.Item>
//           ) : error ? (
//             <ListGroup.Item>
//               <Alert variant="danger">{error}</Alert>
//             </ListGroup.Item>
//           ) : files.length === 0 ? (
//             <ListGroup.Item>No files uploaded yet.</ListGroup.Item>
//           ) : (
//             files.map((file, index) => (
//               <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
//                 <div>
//                   <FaFileAlt className="me-2 text-primary" />
//                   <a
//                     href={file.fileUrl}
//                     target="_blank"
//                     rel="noreferrer"
//                     style={{ textDecoration: "none", color: "#007bff", fontWeight: 500 }}
//                   >
//                     {file.filename}
//                   </a>
//                 </div>
//                 <small className="text-muted">
//                   {new Date(file.uploadedOn).toLocaleDateString()}
//                 </small>
//               </ListGroup.Item>
//             ))
//           )}
//         </ListGroup>
//       </Card>
//     </Container>
//   );
// };



// MyFiles.jsx
import { Card, ListGroup, Container } from "react-bootstrap";

export const MyFiles = () => {
  // This can be fetched from API or state later
  const uploadedFiles = [
    { name: "Unit1.pdf", uploadedOn: "2025-07-25" },
    { name: "Assignment2.docx", uploadedOn: "2025-07-20" },
    { name: "Syllabus2025.pdf", uploadedOn: "2025-07-10" },
  ];

  return (
    <Container>
      <Card className="shadow">
        <Card.Header><strong>📁 Uploaded Files</strong></Card.Header>
        <ListGroup variant="flush">
          {uploadedFiles.map((file, index) => (
            <ListGroup.Item key={index}>
              <div className="d-flex justify-content-between">
                <span>{file.name}</span>
                <small className="text-muted">Uploaded on {file.uploadedOn}</small>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </Container>
  );
};
