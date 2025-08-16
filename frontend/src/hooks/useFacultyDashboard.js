"use client"

import { useState, useEffect } from "react"
import { apiGet, apiPut, apiDelete, apiUpload, ENDPOINTS } from "../utils/api"

export const useFacultyDashboard = () => {
  const [facultyData, setFacultyData] = useState(null)
  const [subjects, setSubjects] = useState([])
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    loadFacultyData()
  }, [])

  const loadFacultyData = async () => {
    try {
      setLoading(true)
      const storedData = localStorage.getItem("faculty_data")
      if (storedData) {
        const data = JSON.parse(storedData)
        setFacultyData(data)
        setSubjects(data.subjects || [])
        await loadNotes(data.id)
      } else {
        setError("Faculty data not found. Please login again.")
      }
    } catch (err) {
      setError("Failed to load faculty data")
      console.error("Error loading faculty data:", err)
    } finally {
      setLoading(false)
    }
  }

  const loadNotes = async (facultyId) => {
    try {
      const response = await apiGet(ENDPOINTS.notes.byFaculty(facultyId))
      setNotes(Array.isArray(response) ? response : [])
    } catch (err) {
      console.error("Error loading notes:", err)
      setNotes([])
    }
  }

  const updateProfileImage = async (imageFile) => {
    if (!imageFile || !facultyData) return

    try {
      setLoading(true)
      const formData = new FormData()
      formData.append("profileImage", imageFile)

      const response = await apiUpload(ENDPOINTS.faculty.updateImage(facultyData.id), formData)

      const updatedData = { ...facultyData, profileImage: response.faculty.profileImage }
      setFacultyData(updatedData)
      localStorage.setItem("faculty_data", JSON.stringify(updatedData))

      setSuccess("Profile image updated successfully!")
      return updatedData
    } catch (err) {
      setError("Failed to update profile image")
      console.error("Error updating image:", err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const addNote = async (noteData) => {
    try {
      setLoading(true)
      const formData = new FormData()

      formData.append("title", noteData.title)
      formData.append("subject", noteData.subject)
      formData.append("description", noteData.description)
      formData.append("semester", noteData.semester)
      formData.append("year", noteData.year)
      formData.append("uploadedBy", facultyData.id)
      formData.append("isPublic", noteData.isPublic)

      // Add files
      noteData.files.forEach((file) => {
        formData.append("resources", file)
      })

      // Add extra links
      const extraLinks = []
      if (noteData.videoLink) {
        extraLinks.push({ url: noteData.videoLink, type: "video" })
      }
      if (noteData.websiteLink) {
        extraLinks.push({ url: noteData.websiteLink, type: "website" })
      }

      extraLinks.forEach((link, index) => {
        formData.append(`extraLinks[${index}][url]`, link.url)
        formData.append(`extraLinks[${index}][type]`, link.type)
      })

      await apiUpload(ENDPOINTS.notes.create, formData)

      setSuccess("Note added successfully!")
      await loadNotes(facultyData.id)
    } catch (err) {
      setError("Failed to add note")
      console.error("Error adding note:", err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const changePassword = async (passwordData) => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("New passwords do not match")
      throw new Error("Passwords do not match")
    }

    try {
      setLoading(true)
      await apiPut(ENDPOINTS.faculty.updatePassword(facultyData.id), {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      })

      setSuccess("Password updated successfully!")
    } catch (err) {
      setError("Failed to update password")
      console.error("Error updating password:", err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const toggleNoteVisibility = async (noteId, currentStatus) => {
    try {
      await apiPut(ENDPOINTS.notes.toggleVisibility(noteId), {
        isPublic: !currentStatus,
      })

      setSuccess("Note visibility updated!")
      await loadNotes(facultyData.id)
    } catch (err) {
      setError("Failed to update note visibility")
      console.error("Error updating visibility:", err)
    }
  }

  const deleteNote = async (noteId) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return

    try {
      await apiDelete(ENDPOINTS.notes.delete(noteId))
      setSuccess("Note deleted successfully!")
      await loadNotes(facultyData.id)
    } catch (err) {
      setError("Failed to delete note")
      console.error("Error deleting note:", err)
    }
  }

  const getSubjectNotes = (subject) => {
    return notes.filter((note) => note.subject === subject)
  }

  const clearMessages = () => {
    setError("")
    setSuccess("")
  }

  return {
    facultyData,
    subjects,
    notes,
    loading,
    error,
    success,
    updateProfileImage,
    addNote,
    changePassword,
    toggleNoteVisibility,
    deleteNote,
    getSubjectNotes,
    clearMessages,
    loadNotes,
  }
}
