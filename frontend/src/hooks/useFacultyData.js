"use client"

import { useState, useEffect } from "react"
// import { apiGet, apiPost, apiPut } from "../utils/api"

export const useFacultyData = () => {
  const [facultyProfile, setFacultyProfile] = useState(null)
  const [subjects, setSubjects] = useState([])
  const [topics, setTopics] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // Load faculty profile from localStorage or API
  useEffect(() => {
    loadFacultyProfile()
  }, [])

  const loadFacultyProfile = async () => {
    try {
      setLoading(true)
      setError("")

      // Get faculty data from localStorage (set during login)
      const facultyData = localStorage.getItem("faculty_data")
      if (facultyData) {
        const profile = JSON.parse(facultyData)
        setFacultyProfile(profile)
        setSubjects(profile.subjects || [])

        // Load topics for each subject
        await loadTopicsForSubjects(profile.subjects || [])
      } else {
        setError("Faculty profile not found. Please login again.")
      }
    } catch (err) {
      setError("Failed to load faculty profile.")
      console.error("Error loading faculty profile:", err)
    } finally {
      setLoading(false)
    }
  }

  const loadTopicsForSubjects = async (subjectsList) => {
    try {
      const topicsData = {}
      for (const subject of subjectsList) {
        try {
          const subjectTopics = await apiGet(`/api/notes?subject=${encodeURIComponent(subject)}`)
          topicsData[subject] = subjectTopics || []
        } catch (err) {
          console.error(`Error loading topics for ${subject}:`, err)
          topicsData[subject] = []
        }
      }
      setTopics(topicsData)
    } catch (err) {
      console.error("Error loading topics:", err)
    }
  }

  const updateProfileImage = async (imageFile) => {
    try {
      setError("")
      const formData = new FormData()
      formData.append("profileImage", imageFile)

      const response = await apiPut(`/api/faculty/update/facultyimages/${facultyProfile.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      // Update local profile data
      const updatedProfile = { ...facultyProfile, profileImage: response.faculty.profileImage }
      setFacultyProfile(updatedProfile)
      localStorage.setItem("faculty_data", JSON.stringify(updatedProfile))

      return response
    } catch (err) {
      setError("Failed to update profile image.")
      throw err
    }
  }

  const addTopicToSubject = async (subject, topicData) => {
    try {
      setError("")
      const formData = new FormData()

      // Add basic topic data
      formData.append("title", topicData.title)
      formData.append("subject", subject)
      formData.append("semester", topicData.semester || "")
      formData.append("year", topicData.year || "")
      formData.append("uploadedBy", facultyProfile.id)
      formData.append("description", topicData.description || "")

      // Add files if any
      if (topicData.files && topicData.files.length > 0) {
        topicData.files.forEach((file) => {
          formData.append("resources", file)
        })
      }

      // Add extra links if any
      if (topicData.extraLinks && topicData.extraLinks.length > 0) {
        topicData.extraLinks.forEach((link, index) => {
          formData.append(`extraLinks[${index}][url]`, link.url)
          formData.append(`extraLinks[${index}][type]`, link.type)
        })
      }

      const response = await apiPost("/api/notes", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      // Update local topics data
      setTopics((prev) => ({
        ...prev,
        [subject]: [...(prev[subject] || []), response],
      }))

      return response
    } catch (err) {
      setError("Failed to add topic.")
      throw err
    }
  }

  const refreshTopics = async (subject) => {
    try {
      const subjectTopics = await apiGet(`/api/notes?subject=${encodeURIComponent(subject)}`)
      setTopics((prev) => ({
        ...prev,
        [subject]: subjectTopics || [],
      }))
    } catch (err) {
      console.error(`Error refreshing topics for ${subject}:`, err)
    }
  }

  return {
    facultyProfile,
    subjects,
    topics,
    loading,
    error,
    setError,
    updateProfileImage,
    addTopicToSubject,
    refreshTopics,
    loadFacultyProfile,
  }
}
