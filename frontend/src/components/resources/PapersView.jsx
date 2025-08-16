"use client"
import { Button } from "react-bootstrap"
import { FaArrowLeft, FaFilePdf, FaDownload, FaEye } from "react-icons/fa"
import LoadingSpinner from "./LoadingSpinner"
import ErrorAlert from "./ErrorAlert"
import { handleDownload } from "../../utils/resourcesHelpers"
import { API_BASE_URL } from "../../utils/api"

const PapersView = ({ selectedSubject, papers, loadingPapers, error, onBack, onErrorClose }) => {
  // Function to view PDF in a new tab
  const handleView = (fileUrl) => {
    if (!fileUrl) return
    const fullUrl = `${API_BASE_URL}${fileUrl}`
    window.open(fullUrl, "_blank")
  }

  return (
    <div className="res-slide-in">
      {/* Back Button */}
      <Button className="res-back-button mb-4" onClick={() => onBack("resources")}>
        <FaArrowLeft className="me-2" />
        Back to Resources
      </Button>

      {/* Error Alert */}
      <ErrorAlert error={error} onClose={onErrorClose} />

      {/* Section Title */}
      <h3 className="res-section-title">
        Question Papers {selectedSubject?.name ? `- ${selectedSubject.name}` : ""}
      </h3>

      {/* Loading State */}
      {loadingPapers ? (
        <LoadingSpinner text="Loading papers..." />
      ) : (
        <div className="res-papers-table-container">
          <div className="table-responsive">
            <table className="table res-papers-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Year</th>
                  <th>Semester</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {papers.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-4">
                      No papers available for this subject.
                    </td>
                  </tr>
                ) : (
                  papers.map((paper) => {
                    const semesterName =
                      typeof paper.semester === "string"
                        ? paper.semester
                        : paper.semester?.number || "N/A"

                    const file = paper.resources?.[0]

                    return (
                      <tr key={paper._id}>
                        <td>
                          <div className="res-paper-title">
                            <FaFilePdf className="res-paper-pdf-icon" />
                            {paper.title || "Untitled Paper"}
                          </div>
                        </td>
                        <td>{paper.year || "N/A"}</td>
                        <td>{semesterName}</td>
                        <td>
                          <div className="res-paper-actions d-flex gap-2">
                            {file ? (
                              <>
                                <Button
                                  variant="outline-primary"
                                  className="res-paper-btn res-paper-btn-download"
                                  onClick={() => handleView(file.fileUrl)}
                                >
                                  <FaEye className="me-1" />
                                  View
                                </Button>
                                
                              </>
                            ) : (
                              <span className="text-muted">No file available</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default PapersView
