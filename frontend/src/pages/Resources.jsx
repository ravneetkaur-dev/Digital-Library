
import { useMemo } from "react"
import { Container } from "react-bootstrap"
import { useResourcesData } from "../hooks/useResourcesData"
import { useResourcesNavigation } from "../hooks/useResourcesNavigation"
import ResourceHeader from "../components/resources/ResourceHeader"
import ResourceBreadcrumb from "../components/resources/ResourceBreadcrumb"
import DepartmentsView from "../components/resources/DepartmentsView"
import CoursesView from "../components/resources/CoursesView"
import SubjectsView from "../components/resources/SubjectsView"
import ResourcesSelectionView from "../components/resources/ResourcesSelectionView"
import PapersView from "../components/resources/PapersView"
import BooksView from "../components/resources/BooksView"
import SyllabusView from "../components/resources/SyllabusView"
import { NavBar } from "../components/Navbar/NavBar"
import "./Resources.css"

export const Resources = () => {
  // Custom hooks for data and navigation
  const {
    departments,
    courses,
    semesters,
    subjects,
    papers,
    books,
    syllabusData,
    loadingDepartments,
    loadingCourses,
    loadingSemesters,
    loadingSubjects,
    loadingPapers,
    loadingBooks,
    loadingSyllabus,
    error,
    setError,
    loadCourses,
    loadSemesters,
    loadSubjects,
    loadPapers,
    loadBooks,
    loadSyllabus,
  } = useResourcesData()

  const {
    currentView,
    selectedDept,
    selectedCourse,
    selectedSemester,
    selectedSubject,
    selectedResource,
    searchTerm,
    setCurrentView,
    setSelectedDept,
    setSelectedCourse,
    setSelectedSemester,
    setSelectedSubject,
    setSelectedResource,
    setSearchTerm,
    handleBack,
    resetSearch,
  } = useResourcesNavigation()

  // Get filtered subjects based on search term
  const filteredSubjects = useMemo(() => {
    if (!searchTerm) return subjects

    return subjects.filter(
      (subject) =>
        subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subject.code.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [subjects, searchTerm])

  // Navigation handlers
  const handleSelectDepartment = async (dept) => {
    setSelectedDept(dept)
    setCurrentView("courses")
    await loadCourses(dept._id)
  }

  const handleSelectCourse = async (course) => {
    setSelectedCourse(course)
    setSelectedSemester("")
    resetSearch()
    setCurrentView("subjects")
    await loadSemesters(course._id)
  }

  const handleSelectSemester = async (semesterId) => {
    setSelectedSemester(semesterId)
    await loadSubjects(selectedCourse, semesterId)
  }

  const handleSelectSubject = (subject) => {
    setSelectedSubject(subject)
    setCurrentView("resources")
  }

  const handleSelectResource = async (resource) => {
    setSelectedResource(resource)
    setCurrentView(resource)

    // Load data based on resource type
    if (resource === "papers") {
      await loadPapers(selectedSubject)
    } else if (resource === "books") {
      await loadBooks(selectedSubject)
    } else if (resource === "syllabus") {
      await loadSyllabus(selectedSubject)
    }
  }

  const handleErrorClose = () => {
    setError("")
  }

  const handleBackWithErrorClear = (view) => {
    handleBack(view)
    setError("")
  }

  return (
    <> <NavBar/>
    <div className="res-container">
      <ResourceHeader />

      <Container>
        <ResourceBreadcrumb
          currentView={currentView}
          selectedDept={selectedDept}
          selectedCourse={selectedCourse}
          selectedSubject={selectedSubject}
          selectedResource={selectedResource}
        />

        {currentView === "departments" && (
          <DepartmentsView
            departments={departments}
            loadingDepartments={loadingDepartments}
            error={error}
            onSelectDepartment={handleSelectDepartment}
            onErrorClose={handleErrorClose}
          />
        )}

        {currentView === "courses" && (
          <CoursesView
            selectedDept={selectedDept}
            courses={courses}
            loadingCourses={loadingCourses}
            error={error}
            onBack={handleBackWithErrorClear}
            onSelectCourse={handleSelectCourse}
            onErrorClose={handleErrorClose}
          />
        )}

        {currentView === "subjects" && (
          <SubjectsView
            selectedCourse={selectedCourse}
            semesters={semesters}
            selectedSemester={selectedSemester}
            filteredSubjects={filteredSubjects}
            searchTerm={searchTerm}
            loadingSemesters={loadingSemesters}
            loadingSubjects={loadingSubjects}
            error={error}
            onBack={handleBackWithErrorClear}
            onSelectSemester={handleSelectSemester}
            onSearchChange={setSearchTerm}
            onSelectSubject={handleSelectSubject}
            onErrorClose={handleErrorClose}
          />
        )}

        {currentView === "resources" && (
          <ResourcesSelectionView
            selectedSubject={selectedSubject}
            error={error}
            onBack={handleBackWithErrorClear}
            onSelectResource={handleSelectResource}
            onErrorClose={handleErrorClose}
          />
        )}

        {currentView === "papers" && (
          <PapersView
            selectedSubject={selectedSubject}
            papers={papers}
            loadingPapers={loadingPapers}
            error={error}
            onBack={handleBackWithErrorClear}
            onErrorClose={handleErrorClose}
          />
        )}

        {currentView === "books" && (
          <BooksView
            selectedSubject={selectedSubject}
            books={books}
            loadingBooks={loadingBooks}
            error={error}
            onBack={handleBackWithErrorClear}
            onErrorClose={handleErrorClose}
          />
        )}

        {currentView === "syllabus" && (
          <SyllabusView
            selectedSubject={selectedSubject}
            syllabusData={syllabusData}
            loadingSyllabus={loadingSyllabus}
            error={error}
            onBack={handleBackWithErrorClear}
            onErrorClose={handleErrorClose}
          />
        )}
      </Container>
    </div>
    </>
  )
}

