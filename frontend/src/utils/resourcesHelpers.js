import { API_BASE_URL } from "./api"
import { FiBook, FiDatabase } from "react-icons/fi"

export const getDepartmentIcon = (deptName) => {
  return deptName.toLowerCase().includes("computer") ? FiDatabase  : FiBook ;
}

export const getDepartmentDescription = (deptName) => {
  return deptName.toLowerCase().includes("computer")
    ? "Programming, Software Development, Data Science, and Emerging Technologies"
    : "Strategic Management, Finance, Marketing, and Business Excellence"
}

export const handleDownload = (fileUrl, filename) => {
  const fullUrl = `${API_BASE_URL}${fileUrl}`
  const link = document.createElement("a")
  link.href = fullUrl
  link.download = filename || "download"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const getBreadcrumbItems = (currentView, selectedDept, selectedCourse, selectedSubject, selectedResource) => {
  const items = [
    { label: "Home", href: "/", active: false },
    { label: "Resources", href: "/resources", active: false },
    { label: "Academic Resources", active: currentView === "departments" },
  ]

  if (selectedDept) {
    items.push({ label: selectedDept.name, active: currentView === "courses" })
  }

  if (selectedCourse) {
    items.push({ label: selectedCourse.name, active: currentView === "subjects" })
  }

  if (selectedSubject) {
    items.push({ label: selectedSubject.name, active: currentView === "resources" })
  }

  if (selectedResource) {
    items.push({
      label:
        selectedResource === "papers"
          ? "Question Papers"
          : selectedResource === "books"
            ? "Reference Books"
            : "Syllabus",
      active: true,
    })
  }

  return items
}
