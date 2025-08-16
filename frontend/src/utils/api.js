import axios from "axios"

// Base API URL (change if needed)
export const API_BASE_URL =
  (typeof window !== "undefined" && (localStorage.getItem("API_BASE_URL") || window.API_BASE_URL)) ||
  "http://localhost:5000"

// Create axios instance
export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
})

// Attach token automatically
api.interceptors.request.use((config) => {
  const facultyToken = typeof window !== "undefined" ? localStorage.getItem("faculty_token") : null
  const adminToken = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null
  const token = facultyToken || adminToken
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Global response handler
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Request failed"
    return Promise.reject(new Error(message))
  }
)

// API Endpoints
export const ENDPOINTS = {
  faculty: {
    login: "/api/faculty/login",
    logout: "/api/faculty/logout",
    profile: (id) => `/api/faculty/profile/${id}`,
    updateImage: (id) => `/api/faculty/update/facultyimages/${id}`,
    updatePassword: (id) => `/api/faculty/update/password/${id}`,
    list: "/api/facultymanagement/getfaculty",
    create: "/api/facultymanagement/register",
    update: (id) => `/api/facultymanagement/update/${id}`,
    delete: (id) => `/api/facultymanagement/delete/${id}`,
  },
  notes: {
    list: "/api/notes",
    create: "/api/notes",
    update: (id) => `/api/notes/${id}`,
    delete: (id) => `/api/notes/${id}`,
    byFaculty: (facultyId) => `/api/notes?uploadedBy=${facultyId}`,
    bySubject: (subject) => `/api/notes?subject=${encodeURIComponent(subject)}`,
    approve: (id) => `/api/notes/${id}/approve`,
    toggleVisibility: (id) => `/api/notes/${id}/visibility`,
  },
  syllabus: {
    list: "/api/syllabus/getsyllabus",
    create: "/api/syllabus/uploadsyllabus",
    delete: (id) => `/api/syllabus/${id}`,
  },
  books: {
    list: "/api/book/filter",
    create: "/api/book/upload",
    delete: (id) => `/api/book/delete/${id}`,
  },
  papers: {
    list: "/api/paper",
    create: "/api/paper",
    delete: (id) => `/api/paper/${id}`,
  },
  course: {
    departments: {
      list: "/api/course/departments",
      create: "/api/course/departments",
    },
    courses: {
      byDepartment: (departmentId) => `/api/course/courses/${departmentId}`,
      create: "/api/course/courses",
    },
    semesters: {
      byCourse: (courseId) => `/api/course/semesters/${courseId}`,
      create: "/api/course/semesters",
    },
  },
  subjects: {
    list: "/api/subjects",
    create: "/api/subjects",
    update: (id) => `/api/subjects/${id}`,
    delete: (id) => `/api/subjects/${id}`,
  },
  feedback: {
    submit: "/api/feedback/submit",
    list: "/api/feedback/all",
  },
  notifications: {
    list: "/api/notification",
    create: "/api/notification",
    markRead: (id) => `/api/notification/${id}/read`,
  },
}

// API helpers
export const apiGet = (url, params = {}) => api.get(url, { params })
export const apiPost = (url, data = {}) => api.post(url, data)
export const apiPut = (url, data = {}) => api.put(url, data)
export const apiPatch = (url, data = {}) => api.patch(url, data)
export const apiDelete = (url) => api.delete(url)
export const apiUpload = (url, formData) =>
  api.post(url, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })

