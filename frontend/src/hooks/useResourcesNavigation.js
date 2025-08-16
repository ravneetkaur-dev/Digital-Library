import { useState } from "react"

export const useResourcesNavigation = () => {
  // Navigation states
  const [currentView, setCurrentView] = useState("departments")
  const [selectedDept, setSelectedDept] = useState(null)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [selectedSemester, setSelectedSemester] = useState("")
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [selectedResource, setSelectedResource] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  const handleBack = (view) => {
    setCurrentView(view)
    if (view === "departments") {
      setSelectedDept(null)
      setSelectedCourse(null)
      setSelectedSemester("")
      setSelectedSubject(null)
      setSelectedResource(null)
      setSearchTerm("")
    } else if (view === "courses") {
      setSelectedCourse(null)
      setSelectedSemester("")
      setSelectedSubject(null)
      setSelectedResource(null)
      setSearchTerm("")
    } else if (view === "subjects") {
      setSelectedSubject(null)
      setSelectedResource(null)
    } else if (view === "resources") {
      setSelectedResource(null)
    }
  }

  const resetSearch = () => {
    setSearchTerm("")
  }

  return {
    // States
    currentView,
    selectedDept,
    selectedCourse,
    selectedSemester,
    selectedSubject,
    selectedResource,
    searchTerm,
    // Setters
    setCurrentView,
    setSelectedDept,
    setSelectedCourse,
    setSelectedSemester,
    setSelectedSubject,
    setSelectedResource,
    setSearchTerm,
    // Functions
    handleBack,
    resetSearch,
  }
}
