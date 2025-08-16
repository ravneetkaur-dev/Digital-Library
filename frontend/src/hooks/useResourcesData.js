
import { useState, useEffect } from "react"
import { apiGet } from "../utils/api"

export const useResourcesData = () => {
  // Data states
  const [departments, setDepartments] = useState([])
  const [courses, setCourses] = useState([])
  const [semesters, setSemesters] = useState([])
  const [subjects, setSubjects] = useState([])
  const [papers, setPapers] = useState([])
  const [books, setBooks] = useState([])
  const [syllabusData, setSyllabusData] = useState([])

  // Loading states
  const [loadingDepartments, setLoadingDepartments] = useState(true)
  const [loadingCourses, setLoadingCourses] = useState(false)
  const [loadingSemesters, setLoadingSemesters] = useState(false)
  const [loadingSubjects, setLoadingSubjects] = useState(false)
  const [loadingPapers, setLoadingPapers] = useState(false)
  const [loadingBooks, setLoadingBooks] = useState(false)
  const [loadingSyllabus, setLoadingSyllabus] = useState(false)

  // Error states
  const [error, setError] = useState("")

  // Load departments on hook initialization
  useEffect(() => {
    loadDepartments()
  }, [])

  const loadDepartments = async () => {
    try {
      setLoadingDepartments(true)
      setError("")
      const data = await apiGet("/api/course/departments")
      setDepartments(data)
    } catch (err) {
      setError("Failed to load departments. Please try again.")
      console.error("Error loading departments:", err)
    } finally {
      setLoadingDepartments(false)
    }
  }

  const loadCourses = async (departmentId) => {
    try {
      setLoadingCourses(true)
      setError("")
      const data = await apiGet(`/api/course/courses/${departmentId}`)
      setCourses(data)
    } catch (err) {
      setError("Failed to load courses. Please try again.")
      console.error("Error loading courses:", err)
    } finally {
      setLoadingCourses(false)
    }
  }

  const loadSemesters = async (courseId) => {
    try {
      setLoadingSemesters(true)
      setError("")
      const data = await apiGet(`/api/course/semesters/${courseId}`)
      setSemesters(data)
    } catch (err) {
      setError("Failed to load semesters. Please try again.")
      console.error("Error loading semesters:", err)
    } finally {
      setLoadingSemesters(false)
    }
  }

  const loadSubjects = async (selectedCourse, selectedSemester) => {
    try {
      setLoadingSubjects(true)
      setError("")
      const data = await apiGet("/api/subjects")
      // Filter subjects by selected course and semester
      const filteredSubjects = data.filter(
        (subject) =>
          subject.course &&
          subject.semester &&
          subject.course._id === selectedCourse._id &&
          subject.semester._id === selectedSemester,
      )
      setSubjects(filteredSubjects)
    } catch (err) {
      setError("Failed to load subjects. Please try again.")
      console.error("Error loading subjects:", err)
    } finally {
      setLoadingSubjects(false)
    }
  }

 const loadPapers = async (selectedSubject) => {
  if (!selectedSubject || !selectedSubject.name) {
    setError("Please select a subject first.")
    setLoadingPapers(false)
    return
  }

  try {
    setLoadingPapers(true)
    setError("")

    const data = await apiGet("/api/paper")
    console.log("Papers data:", data)

    const filteredPapers = data.filter((paper) => {
      if (!paper.subject) return false

      // Handle paper.subject being either a string or object with a name property
      const paperSubjName = typeof paper.subject === "string" ? paper.subject : paper.subject.name
      if (!paperSubjName) return false

      const selSubjName = selectedSubject.name

      return paperSubjName.toLowerCase().includes(selSubjName.toLowerCase())
    })

    console.log("Filtered papers:", filteredPapers)
    setPapers(filteredPapers)
  } catch (err) {
    setError("Failed to load papers. Please try again.")
    console.error("Error loading papers:", err)
  } finally {
    setLoadingPapers(false)
  }
}


  const loadBooks = async (selectedSubject) => {
    try {
      setLoadingBooks(true)
      setError("")
      const data = await apiGet("/api/book/filter")
      console.log("Books data:", data)
      // Filter books by selected subject - make the comparison more flexible
     const filteredBooks = data.filter((book) => {
      if (!book.subject?.name || !selectedSubject.name) return false;
      const bookSubjectName = book.subject.name.toLowerCase();
      const selectedName = selectedSubject.name.toLowerCase();
      return bookSubjectName.includes(selectedName) || selectedName.includes(bookSubjectName);
    });
      console.log("Filtered books:", filteredBooks)
      setBooks(filteredBooks)
    } catch (err) {
      setError("Failed to load books. Please try again.")
      console.error("Error loading books:", err)
    } finally {
      setLoadingBooks(false)
    }
  }
const loadSyllabus = async (selectedSubject) => {
  try {
    setLoadingSyllabus(true)
    setError("")
    
    const data = await apiGet("/api/syllabus/getsyllabus")
    console.log("Syllabus data:", data)

    const filteredSyllabus = data.filter((syllabus) => {
      const syllabusSubject = syllabus.subject?.name || syllabus.subject
      if (!syllabusSubject || !selectedSubject.name) return false
      return (
        syllabusSubject.toLowerCase().includes(selectedSubject.name.toLowerCase()) ||
        selectedSubject.name.toLowerCase().includes(syllabusSubject.toLowerCase())
      )
    })

    console.log("Filtered syllabus:", filteredSyllabus)
    setSyllabusData(filteredSyllabus)
  } catch (err) {
    setError("Failed to load syllabus. Please try again.")
    console.error("Error loading syllabus:", err)
  } finally {
    setLoadingSyllabus(false)
  }
}


  return {
    // Data
    departments,
    courses,
    semesters,
    subjects,
    papers,
    books,
    syllabusData,
    // Loading states
    loadingDepartments,
    loadingCourses,
    loadingSemesters,
    loadingSubjects,
    loadingPapers,
    loadingBooks,
    loadingSyllabus,
    // Error state
    error,
    setError,
    // Functions
    loadDepartments,
    loadCourses,
    loadSemesters,
    loadSubjects,
    loadPapers,
    loadBooks,
    loadSyllabus,
  }
}
